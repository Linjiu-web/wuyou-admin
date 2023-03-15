<template>
    <div>
        <!-- 产品搜索区域 -->
        <div class="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="产品名称">
                    <el-input v-model="formInline.user" size="small" placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="添加时间">
                    <el-date-picker v-model="formInline.date" size="small" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="group">
                <el-button size="small" type="warning" icon="el-icon-plus" @click="handleAdd">添加商品</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDeleteAll">批量删除</el-button>
            </div>
        </div>

        <!-- 产品列表 -->
        <div class="content">
            <!-- 新增（编辑）商品对话框 -->
            <DialogForm ref="DialogForm" :productList="productList"></DialogForm>
            <!-- 商品表格 -->
            <el-table :data="tableData" border header-cell-class-name="table-header" cell-class-name="table-cell"
                style="width: 100%" @selection-change="handleSelect" @select-all="handleSelect" @select="handleSelect">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="p_id" label="商品编号" width="100">
                </el-table-column>
                <el-table-column prop="p_name" label="商品名称" width="120">
                </el-table-column>
                <el-table-column prop="p_price" label="商品价格" width="120">
                </el-table-column>
                <el-table-column prop="create_time" show-overflow-tooltip label="创建时间">
                    <template slot-scope="scope">
                        <span>{{ moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="p_image" label="商品图片">
                    <template slot-scope="scope">
                        <el-image style="height: 50px; width: 80px;" :src="scope.row.p_image"
                            :preview-src-list="scope.row.p_image ? [scope.row.p_image] : []"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="descs" show-overflow-tooltip label="商品描述">
                </el-table-column>
                <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" icon="el-icon-delete" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <div class="pagination">
                <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination'
import DialogForm from '@/components/Dialog/DialogForm'
import { testNode, searchProduct, delProduct, batchDelProduct } from '@/api/index'
import moment from 'moment'
export default {
    components: { Pagination, DialogForm },
    data() {
        return {
            value1: '',
            formInline: {
                user: '',
                date: ''
            },
            tableData: [],
            formModel: {},
            total: 10,
            pageSize: 1,
            current: 1,
            ids: [], // 储存多选的id
        }
    },
    methods: {
        moment,
        // 查询的提交按钮
        onSubmit() {
            this.handleSerach(this.formInline.user)
        },
        // 新增按钮
        handleAdd() {
            this.$store.commit('product/updateImgUrl', '')
            this.setFormModel()
        },
        // 查询按钮
        handleSerach(name) {
            if (name) {
                searchProduct({ name }).then(({ data }) => {
                    console.log('---data--', data);
                    if (data.status === 200) {
                        this.tableData = data.data
                        this.tableData.forEach(p => {
                            p.p_image = 'http://127.0.0.1:3007/' + p.p_image
                        })
                        this.pageSize = data.pageSize
                        this.total = data.total
                    } else { // 暂无数据
                        this.total = 1
                        this.tableData = []
                        this.pageSize = 1
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                this.productList(1)
            }
        },
        // 编辑按钮
        handleEdit(index, row) {
            this.$store.commit('product/updateImgUrl', row.p_image)
            this.setFormModel(row)
        },
        // 点击新增或编辑按钮的回调
        setFormModel(resModel = {}) {
            this.$refs.DialogForm.ruleForm = Object.assign({}, this.$refs.DialogForm.ruleForm, resModel)
            this.$refs.DialogForm.dialogFormVisible = true
            this.$refs.DialogForm.dialogTitle = this.$refs.DialogForm.ruleForm.p_name ? '编辑商品' : '新增商品'
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteItem(row.p_id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 批量删除按钮
        handleDeleteAll() {
            let idsStr = this.ids.join(',') // join 对象转换为字符串
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 请求批量删除接口
                this.batchDelItem(idsStr)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 点击单个选项
        handleSelect(select) {
            let arr = []
            select.forEach(element => {
                arr.push(element.p_id)
            });
            this.ids = arr
        },
        CurrentChange(val) {
            this.current = val
            this.productList(val)
        },
        // 获取商品数据
        productList(page) {
            testNode({ page }).then(({ data }) => {
                this.tableData = data.data
                this.tableData.forEach(p => {
                    p.p_image = 'http://127.0.0.1:3007/' + p.p_image
                })
                this.pageSize = data.pageSize
                this.total = data.total
            }).catch(err => {
                console.log(err);
            })
        },
        // 删除商品接口
        deleteItem(id) {
            delProduct({ id }).then(({ data }) => {
                console.log('res', data);
                if (data.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新渲染数据
                    // --如果当前是在最后一页的最后一条数据-删除后-获取上一页的数据
                    // 判断 this.total的总数目
                    if (this.total % this.pageSize === 1) {
                        this.current = this.current - 1 > 0 ? this.current - 1 : 1
                    }
                    this.productList(this.current)
                }
            }).catch(err => { console.log(err) })
        },
        // 批量删除接口
        batchDelItem(ids) {
            batchDelProduct({ ids }).then(({ data }) => {
                console.log('res---', data);
                if (data.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //  ----重新渲染数据---
                    //  如果在最后一页操作 选中（删除）的条数刚好等于最后一页的条数 
                    //  1.首先判断当前是否在最后一页 获取最大页码数和当前页码数做比较
                    //  最大页码数获取验 Math.ceil()向上取整 total：总条数 pagesize：一页展示多少条
                    const maxPage = Math.ceil(this.total / this.pageSize)
                    //  2.获取选中的条数，与最后一页的条数
                    const checkedNum = this.ids.length  //选中的条数
                    const lastPageNum = this.total % this.pageSize == 0 ? this.pageSize : this.total % this.pageSize //最后一页的条数
                    if (maxPage === this.current) {
                        if (checkedNum === lastPageNum) {
                            // 当前页码减一
                            this.current = this.current - 1 > 0 ? this.current - 1 : 1
                        }
                    }
                    this.productList(this.current)
                }
            }).catch(err => { console.log(err) })
        }
    },
    mounted() {
        this.productList(1)
    }
}
</script>

<style lang="less" scoped>
.header {
    padding: 10px;
    margin-bottom: 20px;

    .el-form-item {
        margin-bottom: 16px;
    }

    .group {
        border: 1px solid #eee;
        padding: 8px;
    }
}

.content {
    height: calc(100% - 2px);
    position: relative;

    /deep/ .table-header {
        color: #333;
        text-align: center;
    }

    /deep/ .table-cell {
        text-align: center;
    }

    .pagination {
        padding: 10px;
    }
}
</style>
