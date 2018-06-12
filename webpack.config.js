const Uglify = require('uglifyjs-webpack-plugin');

const centaurus = (env, argv) => {
  return {
    entry: [
      './src/centaurus.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'centaurus.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new Uglify({
          parallel: true,
          cache: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              dead_code: true,
            },
          },
        }),
      ],
    },
  };
};

const centaurus_worker = (env, argv) => {
  return {
    entry: [
      './src/centaurus.worker.js',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'centaurus.worker.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new Uglify({
          parallel: true,
          cache: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              dead_code: true,
            },
          },
        }),
      ],
    },
  };
};

module.exports = [centaurus, centaurus_worker];
