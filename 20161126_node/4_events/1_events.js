
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
    //截取除了事件名第一项其他的组成一个数组，传递给item执行
    //var args = [].slice.call(arguments,1);
    var args = Array.from(arguments).slice(1);

    if(this.events[eventName]){
        //箭头函数，它里面没有this指向，指向的就是上一级的this
        this.events[eventName].forEach((item) => {
            //console.log(this);
            item.apply(null,args);
        })
    }
};

function buyPack(who){
    console.log("买包给" + who);
}
function buyCar(who){
    console.log("买车给" + who);
}

var man = new Man();
/*
man.on('有钱了',buyPack);
man.on('有钱了',buyCar);
man.emit('有钱了');
*/
//作业
man.on('有钱了',buyPack);
man.on('有钱了',buyCar);
man.emit('有钱了','妹子','朋友'); //参数不确定
