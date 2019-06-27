import axios from '@/utils/myaxios.js'
// 添加登陆验证的方法
export const userlogin = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}

// 用户数据列表
export const getAllList = (params) => {
  return axios({
    url: 'users',
    params: params
  })
}

// 添加用户
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 编辑用户
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const delUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete',
    id: { id }
  })
}

// 修改用户状态
export const updateUserStatus = (id, type) => {
  return axios({
    url: `users/${id}/state/${type}`,
    method: 'put'

  })
}

// 分配用户角色
export const grantUserRole = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: { rid }
  })
}
