const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    const resData = {
        name: '6xiaodi',
        site: 'https://me.csdn.net/u013946061'
    }

    res.end(
        JSON.stringify(resData)
    )
}

module.exports = serverHandle