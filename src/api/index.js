import request from '@/utils/request'

export function getHomeData() {
    return request.get('/api/home')
}

export function testApi() {
    return request.get('/test/test')
}

export function getHaoKanVideo(query) {
    return request({
        url: '/apiopen/api/getHaoKanVideo',
        method: 'get',
        params: query
    })
}

// 导入nodejs写的后端接口
// 获取全部商品数据
export function testNode(page) {
    return request({
        url: '/apiTest/api/getData',
        method: 'get',
        params: page
    })
}
// 搜索接口
export function searchProduct(query) {
    return request({
        url: '/apiTest/api/searchProduct',
        method: 'get',
        params: query
    })
}

// 删除接口
export function delProduct(query) {
    return request({
        url: '/apiTest/api/delProduct',
        method: 'get',
        params: query
    })
}

// 批量删除接口
export function batchDelProduct(query) {
    return request({
        url: '/apiTest/api/batchDelProduct',
        method: 'get',
        params: query
    })
}

// 上传头像接口
export function uploadAvater(query) {
    return request({
        url: '/apiTest/api/uploadAvater',
        method: 'post',
        params: query
    })

}

// 添加商品接口
export function addProduct(query) {
    return request({
        url: '/apiTest/api/addProduct',
        method: 'post',
        params: query
    })
}

// 修改商品的接口
export function updateProduct(query) {
    return request({
        url: '/apiTest/api/updateProduct',
        method: 'post',
        params: query
    })
}
