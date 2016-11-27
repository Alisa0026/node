var url = require('url');

var urlobj = url.parse("https://username:password@zhidao.baidu.com:80/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content#hello",true);
console.log(urlobj);
/*
* Url {
    协议  protocol: 'https:',
    是否有/ slashes: true,
    账号密码 auth: 'username:password',
    主机 host: 'zhidao.baidu.com:80',
    端口号 port: '80',
    主机名 hostname: 'zhidao.baidu.com',
    锚点 hash: '#hello',
    查询串 search: '?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content',
    查询对象 query: { fr: 'iks', word: '�˴�ѡ��', ie: 'gbk?entry=home_new_content' },
    访问路径 pathname: '/question/285286886.html',
     path: '/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content',
     href: 'https://username:password@zhidao.baidu.com:80/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content#hello'
 }
 * */