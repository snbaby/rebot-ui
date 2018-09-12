<template>
  <div class="header">
    <div class="logo">计算机设备智能验收系统</div>
    <div class="user-info">
      <el-popover ref="popover4" placement="bottom-end" trigger="hover" >
        <div>
          <div class="userInfo">[姓名]</div>
          <div class="userInfo">[工号]</div>
          <div style="text-align: center;cursor: default" class="userInfo userInfoHover"
               @click="updata">修改密码
          </div>
          <div style="text-align: center;cursor: default" class="userInfo userInfoHover"
               @click="cancel">注销
          </div>
        </div>
        <div slot="reference" class="logoBox">
          <img src="/static/default/images/nav_header.png"/>
        </div>
      </el-popover>
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
    updata() {

    },
    cancel() {
      const self = this;
      api.get('/api/auth/logout', {}).then(() => {
        self.$router.push('/login');
      });
    },
  },
};
</script>
<style scoped>
  .userInfo {
    padding: 10px 14px;
    font-size: 14px;
    color: #666;
  }

  .userInfoHover:hover {
    background: #f0f0f0;
  }

  .logoBox {
    padding-top:15px;
  }
</style>
