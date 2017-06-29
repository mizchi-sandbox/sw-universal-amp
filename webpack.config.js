/* eslint-disable */
module.exports = {
  entry: {
    bundle: './src/client.js',
    sw: './src/sw.js',
    'sw-register': './src/sw-register.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
