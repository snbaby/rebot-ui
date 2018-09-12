<template>
  <div class="header">
    <div class="logo">计算机设备智能验收系统</div>
    <div class="user-info">
      <el-popover ref="popover4" placement="bottom-end" trigger="hover" >
        <div>
          <div class="userInfo">[姓名]{{username}}</div>
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
    <el-dialog title="修改密码" :visible.sync="editForm.visible">
      <el-form :model="editForm" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码" label-width="120px" prop="oldPassword">
          <el-input v-model="editForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="newPassword">
          <el-input v-model="editForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import api from './../../axios/api';

export default {
  data() {
    return {
      name: 'linxin',
      editForm: {
        visible: false,
        oldPassword: '',
        newPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { max: 45, message: '长度在 8 到 45 个字符', trigger: 'blur' },
          { min: 8, message: '长度在 8 到 45 个字符', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { max: 45, message: '长度在 8 到 45 个字符', trigger: 'blur' },
          { min: 8, message: '长度在 8 到 45 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    username() {
      const username = sessionStorage.getItem('username');
      return username || this.name;
    },
  },
  methods: {
    updata() {
      this.editForm.oldPassword = '';
      this.editForm.newPassword = '';
      this.editForm.visible = true;
    },
    saveEditDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const params = {
          newPassword: self.editForm.newPassword,
          oldPassword: self.editForm.oldPassword,
        };
        api.post('/api/auth/change', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '修改用户密码成功，请重新登录',
          });
          this.editForm.visible = false;
          setTimeout(() => {
            self.$router.push('/login');
          }, 2000);
        });
        return true;
      });
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
