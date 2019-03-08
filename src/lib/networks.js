export const Networks = [
  {
    geth: {
      type: 'local',
      url: 'http://127.0.0.1:39573',
    },
    chain: {
      id: 24484,
      name: 'mainnet',
    },
    title: 'Mainnet',
    id: 'local/mainnet',
  },
  {
    geth: {
      type: 'remote',
      url: 'http://node1.webchain.network:39573',
    },
    chain: {
      id: 24484,
      name: 'mainnet',
    },
    title: 'Mainnet (Node 1)',
    id: 'node1/mainnet',
  },
  {
    geth: {
      type: 'remote',
      url: 'http://node2.webchain.network:39573',
    },
    chain: {
      id: 24484,
      name: 'mainnet',
    },
    title: 'Mainnet (Node 2)',
    id: 'node2/mainnet',
  },
];


export function findNetwork(gethUrl, chainId) {
  return Networks.find((n) => {
    return (n.chain.id === chainId) && (n.geth.url === gethUrl);
  });
}
