import axios from '@/utils/myaxios.js'

// 获取商品数据列表
export const getCategoriesList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}

// 添加商品
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
