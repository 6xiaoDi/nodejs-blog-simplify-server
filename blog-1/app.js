const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))  // 一天
    console.log('d.toGMTString() is ', d.toGMTString())
    // cookie的一种GMT时间格式
    return d.toGMTString()
}

// session 数据
// const SESSION_DATA = {};

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

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3 （兼容性处理防止为空）
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        // console.log(key, val);
        req.cookie[key] = val
    })

    // 解析 session
    // let needSetCookie = false  // 判断是否需要设置cookie
    // let userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {};
    //     }
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    // 解析 session （使用 redis）
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }

    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    // 处理postdata
    })
    .then(postData => {
        req.body = postData;

        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }

            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 user 路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }

            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, {"Content-tupe": "text/plain"}); // 写上状态码404。修改Head为 "text/plain"，即纯文本
        res.write("404 Not Found\n"); // 写入内容
        res.end();
    });
}

module.exports = serverHandle;
// process.env.NODE_ENV