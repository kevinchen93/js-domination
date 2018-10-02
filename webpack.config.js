let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: "./lib/main.js",
  output: {
    path: __dirname,
    filename: "lib/js_domination.js"
	},
	devtool: "source-map"
};
