const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: '49.233.209.24',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '49.233.209.24',
        password : '123456'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '49.233.209.24',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '49.233.209.24',
        password : '123456'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}