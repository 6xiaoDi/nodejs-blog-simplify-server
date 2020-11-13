const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    username = escape(username);
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    console.log('sql is', sql)
    const rows = await exec(sql);
    return rows[0] || {};
    // return exec(sql).then(rows => {
    //     // 兼容性处理，为空则返回空对象
    //     return rows[0] || {}
    // })
}


module.exports = {
    login
}