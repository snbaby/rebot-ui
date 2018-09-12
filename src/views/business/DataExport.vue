<template>
  <div>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="合同编号">
          <el-select v-model="search.contractId" filterable placeholder="请选择">
            <el-option
              v-for="item in contractOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="search.dateRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据导出</span>
            <el-button :disabled="tableData.length==0 || search.contractId == ''"
                       class="btn_inspection_report_export"
                       @click="exportFile" type="text">
              导出验机报告
            </el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData" stripe>
                <el-table-column fixed type="index" label="序号"></el-table-column>
                <el-table-column fixed label="二维图形">
                  <template slot-scope="scope">
                    <img style="width: 30px;height: 30px"
                         src="../../../static/default/images/u003.png"
                         @click="openImgDialog(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column  label="验机时间">
                  <template slot-scope="scope">
                    {{formate(scope.row.contractDetailUptTime)}}
                  </template>
                </el-table-column>
                <el-table-column property="contract" label="合同编号"></el-table-column>
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
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.computerId!=''" size="small"
                               @click="openDetailDialog(scope.row.computerId, scope.row.eqNo)">
                      详情
                    </el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div>
            <el-dialog
              :title="'资产号-'+imgDialog.eqNo"
              :visible.sync="imgDialog.visible"
              width="550px"
              center>
              <div class="qrcode" id="qrcode" ref="qrcode"></div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeImgDialog">确 定</el-button>
              </span>
            </el-dialog>
          </div>
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
import api from './../../axios/api';
import utils from './../../util/utils';
/* eslint-disable */
import QRCode from 'qrcodejs2';

const async = require('async');

export default {
  components: { QRCode },
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
      search: {
        contractId: '',
        dateRange: [],
      },
      contractOptions: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      imgDialog: {
        visible: false,
        computerId: '',
        eqNo: '',
      },
    };
  },
  created() {
    this.queryContract();
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
    openImgDialog(row) {
      const self = this;
      this.imgDialog.eqNo = row.eqNo;
      this.imgDialog.computerId = row.computerId;

      async.parallel({
        disks: (cb) => {
          const params = {
            computerId: self.imgDialog.computerId,
          };
          api.get('/api/disk/list', params).then((res) => {
            cb(null, res);
          });
        },
        mems: (cb) => {
          const params = {
            computerId: self.imgDialog.computerId,
          };
          api.get('/api/mem/list', params).then((res) => {
            cb(null, res);
          });
        },
        videos: (cb) => {
          const params = {
            computerId: self.imgDialog.computerId,
          };
          api.get('/api/video/list', params).then((res) => {
            cb(null, res);
          });
        },
        macs: (cb) => {
          const params = {
            computerId: self.imgDialog.computerId,
          };
          api.get('/api/net/list', params).then((res) => {
            cb(null, res);
          });
        },
      }, (err, results) => {
        if (!err) {
          row['disks'] = [];
          results.disks.content.forEach(disk => {
            row.disks.push({
              diskCapacity: disk.diskCapacity,
              diskInterfaceType: disk.diskInterfaceType,
              diskShellSn: disk.diskShellSn,
              diskSn: disk.diskSn,
            })
          })
          row['mems'] = [];
          results.mems.content.forEach(mem => {
            row.mems.push({
              memCapacity: mem.memCapacity,
              memType: mem.memCapacity,
            })
          })
          row['videos'] = [];
          results.videos.content.forEach(video => {
            row.videos.push({
              videoType: video.videoType,
            })
          });
          row['macs'] = [];
          results.macs.content.forEach(mac => {
            row.macs.push({
              macAddress: mac.macAddress,
            })
          });

          delete row.computerId;
          delete row.contractDetailId;
          delete row.contractDetailStatus;
          delete row.contractDetailUptTime;
          delete row.contractId;
          delete row.contractStatus;
          delete row.ip;

          self.imgDialog.visible = true;
          self.$nextTick (function () {
            self.qrcode(JSON.stringify(row));
          })
        }
      });
    },
    closeImgDialog() {
      this.imgDialog.visible = false;
      this.imgDialog.eqNo = '';
    },
    exportFile() {
      const self = this;
      let params = '?contractDetailStatus=YES';
      if (self.search.contractId !== '') {
        params += `&contractId=${self.search.contractId}`;
      }
      if (self.search.dateRange && self.search.dateRange.length > 0) {
        params += `&startTime=${self.search.dateRange[0]}`;
        params += `&endTime=${self.search.dateRange[1]}`;
      }
      window.open(`http://soc.seadun.com:8765/api/file${params}`);
    },
    query() {
      this.pageNo = 1;
      this.queryPage();
    },
    formate(crtTime) {
      return utils.dateFormat(crtTime, 'yyyy-MM-dd hh:mm:ss');
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryContract() {
      const self = this;
      self.contractOptions = [];
      self.search.contractId = '';
      const params = {
      };
      api.get('/api/contract/list', params).then((res) => {
        res.content.forEach((contract) => {
          self.contractOptions.push({
            value: contract.id,
            label: contract.contract,
          });
          if (contract.status === 'YES') {
            self.search.contractId = contract.id;
          }
        });
        self.queryPage();
      });
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        contractDetailStatus: 'YES',
      };
      if (self.search.contractId !== '') {
        params.contractId = self.search.contractId;
      }
      if (self.search.dateRange && self.search.dateRange.length > 0) {
        params.startTime = self.search.dateRange[0];
        params.endTime = self.search.dateRange[1];
      }
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
    qrcode (text) {
      document.getElementById('qrcode').innerHTML = '';
      let qrcode = new QRCode('qrcode', {
        render: "canvas",
        width: 400,  // 设置宽度
        height: 400, // 设置高度
        text: text,
        correctLevel: 0,
      })
    },
  },
};
</script>
<style>

</style>
