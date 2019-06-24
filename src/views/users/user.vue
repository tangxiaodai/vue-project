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
        @keyup.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="addUserFormVisible=true">添加用户</el-button>
    </div>
    <!-- 添加表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateStatus(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- 插槽：匿名插槽，具名插槽，数据插槽 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="info" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button
              type="success"
              icon="el-icon-share"
              @click="handleGrant(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="handleDel(scope.row.id)"></el-button>
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
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0"
    ></el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加新用户" :visible.sync="addUserFormVisible">
      <el-form :model="addUserform" :label-width="'120px'" :rules="rules" ref="addUserform">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addUserform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addUserform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false;$refs.addUserform.resetFields() ">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editUserFormVisible">
      <el-form :model="editUserform" :label-width="'120px'" :rules="rules" ref="editUserform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserform.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserFormVisible = false;$refs.editUserform.resetFields() ">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantFormVisible">
      <el-form :model="grantForm" :label-width="'120px'">
        <el-form-item label="用户名">
          <el-input v-model="grantForm.username" auto-complete="off" disabled style="width:200px"></el-input>
        </el-form-item>
        <template>
          <el-form-item label="用户名">
            <el-select v-model="value" placeholder="请选择" @change="getRoleId(value)" >
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllList,
  addUser,
  editUser,
  delUser,
  updateUserStatus,
  grantUserRole
} from '@/api/users.js'
import { getAllRoles } from '@/api/roles.js'
export default {
  data () {
    return {
      // 当前页码
      pagenum: 1,
      // 每页显示的记录数
      pagesize: 4,
      // 总记录数
      total: '',
      // 搜索关键字
      userKey: '',
      addUserFormVisible: false,
      editUserFormVisible: false,
      // 分配角色的对话框
      grantFormVisible: false,
      // 分配角色的选择框的数据
      rolesList: [],
      value: '',
      grantForm: {
        id: '',
        rid: '',
        roleName: '',
        username: ''
      },
      userList: [],
      addUserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户的信息
      editUserform: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            message: '请输入合法的邮箱',
            pattern: /\w+[@]\w+[.]\w+/,
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            message: '请输入合法的手机号',
            pattern: /^1\d{10}$/,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 分配角色
    handleGrant (val) {
      // console.log(val)
      this.grantFormVisible = true
      this.grantForm.id = val.id
      this.grantForm.roleName = val.role_name
      this.grantForm.rid = val.rid
      this.grantForm.username = val.username
      this.value = val.role_name
    },
    // 分配角色——当选择栏选中后触发
    getRoleId (val) {
      // 获取到role_id
      // console.log(val)
      this.grantForm.rid = val
    },
    // 点击确定按钮调用后台接口
    grantConfirm () {
      grantUserRole(this.grantForm.id, this.grantForm.rid)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: 'success'
            })
            // 关闭dialog
            this.grantFormVisible = false
            // 重新刷新数据
            this.init()
          }
        })
        .catch(() => {
          this.$message({
            message: 'error',
            type: 'error'
          })
        })
    },

    // 修改用户状态
    updateStatus (id, state) {
      // console.log(id, state)
      updateUserStatus(id, state).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      })
    },
    // 删除用户
    handleDel (id) {
      // console.log(id)
      this.$confirm(`此操作将永久删除id号为：${id}的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(id)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
                // 删除成功后刷新数据
                this.init()
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 编辑用户
    edit () {
      // console.log(11)
      // 添加校验
      this.$refs.editUserform.validate(val => {
        if (val) {
          // 如果信息都符合校验，调用接口将数据发送给后台
          editUser(this.editUserform).then(res => {
            // console.log(res)
            if (res.data.meta.status === 200) {
              // 若更新成功则关闭对话框，弹出成功提示信息，重新刷新页面
              this.$message({
                message: res.data.meta.msg,
                type: 'success'
              })
              this.editUserFormVisible = false
              this.init()
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'erro'
              })
            }
          })
        } else {
          this.$message({
            message: 'error',
            type: 'error'
          })
        }
      })
    },
    handleEdit (obj) {
      // console.log(obj)
      // 点击编辑按钮弹出对话框
      this.editUserFormVisible = true
      this.editUserform.id = obj.id
      this.editUserform.username = obj.username
      this.editUserform.email = obj.email
      this.editUserform.mobile = obj.mobile
    },
    // 增加用户
    add () {
      // console.log(this.$refs)
      // 若表单校验信息都符合要求，则输出true
      this.$refs.addUserform.validate(val => {
        // console.log(val)
        if (val) {
          addUser(this.addUserform)
            .then(res => {
              // console.log(res)
              // 如果创建成功
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })
                // 消息框隐藏
                this.addUserFormVisible = false
                // 清空表单输入框内容
                this.$refs.addUserform.resetFields()
                // 数据刷新
                this.init()
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '添加失败',
                type: 'error'
              })
            })
        } else {
          // 如果失败，终止此次提交
          return false
        }
      })
    },
    // 点击每页显示几条
    handleSizeChange (res) {
      // console.log(res)
      this.pagesize = res
      this.init()
    },
    // 点击到第几页
    handleCurrentChange (val) {
      // console.log(val)
      this.pagenum = val
      this.init()
    },
    // 获取用户信息
    init () {
      getAllList({ pagenum: this.pagenum, pagesize: this.pagesize, query: this.userKey })
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
    // 获取用户数据
    this.init()
    // 获取所有权限数据
    getAllRoles()
      .then(res => {
        // console.log(res)
        this.rolesList = res.data.data
      })
      .catch(() => {
        console.log('err')
      })
  }
}
</script>

<style lang="less" scoped>
</style>
