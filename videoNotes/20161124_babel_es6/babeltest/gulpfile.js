//移入gulp 和 gulp-babel
var gulp = require('gulp');
var babel = require('gulp-babel');

//使用gulp创建一个task，匹配src下的所有js文件，放到管道流里，再通过babel进行编译，然后输出到build
gulp.task('babel',function(){
    return gulp.src('src/*.js')
        .pipe(babel()) //没有.babelrc文件就要这这里进行配置
        .pipe(gulp.dest("build"))
});

gulp.task('default',["babel"]); //配置一个默认的