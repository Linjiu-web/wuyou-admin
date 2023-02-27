export default {
    namespaced: true,
    state: {
        userinfo: {}
    },
    mutations: {
        // 登录
        login(state, value)  {
            state.userinfo = Object.assign({}, value)
            localStorage.setItem('userdata', JSON.stringify(value))
            
        },
        // 退出
        loginout(state) {
            state.userinfo = {}
            localStorage.removeItem('userdata')
        },
        // 载入
        load(state) {
            const data1 = localStorage.getItem('userdata') || ''
            const data = data1 ? JSON.parse(data1) : {}
            state.userinfo = data
        }
    } 
}