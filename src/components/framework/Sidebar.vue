<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      :router="true">
      <el-menu-item index="/rebot/overview">
        <i class="el-icon-menu">
        </i>
        <span>导综合看板</span>
      </el-menu-item>
      <el-submenu index="/rebot/intelligent">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>智能验机</span>
        </template>
        <el-menu-item index="/rebot/intelligent/inspection_registration">
          <span>验机登记</span>
        </el-menu-item>
        <el-menu-item index="/rebot/intelligent/equipment_inspection">
          <span>设备验机</span>
        </el-menu-item>
        <el-menu-item index="/rebot/intelligent/data_export">
          <span>数据导出</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/rebot/system" v-if="username == 'admin'">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/rebot/system/department">
          <span>部门管理</span>
        </el-menu-item>
        <el-menu-item index="/rebot/system/role">
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/rebot/system/user">
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/rebot/system/log">
          <span>日志管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'vSidebar',
  data() {
    return {
      name: 'linxin',
    };
  },
  props: {
    routes: {
      type: Array,
    },
  },
  computed: {
    username() {
      const username = sessionStorage.getItem('username');
      return username || this.name;
    },
  },
  created() {
  },
};
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
