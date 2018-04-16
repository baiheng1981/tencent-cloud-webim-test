let gulp = require('gulp');
let gulpsync = require('gulp-sync')(gulp);
let watch = require('gulp-watch');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');
let child_process = require('child_process');

let child = null;

const PATCHS = {
    scripts:['./src/**/*.ts', './src/**/*.js'],
    output:'./build',
}

//监视
gulp.task('watch-ts', ['build-ts'], ()=>{
    // gulp.watch(PATCHS.scripts, ['build-ts']);
    console.log("task => watch-ts")
    watch(PATCHS.scripts)
        .on('add', function(file){
            console.log('添加了 ' + file);
            building();
        })
        .on('change', function(file){
            console.log('修改了 ' + file);
            building();
        })
        .on('unlink', function(file){
            console.log('删除了 ' + file);
            building();
        });
});
//编译ts
gulp.task('build-ts', ()=>{
    console.log("task => build-ts")
    building();
});
    let building = () => {
        console.log("ts building...")
        return gulp.src(PATCHS.scripts).pipe(tsProject()).pipe(gulp.dest(PATCHS.output));
    }

//restart server
gulp.task('restart', ['build-ts'], ()=>{
    console.log("task => restart")
    setTimeout(()=>{
        start();
    },1000);
});
    let start = () => {
        console.log("server start...")
        if(child) {
            child.kill();
        }
        child = child_process.exec("supervisor -w build ./build/main.js");
        child.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        });
        child.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
        });
        child.on('close', function(code) {
            console.log('close code: ' + code);
        });
        child.on('exit', (code) => {
            console.log('exit code: '+code);
        });
    }


//dev
gulp.task('dev', ['restart', 'watch-ts']);
// gulp.task('dev', ['watch-ts']);

