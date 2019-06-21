
<template>
  <div class="login">
    <div class="container">
      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
        <img src="../assets/avatar.jpg" alt class="avatar">
        <el-form-item label prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="myicon myicon-user" ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="LoginForm.password" prefix-icon="myicon myicon-key" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click.prevent="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userlogin } from '@/api/users.js'
export default {
  data () {
    return {
      LoginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          // required:是否必须  message：如果不合法的提示信息  trigger：什么时候触发
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登陆
    login () {
      // 实现验证，只需要调用当前表单的validate函数，这函数有一个参数，参数是一个回调函数
      // 回调函数有一个参数，如果验证通过则返回True,否则返回False
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          //   说明用户输入合法，那么就可以提交
          //   发送登陆验证请求
          userlogin(this.LoginForm).then(res => {
            // console.log(res)
            if (res.data.meta.status === 400) {
              this.$message({
                message: res.data.meta.msg,
                type: 'error'
              })
            } else if (res.data.meta.status === 200) {
              // 如果登陆成功。将Token值赋值给请求头
              localStorage.setItem('itcast_pro_token', res.data.data.token)
              this.$message({
                message: res.data.meta.msg,
                type: 'success'
              })
              this.$router.push({ name: 'Home' })
            }
          })
        } else {
          this.$message({
            message: '请输入正确的信息',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
