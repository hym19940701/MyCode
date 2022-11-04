const { exec } = require('child_process')
const gulp = require('gulp')

const build = () => {
    const timer = setInterval(() => {
        console.log('\u001b[31m Building... \u001b[0m')
    }, 1000)

    const worker = exec('npm run build', (err, stdout, stderr) => {
        clearInterval(timer)
        if (!err) {
            console.log('%c' + stdout, 'color: green')
            console.log('%c' + stderr, 'color: red')
        }
    })
    worker.on('exit', code => {
        console.log('子进程已退出' + 'code: ' + code)
    })
    // gulp的任务需要一个返回值表示该任务已执行完毕, 解决gulp.watch只能执行一次的问题.
    return worker
}

exports.watch = () => {
    build()
    gulp.watch('src/**/**', build)
}
