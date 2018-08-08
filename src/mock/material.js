import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 12
const Group = []
// const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@string("lower", 5)',
    date: '@date()',
    author: '@cname',
    reviewer: '@first',
    title: '@ctitle(5, 10)'
    // image_uri
  }))
  Group.push(Mock.mock({
    title: '@ctitle(3, 6)'
  }))
}
export default {
  getImgList: config => {
    return {
      items: List
    }
  },
  getGrouping: config => {
    return {
      data: Group
    }
  }
}
