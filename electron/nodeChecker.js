const WEB_MAINNET_GENESIS = '0x78e066e78f30695e6c4218db4af16a670085b58e592378e864b40156b87a4c19';
const WEB_MORDEN_GENESIS = '0x0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303';

module.exports = class NodeChecker {
  constructor(ethRpc) {
    this.ethRpc = ethRpc;
  }

  check() {
    return this.exists()
      .then((clientVersion) => this.getChain()
        .then((chain) => ({
          ...chain,
          clientVersion,
        })));
  }

  exists() {
    return this.ethRpc.web3.clientVersion();
  }

  getChain() {
    return new Promise(((resolve, reject) => {
      this.ethRpc.eth.getBlockByNumber('0x0', false).then((result) => {
        if (result.hash === WEB_MAINNET_GENESIS) {
          resolve({ chain: 'mainnet', chainId: 24484 });
        } else if (result.hash === WEB_MORDEN_GENESIS) {
          resolve({ chain: 'morden', chainId: 24485 });
        } else {
          resolve({ chain: 'unknown', chainId: 0 });
        }
      }).catch((error) => {
        reject(error);
      });
    }));
  }
};
