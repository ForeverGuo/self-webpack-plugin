const HtmlWebpackPlugin = require("html-webpack-plugin");

// 插件代码
class MyWebpackPlugin {
  constructor(options) {
  }
  
  apply(compiler) {
    // console.log(compiler)
    // 在emit阶段插入钩子函数
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, next) => {
      // console.log('我是同步钩子')
      // setTimeout(()=>{
      //   console.log('文件列表', Object.keys(compilation.assets).join(','));
      //   callback();
      // }, 1000);
      // 修改或添加资源
      setTimeout(() => {
        compilation.assets['copyright.txt']  = {
          source() {
            return 'this is my copyright';
          },
          size() {
            return 20;
          }
        };
        next()
      }, 1000);
      // 删除资源
      // delete compilation.assets['main.js']
    });

    compiler.hooks.done.tapAsync('MyWebpackPlugin', (stats, next) => {
      console.log(stats)
      next();
    })


    //compiler.hooks.compilation.tap('MyWebpackPlugin', (compilation, callback) => {
      // compilation.hooks.buildModule.tap('MyWebpackPlugin', (data, cb) => {
      //   console.log(data)
      // })
        // HtmlWebpackPlugin在webpack刚创建编译的时候执行自带的beforeAssetTagGeneration生命周期
      // HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap('MyWebpackPlugin', (htmlPluginData, cb) => {
      //   let jsSrc = htmlPluginData.assets.js[0]  // ++++++
      //   // 直接修改js数组内的元素
      //   htmlPluginData.assets.js[0] = `${jsSrc}?${new Date().getTime()}` // +++++++
      //   console.log(htmlPluginData);
      // })

    //})
  }
}

module.exports = MyWebpackPlugin;