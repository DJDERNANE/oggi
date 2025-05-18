import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard", // replace with your destination
        permanent: false,          // set to true if you want a 308 redirect
      },
    ];
  },
};

export default nextConfig;
