var school = {};
var fs = require('fs');

//同步读写
var name = fs.readFileSync('./node.txt',"utf8");
school.name = name;
//console.log(school);


//异步读 串行
fs.readFile('./node.txt',"utf8",function(err,data){
    school.name = data;

    fs.readFile('./age.txt',"utf8",function(err,data){
        school.age = data;

        //console.log(school);
    });
});

//并行读 需要一个判断条件，什么时候触发根据条件判断，promise async库
fs.readFile('./node.txt',"utf8",function(err,data){
    school.name = data;
    out();
});
fs.readFile('./age.txt',"utf8",function(err,data){
    school.age = data;
    out();

});

function out(){
    Object.keys(school).length == 2 && console.log(school);
}