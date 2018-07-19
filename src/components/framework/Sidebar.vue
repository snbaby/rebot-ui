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
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'vSidebar',
  props: {
    routes: {
      type: Array,
    },
  },
  computed: {
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
