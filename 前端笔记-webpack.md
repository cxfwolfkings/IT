# webpack

1. 实战
2. 总结
   - [性能优化](#性能优化)



## 总结



### 性能优化

#### 一、配置 resolve.modules

**webpack** 的 **resolve.modules** 是用来配置模块库（即 **node_modules**）所在的位置。当 **js** 里出现 **import 'vue'** 这样不是相对、也不是绝对路径的写法时，它便会到 **node_modules** 目录下去找。

在默认配置下，**webpack** 会采用向上递归搜索的方式去寻找。但通常项目目录里只有一个 **node_modules**，且是在项目根目录。为了减少搜索范围，可我们以直接写明 **node_modules** 的全路径。

打开 **build/webpack.base.conf.js** 文件，添加如下配置：

```js
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // add begin
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    // add end
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
```

#### 二、配置装载机的 include & exclude

**webpack** 的装载机（**loaders**）里的每个子项都可以有 **include** 和 **exclude** 属性：

- **include**：导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来）
- **exclude**：不能满足的条件（排除不处理的目录）

我们可以使用 **include** 更精确地指定要处理的目录，这可以减少不必要的遍历，从而减少性能损失。

同时使用 **exclude** 对于已经明确知道的，不需要处理的目录，予以排除，从而进一步提升性能。

打开 **build/webpack.base.conf.js** 文件，添加如下配置：

> 第 **7** 行的 **easytable** 如果项目没用到可以把它从 **include** 中去除。

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig,
      include: [resolve('src'), resolve('node_modules/vue-easytable/libs')],
      exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')],
      exclude: /node_modules/
    },
```

#### 三、使用 webpack-parallel-uglify-plugin 插件来压缩代码

默认情况下 **webpack** 使用 **UglifyJS** 插件进行代码压缩，但由于其采用单线程压缩，速度很慢。

我们可以改用 **webpack-parallel-uglify-plugin** 插件，它可以并行运行 **UglifyJS** 插件，从而更加充分、合理的使用 **CPU** 资源，从而大大减少构建时间。

执行如下命令安装 **webpack-parallel-uglify-plugin**

```sh
npm i webpack-parallel-uglify-plugin
```

打开 **build/webpack.prod.conf.js** 文件，并作如下修改：

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
    //....
    // 删掉webpack提供的UglifyJS插件
    //new UglifyJsPlugin({
    //  uglifyOptions: {
    //    compress: {
    //      warnings: false
    //    }
    //  },
    //  sourceMap: config.build.productionSourceMap,
    //  parallel: true
    //}),
    // 增加 webpack-parallel-uglify-plugin来替换
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
```

#### 四、使用 HappyPack 来加速代码构建

由于运行在 **Node.js** 之上的 **Webpack** 是单线程模型的，所以 **Webpack** 需要处理的事情只能一件一件地做，不能多件事一起做。

而 **HappyPack** 的处理思路是：将原有的 **webpack** 对 **loader** 的执行过程，从单一进程的形式扩展多进程模式，从而加速代码构建。

执行如下命令安装 **happypack**：

```sh
npm i happypack
```

打开 **build/webpack.base.conf.js** 文件，并作如下修改：

```js
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        include: [resolve('src')],
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    })
  ]
}
```

#### 五、利用 DllPlugin 和 DllReferencePlugin 预编译资源模块

我们的项目依赖中通常会引用大量的 **npm** 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其解析，而下面介绍的两个插件就是用来规避此类损耗的：

- **DllPlugin** 插件：作用是预先编译一些模块。
- **DllReferencePlugin** 插件：它的所用则是把这些预先编译好的模块引用起来。

注意：**DllPlugin** 必须要在 **DllReferencePlugin** 执行前先执行一次，**dll** 这个概念应该也是借鉴了 **windows** 程序开发中的 **dll** 文件的设计理念。

在 **build** 文件夹中新建 **webpack.dll.conf.js** 文件，内容如下（主要是配置下需要提前编译打包的库）：

```js
const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: {
    vendor: ['vue/dist/vue.common.js',
            'vue-router',
            'axios',
            'mint-ui',
            'vue-cordova',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/vue-fontawesome']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

编辑 **package.json** 文件，添加一条编译命令：

```json
{
  "name": "ddjk_vue",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "Boss",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "build:dll": "webpack --config build/webpack.dll.conf.js"
  },
```

执行 **npm run build:dll** 命令来生成 **vendor.dll.js**。

**注意**：如果之后这些需要预编译的库又有变动，则需再次执行 **npm run build:dll** 命令来重新生成 **vendor.dll.js**

**index.html** 这边将 **vendor.dll.js** 引入进来。

```html
<body>
    <div id="app"></div>
    <script src="./static/js/vendor.dll.js"></script>
</body>
```

打开 **build/webpack.base.conf.js** 文件，编辑添加如下配置，作用是通过 **DLLReferencePlugin** 来使用 **DllPlugin** 生成的 **DLL Bundle**。

```js
const webpack = require('webpack');
 
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  //.....
  plugins: [
     // 添加DllReferencePlugin插件
     new webpack.DllReferencePlugin({
       context: path.resolve(__dirname, '..'),
       manifest: require('./vendor-manifest.json')
     }),
  ]
}
```

