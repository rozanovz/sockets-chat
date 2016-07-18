module.exports = {
  entry: {
    app: './src/index',
  },
  output: {
    filename: './public/js/app.js'
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