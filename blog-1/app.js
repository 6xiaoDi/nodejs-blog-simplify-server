const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // get 请求没有post data
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // 数据格式不是json
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        // 是post请求
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            // 没有数据
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 处理postdata
    getPostData(req).then(postData => {
        req.body = postData;

        // 处理 blog 路由
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end (
        //         JSON.stringify(blogData)
        //     )
        //     return;
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 user 路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end (
                JSON.stringify(userData)
            )
            return;
        }

        // 未命中路由，返回404
        res.writeHead(404, {"Content-tupe": "text/plain"}); // 写上状态码404。修改Head为 "text/plain"，即纯文本
        res.write("404 Not Found\n"); // 写入内容
        res.end();
    });
}

module.exports = serverHandle;
// process.env.NODE_ENV