<template>
    <div>
        <el-upload class="avatar-uploader" action="/apiTest/api/uploadAvater" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="this.$store.state.product.p_image" :src="this.$store.state.product.p_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'UploadeAvater',
    components: {},
    data() {
        return {
            // imageUrl: ''
        }
    },
    methods: {
        // 上传成功的回调
        handleAvatarSuccess(res, file) {
            this.$store.commit('product/updateImgUrl', res.url)
            this.imageUrl = URL.createObjectURL(file.raw);
            // this.$message({
            //     type: 'success',
            //     message: '上传成功！'
            // })
            // console.log(res.url);
        },
        // 上传文件格式不正确的回调
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
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
}

.avatar {
    width: 128px;
    height: 128px;
    display: block;
}
</style>
