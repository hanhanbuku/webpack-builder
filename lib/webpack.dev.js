const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development', // 开发环境
  devtool: 'source-map', // 输出源代码
};
module.exports = merge(baseConfig, devConfig);
