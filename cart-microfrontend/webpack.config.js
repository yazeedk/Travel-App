const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Entry point for the application
  entry: './src/index.js',

  // Output configuration for Webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from the public directory
    },
    compress: true, // Enable gzip compression
    port: 3001, // Specify the port for the dev server
    historyApiFallback: true, // Enables support for history API routing
    hot: true, // Enable hot module replacement
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS
    },
  },

  // Module rules for different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply rule to .js and .jsx files
        exclude: /node_modules/, // Exclude files in node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Enable support for ES6+ and React
          },
        },
      },
      {
        test: /\.css$/, // Apply rule to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Apply rule to image files
        use: [
          {
            loader: 'file-loader', // Use file-loader to handle image files
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Output images to the images directory
            },
          },
        ],
      },
    ],
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specify the HTML template file
      filename: 'index.html', // Output filename for the HTML file
      publicPath: '/', // Public path for resolving assets
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(''), // Define PUBLIC_URL as an empty string
    }),
  ],

  // Resolve extensions for imports
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions when importing
  },
};
