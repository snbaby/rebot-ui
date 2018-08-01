<template>
  <div v-loading="loading">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>验机登记</span>
            <el-button class="btn_template_manual" type="text" @click="openDialog">手动入库</el-button>
            <el-upload
              class="upload"
              show-file-list
              accept="application/vnd.ms-excel"
              action="http://soc.seadun.com:8765/api/file"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              >
              <el-button class="btn_template_auto" type="text">自动入库</el-button>
            </el-upload>
          </div>
          <div>
            <el-dialog title="入库" :visible.sync="dialogForm.visible">
              <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
                <el-form-item label="合同编号" label-width="120px" prop="contract">
                  <el-input v-model="dialogForm.contract" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备类型" label-width="120px" prop="eqType">
                  <el-input v-model="dialogForm.eqType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计算机编号" label-width="120px" prop="eqNos">
                  <el-select
                    style="width: 100%"
                    v-model="dialogForm.eqNos"
                    multiple
                    filterable
                    allow-create
                    default-first-option>
                    <el-option
                      v-for="item in dialogForm.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
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
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column property="contract" label="合同编号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="contractTotal" label="合同总数">
                </el-table-column>
                <el-table-column property="contractConfirmRate" label="完成率">
                </el-table-column>
                <el-table-column property="contractConfirm" label="已完成">
                </el-table-column>
                <el-table-column property="contractUnConfirm" label="剩余">
                </el-table-column>
                <el-table-column property="contractConfirmLastWeek" label="近一周验机数量">
                </el-table-column>
                <el-table-column property="crtTime" label="添加时间">
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.status"
                      active-value="YES"
                      inactive-value="NO"
                      @change="statusChange(scope.row.id, scope.row.status)"
                    >
                    </el-switch>
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

const async = require('async');

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
        contract: '',
        eqType: '',
        eqNos: [],
        options: [],
      },
      rules: {
        contract: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        eqType: [
          { required: true, message: '请输入计算机类型', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        eqNos: [
          { type: 'array', required: true, message: '请输入资产编号', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.queryPage();
  },
  methods: {
    saveDialog() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const self = this;
        const params = {
          contract: self.dialogForm.contract,
          eqType: self.dialogForm.eqType,
          eqNos: self.dialogForm.eqNos,
        };
        api.post('/api/inspection/import', params).then(() => {
          self.queryPage();
          self.$notify.success({
            title: '成功',
            message: '手动导入合同成功',
          });
          self.dialogForm.visible = false;
        });
        return true;
      });
    },
    openDialog() {
      this.dialogForm.visible = true;
      this.dialogForm.contract = '';
      this.dialogForm.eqType = '';
      this.dialogForm.eqNos = [];
      this.dialogForm.options = [];
    },
    handleAvatarSuccess(response, file) {
      this.$notify.success({
        title: '成功',
        message: `上传文件 ${file.name} 成功`,
      });
      this.loading = false;
      this.queryPage();
    },
    beforeAvatarUpload() {
      this.loading = true;
      return true;
    },
    handleAvatarError(err, file) {
      let errMessage = '';
      if (err && Object.prototype.hasOwnProperty.call(err, 'message')) {
        errMessage = JSON.parse(err.message).description;
      } else {
        errMessage = '服务器异常';
      }
      this.$notify.error({
        title: '错误',
        message: `上传文件 ${file.name} 失败，${errMessage}`,
      });

      this.loading = false;
    },
    statusChange(id, status) {
      const self = this;
      api.put(`/api/contract/${id}/${status}`, {}).then(() => {
        self.queryPage();
        self.$notify.success({
          title: '成功',
          message: '更改激活状态成功',
        });
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryPage() {
      const self = this;
      async.waterfall([
        (cbWaterfall) => {
          const params = {
            pageNo: self.pageNo,
            pageSize: self.pageSize,
            contract: '',
            startTime: '',
            endTime: '',
          };
          api.get('/api/contract/page', params).then((res) => {
            self.total = res.content.total;
            self.pageNo = res.content.pageNum;
            cbWaterfall(null, res.content.list);
          });
        },
        (list, cbWaterfall) => {
          async.map(list, (item, cbMap) => {
            async.parallel({
              total: (cbParallel) => {
                const params = {
                  contractId: item.id,
                };
                api.post('/api/contract-detail/count', params).then((res) => {
                  cbParallel(null, res.content.total);
                });
              },
              confirm: (cbParallel) => {
                const params = {
                  contractId: item.id,
                  status: 'YES',
                };
                api.post('/api/contract-detail/count', params).then((res) => {
                  cbParallel(null, res.content.total);
                });
              },
              confirmLastWeek: (cbParallel) => {
                const params = {
                  contractId: item.id,
                  status: 'YES',
                };
                api.post('/api/contract-detail/count/7', params).then((res) => {
                  cbParallel(null, res.content.total);
                });
              },
            }, (err, results) => {
              if (err) {
                cbMap(null);
              } else {
                const itemTemp = item;
                const rate = '%';
                itemTemp.contractTotal = results.total;
                itemTemp.contractConfirm = results.confirm;
                itemTemp.contractUnConfirm = results.total - results.confirm;
                itemTemp.contractConfirmRate = (results.confirm * 100) / results.total;
                itemTemp.contractConfirmRate += `${rate}`;
                itemTemp.contractConfirmLastWeek = results.confirmLastWeek;
                itemTemp.crtTime = utils.dateFormat(itemTemp.crtTime, 'yyyy-MM-dd hh:mm:ss');
                cbMap(null, itemTemp);
              }
            });
          }, (err, results) => {
            if (err) {
              cbWaterfall(err);
            } else {
              cbWaterfall(null, results);
            }
          });
        },
      ], (err, result) => {
        if (!err) {
          self.tableData = result;
        }
      });
    },
  },
};
</script>
<style>

</style>
