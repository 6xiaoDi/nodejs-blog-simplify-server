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

module.exports = {
    getList
}