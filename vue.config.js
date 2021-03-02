// const TimeStamp = new Date().getTime();
module.exports = {
  lintOnSave: false,
  publicPath: '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      sass: {
        data: `
        @import "@/assets/style/_variable.scss";
        @import "@/assets/style/my-mint.scss";
        `
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  // configureWebpack: {
  //   output: { // 输出重构
  //     filename: `[name].${TimeStamp}.js`,
  //     chunkFilename: `[name].${TimeStamp}.js`
  //   },
  // }
  productionSourceMap:false,
  // chainWebpack:config=>{
  //   config.plugins.delete("prefetch")
  // }
}
