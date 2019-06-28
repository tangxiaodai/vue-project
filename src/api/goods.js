import axios from '@/utils/myaxios.js'

// 获取所有商品数据
export const getAllGoodsData = (params) => {
  return axios({
    method: 'get',
    url: 'goods',
    params
  })
}
