const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config:any) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote2",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./RemotePage": "./src/pages/index.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },

  // Important for Vercel deployment
  output: "standalone",
  
  // // Add basePath for proper asset loading
  // basePath: '/remote2',

  // Disable ESM externals for better compatibility
  experimental: {
    esmExternals: false,
    optimizeCss: true
  },

  // Ensure consistent build IDs
  generateBuildId: async () => {
    return "build-id";
  }
};

