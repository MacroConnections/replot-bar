module.exports = {
  entry: {
    grouped: "./example_grouped.jsx",
    individual: "./example_individual.jsx"
  },
  output: {
    path: "static",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          "presets": ["es2015", "react"]
        }
      }
    ]
  }
};
