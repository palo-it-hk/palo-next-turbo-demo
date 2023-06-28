/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode:true, 
  experimental: {
    // Required:
    appDir: true,
    serverActions:true,
  },
};

module.exports = nextConfig;
