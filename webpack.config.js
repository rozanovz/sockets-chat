module.exports = {
  entry: {
    app: './app/src/chat/index',
    auth: './app/src/auth/index'
  },
  output: {
    filename: './public/js/[name].js'
  },
  devTools: 'source-map',
  module:{
    loaders: [
      {
        test:/\.js$/,
        loader: 'babel',
        exclude: './node-modules',
        query:{
          presets: ['es2015']
        }
      },
    ]
  },
}