const path = require('path')

module.exports = [
  {
    name: 'main',
    entry: './page-express-mapper.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'page-express-mapper.js',
      library: 'page-express-mapper',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    externals: {
      fs: 'commonjs fs',
      path: 'commonjs path'
    },
    node: {
      __dirname: false
    },
    mode: 'development' // or 'production' based on your needs
  },
  {
    name: 'sampleApp',
    entry: './sampleApp/sampleApp.js',
    output: {
      path: path.join(__dirname, '/sampleApp/build'),
      filename: 'sampleApp.js',
      library: 'sampleApp',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    externals: {
      fs: 'commonjs fs',
      path: 'commonjs path'
    },
    node: {
      __dirname: false
    },
    mode: 'development' // or 'production' based on your needs
  }
]
