import type { NextConfig } from "next";
import { redirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
