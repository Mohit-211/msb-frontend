import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // lets every stylesheet `@use "breakpoints"` from src/styles
    loadPaths: [path.join(import.meta.dirname, "src/styles")],
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
    // Retired pages: keep old links working. An admin creates accounts and marks them
    // free or paid, and payment happens off the platform, so there is no sign-up or
    // checkout here.
    return [
      { source: "/home", destination: "/story/all", permanent: false },
      { source: "/signup", destination: "/signin", permanent: false },
      { source: "/otp", destination: "/signin", permanent: false },
      { source: "/pay", destination: "/", permanent: false },
      // Saved stories open by id now (/story-read/:id); the old page read them from the tab.
      { source: "/story-read", destination: "/story/my-saved-story", permanent: false },
    ];
  },
};

export default nextConfig;
