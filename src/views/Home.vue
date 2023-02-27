<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right: 10px;">
                <el-card class="box-card">
                    <div class="user">
                        <img src="@/assets/user1.jpg">
                        <div class="userinfo">
                            <p class="name">{{ this.$store.state.user.userinfo.username || '未登录' }}</p>
                            <p class="info">超级管理员</p>
                        </div>
                    </div>
                    <div class="logninfo">
                        <p>上次登录时间：<span>2022-11-13</span></p>
                        <p>上次登录地点：<span>四川成都</span></p>
                    </div>
                </el-card>
                <el-card style="margin-top: 20px; height: 460px">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key" />
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="padding-left: 10px;">
                <div class="card">
                    <el-card v-for="item in TuIcon" :key="item.index" :body-style="{ display: 'flex', padding: 0 }">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="decs">
                            <p class="price">￥{{ item.value }}</p>
                            <p class="nam">{{ item.nam }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height: 280px;">
                    <!-- 折线图 -->
                    <div ref="echarts1" style="height: 280px; width: 820px"></div>
                </el-card>
                <div class="twoCard">
                    <el-card style="height: 260px;">
                        <!-- 柱状图 -->
                        <div ref="echarts2" style="height: 260px; width: 360px;"></div>
                    </el-card>
                    <el-card style="height: 260px;">
                        <!-- 饼图 -->
                        <div ref="echarts3" style="height: 260px; margin-top: -20px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { getHomeData } from '@/api'

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '品牌',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            TuIcon: [{
                nam: '今日支付订单',
                value: 1234,
                icon: 'success',
                color: '#00CC33'
            }, {
                nam: '今日收藏订单',
                value: 5678,
                icon: 'star-on',
                color: '#ffb980'
            }, {
                nam: '今日未支付订单',
                value: 1346,
                icon: 's-goods',
                color: '#0099FF'
            }, {
                nam: '今日支付订单',
                value: 1234,
                icon: 'success',
                color: '#00CC33'
            }, {
                nam: '今日收藏订单',
                value: 5678,
                icon: 'star-on',
                color: '#ffb980'
            }, {
                nam: '今日未支付订单',
                value: 1346,
                icon: 's-goods',
                color: '#0099FF'
            }]
        }
    },
    mounted() {
        //加载用户数据
        this.$store.commit('user/load')

        //获取主页后端数据
        getHomeData().then(({ data }) => {
            this.tableData = data.data.tableData

            //折线图
            const echarts1 = echarts.init(this.$refs.echarts1)
            //指定图表的配置项和数据
            var echarts1Option = {}
            //处理xAxis(横坐标)的数据
            const { lineData, barData, pieData } = data.data
            const xAxis = Object.keys(lineData.data[0])
            echarts1Option.xAxis = {
                data: lineData.date
            }
            echarts1Option.yAxis = {}
            echarts1Option.tooltip = {}
            echarts1Option.legend = {
                data: xAxis
            }
            echarts1Option.series = []
            xAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    type: 'line',
                    data: lineData.data.map(item => item[key])
                })
            })
            echarts1.setOption(echarts1Option)

            // 柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            var echarts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: barData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        data: barData.map(item => item.new),
                        type: 'bar',
                        name: '新增用户'
                    },
                    {
                        data: barData.map(item => item.active),
                        type: 'bar',
                        name: '活跃用户'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)

            // 饼图
            const echarts3 = echarts.init(this.$refs.echarts3)
            var echarts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: pieData,
                        type: 'pie'
                    }
                ],
            }
            echarts3.setOption(echarts3Option)
        })
        console.log(this.$store.state, 'userinfo')
    }
}
</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: #cccccc 1px solid;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .info {
            color: #999999;
        }
    }
}

.logninfo {
    p {
        font-size: 14px;
        color: #999999;
        line-height: 28px;
    }

    span {
        margin-left: 60px;
        color: #666666;
    }
}

.card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    // padding: 0px;
    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        line-height: 80px;
    }

    .decs {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .nam {
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
        padding: 0px;
    }
}

.twoCard {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}
</style>
