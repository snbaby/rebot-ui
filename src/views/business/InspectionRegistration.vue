<template>
  <div>
    <el-row>
      <el-col :span="8">
        <v-total-img title="当前待验机总数" number="245"></v-total-img>
      </el-col>
      <el-col :span="8" align="middle">
        <v-total-rate :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                      title="已完成" number="189" rate="61%">
        </v-total-rate>
      </el-col>
      <el-col :span="8" align="right">
        <v-total-rate :bgColor="{ 'background-color': '#000000' }"
                      title="未完成" number="56" rate="39%">
        </v-total-rate>
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
            <span>验机登记</span>
            <el-upload
              class="upload"
              show-file-list
              accept="application/vnd.ms-excel"
              action="http://soc.seadun.com:8765/api/file"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              >
              <el-button class="btn_template_create" type="text">入库</el-button>
            </el-upload>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column property="contractNumber" label="合同编号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="contractName" label="合同名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="contractTotal" label="合同总数">
                </el-table-column>
                <el-table-column property="contractArrived" label="到货情况">
                </el-table-column>
                <el-table-column property="finishedRate" label="完成率">
                </el-table-column>
                <el-table-column property="finished" label="已完成">
                </el-table-column>
                <el-table-column property="unfinished" label="剩余">
                </el-table-column>
                <el-table-column property="finishedWeek" label="近一周验机数量">
                </el-table-column>
                <el-table-column property="crtTime" label="添加时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-pagination
                layout="total, prev, pager, next"
                :total="10">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vTotalImg from '../../components/framework/TotalImg';
import vTotalRate from '../../components/framework/TotalRate';
import vDivide from '../../components/framework/Divide';
import api from './../../axios/api';

export default {
  data() {
    return {
      tableData: [{
        contractNumber: '0001',
        contractName: '办公大楼30#项目',
        contractTotal: '110',
        contractArrived: '100',
        finishedRate: '90%',
        finished: '90',
        unfinished: '10',
        finishedWeek: '78',
        crtTime: (new Date()).toLocaleDateString(),
      }],
    };
  },
  components: {
    vTotalImg,
    vTotalRate,
    vDivide,
  },
  created() {
    this.queryPage();
  },
  methods: {
    handleAvatarSuccess(response, file) {
      this.$notify.success({
        title: '成功',
        message: `上传文件 ${file.name} 成功`,
      });
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
    },
    queryPage() {
      const params = {
        pageNo: 0,
        pageSize: 10,
        contract: '',
        startTime: '',
        endTime: '',
      };
      api.get('/contract/page', params).then((res) => {
        console.log('res',res);
      });
    },
  },
};
</script>
<style>

</style>
