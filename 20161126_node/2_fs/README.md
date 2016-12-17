## fs核心模块
node 中的核心模块 file system

### 1、读取文件
```javascript
var fs = require('fs');
//读取 写入 同步和异步同时出现
//有没有返回值 有没有回调函数 判断是否是异步
fs.readFile(); //异步方法
fs.readFileSync(); //同步方法
```
```javascript
//默认类型r，默认编码格式buffer
var name = fs.readFileSync('./node.txt',{flag:'r',encoding:"utf8"});
//指定编码是utf8
var name1 = fs.readFileSync('./node.txt',"utf8");
-
var name2 = fs.readFile('./node.txt',function(err,data){ //error first
    console.log(arguments);
});
console.log(name2);
```

### 2、写文件
```javascript
//默认编码格式utf8，存取json格式，必须变成json串
fs.writeFileSync('./node.txt',JSON.stringify({'name':1}));
fs.writeFile('./node.txt',data,function(err,data){});
```
- 追加
```
 fs.writeFileSync('./node.txt',JSON.stringify({'name':1}),{flag: 'a'});
 fs.appendFileSync('./node.txt',JSON.stringify({'name':1}));
```

- 报错
```
fs.writeFile('./node.txt',data,function(err,data){
   console.log(err);
});
-
//异步可以通过回调函数中的err捕获错误，同步 try catch
try{
    var name1 = fs.readFileSync('./node1.txt',"utf8");
    console.log(name1);
}catch(e){
    console.log(e);
}
```

- 写一个copy方法
```
//同步拷贝
function copySync(soursepath,targetpath){ //readFileSync writeFileSync
    var file = fs.readFileSync(soursepath);
    fs.writeFileSync(targetpath,file);
}
-
//异步拷贝
function copy(soursepath,targetpath){ //readFile writeFile
    fs.readFile(soursepath,function(err,data){
        if(err) console.log(err);
        fs.writeFile(targetpath,data,function(){});
    });
}
```
> readFile缺点会把文件全部读入到内存中，不适合读取过大的文件，
不超过64k的都可以使用这个方法（淹没可用内存）

### 目录操作
#### 1、创建目录
```javascript
var fs = require('fs');
//创建目录必须保证父级存在，不存在无法创建
fs.mkdirSync('a/b/c/d');
-
//异步创建,循环创建需要递归
fs.mkdir('a/b',function(err){
    //是否成功
});
```

#### 2、判断文件是否存在
```javascript
fs.existsSync('./a');
-
//异步判断
fs.exists('a/b',function(){
    //exists 是否存在
});
```

#### 3、同步异步创建目录
```javascript
//同步创建目录
function mkdirPath(path){
    var arr = path.split('/');
    var _path = "";
    for(var i = 0; i < arr.length;i++){

        /*
       if(i == 0){
            _path += arr[i];
        }else{
            _path += "/" + arr[i];
        }

        fs.mkdirSync(_path);*/

        //每次截取想要创建的路径
        var currpath = arr.slice(0,i+1).join('/');
        //console.log(currpath);

        //如果文件已经存在，就不需要创建
        if(!fs.existsSync(currpath)){
            fs.mkdirSync(currpath);
        }

    }
}
//mkdirPath('fs/a');
```

#### 4、读取目录下所有的文件 
```javascript
fs.readdirSync('../2_fs');
fs.readdir('../2_fs');
```

#### 5、文件状态和文件类型
```javascript
fs.statSync('../2_fs/test.txt');
fs.stat('../2_fs/test.txt')
-
var res = fs.statSync('../2_fs/test.txt');
console.log(res);
console.log(res.isDirectory()); //是否是文件夹
console.log(res.isFile()); //是否是文件
```

#### 6、删除文件和文件夹
```javascript
fs.unlinkSync('a/index.js'); //删除文件
fs.unlink('a/index.js'); //删除文件
-
fs.rmdirSync('a/b); //删除文件夹
fs.rmdir('a/b); //删除文件夹
```

### 路径处理path模块
```javascript
var path = require('path');
```
#### 1、path.join() 拼接路径
```javascript
console.log(path.join('a','b','c')); //  a\b\c
console.log(path.join(__dirname + '/a.js')); //  d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\a.js
console.log(path.join(__dirname,'/a.js')); //  d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\a.js
```

#### 2、path.resolve() 解析绝对路径,通过不存在的文件名解析出绝对路径
```javascript
console.log(path.resolve('b.js')); // d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\b.js
```




