const {
  override,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackAlias,
  addLessLoader
} = require('customize-cra');

module.exports = {
  webpack: override(
    fixBabelImports('antd', {
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      // lessOptions: {
      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#FD9541' }
      // }
    }),
    addPostcssPlugins([
      require('postcss-plugin-px2rem')({
        // 1024 pt 的样式书写上去就好
        // 1024 pt / 32 = 32px
        rootValue: 32,
        unitPrecision: 5,
        exclude: /(node_module)/,
        ignoreIdentifier: false,
        replace: true,
        // 不允许在媒体查询中转变 px
        mediaQuery: false,
        minPixelValue: 0
      })
    ]),
    // 添加 alias
    addWebpackAlias({
      '~': require('path').resolve(__dirname, './src')
    })
  )
};
