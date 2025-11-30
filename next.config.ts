import { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  experimental: {
    appDir: true,
  },
};

export default withPlugins(
  [
    withTM(['lucide-react']),
  ],
  nextConfig
);