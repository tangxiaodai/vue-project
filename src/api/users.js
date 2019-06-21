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

// 添加登陆验证的方法
export const userlogin = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}

// 用户数据列表
export const getAllList = (params) => {
  return axios({
    url: 'users',
    params: params
  })
}
