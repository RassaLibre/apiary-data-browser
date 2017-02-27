var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var BUILD = process.env.NODE_ENV === 'production';

var plugins = [new ExtractTextPlugin('style.css')], scssLoader = undefined;

if(BUILD){
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  plugins.push(
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
}
else{
  plugins.push(
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: JSON.stringify('development')
      }
    })
  );
}

//runs on port 8080 dude
module.exports = {
  context: __dirname + "/app",
  entry: ["./index.html", "./app.jsx"],
  // Enable sourcemaps for debugging webpack's output
  devtool: "source-map",
  output: {
    filename: "app.min.js",
    path: __dirname + "/build",
  },
  resolve: {
    extensions: ["", ".webpack.js", ".jsx", ".js"]
  },
  plugins: plugins,
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.html|\.png|\.jpg|\.jpeg)$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  postcss: function () {
      return [autoprefixer];
  }
}
