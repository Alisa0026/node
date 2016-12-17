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


