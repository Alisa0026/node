/*
* 了解
* */
var layers = [];
var start;
layers[0] = function (req,res,next) {
    start = Date.now();
    setTimeout(function () {
        console.log('0');
        next && next();
    },3000)
};
layers[1] = function (req,res,next) {
    setTimeout(function () {
        console.log('1');
        next && next();
    },2000)
};
layers[2] = function (req,res,next) {

    console.log('over'+(Date.now() - start)/1000);

};

var index= 0;
function next(){
    var layer = layers[index++]

    if(layer)
        layer(null,null,next);

}
next();

/*
layers.forEach(function (layer) {
    layer();
});*/
