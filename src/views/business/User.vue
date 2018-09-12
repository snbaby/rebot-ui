<template>
  <div v-loading="loading">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户管理</span>
            <el-button class="btn_template_manual" type="text" @click="openDialog">新增用户</el-button>
          </div>
          <div>
            <el-dialog title="新增用户" :visible.sync="dialogForm.visible">
              <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名称" label-width="120px" prop="userName">
                  <el-input v-model="dialogForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" label-width="120px" prop="userPassword">
                  <el-input v-model="dialogForm.userPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" label-width="120px" prop="departmentId">
                  <el-select v-model="dialogForm.departmentId" filterable placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in departmentOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色名称" label-width="120px" prop="roleId">
                  <el-select v-model="dialogForm.roleId" filterable placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveDialog">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div>
            <el-dialog title="修改用户" :visible.sync="editForm.visible">
              <el-form :model="editForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名称" label-width="120px" prop="userName">
                  <el-input v-model="editForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" label-width="120px" prop="userPassword">
                  <el-input v-model="editForm.userPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" label-width="120px" prop="departmentId">
                  <el-select v-model="editForm.departmentId" filterable placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in departmentOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色名称" label-width="120px" prop="roleId">
                  <el-select v-model="editForm.roleId" filterable placeholder="请选择"
                             style="width: 100%">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditDialog">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column property="userName" label="用户名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="departmentId" label="部门" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getDepartment(scope.row.departmentId)}}
                  </template>
                </el-table-column>
                <el-table-column property="roleId" label="角色" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getRole(scope.row.roleId)}}
                  </template>
                </el-table-column>
                <el-table-column property="crtUser" label="创建人">
                </el-table-column>
                <el-table-column property="crtTime" label="创建时间">
                  <template slot-scope="scope">
                    {{dateFormat(scope.row.crtTime)}}
                  </template>
                </el-table-column>
                <el-table-column property="uptUser" label="修改人">
                </el-table-column>
                <el-table-column property="uptTime" label="修改时间">
                  <template slot-scope="scope">
                    {{dateFormat(scope.row.uptTime)}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">
                      删除
                    </el-button>
                    <el-button @click="editDialog(scope.row)" type="text" size="small">
                      修改
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../axios/api';
import utils from './../../util/utils';


export default {
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      dialogForm: {
        visible: false,
        id: '',
        userName: '',
        userPassword: '',
        roleId: '',
        departmentId: '',
      },
      editForm: {
        visible: false,
        id: '',
        userName: '',
        userPassword: '',
        roleId: '',
        departmentId: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        userPassword: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
      },
      departmentOptions: [],
      roleOptions: [],
    };
  },
  created() {
    this.queryPage();
    this.init();
  },
  methods: {
    init() {
      api.get('/api/role/list').then((res) => {
        this.roleOptions = res.content;
        sessionStorage.setItem('roleList', JSON.stringify(res.content));
      });

      api.get('/api/department/list').then((res) => {
        this.departmentOptions = res.content;
        sessionStorage.setItem('departmentList', JSON.stringify(res.content));
      });
    },
    getRole(roleId) {
      const roleList = JSON.parse(sessionStorage.getItem('roleList'));
      for (let i = 0; i < roleList.length; i += 1) {
        if (roleList[i].id === roleId) {
          return roleList[i].name;
        }
      }
      return '';
    },
    getDepartment(departmentId) {
      const departmentList = JSON.parse(sessionStorage.getItem('departmentList'));
      for (let i = 0; i < departmentList.length; i += 1) {
        if (departmentList[i].id === departmentId) {
          return departmentList[i].name;
        }
      }
      return '';
    },
    dateFormat(time) {
      return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
    },
    handleDelete(row) {
      const self = this;
      api.del(`/api/user/${row.id}`).then(() => {
        self.pageNo = 1;
        self.pageSize = 10;
        self.total = 0;
        self.queryPage();
        self.$notify.success({
          title: '成功',
          message: `删除用户${row.name}成功`,
        });
      });
    },
    saveDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const params = {
          userName: self.dialogForm.userName,
          userPassword: self.dialogForm.userPassword,
          departmentId: self.dialogForm.departmentId,
          roleId: self.dialogForm.roleId,
        };
        api.post('/api/user/add', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '添加用户成功',
          });
          self.queryPage();
          this.dialogForm.visible = false;
        });
        return true;
      });
    },
    openDialog() {
      this.dialogForm.visible = true;
      this.dialogForm.id = '';
      this.dialogForm.userName = '';
      this.dialogForm.roleId = '';
      this.dialogForm.departmentId = '';
      this.dialogForm.userPassword = '';
    },
    saveEditDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const params = {
          id: self.editForm.id,
          userName: self.editForm.userName,
          roleId: self.editForm.roleId,
          departmentId: self.editForm.departmentId,
          userPassword: self.editForm.userPassword,
        };
        api.put('/api/user/edit', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '修改用户成功',
          });
          self.queryPage();
          this.editForm.visible = false;
        });
        return true;
      });
    },
    editDialog(row) {
      this.editForm.visible = true;
      this.editForm.id = row.id;
      this.editForm.userName = row.userName;
      this.editForm.roleId = row.roleId;
      this.editForm.departmentId = row.departmentId;
      this.editForm.userPassword = row.userPassword;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
      };
      api.get('/api/user/page', params).then((res) => {
        self.total = res.content.total;
        self.pageNo = res.content.pageNum;
        self.tableData = res.content.list;
      });
    },
  },
};
</script>
<style>

</style>
