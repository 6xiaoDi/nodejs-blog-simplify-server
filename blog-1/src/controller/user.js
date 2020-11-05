const { exec } = require('../db/mysql')

const login = (username, password) => {

    const sql = `
        select username, realname from users where username='${username}' and password='${password}'
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        // 兼容性处理，为空则返回空对象
        return rows[0] || {}
    })
}


module.exports = {
    login
}