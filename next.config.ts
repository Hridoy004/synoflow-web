import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep external state-library hooks out of automatic compiler transforms. */
  reactCompiler: false,
};

export default nextConfig;
