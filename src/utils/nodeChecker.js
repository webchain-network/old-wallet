// @flow
import { EthRpc, convert } from 'emerald-js';

type NodeInfo = {
    chain: string,
    chainId: number,
    clientVersion: string,
}

export default class NodeChecker {
    ethRpc: EthRpc;

    static WEB_MAINNET_GENESIS: string = '0x78e066e78f30695e6c4218db4af16a670085b58e592378e864b40156b87a4c19';
    static WEB_MORDEN_GENESIS: string = '0x0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303';
    static WEB_BLOCK_50000: string = '0xae097b247a9a78749c7341e4be80f95197bef74627b234f58a8c34c9bc11fc81';
    static ETC_BLOCK_50000: string = '0x0e30a7c0c1cee426011e274abc746c1ad3c48757433eb0139755658482498aa9';

    constructor(ethRpc: EthRpc) {
      this.ethRpc = ethRpc;
    }

    check(): Promise<NodeInfo> {
      return this.exists()
        .then(clientVersion => this.getChain()
          .then(chain => ({
            ...chain,
            clientVersion,
          })));
    }

    exists() {
      return this.ethRpc.web3.clientVersion();
    }

    getChain(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.ethRpc.eth.getBlockByNumber('0x0', false).then((result) => {
          if (result.hash === NodeChecker.WEB_MAINNET_GENESIS) {
            resolve({ chain: 'mainnet', chainId: 101 });
          } else if (result.hash === NodeChecker.WEB_MORDEN_GENESIS) {
            resolve({ chain: 'morden', chainId: 111 });
          } else {
            resolve({ chain: 'unknown', chainId: 0 });
          }
        }).catch((error) => {
          reject(error);
        });
      });
    }
}
