<template>
  <div class="rileuser">
    <!-- 添加面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain>添加角色</el-button>
    <!-- 添加表格结构 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for=" first in scope.row.children" :key="first.id" style="margin-bottom:15px">
            <el-col :span="6">
              <el-tag closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row v-for="secend in first.children" :key="secend.id" style="margin-bottom:15px">
                <el-col :span="6">
                  <el-tag closable type="info">{{secend.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    closable
                    type="info"
                    v-for="third in secend.children"
                    :key="third.id"
                  >{{secend.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
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
  </div>
</template>
<script>
import { getAllUserList } from '@/api/roleUser.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    getAllUserList().then(res => {
      console.log(res)
      this.roleList = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
</style>
