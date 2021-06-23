import { Configuration } from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";
import path from "path";

import { commonConfig } from "./common";

export const prodConfig: Configuration = merge<Configuration>(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    libraryTarget: "umd",
  },
  devtool: "source-map",
});

module.exports = prodConfig;
