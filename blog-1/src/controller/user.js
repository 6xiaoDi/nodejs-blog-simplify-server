const login = (username, password) => {
    // 先使用假数据
    if (username === 'lisi' && password === '123') {
        return true;
    }
    return false;
}

module.exports = {
    login
}