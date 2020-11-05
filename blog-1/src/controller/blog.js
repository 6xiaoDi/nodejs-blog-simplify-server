const { exec } = require('../db/mysql')

const  getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        // 查询的是单条数据
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    console.log('newBlog blogData...', blogData);

    return {
        id : 3 // 表示新建博客，插入到数据表里面的id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content author 属性
    console.log('updateBlog  blog...', id, blogData);
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
}