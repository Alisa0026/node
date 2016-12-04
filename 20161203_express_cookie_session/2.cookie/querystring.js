var querystring = require('querystring');
//var query = 'name=zfpx&age=9';
var cookie = 'name#zfpx2; age#9; visit#1'
//第二个参数用来指定字段分隔符
//第三个参数用来指定key和value的分隔符
var queryObj = parse(cookie,'; ','#');
console.log(queryObj);
//reduce
function parse(str,sep,eq){
    var obj ={};
    str.replace(new RegExp(`(\\w+)${eq}(\\w+)`,'g'),function(){
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}

function parse1(str,sep,eq){
    var obj = {};
    var parts = str.split(sep);
    for(var i=0;i<parts.length;i++){
        var field = parts[i].split(eq);
        obj[field[0]] = field[1];
    }
    return obj;
}



