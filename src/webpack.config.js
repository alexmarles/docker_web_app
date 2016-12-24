module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  context: __dirname,
  entry: {
    app: ['./server.js']
  },
  output: {
    path: '../build',
    filename: 'server.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true
  }
}
