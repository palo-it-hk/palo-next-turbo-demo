/** @type {import('next').NextConfig} */
const nextConfig = {
  // // Enable the below to use SVGR:
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"]
  //   });
 
  //   return config;
  // },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;
