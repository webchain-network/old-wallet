const { spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const { checkExists } = require('../utils');
const log = require('../logger');

class LocalConnector {
  // TODO: assert params
  constructor(bin, chain) {
    this.bin = bin;
    this.chain = chain;
  }

  emeraldExecutable() {
    const suffix = os.platform() === 'win32' ? '.exe' : '';
    return path.resolve(path.join(this.bin, `webchain-cli${suffix}`));
  }

  // It would be nice to refactor so we can reuse functions
  // - chmod to executable
  // - check if exists
  // - move
  // - get bin path for executable (eg this.emeraldBin?)
  //
  // This will migrate from cargo bin path emerald to project dir if emerald
  // is already installed to the cargo bin path and does not exist in the project "bin" path,
  // which is the project base dir.
  migrateIfNotExists() {
    return new Promise((resolve, reject) => {
      const bin = this.emeraldExecutable();
      log.info('Checking if webchain exists:', bin);
      checkExists(bin).then((exists) => {
        if (!exists) {
          log.info('webchain-cli not found');
          // check that included binary path exists
          // if it does exist, move it to this.bin/
          const cargoEmeraldPath = path.join(process.env.HOME, '.cargo', 'bin', 'webchain-cli');
          log.info('cargo installed webchain-cli path:', cargoEmeraldPath);
          checkExists(cargoEmeraldPath).then((emBinaryExists) => {
            log.info('cargo installed webchain-cli path exists:', emBinaryExists);
            if (!emBinaryExists) {
              reject(new Error('No packaged webchain-cli binary found.'));
            }
            const rs = fs.createReadStream(cargoEmeraldPath);
            const ws = fs.createWriteStream(bin);
            rs.on('error', (err) => { reject(err); });
            ws.on('error', (err) => { reject(err); });
            ws.on('close', () => {
              fs.chmod(bin, 0o755, (moderr) => {
                if (moderr) {
                  log.error('Failed to set emerald executable flag', moderr);
                  reject(moderr);
                }
                resolve(true);
              });
            });
            rs.pipe(ws);
          });
        } else {
          // Assuming the emerald found is valid (perms, etc).
          log.info('OK: webchain exists: ', bin);
          resolve(true);
        }
      });
    });
  }


  /**
     * It runs "emerald import --all" to import old key files from vault version before v0.12
     * TODO: sooner or later it should be removed
     */
  importKeyFiles() {
    return new Promise((resolve, reject) => {
      const bin = this.emeraldExecutable();
      const appData = (process.env.APPDATA || os.homedir());
      const emeraldHomeDir = `${appData}${path.join('/.webchain-cli', this.chain.name, 'keystore/')}`;
      fs.access(bin, fs.constants.F_OK | fs.constants.R_OK | fs.constants.X_OK, (err) => {
        if (err) {
          log.error(`File ${bin} doesn't exist or doesn't have execution flag`);
          reject(err);
        } else {
          const options = [
            'account',
            'import',
            `--chain=${this.chain.name}`,
            '--all',
            emeraldHomeDir,
          ];
          log.debug(`Webchain-cli bin: ${bin}, args: ${options}`);
          const result = spawnSync(bin, options);
          if (result) {
            log.debug(`Webchain-cli execution status: ${result.status}`);
          }
          resolve(result);
        }
      });
    });
  }

  migrateToWebchainDir() {
    return new Promise((resolve, reject) => {
      const appData = (process.env.APPDATA || os.homedir());
      const emeraldHomeDir = path.join(appData, '.webchain-cli');
      const webchainHomeDir = path.join(appData, '.webchain-vault');
      fs.access(webchainHomeDir, fs.constants.F_OK, (err) => {
        if (err) {
          fs.access(emeraldHomeDir, fs.constants.F_OK, (err1) => {
            if (err1) {
              resolve();
            } else {
              fs.copy(emeraldHomeDir, webchainHomeDir).then(() => {
                resolve();
              }, (err2) => {
                log.error(err2);
              });
            }
          });
        } else {
          resolve();
        }
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      const bin = this.emeraldExecutable();
      fs.access(bin, fs.constants.F_OK | fs.constants.R_OK | fs.constants.X_OK, (err) => {
        if (err) {
          log.error(`File ${bin} doesn't exist or doesn't have execution flag`);
          reject(err);
        } else {
          const options = [
            '-v',
            'server',
            '127.0.0.1',
            '20224',
          ];
          log.debug(`Webchain-cli bin: ${bin}, args: ${options}`);
          this.proc = spawn(bin, options);
          resolve(this.proc);
        }
      });
    });
  }

  launch() {
    return new Promise((resolve, reject) => {
      log.info('Starting Webchain Connector...');
      this.migrateIfNotExists()
        .then(this.migrateToWebchainDir.bind(this))
        .then(this.start.bind(this))
        .then(resolve)
        .catch(reject);
    });
  }

  shutdown() {
    log.info('Shutting down Local Connector');
    return new Promise((resolve, reject) => {
      if (!this.proc) {
        resolve('not_started');
        log.debug('Local Connector not started');
        return;
      }
      this.proc.on('exit', () => {
        resolve('killed');
        this.proc = null;
        log.debug('Webchain Connector has been killed');
      });
      this.proc.on('error', (err) => {
        log.error('Failed to shutdown Webchain Connector', err);
        reject(err);
      });
      this.proc.kill();
      setTimeout(() => resolve('pended'), 3000);
    });
  }
}

module.exports = {
  LocalConnector,
};
