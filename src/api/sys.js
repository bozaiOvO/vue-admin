import request from '@/utils/request'

function userList(query) {
  return request({
    url: '/api/adminUser/list',
    method: 'get',
    params: query
  })
}
function menuList(query) {
  return request({
    url: '/api/menu/list',
    method: 'get',
    params: query
  })
}
export default{
  userList,
  menuList
}
