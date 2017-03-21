// 线上编辑下哦
//gulp主文件，用于注册任务
//此处代码都是由NODE执行
//载入gulp模块
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
//注册一个任务
gulp.task('dist',function(){
	gulp.watch('src/index.html',['say']);
	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/js/*.js',['jsConcat']);
});
gulp.task('say',function(){
	//当gulp执行say任务时会自动执行该函数
	//console.log("hello world");
	//合并、压缩之类的操作
	//复制文件
	//gulp.src取一个文件---return文件流（文件在内存中的形态）
	//压缩文件----合并  
	//gulp.dest目标文件
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'))//将此处需要的操作传递进去
});
gulp.task('style',function(){
	gulp.src('src/style/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css/'));
});
gulp.task('jsConcat',function(){
	return gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js'));
});

var browserSync = require('browser-sync').create();
gulp.task('serve',function(){
	browserSync.init({
		notify: true,//刷新是否提示
		open: true,//子否自动打开页面
		port: 8888,//更改端口号
		server:{
			baseDir: "./src"
		}
	});
	gulp.watch([
		'*.html',
		'js/*.js',
		'css/*.css'
	]).on("change",browserSync.reload);
})
