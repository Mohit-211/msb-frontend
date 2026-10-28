const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // lets every module `@use "breakpoints"` from styles/
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*mystorybank",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    // pages/home was removed; keep old links working
    return [{ source: "/home", destination: "/story/all", permanent: false }];
  },
};

module.exports = nextConfig;
