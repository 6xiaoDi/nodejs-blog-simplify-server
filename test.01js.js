const http = require('http')

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // req 数据格式
        console.log('req content-type', req.headers['content-type']);
        // 接收数据（数据流的方式）
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        // 数据流完，触发end事件
        req.on('end', () => {
            console.log(postData)
            // 在这里返回，因为是异步
            res.end(
                'hello world'
            )
        })
    }
})

server.listen(8000)
console.log('OK')