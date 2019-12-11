const dot = require("dot");
const { Asset } = require("parcel-bundler");

module.exports = class DotAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = "dot";
  }

  async generate() {
    return "module.exports = " + dot.template(this.contents);
  }
};
