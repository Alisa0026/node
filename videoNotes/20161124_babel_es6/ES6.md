## 一、ES6
- 文档
>http://www.nodeclass.com/api/ECMAScript6.html

- 安装redux
```
 npm install redux --save
```

### 1、Let + Const 块级作用域和常量

let和const的出现让 JS 有了块级作用域，还可以像强类型语言一样定义常量。由于之前没有块级作用域以及 var 关键字所带来的变量提升，经常给我们的开发带来一些莫名其妙的问题。

```javascript
// demo 1
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

// demo 2
const PI = 3.1415;
console.log(PI); // 3.1415 

PI = 3; //定义之后就不能修改了
console.log(PI); // TypeError: "PI" is read-only
```

### 2、Arrows 箭头函数
```javascript
//ES6
const a = (b,x) => b + x + 2
//传统写法
var a = function(b,x){
 return b + x + 2
}
```
更多实例：
```javascript
const Template = {
    test: function(){
        //object->Template
        console.log(this);
        $('#event').on('click',()=>{
            // 大家觉得这个 this 是什么
            //object->Template
            console.log(this);
        });
    }
};
Template.test();
```

### 3.Class, extends, super 类的支持
回想之前，如果我们需要模拟一个js的类，一般会采用构造函数加原型的方式。
```javascript
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
}
```
ES6中添加了对类的支持，引入了class关键字（其实class在JavaScript中一直是保留字，目的就是考虑到可能在以后的新版本中会用到，现在终于派上用场了）。

```javascript
//类的定义
class Animal {
    //ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
}
//类的继承
class Programmer extends Animal {
    constructor(name) {
        //直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
}

//测试我们的类
var animal=new Animal('dummy'),
zf=new Programmer('zf');

animal.sayName();//输出 ‘My name is dummy’
zf.sayName();//输出 ‘My name is zf’
zf.program();//输出 ‘I'm coding...’
```

### 4.Enhanced Object Literals 增强的对象字面量
对象字面量被增强了，写法更加简洁与灵活，同时在定义对象的时候能够做的事情更多了。具体表现在：

- 可以在对象字面量里面定义原型
- 定义方法可以不用function关键字
- 直接调用父类方法

这样一来，对象字面量与前面提到的类概念更加吻合，在编写面向对象的JavaScript时更加轻松方便了。
```javascript
//比如
let a = 1;
let b = 2;

let obj = {
   a,
   b
};

//在比如
import {combineReducer} from 'redux';

combineReducer({
   a,
   b
})
```

```javascript
//通过对象字面量创建对象
var human = {
    breathe() {
        console.log('breathing...');
    }
};
var worker = {
    __proto__: human, //设置此对象的原型为human,相当于继承human
    company: 'freelancer',
    work() {
        console.log('working...');
    }
};
human.breathe();//输出 ‘breathing...’
//调用继承来的breathe方法
worker.breathe();//输出 ‘breathing...’
```

### 5.Template Strings 字符串模板
字符串模板相对简单易懂些。ES6中允许使用反引号 ` 来创建字符串，此种方法创建的字符串里面可以包含由美元符号加花括号包裹的变量${vraible}。如果你使用过像C#等后端强类型语言的话，对此功能应该不会陌生。

```javascript
//产生一个随机数
var num = Math.random();
//将这个数字输出到console
console.log(`your num is ${num}`);

let name = 'guoyongfeng';
let age = 18;

console.log(`${name} was ${age}`)
```

### 6、Destructuring 解构
