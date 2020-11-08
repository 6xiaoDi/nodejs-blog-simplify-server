const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0  // chrome浏览器数量
let sum = 0  // 浏览器总数量

// 逐行读取
rl.on('line', (lineData) => {
    // lineData 每行数据（排除异常情况，如存在空行，不能算）
    if (!lineData) {
        return
    }

    // 记录总行数
    sum++

    const arr = lineData.split(' -- ')
    // 浏览器ua信息在数组的第三个元素
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        // 累加 chrome 的数量
        chromeNum++
    }
})
// 监听读取完成
rl.on('close', () => {
    console.log('chrome 占比：' + chromeNum / sum)
})

