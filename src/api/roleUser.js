import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取可能有的token数据，进行请求头的设置，格式Authorization:token
  var token = localStorage.getItem('itcast_pro_token')
  // console.log(config)
  config.headers['Authorization'] = token

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

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
