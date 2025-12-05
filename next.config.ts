import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vi5uhk8g82bzr6cx.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
