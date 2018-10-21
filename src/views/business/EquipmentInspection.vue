<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备验机</span>
            <el-button :disabled="tableData.length==0"
                       class="btn_inspection_report_export"
                       @click="start" type="text">
              启动验机
            </el-button>
            <el-button class="btn_template_manual" type="text" @click="queryPage"
                       icon="el-icon-refresh">刷新</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData" stripe>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column property="eqNo" label="设备统一编号"></el-table-column>
                <el-table-column property="eqType" label="设备类型"></el-table-column>
                <el-table-column property="eqModel" label="设备型号"></el-table-column>
                <el-table-column property="eqNo" label="计算机名"></el-table-column>
                <el-table-column property="biosSn" label="设备序列号"></el-table-column>
                <el-table-column property="opSystem" label="操作系统"></el-table-column>
                <el-table-column property="version" label="系统版本号"></el-table-column>
                <el-table-column property="cpu" label="CPU型号"></el-table-column>
                <el-table-column property="opInstallDate" label="操作系统安装时间">
                </el-table-column>
                <el-table-column label="操作" width="140">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="scope.row.computerId!=''"
                               @click="openDetailDialog(scope.row.computerId, scope.row.eqNo)">
                      详情
                    </el-button>
                    <el-button type="text" size="small" v-if="scope.row.computerId!=''"
                               @click="confirm(scope.row.contractDetailId, scope.row.eqNo)">
                      验机
                    </el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">
                      删除
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
    <el-dialog
      :title="detailDialog.title+detailDialog.eqNo"
      :visible.sync="detailDialog.visible"
      width="1150px"
      :before-close="closeDetailDialog">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>硬盘</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="save">保存</el-button>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="disk in detailDialog.disks"
                 :key="disk.id">
          <el-form-item label="序列号:">
            {{disk.diskSn}}
          </el-form-item>
          <el-form-item label="接口:">
            {{disk.diskInterfaceType}}
          </el-form-item>
          <el-form-item label="容量:">
            {{disk.diskCapacity}}
          </el-form-item>
          <el-form-item label="外壳号:">
            <el-input v-model="disk.diskShellSn" placeholder="外壳号"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>内存</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="mem in detailDialog.mems"
                 :key="mem.id">
          <el-form-item label="接口:">
            {{mem.memType}}
          </el-form-item>
          <el-form-item label="容量:">
            {{mem.memCapacity}}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>显卡</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="video in detailDialog.videos"
                 :key="video.id">
          <el-form-item label="型号:">
            {{video.videoType}}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>MAC地址</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="mac in detailDialog.macs"
                 :key="mac.id">
          <el-form-item label="MAC:">
            {{mac.macAddress}}
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import vTotalImg from '../../components/framework/TotalImg';
import vTotalNumber from '../../components/framework/TotalNumber';
import vDivide from '../../components/framework/Divide';
import api from './../../axios/api';

const async = require('async');

export default {
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      detailDialog: {
        title: '详情-',
        visible: false,
        computerId: '',
        eqNo: '',
        disks: [],
        mems: [],
        videos: [],
        macs: [],
      },
    };
  },
  components: {
    vTotalImg,
    vTotalNumber,
    vDivide,
  },
  created() {
    this.queryPage();
  },
  methods: {
    handleDelete(row) {
      const self = this;
      api.del(`/api/contract-detail/${row.contractDetailId}`).then(() => {
        self.queryPage();
        self.$notify.success({
          title: '成功',
          message: `删除设备统一编号${row.eqNo}成功`,
        });
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    start() {
      const self = this;
      const params = {};
      api.get('/api/inspection/start', params).then(() => {
        self.$notify.success({
          title: '成功',
          message: '启动验机成功',
        });
      });
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        contractStatus: 'YES',
        contractDetailStatus: 'NO',
      };
      api.get('/api/inspection/page', params).then((res) => {
        self.total = res.content.total;
        self.pageNo = res.content.pageNum;
        self.tableData = res.content.list;
      });
    },
    confirm(contractDetailId, eqNo) {
      const self = this;
      self.$confirm(`资产${eqNo}确认后将无法进行修改, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const params = {
          id: contractDetailId,
          status: 'YES',
        };
        api.post('/api/contract-detail/change', params).then(() => {
          self.$notify.success({
            title: '成功',
            message: `资产${eqNo}确认成功`,
          });
          self.handleCurrentChange(1);
        });
      }).catch(() => {
      });
    },
    save() {
      const params = {
        disks: this.detailDialog.disks,
      };
      api.put('/api/disk/update', params).then(() => {
      });
    },
    openDetailDialog(computerId, eqNo) {
      const self = this;
      this.detailDialog.visible = true;
      this.detailDialog.computerId = computerId;
      this.detailDialog.eqNo = eqNo;
      this.detailDialog.disks = [];
      this.detailDialog.mems = [];
      this.detailDialog.videos = [];
      this.detailDialog.macs = [];
      async.parallel({
        disks: (cb) => {
          const params = {
            computerId: self.detailDialog.computerId,
          };
          api.get('/api/disk/list', params).then((res) => {
            cb(null, res);
          });
        },
        mems: (cb) => {
          const params = {
            computerId: self.detailDialog.computerId,
          };
          api.get('/api/mem/list', params).then((res) => {
            cb(null, res);
          });
        },
        videos: (cb) => {
          const params = {
            computerId: self.detailDialog.computerId,
          };
          api.get('/api/video/list', params).then((res) => {
            cb(null, res);
          });
        },
        macs: (cb) => {
          const params = {
            computerId: self.detailDialog.computerId,
          };
          api.get('/api/net/list', params).then((res) => {
            cb(null, res);
          });
        },
      }, (err, results) => {
        if (!err) {
          this.detailDialog.disks = results.disks.content;
          this.detailDialog.mems = results.mems.content;
          this.detailDialog.videos = results.videos.content;
          this.detailDialog.macs = results.macs.content;
        }
      });
    },
    closeDetailDialog() {
      this.detailDialog = {
        title: '详情-',
        visible: false,
        computerId: '',
        eqNo: '',
        disks: [],
        mems: [],
        videos: [],
        macs: [],
      };
    },
  },
};
</script>
<style>

</style>
