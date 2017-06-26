module.exports = function() {
  return {
    entry: {
      grouped: "./example_grouped.jsx",
      individual: "./example_individual.jsx"
    },
    output: {
      path: __dirname + "/static",
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
  }
};
