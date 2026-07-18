import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Old URLs stay alive after the rename (shared links, Google's index).
  async redirects() {
    return [
      { source: "/why-sds", destination: "/our-story", permanent: true },
      { source: "/mous", destination: "/partners", permanent: true },
      { source: "/gallery", destination: "/our-story", permanent: true },
    ];
  },
};

export default nextConfig;
