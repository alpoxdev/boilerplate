import { Configuration, RuleSetRule } from "webpack";
import path from "path";

import HTMLWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

// tsconfig
const tsconfigPath = path.join(__dirname, "../tsconfig.json");

export const commonModuleRules: RuleSetRule[] = [
  {
    test: /\.jsx?$/,
    use: ["babel-loader"],
    exclude: [/node_modules/, /plugins/, /__fixtures__/, /__tests__/],
  },
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: tsconfigPath,
        },
      },
    ],
    exclude: [
      /node_modules/,
      /plugins/,
      /__fixtures__/,
      /__tests__/,
      /storybook/,
      /\.stories\.tsx/,
    ],
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(scss|sass)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
      "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
      "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
    ],
  },
];

export const commonConfig: Configuration = {
  target: "web",
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "../src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    aliasFields: ["browser"],
    alias: {
      common: path.resolve(__dirname, "../src/common"),
      assets: path.resolve(__dirname, "../src/assets"),
      routers: path.resolve(__dirname, "../src/routers"),
      pages: path.resolve(__dirname, "../src/pages"),
      containers: path.resolve(__dirname, "../src/containers"),
      components: path.resolve(__dirname, "../src/components"),
      hooks: path.resolve(__dirname, "../src/hooks"),
    },
  },
  module: {
    rules: commonModuleRules,
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: "index.html.ejs",
      chunksSortMode: "auto",
    }),
    new TerserPlugin(),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  performance: {
    hints: false,
  },
};
