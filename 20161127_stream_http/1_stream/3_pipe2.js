var fs = require("fs");

function copy(source,target){
    var rs = fs.createReadStream('./name.txt');
    var ws = fs.createWriteStream('./name1.txt');
    rs.pipe(ws); //直接将可读流导入到可写流中
}
//会防止淹没可用内存
copy('./name.txt','./name1.txt');


