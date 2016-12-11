//加载mongoose模块
var mongoose = require('mongoose');

//连接数据库，默认端口可以不写
//协议名://IP或者域名/数据库名字
mongoose.connect('mongodb://127.0.0.1:27017/201610node');

//创建集合骨架模型，规定集合中文档的字段名称和类型
//规定存储的时候对象能存的字段的名称，多余的字段会忽略
//规定存储的时候对象的字段类型，如果不匹配会先尝试类型转换，
//如果转换成功继续保持，不成功报错退出
var PersonSchema = new mongoose.Schema({
    cardno:String,//身份证号
    age:Number,//年龄
    birthday:Date,//生日
    name:String //姓名
 /* binary:Buffer,//二进制
    living:Boolean,//是否活着
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
        name:String
    }*/
},{collection:'person'}); //collection 是集合名字

//定义操作数据库的模型
var PersonModel = mongoose.model('Person',PersonSchema);
//mongoose.model('Person');

//增加数据 保存对象
//保存单条记录
PersonModel.create({
    name:'张三',
    age:100,
    birthday:new Date(),
    home:'北京'
},function(err,doc){
    console.log(doc);
});

//保存多条记录
var person = [];
for(var i=1;i<10;i++){
    person.push({name:'test'+i,age:i})
}

PersonModel.create(person,function(err,doc){
    console.log(doc);
});

//删除
//第一个参数是一个对象，存放着要删除的条件，会删除所有匹配条件的记录
PersonModel.remove({age:100},function(err,doc){
    console.log(doc);
    //ok:1 表示删除成功，n表示删除的数据量
    //result: { ok: 1, n: 1 },
});

//修改
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

//查询
//或 $or:[]
PersonModel.find({$or:[{name: 'test1'},{age: 2}]}, function (err,doc) {
    console.log(doc);
});

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

/*
* 更新后的值
* $set 直接指定更新后的值
* $inc 在原有基础上递增
* */
PersonModel.update({age:2},{
    //$inc:{age:400}
    $set:{age:100}
}, function (err,doc) {
    console.log(doc);
});

/*
* 复杂查询，分页查询
* 一共10条数据
* 每页3条，要查询第2页的数据
* */
//每页的条数
var pageSize = 3;
//要取第几页的数据
var pageNum = 2;
//skip 跳过指定的条件，exec表示执行此查询
PersonModel.find()
    .skip(pageSize*(pageNum-1))
    .limit(pageSize) //限制显示条数
    .sort({age:-1}) //age:-1倒序排列 age:1正序排列
    .exec(function(err,doc){
    console.log(doc);
});