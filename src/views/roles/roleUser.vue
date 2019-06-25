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
              <el-tag
                closable
                type="success"
                @close="delRight(scope.row,first.id)"
                v-if="first.children.length!==0"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row v-for="secend in first.children" :key="secend.id" style="margin-bottom:15px">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="info"
                    @close="delRight(scope.row,secend.id)"
                    v-if="secend.children.length!==0"
                  >{{secend.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    closable
                    type="info"
                    v-for="third in secend.children"
                    :key="third.id"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="scope.row.children.length === 0">没有任何的权限数据，请先添加</el-col>
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
            <el-button type="success" icon="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配角色弹出框 -->

    <el-dialog title="收货地址" :visible.sync="grantdialogFormVisible">
      <div class="grantDialog">
        <el-tree
          :data="grantList"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedArr"
          :props="defaultProps"
          :default-expand-all="true"
          ref="tree"
        ></el-tree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUserList,
  delUserRight,
  grantUserRight
} from '@/api/roleUser.js'
import { getRightList } from '@/api/roles.js'
export default {
  data () {
    return {
      // 当前授权角色的id
      roleid: '',
      // 当前角色权限列表
      roleList: [],
      // 分配角色对话框
      grantdialogFormVisible: false,
      // 所有授权列表
      grantList: [],
      // 默认被选中的键
      checkedArr: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    // 角色权限的设置
    showGrantDialog (row) {
      console.log(row)
      this.grantdialogFormVisible = true
      this.roleid = row.id
      // console.log(row)
      // 调用接口获取所有权限数据,并赋值给所有授权列表
      getRightList('tree').then(res => {
        // console.log(res)
        this.grantList = res.data.data
        // console.log(this.grantList)
      })
      // 从第一层对象开始遍历，获取到最后一层权限的id，将该值赋值给默认被选中的数组
      // 再遍历前将默认被选中的数组清空，以便于点击其他的授权角色显示正确的值
      this.checkedArr.length = 0
      console.log(row.children)
      row.children.forEach(first => {
        if (first.children.length > 0) {
          first.children.forEach(secend => {
            if (secend.children.length > 0) {
              secend.children.forEach(third => {
                this.checkedArr.push(third.id)
                // console.log(this.checkedArr)
              })
            }
          })
        }
      })
    },
    // 授权角色确定
    grantSubmit () {
      // let newArr = this.$refs.tree.getCheckedKeys(); // 若直接点击子节点，只能获取从当前选中的子节点id，而获取不到父节点的id
      let arr = this.$refs.tree.getCheckedNodes() // 获取到成父子结构的所有相关节点数据
      // console.log(arr)
      // 遍历arr,获取该数组对象中的id和rid
      let temp = arr.map(value => {
        // map 循环将返回符合条件的数据并重新组成新的数组
        return value.id + ',' + value.pid
      })
      // console.log(temp) // 获取到的数组形为["id,pid","id,pid",....]
      // 将数组中的数据拼接成字符串,并以,号分隔
      let str = temp.join(',')
      // console.log(str)
      // 将字符串转化为数组——目的是为了去重，只有数组才能用ES6中新的方法（ new set(数组)）去重
      let newArr = str.split(',')
      // console.log(newArr)
      let obj = new Set(newArr) // 会生成一个对象
      // console.log(obj)
      // 再将去重后的对象转化为数组——利用ES6中的展开运算符
      let final = [...obj]
      // console.log(final)
      // 调用接口，进行角色授权
      grantUserRight(this.roleid, final.join(',')).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 将对话框关闭
          this.grantdialogFormVisible = false
          // 重新刷新
          this.init()
        }
      })
    },

    // 删除制定角色权限标签
    delRight (row, rightid) {
      // console.log(roleid, rightid)
      delUserRight(row.id, rightid).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          // 将获取到的返回数据data赋值给roleList，进行局部刷新
          row.children = res.data.data
          // console.log(row.children)
        }
      })
    },
    // 封装获取roles数据的方法
    init () {
      getAllUserList().then(res => {
      // console.log(res)
        this.roleList = res.data.data
      // console.log(this.roleList)
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.grantDialog {
  height: 400px;
  overflow: scroll;
}
</style>
