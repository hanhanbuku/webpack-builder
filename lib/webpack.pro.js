const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const proConfig = {
  optimization: {
    splitChunks: {
      /**
             * 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。
             * 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
             */
      // chunks:'all',
      // minSize: 3000,//需要处理的chunks的最小字节
      // maxSize: 0,//同上，相反
      // minChunks:1,//chunks最小被引用次数，超过这个次数就会被处理
      minSize: 0, // 只要引用了就会被成单独的chunks
      cacheGroups: { // 配置分离出来的chunks
        vendors: {
          test: /(vue)/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2, // 只要引用了两次以上就会被处理
        },
      },
    },
  },
  mode: 'production', // 开发环境
  devtool: 'source-map', // 输出源代码
};
module.exports = merge(baseConfig, proConfig);
