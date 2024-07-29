/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],

    staleTimes: {
      dynamic: 30,
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add a rule to handle .node files
      config.module.rules.push({
        test: /\.node$/,
        use: "node-loader",
      });
      config.resolve.extensions.push(".node");

      // Mark @node-rs/argon2 as an external dependency
      config.externals.push("@node-rs/argon2");
    }

    return config;
  },
};

export default nextConfig;
