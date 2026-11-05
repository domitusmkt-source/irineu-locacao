import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Contexto de deploy da Netlify (production | deploy-preview | branch-deploy),
  // fixado no build para que previews/homologação saiam com noindex.
  env: {
    NETLIFY_CONTEXT: process.env.CONTEXT || "",
  },
  poweredByHeader: false,
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
