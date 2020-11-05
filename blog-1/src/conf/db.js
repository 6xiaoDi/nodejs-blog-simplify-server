const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: '49.233.209.24',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Mysql_2018',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}