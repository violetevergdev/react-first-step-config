/** @format */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.[contenthash].js",
    assetModuleFilename: path.join("images", "[name].[contanthash][ext]"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),

    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["build"],
        },
        onEnd: {
          copy: [
            {
              source: path.join("public"),
              destination: "build",
            },
          ],
        },
      },
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  devServer: {
    watchFiles: path.join(__dirname, "src"),
  },
};
