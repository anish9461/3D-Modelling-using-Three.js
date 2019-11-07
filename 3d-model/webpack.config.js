const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  favicon: './public/favicon.ico'
});

module.exports = {
//     entry: path.join(__dirname, 'src', 'index.js'),
//   output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
    resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules'] },
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            resolve: {
              extensions: ['.js', '.jsx']
            }
          },
          {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            loaders: ['file-loader']
          }
          
        
      ]
    },
    plugins: [htmlPlugin]
  };