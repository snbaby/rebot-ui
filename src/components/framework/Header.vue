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

    },
  },
};
</script>
<style scoped>

</style>
