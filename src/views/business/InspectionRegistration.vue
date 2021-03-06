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
            <el-button class="btn_template_manual" type="text" @click="queryPage"
                       icon="el-icon-refresh">刷新</el-button>
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
                <el-form-item label="设备型号" label-width="120px" prop="eqModel">
                  <el-input v-model="dialogForm.eqModel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计算机编号" label-width="120px" prop="eqNoStart">
                  <el-input placeholder="起始编号" v-model.number="dialogForm.eqNoStart" class="input-with-input">
                    <el-input slot="prepend" v-model="prepend" placeholder="请输入前缀"></el-input>
                  </el-input>
                </el-form-item>
                <el-form-item label-width="120px" prop="eqNoEnd">
                  <el-input placeholder="结束编号" v-model.number="dialogForm.eqNoEnd" class="input-with-input">
                    <el-input slot="prepend" v-model="prepend" placeholder="请输入前缀"></el-input>
                  </el-input>
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
                <el-table-column property="eqModel" label="设备型号" show-overflow-tooltip>
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
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">
                      删除
                    </el-button>
                    <el-button @click="handleExport(scope.row)" type="text" size="small">
                      导出
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

const async = require('async');

export default {
  data() {
    return {
      prepend: 'DA' + this.getDate(),
      select: '',
      input5: '',
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      dialogForm: {
        visible: false,
        contract: '',
        eqType: '',
        eqModel: '',
        eqNoStart: '',
        eqNoEnd: '',
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
        eqModel: [
          { required: true, message: '请输入计算机型号', trigger: 'blur' },
          { max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur' },
        ],
        eqNoStart: [
          { required: true, message: '请输入起始资产编号', trigger: 'blur' },
          { type: 'number', max: 999, message: '资产编号只能为数字,且最大只能为999', trigger: 'blur' },
        ],
        eqNoEnd: [
          { required: true, message: '请输入结束资产编号', trigger: 'blur' },
          { type: 'number', max: 999, message: '资产编号只能为数字,且最大只能为999', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.queryPage();
    this.getDate()
  },
  methods: {
    getDate(){
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();
      String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
      String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
      var yyyyMMdd = curr_year + "" + curr_month +""+ curr_date;
      return yyyyMMdd;
    },
    handleDelete(row) {
      const self = this;
      self.$confirm(`删除合同编号${row.contract}将无法进行恢复, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        api.del(`/api/contract/${row.id}`).then(() => {
          self.queryPage();
          self.$notify.success({
            title: '成功',
            message: `删除合同编号${row.contract}成功`,
          });
        });
      }).catch(() => {
      });
    },
    handleExport(row) {
      window.open(`http://soc.seadun.com:8765/api/file/contract?contractId=${row.id}`);
    },
    saveDialog() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const eqNosArray = [];
        if (self.dialogForm.eqNoStart > self.dialogForm.eqNoEnd) {
          const temp = self.dialogForm.eqNoStart;
          self.dialogForm.eqNoStart = self.dialogForm.eqNoEnd;
          self.dialogForm.eqNoEnd = temp;
        }

        for (let i = self.dialogForm.eqNoStart; i <= self.dialogForm.eqNoEnd; i += 1) {
          if (i < 10) {
            eqNosArray.push(`${self.prepend}00${i}`);
          } else if (i >= 10 && i <= 99) {
            eqNosArray.push(`${self.prepend}0${i}`);
          } else if (i >= 100 && i <= 999) {
            eqNosArray.push(`${self.prepend}${i}`);
          }
        }
        const params = {
          contract: self.dialogForm.contract,
          eqType: self.dialogForm.eqType,
          eqModel: self.dialogForm.eqModel,
          eqNos: eqNosArray,
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
      this.dialogForm.eqModel = '';
      this.dialogForm.eqNoStart = '';
      this.dialogForm.eqNoEnd = '';
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
              eqModel: (cbParallel) => {
                const params = {
                };
                api.get(`/api/contract-detail/contract/${item.id}`, params).then((res) => {
                  cbParallel(null, res.content);
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
                itemTemp.contractConfirmRate = ((results.confirm * 100) / results.total).toFixed(2);
                itemTemp.contractConfirmRate += `${rate}`;
                itemTemp.contractConfirmLastWeek = results.confirmLastWeek;
                itemTemp.crtTime = utils.dateFormat(itemTemp.crtTime, 'yyyy-MM-dd hh:mm:ss');
                itemTemp.eqModel = results.eqModel;
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
  .input-with-input .el-input {
    width: 130px;
  }
  .input-with-input .el-input-group__prepend {
    background-color: #fff;
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
