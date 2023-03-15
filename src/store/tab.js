export default {
    mutations: {
        //修改的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // 判断添加的数据是不是首页
            if (val.name !== 'home') {
                const index = state.tabList.findIndex( item => item.name === val.name )
                // 判断添加的数据是否存在,如果不存在findindex返回的值为-1
                if (index === -1) {
                    state.tabList.push(val)
                }
            }
        }
    },

    state: {
        isCollapse: false ,//控制菜单收起
        //面包屑的数据
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home'
            },
        ]
    }

}
