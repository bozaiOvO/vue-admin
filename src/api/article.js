import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
//这里是获取文章列表
function getAllArticleList(){
  return request ({
    url: '/api/article/list',
    method:'get'
  })
}
//编辑文章
function editArticle(article){
  return request ({
    url: 'api/article/edit',
    method: 'post',
    data:{
      article
    }
  })
}
//提交文章
function addArticle(article){
  console.log(article)
  return request ({
    url: 'api/article/add',
    method: 'post',
    data:{
      article
    }
  }) 
}
export default {
  getAllArticleList,
  editArticle,
  addArticle
}
