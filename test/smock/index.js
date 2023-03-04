const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf'); // 删除dist目录的库

process.chdir(path.join(__dirname, 'template')); // 进入template文件夹

rimraf('./dist').then(() => {
  const prodConfig = require('../../lib/webpack.pro');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log('构建错误', err);
    }
    console.log('构建成功', stats.toString({
      colors: true,
      modules: false,
      children: false,
    }));
  });
});
