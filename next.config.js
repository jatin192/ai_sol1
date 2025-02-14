/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      ws: false,
      'rpc-websockets': require.resolve('rpc-websockets'),
    };
    return config;
  },
};

module.exports = nextConfig;
