module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    //tells webpack where to look for modules
    modules: ['node_modules'],
    //extensions that should be used to resolve modules
    extensions: ['.js', '.jsx']
  },
   devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: process.env.IP,
    port: process.env.PORT,
    public: process.env.C9_HOSTNAME
  }
};
