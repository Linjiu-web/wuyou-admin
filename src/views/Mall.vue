<template>
    <div class="app-container">
        <div>
            <el-table ref="table" v-loading="listLoading" :data="listData" size="small" border fit highlight-current-row
                style="width:100%;">
                <el-table-column label="序号" prop="id" align="center" width="60">
                    <template slot-scope="{row, $index}">
                        <span>{{ $index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title" align="left" min-width="200px">
                    <template slot-scope="{row}">
                        <span>{{ row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="时长" prop="duration" align="center" width="100px">
                    <template slot-scope="{row}">
                        <span>{{ row.duration }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="封面地址" prop="coverUrl" align="left" min-width="200px">
                    <template slot-scope="{row}">
                        <span>{{ row.coverUrl }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="视频地址" prop="playUrl" align="left" min-width="200px">
                    <template slot-scope="{row}">
                        <span>{{ row.playUrl }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="{row}">
                        <!-- <a target="_blank" :href="row.playUrl" style="color:blue;">观看视频</a> -->
                        <el-button size="mini" type="primary" @click="handleView(row)">观看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
            <template v-if="dialogVisible">
                <div v-if="itemDetail.playUrl" style="width:640px;height:400px;margin:0 auto;">
                    <video :src="itemDetail.playUrl" controls="controls" style="width:640px;height:400px;" />
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="default" @click="dialogVisible = false">
                        关闭
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getHaoKanVideo } from '@/api/index'

export default {
    name: 'Mall',
    components: {},
    data() {
        return {
            listData: [],
            listQuery: {
                page: 2,
                size: 9
            },
            dialogTitle: '观看视频',
            dialogVisible: false,
            listLoading: false,
            itemDetail: {}
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            getHaoKanVideo(this.listQuery).then(({ data }) => {
                console.log(data);
                this.listData = data.result.list
                this.listLoading = false
            })
        },
        handleView(item = {}) {
            this.itemDetail = Object.assign({}, item)
            this.dialogVisible = true
        }
    }
}
</script>

<style>

</style>
