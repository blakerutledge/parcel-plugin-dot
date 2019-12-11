module.exports = function(bundler) {
  bundler.addAssetType("dot", require.resolve("./DotAsset"));
};
