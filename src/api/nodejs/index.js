const express = require('express')
const app = express()

const path=require("path");

// 托管静态资源
app.use(express.static(path.join(__dirname,'../../assets')))
// 导入并配置cors中间件（解决跨域问题）
const cors = require('cors')
app.use(cors())

const productData = require('./product/productData')
app.use('/api', productData)

app.listen(3007)
