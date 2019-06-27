import axios from '@/utils/myaxios.js'

// 获取所有用户列表
export const getAllUserList = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定权限
export const delUserRight = (roleid, rightid) => {
  return axios({
    method: 'delete',
    url: `roles/${roleid}/rights/${rightid}`
  })
}

// 进行角色授权
export const grantUserRight = (roleid, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleid}/rights`,
    data: { rids }
  })
}

// 添加角色
export const addRoles = (obj) => {
  return axios({
    method: 'post',
    url: 'roles',
    data: obj
  })
}
