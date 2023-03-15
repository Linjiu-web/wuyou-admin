<template>
    <div class="user-container">
        <div class="manage-header">
            <!-- 新增用户按钮 -->
            <div class="adduser" style="margin-bottom: 10px;">
                <el-button size="small" type="primary" @click="handleAdd">新增用户</el-button>
            </div>
            <!-- 搜索区域 -->
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="keywords"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 新增（编辑）用户对话框 -->
        <div class="userDialog">
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
                <el-form :model="formModel" :rules="rules" class="myform" :inline="true" ref="myform" label-width="100px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formModel.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gendle">
                        <el-radio v-model="formModel.gendle" :label='1'>男</el-radio>
                        <el-radio v-model="formModel.gendle" :label='0'>女</el-radio>
                    </el-form-item>
                    <el-form-item label="省份" prop="province">
                        <el-select v-model="formModel.province" placeholder="请选择省份">
                            <el-option label="上海" value="上海"></el-option>
                            <el-option label="北京" value="北京"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthDate">
                        <el-date-picker v-model="formModel.birthDate" type="date" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" placeholder="选择日期" class="el-block">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="formModel.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="default" @click="dialogVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="handleSubmit">提 交</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 展示信息的表格 -->
        <div class="common-table">
            <el-table ref="tableRef" stripe height="90%" :data="listData" style="width: 100%" highlight-current-row border
                fit :default-sort="{ prop: 'id' }" @select-all="handleSelectAll" @select="handleSelectOne">
                <el-table-column type="selection" width="40" :selectable="selectable">
                </el-table-column>
                <el-table-column prop="id" label="序号" width="80" sortable>
                </el-table-column>
                <el-table-column label="头像" width="160">
                    <template slot-scope="scope">
                        <el-image fit="contain" style="width: 50px;height: 50px;" :src="require('@/assets/user1.jpg')"
                            :preview-src-list="[require('@/assets/user1.jpg')]" v-if="scope.$index == 1" />
                        <el-image fit="fill" :src="scope.row.avatar"
                            :preview-src-list="scope.row.avatar ? [scope.row.avatar] : []" v-else></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="gendle" label="性别" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.gendle == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birthDate" label="出生日期" width="150" sortable>
                </el-table-column>
                <el-table-column prop="phone" label="联系电话" width="150">
                </el-table-column>
                <el-table-column prop="province" label="地址">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleDel(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSize"
                    @current-change="handlePage" :current-page="currentPage" :page-size="pageSize">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { testApi } from '@/api/index'
export default {
    name: 'User',
    components: {},
    data() {
        return {
            dialogVisible: false,
            dialogTitle: '',
            tableData: [],    //axois获取到的数组
            formModel: {},
            total: 0,       //总条数
            currentPage: 1,    //开始是第1页
            pageSize: 10,       //每页展示10条数据
            keywords: '',    //搜索的关键字
            filterDataShow: [],    //储存符合条件的数据
            userForm: {},
            ruleForm: {
                name: '',
                gendle: 1,
                birthDate: '',
                adress: '',
                phone: '',
                province: ''
            },
            rules: {
                name: [{ required: true, trigger: ['blur', 'change'], message: '必填' }],
                gendle: [{ required: true, trigger: ['blur', 'change'], message: '必选' }],
                birthDate: [{ required: true, trigger: ['blur', 'change'], message: '必选' }],
                phone: [{ required: true, trigger: ['blur', 'change'], message: '必填' }],
                province: [{ required: true, trigger: ['blur', 'change'], message: '必选' }],
                adress: [{ required: true, trigger: ['blur', 'change'], message: '必填' }]
            },
            // 当前列表
            listData: [],
            // 已选内容
            checkedKeys: [],
            checkedList: [],
            symbol: true
        }
    },
    methods: {
        //新增按钮
        handleAdd() {
            this.setFormModel()
        },
        //修改按钮
        handleEdit(row) {
            this.setFormModel(row)
        },
        //当点击修改（新增）按钮时设置表单数据
        setFormModel(resModel = {}) {
            this.formModel = Object.assign({}, this.ruleForm, resModel)
            this.dialogTitle = this.formModel.id ? '编辑用户' : '新增用户'
            this.dialogVisible = true
            this.setformRules(resModel)
        },
        //设置验证规则
        setformRules() {
            this.$nextTick(() => {
                this.$refs.myform.clearValidate()
            })
        },
        //删除按钮
        handleDel(row, index) {
            this.$confirm('确定要删除用户【<span style="color: red">' + row.name + '</span>】吗？', '提示', {
                dangerouslyUseHTMLString: true,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                closeOnHashChange: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.filterDataShow.splice(((this.currentPage - 1) * this.pageSize + index), 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!  ' + row.name,
                })
                this.total = this.filterDataShow.length
                this.setCurrentPageData()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除!'
                })
            })
        },
        //提交功能的实现
        handleSubmit() {
            this.$refs.myform.validate(validate => {
                if (validate) {
                    if (this.formModel.id) {
                        const index = this.filterDataShow.findIndex(item => {
                            return item.id === this.formModel.id
                        })
                        this.filterDataShow.splice(index, 1, this.formModel)
                    } else {
                        const newId = this.filterDataShow[this.filterDataShow.length - 1].id + 1
                        const newItem = Object.assign({}, this.formModel, { id: newId })
                        console.log(this.formModel);
                        this.filterDataShow.push(newItem)
                    }
                    this.dialogVisible = false
                    this.total = this.filterDataShow.length
                    this.setCurrentPageData()
                } else {
                    this.$focusError()
                }
            })
        },
        handlePage(val) {
            this.currentPage = val
            this.setCurrentPageData()
        },
        handleSize(val) {
            this.currentPage = 1;
            this.pageSize = val
            this.setCurrentPageData()
        },
        //查询按钮
        onSubmit() {
            this.searchResource(this.keywords)
        },
        //输入框内输入文字表格显示相关内容
        searchResource() {
            this.currentPage = 1;
            const filterkeywords = this.keywords.trim()    //trim()函数的作用是清除字符串前后两端的空白字符
            const filterReasource = this.tableData.filter(item => {
                if (item.name.includes(filterkeywords)) {
                    return item
                }
            })
            this.filterDataShow = filterReasource     //将符合条件的数据赋给show展示出来
            this.setCurrentPageData()
        },
        //获取用户列表
        getList() {
                testApi().then(({ data }) => {
                    console.log('testApi', data)
                    this.tableData = data.userData;
                    this.tableData.forEach((item) => {
                        item.avatar = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                    })
                    this.total = data.userData ? data.userData.length : 0
                    this.searchResource()
                }).catch(err => {
                    console.log(err);
                })
        },
        // 当前页面数据
        setCurrentPageData() {
            this.listData = this.filterDataShow.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            // 设置勾选
            this.$nextTick(() => {
                this.handleSelectSet()
            })
        },

        // 配置是否可勾选
        selectable(row, index) {
            let bool = true
            if (index % 4 === 1) {
                bool = false
            }
            return bool
        },
        // 设置勾选
        handleSelectSet(fieldKey = 'id') {
            if (!this.$refs.tableRef) return
            this.listData.forEach(item => {
                const findex = this.checkedKeys.indexOf(item[fieldKey])
                if (findex !== -1) {
                    this.$refs.tableRef.toggleRowSelection(item, true)
                } else {
                    this.$refs.tableRef.toggleRowSelection(item, false)
                }
            })
        },
        // 全选
        handleSelectAll(selection, fieldKey = 'id') {
            if (selection.length) {
                selection.forEach(item => {
                    const findex = this.checkedKeys.indexOf(item[fieldKey])
                    if (findex === -1) {
                        this.checkedKeys.push(item[fieldKey])
                        this.checkedList.push(item)
                    }
                })
            } else {
                this.listData.forEach(item => {
                    const findex = this.checkedKeys.indexOf(item[fieldKey])
                    if (findex !== -1) {
                        this.checkedKeys.splice(findex, 1)
                        this.checkedList.splice(findex, 1)
                    }
                })
            }
        },
        // 单选
        handleSelectOne(selection, row, fieldKey = 'id') {
            const selectionKeys = []
            selection.forEach(item => {
                selectionKeys.push(item[fieldKey])
            })
            const sindex = selectionKeys.indexOf(row[fieldKey])
            const findex = this.checkedKeys.indexOf(row[fieldKey])
            if (sindex !== -1) {
                if (findex === -1) {
                    this.checkedKeys.push(row[fieldKey])
                    this.checkedList.push(row)
                }
            } else {
                if (findex !== -1) {
                    this.checkedKeys.splice(findex, 1)
                    this.checkedList.splice(findex, 1)
                }
            }
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.myform {
    margin: 0 15px;
}

.el-block {
    display: block;
    width: 100%;
}

.user-container {
    height: 90%;
}

.common-table {
    height: calc(100% - 2px);
    position: relative;

    .pagination {
        position: absolute;
        bottom: 15px;
        right: 20px;
    }
}

.manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
