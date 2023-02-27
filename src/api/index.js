import request from '@/utils/request'

export function getHomeData() {
    return request.get('/api/home')
}

export function testApi() {
    return request.get('/test/test')
}

export function getHaoKanVideo(query) {
    return request({
        url: 'https://api.apiopen.top/api/getHaoKanVideo',
        method: 'get',
        params: query
    })
}
