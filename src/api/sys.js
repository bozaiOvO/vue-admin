import request from './request'
// user===
function userList(data) {
  return request({
    url: '/api/adminUser/list',
    method: 'get',
    data
  })
}

function addUser(data){
  return request({
    url: '/api/adminUser/add',
    method: 'post',
    data
  })
}

function updateUser(data){
  return request({
    url: '/api/adminUser/update',
    method: 'post',
    data
  })
}

function delUser(data){
  return request({
    url: '/api/adminUser/del',
    method: 'get',
    data
  })
}

function saveUserRole(data){
  return request({
    url: '/api/adminUser/saveUserRole',
    method: 'post',
    data
  })
}
/**
 * 根据用户获取角色
 */
function getRoleByUser(data){
  return request({
    url: '/api/adminUser/getRoleByUser',
    method: 'get',
    data
  })
}


// menu==
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
// roel==
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
  userList,
  addUser,
  updateUser,
  delUser,
  getRoleByUser,
  saveUserRole
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
