const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end (
            JSON.stringify(blogData)
        )
        return;
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
}

module.exports = serverHandle;
// process.env.NODE_ENV