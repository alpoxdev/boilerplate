import webpack, { Configuration } from "webpack";
import "webpack-dev-server";
import path from "path";

import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { commonConfig } from "./common";

const PORT = 3000;

export const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`, // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./index.tsx", // the entry point of our app
  ],
  devServer: {
    host: "localhost",
    port: PORT,
    hot: true,
    open: false,
    contentBase: path.join(__dirname, "../src"),
    historyApiFallback: true,
    inline: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new ReactRefreshWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
  },
});

module.exports = devConfig;
