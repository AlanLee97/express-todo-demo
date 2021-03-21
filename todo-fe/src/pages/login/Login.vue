<template>
  <div class="page">
    
    <div class="login-box">
      <div class="left">
      </div>
      <div class="right">
        <div class="title-bar">
          <img alt="Vue logo" src="../../assets/logo.png" class="logo">
          <h3>{{`${loginMode ? '登录' : '注册'} Todo`}}</h3>
        </div>
        <br>
        <div>
          <el-input placeholder="请输入帐号" v-model="form.username" autocompelete="off"></el-input>
          <br>
          <br>
          <el-input placeholder="请输入密码" v-model="form.password" show-password autocomplete="off"></el-input>
        </div>
        <br>
        <el-button type="primary" @click="handleBtn" round>{{`${loginMode ? '登录' : '注册'}`}}</el-button>

        <br>
        <div>
          {{`${loginMode ? '还没帐号？ ' : '已有帐号？'}`}}
          <el-link type="primary" :underline="false" @click="toggleMode">
            {{`${loginMode ? '注册' : '登录'}`}}
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import request from "../../network/index";

export default {
  name: 'HelloWorld',
  data () {
    return {
      loginMode: true,
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    toggleMode() {
      this.form.username = '';
      this.form.password = '';
      this.loginMode = !this.loginMode;
      console.log(this.loginMode);
    },

    handleBtn() {
      if (this.loginMode) {
        this.login();
      }else {
        this.register();
      }
    },

    login() {
      request.post('/user/login', this.form).then(res => {
        console.log(res);
        if(res.data.code === 1) {
          this.$message.success("登录成功");
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          setTimeout(() => {
            this.$router.push('/todo');
          }, 500);
        }else {
          this.$message.error("登录失败，请重试！");
        }
      }).catch(err => {
        console.log(err);
        this.$message.error("登录失败，请重试！");
      })
      
    },

    register() {
      request.post('/user/register', this.form).then(res => {
        console.log(res);
        if(res.data.code === 1) {
          this.$message.success("注册成功");
          this.loginMode = true;
        }else {
          this.$message.error(res.data.error);
        }
      }).catch(err => {
        console.log(err);
        this.$message.error("注册失败，请重试！");
      })
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #f5f6f9;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    display: flex;
    width: 1000px;
    height: 550px;
    background-color: #fff;
    box-shadow: 1px 2px 10px #eee;

    .left{
      width: 500px;
      background-image: url('../../assets/bg.jpg');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .right{
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 2em;

      .title-bar {
        display: flex;
        align-items: center;
      }
      .logo {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
}


</style>
