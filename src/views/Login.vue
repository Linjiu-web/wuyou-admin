<template>
    <div class="login-container">
        <el-form :model="AdminForm" :inline="true" :rules="rules" label-width="70px">
            <h3 class="login-title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="AdminForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input v-model="AdminForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login-btn">
                <el-button type="primary" size="small" @click="submit">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
    name: 'Login',
    data() {
        return {
            AdminForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, trigger: ['blur', 'change'], message: '请输入用户名' }],
                password: [{ required: true, trigger: ['blur', 'change'], message: '请输入密码' }]
            }
        }
    },
    methods: {
        submit() {
            const username = this.AdminForm.username
            const password = this.AdminForm.password
            if (username == '' || password == '') {
                this.$message({
                    type: 'error',
                    message: '用户名或密码不能为空！'
                })
            } else {
                const token = Mock.Random.guid()
                Cookie.set('token', token)
                const userinfo = {
                    username: username,
                    password: password,
                }
                this.$store.commit('user/login', userinfo)
                this.$router.push('/home')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    // background-clip: padding-box;
    border: 1px solid #ccc;
    margin: 180px auto;
    padding: 35px 35px 15px 32px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;

    .login-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }

    .login-btn {
        margin: 10px auto 0px 105px;
    }
}
</style>
