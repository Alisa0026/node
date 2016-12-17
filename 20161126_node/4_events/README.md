## 事件
### 订阅发布模式
```javascript
var path = require('path');
var EventEmmiter = require('events');
var util = require('util');
-
function Man(){}
util.inherits(Man,EventEmmiter); //继承
var man = new Man();
function buyCar(who){
    console.log("买车给" + who);
}
```

### 监听方法 on 
```javascript
man.on(event,listener);
//addListener(event,listener);
-
man.once(event,listener); //绑定一次
-使用
man.on("有钱",buyCar);
man.once("有钱",buyCar);
```

### 触发方法 emit
```javascript
man.emit(event,args);
man.emit("有钱","妹子");
```

### 移除方法 
```javascript
man.removeListener(event,listener);
man.removeAllListeners(event,listener); //解除所有监听
-
//man.removeListener("有钱",buyCar);
man.removeAllListeners("有钱",buyCar);
```

