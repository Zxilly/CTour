const rawLoader = require("raw-loader");
const { addBeforeLoader, loaderByName } = require("@craco/craco");

module.exports = {
  plugins: [
    {
      plugin: rawLoader,
      options: { test: /\.(c|md)$/i },
    },
  ],
  webpack: {
    configure: function (webpackConfig) {
      const workerLoader = {
        test: /\.worker\.ts$/,
        use: { loader: "worker-loader" },
      };

      addBeforeLoader(
        webpackConfig,
        loaderByName("worker-loader"),
        workerLoader
      );

      return webpackConfig;
    },
  },
};
