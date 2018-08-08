import request from '@/utils/request'
import qs from 'qs'
//这个是get请求中需要把数据转换成formData类型，并且去掉双引号。
function URLstr(strName,str){
  const params = new URLSearchParams()
  params.append(strName,str)
  return params
}
function getImgList(page) {
  return request({
    url: '/material/imgList/' + page,
    method: 'get'
  })
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
    url: '/api/material/delImg?id='+id,
    method:'get'
  })
}
//获取所有分组
function getGrouping() {
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
  console.log(id)
  console.log(groupName)
  return request({
    url: '/api/group/reName',
    method: 'post',
    data: {
      id,
      groupName
    }
  })
}
export default({
  getGrouping,
  addGroup,
  delGroup,
  getMaterialList,
  renameGroup
})

