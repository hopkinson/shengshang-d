export const loadUserInfo = (callback) => {
    Vue.prototype.$fetch({method: 'POST', name: 'user/info'}).then(data => {
        //  写入存储
        // 4.保存信息 并 跳转
        let userInfo = Object.assign({}, data)
        Vue.prototype.$storage.set('userInfo', userInfo)
        callback(userInfo)
    })
}
export const go = (name, params) => {
    Vue.prototype.$router.open({name: name, params: params})
}
