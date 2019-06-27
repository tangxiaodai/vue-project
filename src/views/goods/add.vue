<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 步骤条 -->
      <el-steps :active="checkTag-0" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <template>
        <el-tabs v-model="checkTag"  tab-position="left">
          <el-tab-pane label="基本参数" name="0">
            <el-form
              :model="AddGoodForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="AddGoodForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="good_price">
                <el-input v-model="AddGoodForm.good_price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="good_number">
                <el-input v-model="AddGoodForm.good_number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="good_weight">
                <el-input v-model="AddGoodForm.good_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" >
                  <!-- 级联选择器 -->
                <el-cascader :options="cateList" clearable :props="cateprops"></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="1">商品图片</el-tab-pane>
          <el-tab-pane label="商品描述" name="2">商品描述</el-tab-pane>
          <el-tab-pane label="商品参数" name="3">商品参数</el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesList } from '@/api/categories.js'
export default {
  data () {
    return {
      checkTag: '0',
      AddGoodForm: {
        goods_name: '',
        good_price: '',
        good_number: '',
        good_weight: ''
      },
      // 级联的数据
      cateList: [],
      cateprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        good_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        good_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        good_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
    getCategoriesList(3).then(res => {
    //   console.log(res)
      this.cateList = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
</style>
