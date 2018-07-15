<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据导出</span>
            <el-button class="btn_inspection_batch_export" type="text">批量导出</el-button>
            <el-button class="btn_inspection_report_export" type="text">导出验机报告</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData" stripe>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="二维图形">
                  <template slot-scope="scope">
                    <img style="width: 30px;height: 30px"
                         src="../../../static/default/images/u003.png" />
                  </template>
                </el-table-column>
                <el-table-column property="inspectionTime" label="验机时间"></el-table-column>
                <el-table-column property="contract" label="合同编号"></el-table-column>
                <el-table-column property="eqNo" label="设备统一编号"></el-table-column>
                <el-table-column property="eqType" label="设备型号"></el-table-column>
                <el-table-column property="eqNo" label="计算机名"></el-table-column>
                <el-table-column property="biosSn" label="设备序列号"></el-table-column>
                <el-table-column property="opSystem" label="操作系统"></el-table-column>
                <el-table-column property="cpu" label="CPU型号"></el-table-column>
                <el-table-column property="opInstallDate" label="操作系统安装时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.computerId!=''"
                               @click="openDetailDialog(scope.row.computerId, scope.row.eqNo)">
                      详情
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
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="disk in detailDialog.disks"
                 :key="disk.id">
          <el-form-item label="序列号">
            {{disk.diskSn}}
          </el-form-item>
          <el-form-item label="接口">
            {{disk.diskInterfaceType}}
          </el-form-item>
          <el-form-item label="容量">
            {{disk.diskCapacity}}
          </el-form-item>
          <el-form-item label="外壳号">
            {{disk.diskShellSn}}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>内存</span>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="mem in detailDialog.mems"
                 :key="mem.id">
          <el-form-item label="序列号:">
            {{mem.memSn}}
          </el-form-item>
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
          <el-form-item label="序列号:">
            {{video.videoSn}}
          </el-form-item>
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
import api from './../../axios/api';

const async = require('async');

export default {
  data() {
    return {
      // xAxisDataYear: ['1', '2', '3', '4', '5', '6', '7'],
      // seriesDataYear: [820, 932, 901, 934, 1290, 1330, 1320],
      tableData: [{
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }],
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
  created() {
    this.queryPage();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        contractDetailStatus: 'YES',
      };
      api.get('/api/inspection/page', params).then((res) => {
        self.total = res.content.total;
        self.pageNo = res.content.pageNum;
        self.tableData = res.content.list;
      });
    },
    openDetailDialog(computerId, eqNo) {
      const self = this;
      this.detailDialog.visible = true;
      this.detailDialog.computerId = computerId;
      this.detailDialog.eqNo = eqNo;
      async.parallel({
        disks: (cb) => {
          const params = {
            computerId: self.computerId,
          };
          api.get('/api/disk/list', params).then((res) => {
            cb(null, res);
          });
        },
        mems: (cb) => {
          const params = {
            computerId: self.computerId,
          };
          api.get('/api/mem/list', params).then((res) => {
            cb(null, res);
          });
        },
        videos: (cb) => {
          const params = {
            computerId: self.computerId,
          };
          api.get('/api/video/list', params).then((res) => {
            cb(null, res);
          });
        },
        macs: (cb) => {
          const params = {
            computerId: self.computerId,
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
