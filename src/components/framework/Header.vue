<template>
  <div class="header">
    <div class="logo">计算机设备智能验收系统</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">{{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>

import api from './../../axios/api';

export default {
  data() {
    return {
      name: 'linxin',
    };
  },
  computed: {
    username() {
      const username = localStorage.getItem('ms_username');
      return username || this.name;
    },
  },
  methods: {
    handleCommand() {
      const self = this;
      api.get('/api/auth/logout', {}).then(() => {
        self.$router.push('/login');
      });
    },
  },
};
</script>
<style scoped>

</style>
