const { resolve } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devServer: {
    compress: true,
    contentBase: resolve(__dirname, 'docs'),
    port: 8080
  },
  devtool: 'source-map',
  entry: [
    resolve(__dirname, 'src', 'slinky.js'),
    resolve(__dirname, 'src', 'slinky.scss')
  ],
  mode: 'production',
  module: {
    rules: [
      {
        include: /src/,
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        include: /src/,
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    filename: 'slinky.min.js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'slinky.min.css',
      path: resolve(__dirname, 'dist')
    })
  ]
}
