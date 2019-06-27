import axios from '@/utils/myaxios.js'

// 获取所有角色列表
export const getAllRoles = () => {
  return axios({
    url: 'roles'
  })
}

// 获取所有权限列表
export const getRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 动态生成左侧菜单权限
export const getRolesMenus = () => {
  return axios({
    url: 'menus'
  })
}
