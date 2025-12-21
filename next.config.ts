import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use standalone output if explicitly enabled via environment variable
  // This avoids Windows symlink permission errors with pnpm
  // To enable standalone mode: NEXT_STANDALONE=true npm run build
  output: process.env.NEXT_STANDALONE === 'true' ? 'standalone' : undefined,
  /* config options here */
};

export default nextConfig;
