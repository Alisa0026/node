var document = {
    //此属性值里存放的所有的cookie
    cookies: [],
    //set 表示这个方法是用来给属性赋值的
    set cookie(cookie){ //赋值的时候执行此方法
        //console.log("set cookie")

       /* //方法1
       document.cookies = document.cookies.filter(function (item) {

            return item.split("=")[0] != cookie.split("=")[0]
        });*/

        //find 和 findIndex 是一对
        //方法2
        var index = document.cookies.findIndex(function (item) {
            //console.log(item)
            return item.split("=")[0] == cookie.split("=")[0]
        });

        if(index != -1){
            document.cookies.splice(index,1)
        }
        document.cookies.push(cookie);
    },
    //get 表示这个方法是用来获取属性值的
    get cookie(){//取值的时候执行此方法
        //console.log("get cookie")
        return document.cookies.join('; ')
    }
};

document.cookie = 'name=tom';
document.cookie = 'age=8';
document.cookie = 'name=222';

console.log(document.cookie); //age=8; name=222
