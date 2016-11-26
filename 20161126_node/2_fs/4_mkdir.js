var fs = require('fs');
//创建目录必须保证父级存在，不存在无法创建
//fs.mkdirSync('a/b/c/d');

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


//判断一个文件是否存在
var flag = fs.existsSync('fs/a');
console.log(flag);