<template>
  <div v-loading="loading">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色管理</span>
            <el-button class="btn_template_manual" type="text" @click="openDialog">新增角色</el-button>
          </div>
          <div>
            <el-dialog title="新增角色" :visible.sync="dialogForm.visible">
              <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" label-width="120px" prop="name">
                  <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveDialog">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div>
            <el-dialog title="修改角色" :visible.sync="editForm.visible">
              <el-form :model="editForm" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" label-width="120px" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
                <el-table-column property="name" label="角色名称" show-overflow-tooltip>
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
        name: '',
        id: '',
      },
      editForm: {
        visible: false,
        name: '',
        id: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.queryPage();
  },
  methods: {
    dateFormat(time) {
      return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
    },
    handleDelete(row) {
      const self = this;
      api.del(`/api/role/${row.id}`).then(() => {
        self.pageNo = 1;
        self.pageSize = 10;
        self.total = 0;
        self.queryPage();
        self.$notify.success({
          title: '成功',
          message: `删除角色${row.name}成功`,
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
          name: this.dialogForm.name,
        };
        api.post('/api/role/add', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '添加角色成功',
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
      this.dialogForm.name = '';
    },
    saveEditDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const params = {
          id: self.editForm.id,
          name: self.editForm.name,
        };
        api.put('/api/role/edit', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '修改角色成功',
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
      this.editForm.name = row.name;
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
      api.get('/api/role/page', params).then((res) => {
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
