<template>
    <div>
        <el-dialog :title="dialogTitle" :before-close="handleclose" width="50%" center :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item v-if="ruleForm.p_id" label="商品编号" prop="p_id">
                    <el-input  :disabled="true" v-model="ruleForm.p_id" width="100px"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="p_name">
                    <el-input v-model="ruleForm.p_name" width="100px"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="p_price">
                    <el-input type="number" v-model="ruleForm.p_price"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="create_time">
                    <el-date-picker v-model="ruleForm.create_time" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品图片" prop="p_image">
                    <UploadAvater></UploadAvater>
                </el-form-item>
                <el-form-item label="商品描述" prop="descs">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.descs" width="100px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleclose">取 消</el-button>
                <el-button type="primary" @click="submitForm()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import UploadAvater from "@/components/uploadAvater/UploadAvater"
import { addProduct, updateProduct } from '@/api/index'
import moment from 'moment'
export default {
    props: {
        productList: {
            type: Function
        }
    },
    name: 'DialogForm',
    components: { UploadAvater },
    data() {
        return {
            dialogTitle: '',
            dialogFormVisible: false,
            ruleForm: {
                p_id:'',
                p_name: '',
                p_price: '',
                create_time: '',
                descs: ''
            },
            rules: {
                p_name: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }],
                p_price: [{ required: true, message: '请输入商品价格', trigger: ['blur', 'change'] }],
                create_time: [{ required: true, message: '请选择创建时间', trigger: ['blur', 'change'] }],
                // p_image: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }],
                descs: [{ required: true, message: '请输入商品描述', trigger: ['blur', 'change'] }],
            }
        };
    },
    methods: {
        moment,
        // 关闭dialog的回调
        handleclose() {
            this.ruleForm = {}
            this.$refs.ruleForm.resetFields()
            this.dialogFormVisible = false
        },
        // 点击提交表单的回调
        submitForm() {
            this.$refs.ruleForm.validate(validate => {
                if(validate) {
                    // 如果存在id则调用修改接口
                    if(this.ruleForm.p_id) {
                        const data = Object.assign({}, this.ruleForm, this.$store.state.product)
                        // 处理时间格式
                        data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')
                        // 处理图片地址
                        data.p_image = data.p_image.substr(22)
                        updateProduct({ data }).then(({ data }) => {
                            this.$message({
                                type: data.type,
                                message: data.msg
                            })
                        })
                        this.dialogFormVisible = false
                        this.productList(1)
                    } else {  // 没有id调用新增接口
                        const data = Object.assign({}, this.ruleForm, this.$store.state.product)
                        // 处理时间格式
                        data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')
                        // 处理图片地址
                        data.p_image = data.p_image.substr(22)
                        addProduct({ data }).then(({ data }) => {
                            console.log(data);
                            this.$message({
                                type: data.type,
                                message: data.msg
                            })
                        })
                        this.dialogFormVisible = false
                        this.productList(1)
                    }
                }
            })
        }
    }
};
</script>

<style></style>
