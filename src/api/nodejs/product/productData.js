const express = require('express')
// 引入express路由组件
const router = express.Router()
const multer = require('multer')
const path = require('path')

// 导入数据库模块
const db = require('../../mysql/index')

// 获取商品全部数据
router.get('/getData', (req, res) => {
    // 前端点击第几页
    const page = Number(req.query.page)
    const pageData = (page - 1) * 8
    // 创建sql语句, 获取所有数据
    const getDataAll = 'select * from product'
    // 获取前端传回来的第page页数据
    const getDataSql = 'select * from product limit ?, 8'
    // 执行sql语句
    db.query(getDataAll, (err, result) => {
        if (err) return res.send({ status: 405, message: err.message })
        if (result.length > 0) {
            db.query(getDataSql, pageData, (err, results) => {
                if (err) return res.send({ status: 405, message: err.message })
                if (results.length > 0) {
                    return res.send({
                        status: 200,
                        data: results,
                        pageSize: 8,
                        total: result.length
                    })
                }
            })
        }
    })
})

// 搜索商品接口
router.get('/searchProduct', (req, res) => {
    const search = req.query.name
    const searchSql = "select * from product where concat(`p_price`, `descs`, `p_id`, `p_name`, `create_time`) like '%"+ search +"%'"
    db.query(searchSql, (err, results) => {
        if (err) return res.send({ status: 405, message: err.message })
        if (results.length > 0) {
            res.send({
                status: 200,
                data: results,
                pageSize: 8,
                total: results.length
            })
        }
        if (results.length <= 0) res.send({ status: 405, message: '暂无数据' })
    })
})

// 删除商品接口
router.get('/delProduct', (req, res) => {
    var id = req.query.id
    const delSql = 'delete from product where p_id = ?'
    db.query(delSql, id, (err, result) => {
        if(err) res.send({ status: 405, message: err.message })
        if(result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '操作失败'
            })
        }
    })
})

// 批量删除接口
router.get('/batchDelProduct', (req, res) => {
    const ids = req.query.ids
    const sql = `delete from product where p_id in (${ids})`
    db.query(sql, null, (err, result) => {
        if(err) res.send({ status: 405, message: err.message })
        if(result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        }else {
            res.send({
                status: 405,
                msg: '删除失败'
            })
        }     
    })
})

// 上传头像
// 获取保存图片的路径
let filePath = path.join(__dirname, '../', '../../assets/images')
var upload = multer({
    // 设置文件存储路径
    storage: multer.diskStorage({
        // 保存图片的路径方法
        destination: (req, file, cb) => {
            cb(null, filePath) // 保存图片的路径
        },
        // 解决中文乱码问题
        fileFilter(req, file, cb) {
            file.originalname = Buffer.from(file.originalname, "latin1").toString("utf-8")
            cb(null, true)
        },
        // 保存图片的名称方法
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        },
    })
})
router.post('/uploadAvater', upload.single('file'), (req, res) => {
    res.json({
        url: `http://127.0.0.1:3007/images/${req.file.filename}`
    });
})

// 添加商品接口
router.post('/addProduct', (req, res) => {
    delete req.query.data.p_id
    const addSql = 'insert into product set ?'
    db.query(addSql, req.query.data, (err, result) => {
        if(err) return res.send(err)
        if(result.affectedRows > 0){
            return res.send({
                status: 200,
                msg: '添加成功！'
            })
        }
        return res.send({status: 405, msg: '添加失败！'})
    })
})

// 修改商品接口
router.post('/updateProduct', (req, res) => {
    const sql = 'update product set ? where p_id = ?'
    db.query(sql, [req.query.data, req.query.data.p_id], (err, result) => {
        if(err) return res.send(err)
        if(result.affectedRows > 0) {
            return res.send({
                status: 200,
                type: 'success',
                msg: '修改成功！'
            })
        }
        res.send({status: 405, type: 'default', msg: '修改失败！'})
    })
})

module.exports = router
