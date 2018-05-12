export const Networks = [
  {
    geth: {
      type: 'local',
      url: 'http://127.0.0.1:8545',
    },
    chain: {
      id: 61,
      name: 'mainnet',
    },
    title: 'Mainnet',
    id: 'local/mainnet',
  },
  {
    geth: {
      type: 'local',
      url: 'http://127.0.0.1:8545',
    },
    chain: {
      id: 62,
      name: 'morden',
    },
    title: 'Morden Testnet',
    id: 'local/morden',
  },
];


export function findNetwork(gethUrl, chainId) {
  return Networks.find((n) => {
    return (n.chain.id === chainId) && (n.geth.url === gethUrl);
  });
}
