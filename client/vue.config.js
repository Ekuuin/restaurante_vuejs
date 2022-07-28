module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/dist/'  // This is whatever your path from the root is
      : '/'
  }