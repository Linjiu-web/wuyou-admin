<template>
    <div>
        <el-pagination 
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 100
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    methods: {
        // 改变当前页
        handleCurrentChange(val) {          
            // console.log(`当前页: ${val}`);
            this.$emit('CurrentChange', val)
        }
    },
    data() {
        return {
            currentPage: 1
        }
    }
}
</script>
