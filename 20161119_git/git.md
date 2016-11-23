## git的使用

## 配置git
```
$ git config --global user.name "你的github用户名"    
$ git config --global user.email "你的github邮箱"
```


## 初始化一个仓库		
```
git init
```

## 查看git状态
```
git status
```

## 添加到暂存区中
- 添加文件到暂存区  
```
git add 文件名 
```
- 添加所有文件到暂存区  
```
git add -A 或者 git add .
```

## 将文件提交到历史区中
```
git commit
git commit -m '提交内容'
```

## 将文件从工作区直接提交到历史区中
```
git commit -a -m '注释' 
```
> 不支持首次提交

## 查看git提交日志 
```
git log
```
> 每次提交会产生一个版本号，存着对应的内容，切换版本号就可以切换内容

## 一行展示log  
```
git log --oneline
```


## 代码比较
- 工作区和暂存区的比较	
```
git diff
```

- 工作区和历史区的比较	
```
git diff master
```

- 暂存区和历史区的比较	
```
git diff --cached（--staged）
```

## 撤销
- 暂存区回到上次的add
```
git reset HEAD 文件名
```

- 用暂存区覆盖工作区
```
git checkout 文件名
```

- 通过版本id恢复
```
git reset --hard 版本号
```

- 恢复未来
- 查看所有的版本	
```
git reflog
```

- 快速版本回退
```
$ git reset --hard HEAD^
$ git reset --hard HEAD~3 
```

## 连接远程仓库
```
git remote add 名字(origin) 地址(https://github.com/Alisa0026/test2.git)
```

## 查看配置的远程地址
```
git remote -v
```

## 删除远程仓库配置
```
git remote rm 名字(origin)
```

## 推送到远程地址
```
git push -u origin master 
```
> 增加了-u (upstream) 下次可以直接使用git push/git pull推送

## 创建忽略文件
> 创建一个文件叫.gitignore
```
touch .gitignore
```

## gh-pages(如果把代码提交到这个分支上，github会给你个静态地址可以直接访问这个项目)

#修改了本地的文件和修改了线上的文件，改的是同一个文件
- 为了防止pull时拉取线上的代码，覆盖掉本地内容，所以想要将本地的代码进行提交
- 在拉取文件、拉取线上代码发现和本地冲突。此时不能自动合并，需要手动合并

- 修复冲突需要修改文件中===<<<<>>>>将此类符号删掉

## 分支
- 查看分支	
```
git branch
```
- 创建分支	
```
git branch gh-pages 
```
- 切换分支	
```
git checkout gh-pages 
```
- 删除分支	
```
git branch -d/D gh-pages
```
- 创建并切换分支	
```
git checkout -b gh-pages
```
- 在主干合并分支 
```
git merge 分支名
```
- 显示已经全部合并到当前分支的分支
```
$ git branch --merged
```

- 显示没有合并到当前分支的分支
```
$ git branch --no-merged
```

> 一般情况，会将开发的内容建立一个开发分支，代码提交到开发分支上，上线的时候合并到master分支，最后删除我们开发分支即可

## 作业提交
## 老师
- 克隆远程仓库到本地，默认下载master分支，给我们origin默认远程地址
git clone 地址 teacher

## 组长 fork一下(fork的代码不会自动更新)
- 复制(那一时刻的代码一份) zhufengzhufeng
```
git remote add teacher 地址
git pull teacher master //拉取老师最新代码
```

- 然后推到自己的仓库
```
git push origin master
```

- 点New pull request 给老师发送合并请求
- 老师选择 Merge pull request 合并推送代码

- 给组员开发操作自己仓库权限
> setting --> collaborators 增加组员

## 组员
```
组员 > github账号名称（给组长，组长开通权限）>
本地仓库建立文件夹（git clone https://github.com/zhaohaixing/zhufeng_homework10.git）>
编辑要提交的内容>> git add .>git commit -m"李钟的作业" >git push origin master
```
------------------------------
## Linux常用命令

- 删除目录（循环删除）
```
rm -rf 文件夹名 
rm 文件名
rm file 删除文件
rm -rf *.js 可以写正则
rm -rf dir 删除目录
rm -rf dir/*.js 删除dir下的js文件
```
> 删除档名中有五个字元，前四个字元为file 之所有文档.
```
$ rm file?
```
> 删除档名中，以 f 为字首之所有文档.
```
$ rm f*
```

- 创建一个文件	
```
touch index.txt 
```

- 创建目录
```
mkdir gitwork
```

- 切换目录 
```
cd（change directory）
```
> 切换到工作目录下	
```
cd gitwork
```

