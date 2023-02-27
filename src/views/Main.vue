<template>
    <div>
        <el-container>
            <!-- 左侧菜单栏 -->
            <el-aside width='auto'>
                <Aside />
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <Header />
                </el-header>
                <!-- 中间路由变化区域 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
 
<script>

import Aside from '@/components/Aside'
import Header from '@/components/Header'

export default {
    name: 'Main',
    components: { Aside, Header },
    data() {
        return {}
    }
}
</script>

<style lang="less">
* {
    padding: 0px;
    margin: 0px;

    .el-header {
        padding: 0px;
    }
}
</style>
