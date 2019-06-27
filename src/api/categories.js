import axios from '@/utils/myaxios.js'

// 获取商品数据列表
export const getCategoriesList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
