// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/userInfo-server': {
        target: "https://118.31.102.1:8100/userInfo-server",
        changeOrigin: true,
        pathRewrite: {
          '^/userInfo-server': ''
        }
      },
      '/home-server': {
        target: "https://118.31.102.1:8100/home-server",
        changeOrigin: true,
        pathRewrite: {
          '^/home-server': ''
        }
      },
      '/videoInfo-server': {
        target: "https://118.31.102.1:8100/videoInfo-server",
        changeOrigin: true,
        pathRewrite: {
          '^/videoInfo-server': ''
        }
      },
      '/personalVideo-server': {
        target: "https://118.31.102.1:8100/personalVideo-server",
        changeOrigin: true,
        pathRewrite: {
          '^/personalVideo-server': ''
        }
      },
      '/label-server': {
        target: "https://118.31.102.1:8100/label-server",
        changeOrigin: true,
        pathRewrite: {
          '^/label-server': ''
        }
      },
      '/collect-server': {
        target: "https://118.31.102.1:8100/collect-server",
        changeOrigin: true,
        pathRewrite: {
          '^/collect-server': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
