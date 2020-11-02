const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    console.log('method: ', method)
    const url = req.url
    console.log('url: ', url)
    req.query = querystring.parse(url.split('?')[1])  // 解析 querystring
    console.log('query: ', req.query)
    res.end(JSON.stringify(req.query)); // 将 querystring 返回
})

server.listen(8000)
console.log('OK')