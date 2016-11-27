var fs = require("fs");

var ws = fs.createWriteStream('./name.txt',{
    highWaterMark:1
});

var i = 0;
function write(){
    var flag = true;
    while(flag && i < 10){
        flag = ws.write(i++ + "");
        console.log(flag)
    }
    if(i == 10){
        ws.end();
    }
}
write();
ws.on('drain', function () {
    write();
    console.log(11)
});
//用1b来完成这件事