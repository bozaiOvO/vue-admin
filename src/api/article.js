import request from '@/utils/request'

//这里是获取文章列表
function getArticleList(pageNumber=''){
  return request ({
    url: '/api/article/list?pageNumber='+pageNumber,
    method:'get'
  })
}
//查看文章
function preview(data){
  return request({
    url:'/api/article/detail',
    method:'get',
    data
  })
}
//删除文章
function deleteArticle(data){
  return request({
    url:'/api/article/del',
    method:'post',
    data
  })
}
//编辑文章
function editArticle(data){
  return request ({
    url: 'api/article/edit',
    method: 'post',
    data
  })
}
//新增文章
function addArticle(data){
  return request ({
    url: 'api/article/add',
    method: 'post',
    data
  }) 
}
export default {
  getArticleList,
  preview,
  editArticle,
  addArticle,
  deleteArticle
}
