const ROOT = path.resolve(__dirname)
const webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV
const development = NODE_ENV === 'development'
const production = NODE_ENV === 'production'

module.exports = {
  mode: development ? 'development' : 'production',
  stats: {
    assets: true,
    warnings: true,
    children: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
  },
  context: `${ROOT}/src`,
  entry: {
    index: ['babel-polyfill', `./index.js`],
    debug: 'preact/debug'
  },
  output: {
    path: `${ROOT}/dist`,
    filename: 'assets/[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      "react-dom": 'preact-compat',
    }
  },
  devtool: production ? undefined : 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: 'babel-loader',
        options: {
          cacheDirectory: `${ROOT}/tmp/webpack_cache`
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|otf|webp)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader", // compiles Sass to CSS
          }
        ],
      },
    ]
  },
}
