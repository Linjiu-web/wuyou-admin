import Mock from 'mockjs'

const List = []
const count = 60

export default {
    getUserData: () => {
        for (let i = 0; i < count; i++) {
            List.push(
                Mock.mock({
                    id: Mock.Random.increment(),
                    name: Mock.Random.cname(),
                    province: Mock.mock('@county(true)'),
                    'age|18-60': 1,
                    birthDate: Mock.Random.date(),
                    gendle: Mock.Random.integer(0, 1),
                    phone: /1\d{10,10}/
                })
            )
        }
        return {
            userData: List
        }
        // return {
        //     code: 200,
        //     'list|60': [{
        //         id: '@increment',
        //         name: '@cname',
        //         birthDate: '@date',
        //         gendle: '@integer(1, 0)',
        //         age: '@integer(20, 30)',
        //         phone: /1\d{10,10}/,
        //         province: '@county(true)',
        //         address: '@county(true)'
        //     }]
        // }
    }
}