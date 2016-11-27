var EventEmmiter = require('events');

//var e = new EventEmmiter();
var util = require('util');
function Man(){

}

util.inherits(Man,EventEmmiter);

var man = new Man();

function buyCar(who){
    console.log("买车给" + who);
}

function buyPack(who,who1){
    console.log("买包给" + who + "和" + who1);
}

man.on("有钱",buyCar);
man.on("有钱",buyCar);
//man.removeListener("有钱",buyCar);
man.removeAllListeners("有钱",buyCar); //删除所有
man.emit("有钱","妹子");