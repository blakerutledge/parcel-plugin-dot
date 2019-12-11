module.exports = function(bundler) {
  
  bundler.addAssetType( "dot", require.resolve("./DotAsset") );

  console.log('blake fork')

  // bundler.on('buildStart',)


};
