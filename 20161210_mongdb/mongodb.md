## MongoDB

### 一、windows启动服务器端
- 1.先进入mongodb的安装目录bin下面
- 2.按下Shift+鼠标右键,选择在此处打开命令窗口 
执行
```
mongod --dbpath=D:\mongo\data
```
- 3.32位操作系统
```
mongod --dbpath=D:\mongo  --storageEngine=mmapv1
```
> dbpath指向一个真实存在的路径，win8 win10不建议放在盘 如果出现 `waiting for connections` 就表示成功了 如果出现 `error` 就表示失败了

### 二、启动客户端连接服务器
还是在mongodb的bin目录下打开命令窗口
```javascript
输入 mongo --host=127.0.0.1 或者 mongo 按回车键
```
### 三、mac启动mongodb
```javascript
sudo mkdir -p /data/db
```
再输入密码即可创建文件存储目录 再执行
```javascript
sudo mongod &
```

### 四、如何在命令行客户端中查找数据
显示 当前的服务中有多少个数据库
```javascript
show dbs;
```
切换到指定数据库下面
```javascript
use 201610node
```
查看当前数据库下面集合的全部文档
```javascript
db.person.find();
```

## Mongoose 操作
### 1.安装mongoose
```javascript
npm install mongoose
```

### 2.使用mongoose
```javascript
//加载mongoose模块
var mongoose = require('mongoose');

//连接数据库，默认端口可以不写
//协议名://IP或者域名/数据库名字
mongoose.connect('mongodb://127.0.0.1:27017/201610node');
```

### 3.Schema 
Schema是数据库集合的模型骨架 定义了集合中的字段的名称和类型以及默认值等信息
```javascript
<!--定义schema-->
var personSchema = new mongoose.Schema({
      name:String, //姓名
      binary:Buffer,//二进制
      living:Boolean,//是否活着
      birthday:Date,//生日
      age:Number,//年龄
      _id:Schema.Types.ObjectId,  //主键
      _fk:Schema.Types.ObjectId,  //外键
      array:[],//数组
      arrOfString:[String],//字符串数组
      arrOfNumber:[Number],//数字数组
      arrOfDate:[Date],//日期数组
      arrOfBuffer:[Buffer],//Buffer数组
      arrOfBoolean:[Boolean],//布尔值数组
      arrOfObjectId:[Schema.Types.ObjectId]//对象ID数组
      nested:{ //内嵌文档
        name:String,
      }
    });
```

### 4.Model
Model是由通过Schema构造而成 除了具有Schema定义的数据库骨架以外，还可以操作数据库 如何通过Schema来创建Model呢，如下:
```javascript
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/zfpx");
//两个参数表示定义一个模型
var PersonModel = mongoose.model("Person", PersonSchema);
// 如果该Model已经定义，则可以直接通过名字获取
var PersonModel = mongoose.model('Person');//一个参数表示获取已定义的模型
```
> 拥有了Model，我们也就拥有了操作数据库的能力

> 在数据库中的集合名称等于 模型名转小写再转复数,比如 Person>person>people,Child>child>children

### 5.基础操作
#### 5.1.查询
语法：
```javascript
Model.find(查询条件,callback);
```
代码：
```javascript
Model.find({},function(error,docs){
  //若没有向find传递参数，默认的是显示所有文档
});

Model.find({ "age": 6 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为6的所有文档
  }
});
-
或 $or:[]
PersonModel.find({$or:[{name: 'test1'},{age: 2}]}, function (err,doc) {
    console.log(doc);
});
```

##### 5.1.1属性过滤，只返回需要的字段
语法：
```javascript
find(Conditions,field,callback)
```
代码：
```javascript
//field省略或为Null，则返回所有属性。
//返回只包含name、age两个键的所有记录
Model.find({},{name:1, age:1, _id:0}，function(err,docs){
   //docs 查询结果集
})
```
> 我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回，如果不要显示加上("_id":0)

```javascript
//属性过滤，只返回需要的字段
//第二个参数可以包含的字段或排除的字段，name表示字段名，1表示要返回
//_id是默认返回，如果不要显示加上("_id":0)
//{name:1,age:0} 除了_id 其他字段不能包含排除混合使用

PersonModel.find({},{name:1,_id:0}, function (err,doc) {
    console.log(doc);
});

PersonModel.find({_id:'584b86bf796d6a2ba883f72a'}, function (err,doc) {
    console.log(doc);
});
```

####  5.2.Model保存
语法：
```javascript
Model.create(文档数据, callback))
```
代码：
```javascript
 PersonModel.create({ name:"zfpx", age:7}, function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
```
保存多条记录
```javascript
//保存多条记录
var person = [];
for(var i=1;i<10;i++){
    person.push({name:'test'+i,age:i})
}

PersonModel.create(person,function(err,doc){
    console.log(doc);
});
```

#### 5.3.更新
语法：
```javascript
Model.update(查询条件,更新对象,callback);
```
代码：
```javascript
var conditions = {name : 'zfpx'};
var update = {$set : { age : 100 }};
PersonModel.update(conditions, update, function(error){
  if(error) {
      console.log(error);
  } else {
      console.log('Update success!');
    }
});
```
> 请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}

```javascript
/*
* 1.更新的条件
* 2.更新后的数据
* 3.更新时，如果匹配的条数多余一条，只会更新一条
* 4.multi 表示如果匹配多条，有几条更新几条
* */
PersonModel.update({age:1,name:'test1'},{
    age:38,name:'张三123',birthday:new Date()
},{multi:true},function(err,result){
    console.log(result);
    //ok:1 表示更新成功，nModified表示被修改的条数，n是准备要修改的条数
    //{ ok: 1, nModified: 1, n: 1 }
});
```

#### 5.4.删除
语法：
```javascript
Model.remove(查询条件,callback);
```
代码：
```javascript
var conditions = { name: 'zfpx' };
PersonModel.remove(conditions, function(error){
    if(error) {
          console.log(error);
    } else {
        console.log('Delete success!');
    }
});
```

```javascript
//第一个参数是一个对象，存放着要删除的条件，会删除所有匹配条件的记录
/*PersonModel.remove({age:100},function(err,doc){
    console.log(doc);
    //ok:1 表示删除成功，n表示删除的数据量
    //result: { ok: 1, n: 1 },
});
```

