//var tmpl = '<%=name%> 今年 <%=age%>岁 了';
var tmpl = '${name} 今年 ${age}岁 了';
var data = {name:'zfpx',age:9};
//var result = "zfpx 今年 9岁了";
var result = render(tmpl,data);
console.log(result);

function render(tmpl,data){
    return tmpl.replace(/<%=(\w+)%>/g,function(){
        return data[arguments[1]];
    });
}

//什么叫模板引擎，就是一个转换函数，把一个模板字符串和一个数据对象进行混合，得到一个最终的字符串，把模板里的变量给用真实的值替换掉
function render1(tmpl,data){
    return tmpl.replace(/\$\{(\w+)\}/g,function(){
        return data[arguments[1]];
    });
}