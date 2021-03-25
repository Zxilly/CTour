const rawLoader = require("raw-loader");

module.exports = {
  plugins: [
    {
      plugin: rawLoader,
      options: { test: /\.(c|md)$/ },
    },
  ],
};
