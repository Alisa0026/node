/**
 * Created by root on 2016/11/20.
 */
//console.log('person');

/*
function eat(){
    console.log('eatting');
}
*/

/*var person = {
    'eat': function(){
        console.log('eatting');
    }
};*/

function Person(){

}
Person.prototype.eat = function(){
    console.log('eatting');
};
Person.prototype.sleep = function(){
    console.log('sleep');
};

//exports.person = Person;
module.exports = Person;