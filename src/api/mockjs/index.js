import Mock from 'mockjs'
import homeData from './data/homeData'
import userData from './data/userData'

    //用户列表数据
    Mock.mock('/test/test', userData.getUserData)

    //主页数据
    Mock.mock('/api/home', homeData.getHomeData)
