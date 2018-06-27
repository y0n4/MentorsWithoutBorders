const path = require("path");

const source = path.join(__dirname, "./client");
const destination = path.join(__dirname, "./client/dist");

module.exports = {
  entry: `${source}/index.js`,
  output: {
    filename: "bundle.js",
    path: destination
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: source,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};
