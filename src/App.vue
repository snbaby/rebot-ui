<template>
  <div id="app">
    <div class="framework">
      <div class="framework-header framework-header-background-color">
        <span class="framework-header-title framework-header-title-text-color">
            计算机设备智能验收系统
        </span>
        <span  class="framework-header-user">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link framework-header-text-color" >
              admin<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>

      <div>
        <el-row :gutter="10">
          <el-col :span="3">
            <div>
              <el-menu
                default-active="0"
                class="framework-menu">
                <el-menu-item index="0">
                  <i class="el-icon-view"></i>
                  <span>综合看板</span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统配置管理</span>
                  </template>
                  <el-menu-item index="1-0">操作系统模板管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>智能验机</span>
                  </template>
                  <el-menu-item index="2-0">验机登记</el-menu-item>
                  <el-menu-item index="2-1">设备验机</el-menu-item>
                  <el-menu-item index="2-2">数据导出</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="21">
            <div>
              <div class="framework-content">
                <router-view/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
