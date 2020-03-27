let fs = require('fs')
let path = require('path')
const dot = require("dot")
const { Asset } = require("parcel-bundler")
let { parse } = require('node-html-parser')

module.exports = class DotAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = "js";
  }

  async generate() {

	let root = parse( this.contents )
	let includes = Array.prototype.slice.call( root.querySelectorAll('include') )
	includes.forEach( x => {
		let filepath = x.getAttribute('src')
		if ( filepath ) {
			let svg = fs.readFileSync( path.join( __dirname,  '..', '..', 'src', 'frontend', filepath ), 'utf-8' )
			x.set_content( svg )
			x.removeAttribute( 'src' )
		}
	} )

	let output = root.toString().split( '<include>' ).join( '' ).split( '</include>' ).join( '' )

	return "module.exports = " + dot.template( output );

  }

};

String.prototype.replaceAll = function( search, replacement ) {
	let target = this
	return target.split( search ).join( replacement )
}