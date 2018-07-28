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
            <el-dialog title="入库" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="合同编号" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备类型" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计算机编号" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    };
  },
  created() {
    this.queryPage();
  },
  methods: {
    openDialog() {
      this.dialogFormVisible = true;
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
