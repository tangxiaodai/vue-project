import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加登陆验证的方法
export const userlogin = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}
