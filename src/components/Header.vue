<template>
    <div class="header-container">
        <div class="l-header">
            <el-button style="margin-right: 20px;" @click="handleMenu" class="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{
                    item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="myinfo-dialog">
            <el-dialog title="个人信息" width="30%" center :visible.sync="dialogFormVisible">
                <el-upload style="width: 120px; margin-left: 33%;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form :inline="true" :model="form" style="margin-top: 20px;">
                    <el-form-item label="用户名" label-width="80px">
                        <el-input v-model="form.name" width="100px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="r-header">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="@/assets/user1.jpg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="myinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import MyInfo from 'MyInfo'
export default {
    name: 'Header',
    data() {
        return {
            imageUrl: '',
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        loginout() {
            this.$confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancleButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('user/loginout')
                this.$router.push('/login')
            }).catch(err => {
                console.log(err);
            })

        },
        myinfo() {
            this.dialogFormVisible = true
        },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: #fff;
        size: 14px;
        margin-left: 10px;
    }

    .l-header {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }

    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .avatar-uploader .el-upload {
    border: 1px dashed #f56703;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>
