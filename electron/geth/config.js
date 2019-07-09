const DefaultGeth = {
  format: 'v1',
  channel: 'stable',
  app: {
    version: '5.5.1',
  },
  download: [
    {
      platform: 'windows',
      binaries: [
        {
          type: 'https',
          pack: 'zip',
          url: 'https://github.com/webchain-network/webchaind/releases/download/v0.4.0/webchaind-0.4.0-win64.zip',
        },
      ],
      signatures: [
        {
          type: 'pgp',
          url: 'https://github.com/webchain-network/webchaind/releases/download/v0.4.0/webchaind-0.4.0-win64.zip.asc',
        },
      ],
    },
    {
      platform: 'linux',
      binaries: [
        {
          type: 'https',
          pack: 'zip',
          url: 'https://github.com/webchain-network/webchaind/releases/download/v0.4.0/webchaind-0.4.0-linux-amd64.zip',
        },
      ],
      signatures: [
        {
          type: 'pgp',
          url: 'https://github.com/webchain-network/webchaind/releases/download/v0.4.0/webchaind-0.4.0-linux-amd64.zip.asc',
        },
      ],
    },
  ],
};

module.exports = {
  DefaultGeth,
};
