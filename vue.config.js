const path = require('path');
module.exports =  {
    lintOnSave: false, // 关闭eslint校验
    devServer: {
        proxy: {
            '/apijuhe': {
                target: 'http://apis.juhe.cn', //目标主机地址
                changeOrigin: true,  //是否启动代理
                secure: false,
                pathRewrite: {
                    '^/apijuhe': ''
                }
            },
            '/apiopen': {
                target: 'https://api.apiopen.top',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/apiopen': ''
                }
            },
            '/apiTest': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/apiTest': ''
                }
            }
        }
    }
}