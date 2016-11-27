var arr = [1,2,3,4,5,6,7,8];

var newArr = arr.filter(function(item){
    //如果返回true 删除
    return item != 4
});

console.log(newArr);



