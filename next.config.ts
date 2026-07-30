import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator badge in the corner.
  devIndicators: false,
  // Emit a self-contained server bundle for a small Docker image.
  output: "standalone",
};

export default nextConfig;
