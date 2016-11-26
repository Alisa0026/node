
function Man(){
    //this.events = {'有钱':['买车','买包']}
    this.events = {}
}
//创建一个私有的盒子来装所有一对多的关系
Man.prototype.on = function(eventName,callback){
    //表示一对多
    //this.events[eventName] = callback;
    if(this.events[eventName]){

        this.events[eventName].push(callback);

    }else{
        //不存在
        this.events[eventName] = [callback];
    }
};
//触发
Man.prototype.emit = function(eventName){
    this.events[eventName].forEach(function(item){
        item();
    })
};

function buyPack(){
    console.log("买包");
}
function buyCar(){
    console.log("买车");
}

var man = new Man();
man.on('有钱了',buyPack);
man.on('有钱了',buyCar);
man.emit('有钱了');
console.log(man.events)