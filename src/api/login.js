import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/user/doLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/user/doLogout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}

