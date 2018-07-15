<template>
  <div>
    <el-row>
      <el-col :span="8">
        <v-total-img title="当前待验机总数" number="245"></v-total-img>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': '#000000' }"
                      title="已验" number="9">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                        title="在验" number="1">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': '#000000' }"
                        title="已确认" number="6">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                        title="待确认" number="3">
        </v-total-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <v-divide></v-divide>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备验机</span>
            <el-button class="btn_template_create" type="text">开始验机</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData" stripe>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column property="eqNo" label="设备统一编号"></el-table-column>
                <el-table-column property="eqType" label="设备型号"></el-table-column>
                <el-table-column property="eqNo" label="计算机名"></el-table-column>
                <el-table-column property="biosSn" label="设备序列号"></el-table-column>
                <el-table-column property="opSystem" label="操作系统"></el-table-column>
                <el-table-column property="cpuModel" label="CPU型号"></el-table-column>
                <el-table-column property="opInstallDate" label="操作系统安装时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text"
                               @click="openDetailDialog(scope.row.computerId, scope.row.eqNo)">
                      详情
                    </el-button>
                    <el-button type="text">确认</el-button>
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
          <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
        </div>
        <el-form :inline="true" class="demo-form-inline" v-for="disk in detailDialog.disks"
                 :key="disk.id">
          <el-form-item label="序列号">
            <el-input v-model="disk.diskSn" placeholder="序列号"></el-input>
          </el-form-item>
          <el-form-item label="接口">
            <el-input v-model="disk.diskSn" placeholder="接口"></el-input>
          </el-form-item>
          <el-form-item label="容量">
            <el-input v-model="disk.diskSn" placeholder="容量"></el-input>
          </el-form-item>
          <el-form-item label="外壳号">
            <el-input v-model="disk.diskSn" placeholder="外壳号"></el-input>
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
        disks: [{
          id: '1',
          diskSn: 'diskSn',
          diskInterfaceType: 'diskInterfaceType',
          diskCapacity: 'diskCapacity',
          diskShellSn: 'diskShellSn',
        }, {
          id: '2',
          diskSn: 'diskSn',
          diskInterfaceType: 'diskInterfaceType',
          diskCapacity: 'diskCapacity',
          diskShellSn: 'diskShellSn',
        }],
        mems: [{
          id: '1',
          memSn: 'memSn',
          memType: 'memType',
          memCapacity: 'memCapacity',
        }, {
          id: '1',
          memSn: 'memSn',
          memType: 'memType',
          memCapacity: 'memCapacity',
        }],
        videos: [{
          id: '1',
          videoSn: 'videoSn',
          videoType: 'videoType',
        }, {
          id: '1',
          videoSn: 'videoSn',
          videoType: 'videoType',
        }],
        macs: [{
          id: '1',
          macAddress: 'macAddress',
        }, {
          id: '1',
          macAddress: 'macAddress',
        }],
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
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        contractStatus: 'YES',
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
