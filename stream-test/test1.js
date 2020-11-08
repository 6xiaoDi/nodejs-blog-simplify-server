// 标准输入输出
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res)  // 最主要
//     }
// })
// server.listen(8050)

// 复制文件
const fs = require('fs')
const path = require('path')

// 两个文件名
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// 读取文件的stream对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的stream对象
const writeStream = fs.createWriteStream(fileName2)
// 执行拷贝,通过pipe
readStream.pipe(writeStream)

// 监视数据转存过程，即每一次读取的内容
readStream.on('data', chunk => {
    console.log('监听过程：'+chunk.toString())
})

// 数据读取完成,即拷贝完成
readStream.on('end', () => {
    console.log('copy done')
})