var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './ui-jsx.js',
  output: { path: __dirname, filename: 'ui.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  externals: {
            // Use external version of React
            "react": "React"
        }
};