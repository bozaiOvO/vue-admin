import request from '@/utils/request'
import qs from 'qs'
//这个是get请求中需要把数据转换成formData类型，并且去掉双引号。
function URLstr(strName,str){
  const params = new URLSearchParams()
  params.append(strName,str)
  return params
}
//获取所有的图片
function getMaterialList(groupId='',pageNumber='',limit='') {
  return request({
    url: '/api/material/list?groupId='+groupId+'&pageNumber='+pageNumber+'&limit='+limit,
    method:'get'
  })
}
//删除图片
function delMaterialImg(id) {
  return request({
    url: '/api/material/del?id='+id,
    method:'get'
  })
}
function addMaterialImg(type,id,title,author,groupId){
  return request({
    url: '/api/material/add',
    method:'post',
    data: {
      type,
      id,
      title,
      author,
      groupId
    }
  })
}
//获取所有分组
function getGrouping(obj) {
  return request({
    url: '/api/group/list',
    method: 'get'
  })
}
//添加分组
function addGroup(groupName) {
  return request({
    url: '/api/group/add',
    method: 'post',
    data: {
      groupName
    }
  })

}

//删除分组
function delGroup(id){
  return request({
    url:'/api/group/del/?id='+id,
    method: 'get',
  })
}
//重命名分组
function renameGroup(id,groupName){
  return request({
    url: '/api/group/reName',
    method: 'post',
    data: {
      id,
      groupName
    }
  })
}
//移动分组
function changeGroup(id,groupId){
  return request({
    url: '/api/material/changeGroup',
    method:'post',
    data:{
      id,
      groupId
    }
  })
}
export default({
  getGrouping,
  addGroup,
  delGroup,
  getMaterialList,
  renameGroup,
  addMaterialImg,
  changeGroup,
  delMaterialImg
})

