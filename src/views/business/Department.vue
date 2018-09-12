<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门管理</span>
        <el-button class="btn_template_manual" type="text" @click="openDialog">添加部门</el-button>
      </div>
      <el-row>
        <el-col>
          <el-tree
            :data="departmentTree"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => edit(node, data)">
                  编辑
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
    <div>
      <el-dialog title="添加部门" :visible.sync="dialogForm.visible">
        <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
          <el-form-item label="上级部门名称：" label-width="120px" v-if="dialogForm.parentName.length>0">
            {{dialogForm.parentName}}
          </el-form-item>
          <el-form-item label="部门名称：" label-width="120px" prop="name">
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
      <el-dialog title="修改部门" :visible.sync="editForm.visible">
        <el-form :model="editForm" :rules="rules" ref="ruleForm">
          <el-form-item label="部门名称：" label-width="120px" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editForm.visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEditDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from './../../axios/api';

export default {
  data() {
    return {
      loading: false,
      departmentTree: [],
      dialogForm: {
        visible: false,
        parentId: '',
        parentName: '',
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
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    openDialog() {
      this.dialogForm.visible = true;
      this.dialogForm.parentId = '';
      this.dialogForm.parentName = '';
      this.dialogForm.name = '';
      this.dialogForm.id = '';
    },
    append(data) {
      this.dialogForm.visible = true;
      this.dialogForm.parentId = data.id;
      this.dialogForm.parentName = data.label;
      this.dialogForm.name = '';
      this.dialogForm.id = '';
    },
    edit(node, data) {
      this.editForm.visible = true;
      this.editForm.name = data.label;
      this.editForm.id = data.id;
    },
    remove(node, data) {
      const self = this;
      api.del(`/api/department/${data.id}`).then(() => {
        self.$notify.success({
          title: '成功',
          message: '删除部门成功',
        });
        self.init();
      });
    },
    init() {
      api.get('/api/department/tree', {}).then((res) => {
        this.departmentTree = res.content;
      });
    },
    saveDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const params = {
          parentId: self.dialogForm.parentId,
          name: this.dialogForm.name,
        };
        api.post('/api/department/add', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '添加部门或单位成功',
          });
          self.init();
          this.dialogForm.visible = false;
        });
        return true;
      });
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
        api.put('/api/department/edit', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: '修改部门或单位成功',
          });
          self.init();
          this.editForm.visible = false;
        });
        return true;
      });
    },
  },
};
</script>

<style>

</style>
