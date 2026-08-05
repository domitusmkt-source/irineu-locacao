import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "irineuimoveis.simob.com.br",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
