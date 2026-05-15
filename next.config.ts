import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // This allows the PWA plugin to work with the default build process
    // which might be using Turbopack in newer Next.js versions
  },
};

export default withPWA(nextConfig);
