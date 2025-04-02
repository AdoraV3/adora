/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "auth.vapi.ai",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
  reactProductionProfiling: true,
};

export default nextConfig;
