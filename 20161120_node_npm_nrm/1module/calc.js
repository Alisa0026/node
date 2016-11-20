/**
 * Created by root on 2016/11/20.
 */
console.log(1);

var calc = {
    '+':function(a,b){
        return a + b;
    },
    '-':function(a,b){
        return a - b;
    }
};

//exports.calc = calc; //导出calc
//exports = calc; //给exports改变了一个空间，改变空间并不会影响 module.exports
module.exports = calc;