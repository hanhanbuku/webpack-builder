const path = require('path');// nodejs的核心模块，专门用来处理路径问题
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将css单独生成文件通过link引入得插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// 压缩css得插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/, // 只检测.css文件
        use: [ // 执行顺序：从右到左或者从下到上，最末尾的loader最先执行
          // "style-loader",//将js中的css通过创建style标签的形式添加到html中，以生效
          MiniCssExtractPlugin.loader,
          'css-loader', // 将css资源编译成common.js的模块到js中,
          'postcss-loader', // css处理器，类似于js的babel
          {
            loader: 'px2rem-loader', // 自动将px转成rem
            options: {
              remUnit: 75, // 设计稿的宽度/10
              remPrecision: 8, // 转换之后的保留小水点后几位
            },
          },
        ],
      },
      // less loader
      {
        test: /\.less$/,
        // loader:'xxx' 只能使用一个loader，use可以使用多个loader链式调用
        use: [
          // "style-loader",//将js中的css通过创建style标签的形式添加到html中，以生效
          MiniCssExtractPlugin.loader,
          'css-loader', // 将css资源编译成common.js的模块到js中
          'postcss-loader', // css处理器，类似于js的babel
          'less-loader', // 将less文件编译成css文件
        ],
      },
      // sass loader
      {
        test: /\.s[ac]ss$/, // 编译sass或者scss后缀的文件
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",//将js中的css通过创建style标签的形式添加到html中，以生效
          'css-loader', // 将css资源编译成common.js的模块到js中
          'postcss-loader', // css处理器，类似于js的babel
          'sass-loader', // 将less文件编译成css文件
        ],
      },
      // 打包图片资源
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
        ],
      },
      // 对图片资源进行优化
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片进行base64的转换
            // 优点：base64图片不用发请求就能被识别，缺点，转成base64之后体积会变大
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          // 修改输出的图片路径
          // hash 图片的哈希值，ext图片扩展名，query查询参数
          // hash：10代表只取前10位
          filename: 'static/image/[hash:10][ext][query]',
        },
      },
    ],
  },
  plugins: [
    // 使用此插件将css分离出文件通过link引入
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // 自动生成模板html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true, // 配置所有js资源放置在html得哪个位置
      minify: {
        // 压缩配置
        collapseWhitespace: true,
        preserveLineBreaks: false,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }),
    // 更友好的编译提示
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    // 配置自定义插件覆盖默认得压缩插件
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  stats: 'errors-only',
};
