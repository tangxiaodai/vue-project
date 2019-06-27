<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索框、添加商品 -->
      <div style="margin-top: 15px;">
        <el-input
          placeholder="请输入内容"
          v-model="userKey"
          class="input-with-select"
          style="width:300px;margin-right:15px"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push({name: 'AddGood'})">添加商品</el-button>
      </div>
      <!-- 表格内容 -->
      <template>
        <el-table :data="goodListData" stripe style="width: 100%;margin-top:20px" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
          <el-table-column prop="goods_price" label="价格" width="180"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
          <el-table-column prop="add_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" >编辑</el-button>
              <el-button size="mini" type="danger" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
import { getAllGoodsData } from '@/api/goods.js'
export default {
  data () {
    return {
      goodListData: [],
      // 查询参数
      userKey: '',
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 10
    }
  },
  mounted () {
    getAllGoodsData({ query: this.userKey, pagenum: this.pagenum, pagesize: this.pagesize }).then(res => {
    //   console.log(res)
      this.goodListData = res.data.data.goods
    })
  }
}
</script>
<style lang="less" scoped>
</style>
