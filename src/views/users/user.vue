<template>
  <div class="user">
    <!-- 添加面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userKey"
        class="input-with-select"
        style="width:300px;margin-right:15px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>
    <!-- 添加表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
         <!-- 插槽：匿名插槽，具名插槽，数据插槽 -->
        <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <el-button type="info" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
          <el-button type="success" icon="el-icon-share"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-button type="warning" icon="el-icon-delete"></el-button>
        </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0">
    </el-pagination>
  </div>
</template>

<script>
import { getAllList } from '@/api/users.js'
export default {
  data () {
    return {
      // 当前页码
      pagenum: 1,
      // 每页显示的记录数
      pagesize: 2,
      value2: true,
      // 总记录数
      total: '',
      // 搜索关键字
      userKey: '',
      userList: []
    }
  },
  methods: {
    handleSizeChange (res) {
      // console.log(res)
      this.pagenum = res
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(val)
      this.pagenum = val
      this.init()
    },
    init () {
      getAllList({ pagenum: this.pagenum, pagesize: this.pagesize })
        .then(res => {
        // console.log(res)
        // 将获取到的数据赋值给userList
          this.userList = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    // 调用放大获取用户数据
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
