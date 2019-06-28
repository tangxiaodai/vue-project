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
        <el-tabs v-model="checkTag" tab-position="left">
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
                <el-input v-model="AddGoodForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="good_number">
                <el-input v-model="AddGoodForm.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="good_weight">
                <el-input v-model="AddGoodForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <!-- 级联选择器 -->
                <el-cascader :options="cateList" clearable :props="cateprops" @change="getCateId"></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="1">
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :file-list="uploadPictureList"
              list-type="picture"
              :headers="setReqToken()"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品描述" name="2">
            <!-- 引入富文本框 -->
            <quill-editor
              v-model="AddGoodForm.goods_introduce"
              ref="myQuillEditor"
              :options="editorOption"
              style="height:300px;border-bottom:1px solid #ccc;'"
            ></quill-editor>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="3">商品参数</el-tab-pane>
        </el-tabs>
      </template>
      <!-- 添加商品按钮 -->
      <el-button type="success" plain style="float: right;margin:20px 0" @click="submitGood">确认提交</el-button>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesList, addGoods } from '@/api/categories.js'
export default {
  data () {
    return {
      // 富文本框配置,主要用来配置样式按钮
      editorOption: {},
      // 图片上传储存的数据
      uploadPictureList: [],
      checkTag: '0',
      AddGoodForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        atts: []
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
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 商品提交
    submitGood () {
      // console.log(this.AddGoodForm)
      addGoods(this.AddGoodForm).then(res => {
        // console.log(res)
        if (res.data.meta.status === 201) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
        }
        // 跳转到产品页面，并重新渲染
        this.$router.push({ name: 'List' })
      })
    },
    // 上传之前的
    beforeUpload (file) {
      // console.log(file)
      if (!file.type.includes('image')) {
        this.$message({
          type: 'error',
          message: '请传入图片类型'
        })
        // return false 自动调用handleRemove方法
        return false
      }
    },
    // 文件上传成功的钩子
    handleSuccess (response, file, fileList) {
      // console.log(file)
      if (file.response.meta.status === 200) {
        this.$message({
          type: 'success',
          message: file.response.meta.msg
        })
        this.AddGoodForm.pics.push({ pic: response.data.tmp_path })
      }
      // console.log(this.AddGoodForm.pics)
    },
    // 由于文件上传组件内部自己封装了一个请求，所以没有我们自己设置的token，去要手动给该请求头添加token
    setReqToken () {
      let token = localStorage.getItem('itcast_pro_token')
      return { Authorization: token }
    },
    // 上传文件移出
    handleRemove (file, fileList) {
      // console.log(file) // 被移出的该文件数据
      // console.log(fileList)    // 移出后剩下的数据
      // console.log(this.AddGoodForm.pics)
      if (!file.response) {
        return
      }
      var removeFile = file.response.data.tmp_path
      for (var i = 0; i < this.AddGoodForm.pics.length; i++) {
        if (this.AddGoodForm.pics[i].pic === removeFile) {
          this.AddGoodForm.pics.splice(i, 1)
        }
      }
      // console.log(this.AddGoodForm.pics)
    },
    // 上传文件预览
    handlePreview (file) {},
    // 当级联选择器选中时
    getCateId (val) {
      // console.log(val.join(","));
      this.AddGoodForm.goods_cat = val.join(',')
    }
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
