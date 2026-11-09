import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Contexto de deploy da Netlify (production | deploy-preview | branch-deploy),
  // fixado no build para que previews/homologação saiam com noindex.
  env: {
    NETLIFY_CONTEXT: process.env.CONTEXT || "",
  },
  // Build "standalone" só para a hospedagem Node.js (cPanel): ativado pelo
  // script `npm run build:standalone`. Na Netlify a variável não existe e o
  // build continua exatamente como antes.
  ...(process.env.NEXT_OUTPUT === "standalone" && { output: "standalone" as const }),
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
