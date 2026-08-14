import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o360.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
