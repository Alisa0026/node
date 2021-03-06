## npm（依赖管理）
> node package manager 管理后台的文件

> bower 管理前台文件

- 记录依赖
- 初始化记录的依赖的文件 package.json

    ```
       npm init    或者 npm init -y
    ```
- 安装
    - 本地安装
        - 开发依赖(开发时使用，上线后不需要)
            ```
                npm install gulp --save-dev //保存成开发依赖
            ```
        - 发布依赖(开发时使用，上线后任需要)
           ```
                npm install jquery --save
                npm install jquery@1.8.3 --save  //指定版本号用@
           ```

    - 通过package.json 来安装所需的依赖
    > 默认安装到当前目录下的node_modules文件夹下
        dependencies 依赖
        devDependencies 开发依赖
    > 安装多个用空格隔开
        npm install jquery angular --save

    - 全局安装（不是所有文件都能全局安装,如angular、JQuery，默认安装到C盘下）
    安装后可以在命令行下使用
    ```
        npm install gulp -g
    ```
    > 全局安装不会安装到自己的文件夹中

    - 查看全局的安装路径
    ```
        npm root -g //查看默认安装到c盘下
    ```

- 卸载
    - 本地卸载
    ```
        npm uninstall gulp --save-dev //怎么安的怎么删
    ```
    - 删除多个，用空格隔开
    ```
        npm uninstall jquery angular --save
    ```

    - 全局卸载
    ```
        npm uninstall gulp -g
    ```

- 发布

## 发布包（第三方包）
我们写好一个包，发布到npm上
- 包里必须要有package.json文件
```
npm init -y
```
- 写一个包的入口文件，比如index.js
- 发布到npm网站上
>添加用户，有则登录，没有则注册
```
npm add user
```
- 发布
```
npm publish
```
- 查看是否登录
```
npm whoami
```
## 使用第三方的包
- 下载第三方包
```
npm install  baobao --save
```
- 引用第三方包
> 通过require引用包的名字，直接引用即可

> node_modules 只能在同级或者上级才能找到,默认执行package.json文件中main指定的文件
```
//引用第三方别人发布的包，会自动在当前目录下node_modules下找，
// package.json文件中对于main文件，默认是index.js，如果找不到，会向上级找，找不到报错
var baobao = require('baobao');
```
- 模块的查找路径
```
console.log(module.paths);
```

## 取消发布
> 在包的目录下执行 
```
npm unpublish --force
```
> 只有发布包时才必须要切换到npm上

## 源npm 切换源切换到国内
- cnpm taobao
- 安装nrm工具,想在命令行下切换源
    ```
        npm install nrm -g
        //mac下需要加sudo
        sudo npm install nrm -g
    ```
- 显示所有源
    ```
    nrm ls
    ```
- 添加源
    ```
    nrm add zhufeng http://172.18.0.199
    ```
- 切换源
    ```
    nrm use zhufeng
    ```
- 测试源
    ```
    nrm test
    ```
>安装还是使用npm install 来安装

## 安装nodeppt
```
npm install -g nodeppt
```

- 开始写PPT
    - 必须采用markdown格式
    新建一个1.md文件
    浏览器不能是360

```
文件内写
[slide]
## <h2 style="background:red">haha</h2>
[slide]
## 2
[slide]
## 3
```
然后执行
```
nodeppt start
```
>https://github.com/ksky521/nodePPT

多个模块可以封装成一个包
npm是node.js
