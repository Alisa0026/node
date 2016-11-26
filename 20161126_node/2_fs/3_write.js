var fs = require('fs');

//默认编码格式utf8，存取json格式，必须变成json串
fs.writeFileSync('./node.txt',JSON.stringify({'name':1}));
//追加
fs.writeFileSync('./node.txt',JSON.stringify({'name':1}),{flag: 'a'});
//fs.appendFileSync('./node.txt',JSON.stringify({'name':1}));

//拷贝
function copySync(soursepath,targetpath){ //readFileSync writeFileSync
    var file = fs.readFileSync(soursepath);
    fs.writeFileSync(targetpath,file);
}

function copy(soursepath,targetpath){ //readFile writeFile
    fs.readFile(soursepath,function(err,data){
        if(err) console.log(err);
        fs.writeFile(targetpath,data,function(){});
    });
}

//copy('./node.txt','./test2.txt');

//异步可以通过回调函数中的err捕获错误，同步 try catch
try{
    var name1 = fs.readFileSync('./node.txt',"utf8");
    console.log(name1);
}catch(e){
    console.log(e);
}


