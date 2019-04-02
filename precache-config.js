const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  navigateFallback: "/index.html",
  navigateFallbackWhitelist: [/^(?!\/__)/],
  stripPrefix: "dist",
  root: "dist/",
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "bzlist-client",
      filename: "service-worker.js",
      staticFileGlobs: [
        "dist/index.html",
        "dist/**.js",
        "dist/**.css",
        "dist/3rdpartylicenses.txt"
      ],
      stripPrefix: "dist/assets/",
      mergeStaticsConfig: true
    })
  ]
};