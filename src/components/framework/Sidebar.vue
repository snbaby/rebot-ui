<template>
  <div class="sidebar">
    <el-menu
      default-active="0"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="0">
        <i class="el-icon-menu">
        </i>
        <span>导综合看板</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统配置管理</span>
        </template>
        <el-menu-item index="1-0">
          <span>操作系统模板管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>智能验机</span>
        </template>
        <el-menu-item index="2-0">
          <span>验机登记</span>
        </el-menu-item>
        <el-menu-item index="2-1">
          <span>设备验机</span>
        </el-menu-item>
        <el-menu-item index="2-2">
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
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

  }
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
