const path = require('path') // 引用path模块
module.exports = {  // 这里是commrnt.js语法
    // 入口文件
    entry: "./dist/index.js",
    // 打包后的出口文件
    output: {
        // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
        path: path.resolve(__dirname, 'build'),
        // 输出的文件名称
        filename: 'build.js',
    },
    // 使用开发模式打包
    mode: "development"
}
