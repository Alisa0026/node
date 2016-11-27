//events事件
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
            item.apply(this,args);
        })
    }
};

//移除事件监听
Man.prototype.removeListener = function(eventName,callback){
    this.events[eventName] = this.events[eventName].filter(function(item){
        //返回false是删掉，有一个false就是false，既要数组中不包含callback，也不包含callback.listen
        //return (item != callback) && (item == callback.listen); // 错了，callback是传入的buyPack，buyPack上面没有listen，在数组中过滤掉相同的callback
        return (item != callback) && (callback != item.listen); //在数组中过滤掉相同的callback
    });
};

//once方法，把函数绑定一次，当函数执行后，删除掉自己，再触发emit就无法找到对应的函数了
Man.prototype.once = function(eventName,callback){
    //先绑定，在方法执行后再移除掉
    function one(){
        callback.apply(this,arguments); // 这里执行this--其实在emit中item.apply()方法将this执行了实例
        this.removeListener(eventName,one);
    }
    //在one中可以找到callback
    one.listen = callback;
    this.on(eventName,one); //在emit时触发的one函数
};

function buyPack(who,who1){
    console.log("买包给" + who + "和" + who1);
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
man.once('有钱了',buyPack);
//man.on('有钱了',buyPack);
man.on('有钱了',buyCar);

//移出方法，找到对象{'有钱了':[callback,callback]}
man.removeListener('有钱了',buyCar);
man.removeListener('有钱了',buyPack);

man.emit('有钱了','妹子','朋友'); //参数不确定
//man.emit('有钱了','妹子','朋友'); //参数不确定



