const path = require("path");

module.exports = (api) => {
  api.cache(false);
  const babelConfig = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: path.join(__dirname, "./src"),
          alias: {
            underscore: "lodash",
          },
        },
      ],
      "babel-plugin-lodash",
    ],
    env: {
      production: {
        presets: ["minify"],
      },
    },
  };

  return babelConfig;
};
