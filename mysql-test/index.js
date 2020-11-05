const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: '49.233.209.24',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users;';
const sql = `update users set realname='李四2' where username='lisi'`;
// const sql = `insert into blogs (title, content, createtime, author) values ('标题C', '内容C',1546871704408, 'zhangsan')`

// 异步
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()