- 查看文件夹
> 显示所有文件，包含隐藏文件（以. 起头的文件名）
```
ls -al
```
> 显示详细列表
```
ls -l  
```
> ls -l的简写
```
 ll
```
> 显示文件及所有子目录
```
$ ls -R
```
> 显示文件（后跟*）和目录（后跟/）
```
$ ls -F
```
> 与l选项合用，显示目录名而非其内容
```
$ ls -d
```


- 文件类型

```
-rw-r--r--
drwxr-xr-x
r -> read
w -> write
x -> exec
```

```
- 文件 d目录
```
 rw-
 r--
 r--

- 打印目录	
```
pwd
```

- cp 文档的复制

> 命令格式: cp [-r] source destination

> 将文档 file1 复制成 file2
```
$ cp file1 file2
```
> 将文档 file1 复制到目录 dir1 下，文件名仍为 file1.
```
$ cp file1 dir1
```
> 将目录 /tmp 下的文档 file1复制到现行目录下，文件名仍为 file1.
```
$ cp /tmp/file1 .
```
> 将目录 /tmp 下的文档 file1现行目录下，档名为file2
```
$ cp /tmp/file1 file2
```
> (recursive copy) 复制整个目录.
```
$ cp -r dir1 dir2
```
> 复制dir1整个目录到dir2
```
$ cp -R dir1 dir2
```

- mv 移动文件
> 命令格式： mv source destination

    > 将文档 file1，更改档名为 file2.
    ```
    $ mv file1 file2
    ```
    > 将文档 file1，移到目录 dir1 下，档名仍为 file1.
    ```
    $ mv file1 dir1
    ```
    > 若目录 dir2 不存在，则将目录 dir1，及其所有档案和子目录，移到目录 dir2 下，新目录名称为 dir1.若目录dir2 不存在，则将dir1，及其所有文档和子目录，更改为目录 dir2.
    ```
    $ mv dir1 dir2
    ```

- 编辑文件内容
```
vi index.txt
```
- 进入编辑模式	
```
i
```
- 退出编辑模式
```
按 esc
```
- 保存并退出	
```
:wq 
```
- 仅退出
```
:q
```
- 强制退出
```
:q!
```
- vim 编辑器

> 命令状态：

```
j,k,h,l:上下左右
0： 行首
$: 行尾
i,I :插入命令，i 在当前光标处插入 I 行首插入
a,A:追加命令，a 在当前光标后追加，A 在行末追加
o,O:打开命令，o 在当前行下打开一行，O在当前行上插入一行
r,R :替换命令，r 替换当前光标处字符，R从光标处开始替换
数字s: 替换指定数量字符
x: 删除光标处字符
dd: 删除当前行
d0: 删除光标前半行
d$: 删除光标后半行
ctrl+f :后翻页
ctrl+b:前翻页
G : 文件尾
数字G: 数字所指定行
/string 查找字符串
n 继续查找
N 反向继续查找
% 查找对应括号
u 取消上次操作
ex命令状态
：0 文件首
：1,5 copy 7 块拷贝
：1，5 del 块删除
：1，5 move 7 块移动
：1，$s/string1/string2/g 全文件查找string1并替换为string2
：wq! 存盘退出
```
- grep 搜索
> 命令格式： mv source destination
    
    > 将文档 file1，更改档名为 file2.
    ```
    $ mv file1 file2
    ```
    > 将文档 file1，移到目录 dir1 下，档名仍为 file1.
    ```
    $ mv file1 dir1
    ```
    > 若目录 dir2 不存在，则将目录 dir1，及其所有档案和子目录，移到目录 dir2 下，新目录名称为 dir1.若目录dir2 不存在，则将dir1，及其所有文档和子目录，更改为目录 dir2.
    ```
    $ mv dir1 dir2
    ```

- 查看文件内容 
```
cat index.txt
```

- 向文件内输出内容，文件不存在则创建，多次echo会覆盖原有内容	
```
echo hello world > index.txt
```
- 两个大于号>>是追加用
```
echo hello world123 >> index.txt
```
## 打标签

    > 参考 https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
    
    > 视频 source tree 打标签 http://www.acfun.tv/v/ac2773975
    
    > 讲视频的网站 http://www.crazyphper.com/

- 增加标签
```
git tag 版本号(v1.0.0)
```
- 删除标签
```
git tag -d v1.1.0 删除分支
```
- 根据标签检出
```
git checkout [tag_name] 
git checkout v1.1.0
```
- 查看相应标签的版本信息，并连同显示打标签时的提交对象。
```
git show 
git show v1.4
```
- 分享标签
    > 默认情况下，git push 并不会把标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。其命令格式如同推送分支，运行 git push origin [tagname] 即可： 

    ```
    git push origin v1.5
    
    ```
    > 如果要一次推送所有本地新增的标签上去，可以使用 --tags 选项：

    ```
    git push origin --tags
    ```