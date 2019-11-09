'use strict'
var webpack = require('webpack')
const path = require('path')
// const mockdata = require('./mockData/makeComment/data.json');
function resolve (dir) {
  return path.join(__dirname, dir)
}
  module.exports = {
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 部署应用时的基本 URL
  publicPath:'/',
  //publicPath: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  //需要npm install style-resources-loader ; 然后执行 vue add style-resources-loader 选择预编译less
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/common/css/theme.less')]
    }
  },

  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',
  // Babel 显式转译列表
  transpileDependencies: [],
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: (config) =>{
    //命名
    config.resolve.alias
      .set('@', resolve('src'))
      // .set('jquery',path.resolve(__dirname,'./public/jquery-1.10.1.min.js'))
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },
  devServer: { //跨域
    port:"8088", //端口号
    host:"localhost",
    open:true, //配置自动启动浏览器
    proxy: { // 配置跨域处理 可以设置多个
      '/axios': {
        target: 'http://10.2.52.23:9104',//跨域请求头信息
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/axios': ''
        }
      }
    }
    // before(app){
    //   app.post('/Dzpl001PlxxCtrl/delZzshDzplPlxx',(req,res,next)=>{
    //     res.json(mockdata);
    //   })
    // }
  }
}
