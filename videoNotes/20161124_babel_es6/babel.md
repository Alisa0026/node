## 一、Babel
- 主要内容

> 官网：babeljs.io

```
babel-cli
babel-core
babel-polyfill
```
- presets 预设->是由一系列plugins组成的
```
1
```

- plugins 插件
```
网址：babeljs.io/docs/plugins/ 有一系列的plugins
```
> 比如安装 babel-plugin-transform-es2015-modules-umd 解析的代码可以变成umd的规范
```
npm install babel-plugin-transform-es2015-modules-umd --save-dev
```
> 下载后在.babelrc中做配置
```
{
        "plugins":["transform-es2015-modules-umd"]
}
```

- 和构建工具的结合
```
gulp
webpack
```

- es6语法
- es6函数
```
const a = next => action => aa =>{}
```

## 二、使用Babel
### 1、初始化一个仓库
```
npm init -y
```
### 2、创建文件
```
touch index.html index.js
```
### 3、安装babel-cli (做对语法解析)
```
npm install babel-cli --save-dev
npm install babel-cli -g 全局安装
```
> 安装后可以使用babel 和babel-node命令
```
babel -v 查看版本
```
> 将index.js中的代码经过编译输出到a.js中
```
babel index.js --out-file a.js
babel index.js -o a.js 缩写
```
> 创建两个目录：src 源码、build 编译后的代码
```
mkdir src build
```
> 将index.js 文件放到src下
```
mv index.js src/
```
> 将src 目录输出到build目录下
```
babel src --out-dir build
babel src -d build  缩写
```
> 频繁要写的命令可以配置到package.json中scripts中
```
"scripts": {
        "build":"babel src --out-dir build"
        //"build":"./node_modules/.bin/babel src -d build" 只依赖项目中安装的babel
        //"build":"./node_modules/.bin/babel src -w -d build" 持续监听编译
        //"build":"./node_modules/.bin/babel src -wd build"
        //"build":"./node_modules/.bin/babel src --watch -d build"
}
保存以后，直接控制台运行： npm run build
```

- 解析es6的语法，安装一个预设
```
npm install babel-preset-es2015 --save-dev
```
> 对于babel做配置
```
touch .babelrc //创建一个.babelrc文件
写入内容：
{
        "presets":["es2015"]
}
重新执行 npm run build
发现编译后的build下的代码发生变化
```
- babel配置的参数Options
```
查看网站 http://babeljs.io/docs/usage/options/
```
- babel查看帮助
```
babel --help
```
- 解析react的语法,安装预设babel-preset-react 
```
npm install babel-preset-react --save-dev
```
- 需要安装一些预设
```
npm install react react-dom --save
在.babelrc配置
{
        "presets":["es2015","react"]
}
然后会发现jsx.js文件编译后的样子
```

### 4、安装babel-runtime，对编译后的代码做一个整理和提取公共的代码
```
npm install babel-runtime babel-plugin-transform-runtime --save-dev
```
> 下载后在.babelrc中做配置
```
{
        "plugins":["transform-runtime"]
}
运行 npm run build
```

### 5、安装babel-polyfill
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。Babel默认不转码的API非常多，详细清单可以查看definitions.js文件。
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片
```Bash
npm install babel-polyfill --save
```
> 安装好后，需要在你的代码中引入，因为这个只是babel的一个模块，
不是预设，所以不需要在.babelrc中再设置
```javascript
import 'babel-polyfill'
```
> 这样再引入数组扩展的API比如Array.from('aaa');浏览器就不会报错了

### 6、对es7不同阶段的一个解析
