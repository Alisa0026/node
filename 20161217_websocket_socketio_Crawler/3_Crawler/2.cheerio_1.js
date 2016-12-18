
var cheerio = require('cheerio');

var html = `
    <td class="keyword">
        <a class="list-title" href="">血战钢锯岭</a>
    </td>
    <td class="keyword">
        <a class="list-title" href="">你的名字</a>
    </td>
`;

//会把此字符串转成类似JQuery的对象
var $ = cheerio.load(html);

//$('.keyword .list-title') 返回一个集合
$('.keyword .list-title').each(function () {
    //console.log(this);

    var $me = $(this);
    var item = {
        name : $me.text()
    };

    //console.log($me.text());
    console.log(item); //{ name: '血战钢锯岭' }
});