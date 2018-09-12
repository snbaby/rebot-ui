<template>
  <div class="login-wrap">
    <div class="ms-title">计算机设备智能验收系统</div>
    <div class="ms-login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密碼" v-model="loginForm.password"
                    @keyup.enter.native="handleLogin">
          </el-input>
        </el-form-item>
        <!-- `checked` 为 true 或 false -->
         <!--<el-checkbox v-model="checked">记住密码</el-checkbox>-->
        <div class="login-btn">
          <el-button :loading="loading"  @click.native.prevent="handleLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import api from './../../axios/api';

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能小于8位'));
      } else {
        callback();
      }
    };
    return {
      checked: true,
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername,
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass,
        }],
      },
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      const self = this;
      localStorage.setItem('ms_username', this.loginForm.username);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const params = {
            userName: self.loginForm.username,
            userPassword: self.loginForm.password,
          };
          api.post('/api/auth/login', params).then((res) => {
            sessionStorage.setItem('roleId', res.content.roleId);
            sessionStorage.setItem('username', res.content.username);
            sessionStorage.setItem('userId', res.content.userId);
            sessionStorage.setItem('departmentId', res.content.departmentId);
            sessionStorage.setItem('departmentList', JSON.stringify(res.content.departmentList));
            sessionStorage.setItem('roleList', JSON.stringify(res.content.roleList));
            self.$router.push('/rebot');
          });
        }
      });
    },
  },
};
</script>
