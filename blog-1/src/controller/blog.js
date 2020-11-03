const  getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [
        {
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1604368609540,
            author:"zhangsan"
        },
        {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1604368769975,
            author:"lisi"
        }
    ]
}

const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1604368609540,
        author:"zhangsan"
    }
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