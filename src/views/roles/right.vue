<template>
    <div class="right">
   <!-- 添加面包屑 -->
    <el-breadcrumb separator="/"  style="line-height:45px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格结构 -->
      <el-table :data="rightList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
          <template slot-scope="scope">
              <span>{{scope.row.level | levelFormat}}</span>
          </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import { getRightList } from '@/api/roles.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  // 创建局部过滤器
  filters: {
    levelFormat: level => {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
      return ''
    }
  },

  mounted () {
    getRightList('list').then(res => {
    //   console.log(res)
      this.rightList = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>

</style>
