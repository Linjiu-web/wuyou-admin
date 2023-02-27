import axios from 'axios'

const serve = axios.create({
    baseURL: '',
    timeout: 5000
})

//请求拦截器
serve.interceptors.request.use(
    config => {
        return config
    }, error =>{
        return Promise.reject(error, '请求出错了！')
    }
)

//响应拦截器
serve.interceptors.response.use(
    config => {
        return config
    }, error => {
        return Promise.reject(error, '响应出错了！')
    }
)

export default serve
