<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img src="../assets/logo.png" alt class="logo">
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/home/'+secendItem.path" v-for="secendItem in item.children" :key="secendItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{secendItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h3 class="system-title">后台管理系统</h3>
          <div class="welcome">
            <span>你好：admin</span> &nbsp;&nbsp;&nbsp;
            <a href="javascript:;">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getRolesMenus } from '@/api/roles.js'
export default {
  data () {
    return {
      menuList: []
    }
  },
  methods: {
  },
  mounted () {
    // 动态生成左侧导航
    getRolesMenus().then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.menuList = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
