/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*mystorybank",
      },
    ],
    unoptimized: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mov|mp4|webm)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'videos/[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
