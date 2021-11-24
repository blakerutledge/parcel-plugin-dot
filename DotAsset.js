
let fs = require('fs')
let path = require('path')
const dot = require("dot")

import {Transformer} from '@parcel/plugin';
let { parse } = require('node-html-parser')


let def = {
	loadfile: ( filepath ) => {
		return fs.readFileSync( path.join( __dirname,  '..', '..', 'src', 'frontend', filepath ) )
	}
}



module.exports = new Transformer( {

	async transform({asset, options, config, resolve}) {

		console.log( asset )

		let root = parse( asset )
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

	return "module.exports = " + dot.template( output, undefined, def );

  }

};

String.prototype.replaceAll = function( search, replacement ) {
	let target = this
	return target.split( search ).join( replacement )
}