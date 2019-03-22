const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  navigateFallback: "/index.html",
  navigateFallbackWhitelist: [/^(?!\/__)/],
  stripPrefix: "docs",
  root: "docs/",
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "bzlist-client",
      filename: "service-worker.js",
      staticFileGlobs: [
        "docs/index.html",
        "docs/**.js",
        "docs/**.css"
      ],
      stripPrefix: "docs/assets/",
      mergeStaticsConfig: true
    })
  ]
};