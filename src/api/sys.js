import request from '@/utils/request'

function userList(data) {
  return request({
    url: '/api/adminUser/list',
    method: 'get',
    data
  })
}
function menuList(data) {
  return request({
    url: '/api/menu/list',
    method: 'get',
    data
  })
}
function addMenu(data){
  return request({
    url: '/api/menu/add',
    method: 'post',
    data
  })
}

function roleList(data){
  return request({
    url:'/api/role/list',
    method: 'get',
    data
  })
}

function getMenuByRole(data){
  return request({
    url:'/api/role/getMenuByRole',
    method: 'get',
    data
  })
}
function saveMenuByRole(data){
  return request({
    url:'/api/role/saveMenuByRole',
    method: 'post',
    data
  })
}



export var userApi = {
  userList
}
export var menuApi = {
  menuList,
  addMenu
} 
export var roleApi = {
  roleList,
  getMenuByRole,
  saveMenuByRole
}

export default{
  userList,
  menuList,
  addMenu
}
