<template>
  <div>
    <el-row >
      <el-col :span="11" align="left" style="border: 1px solid #ddd">
        <v-echart-doughnut height="360px" width="100%"
                           :doughnutData="doughnutData"></v-echart-doughnut>
      </el-col>
      <el-col :span="2">
        &nbsp;
      </el-col>
      <el-col :span="11" align="right" style="border: 1px solid #ddd">
        <v-echart-line height="360px" width="100%" lineRef="data_export_line_year"
                       titleName="本周趋势">
        </v-echart-line>
      </el-col>
    </el-row>
    <el-row style="padding-top: 20px">
      <el-col style="border: 1px solid #ddd">
        <v-echart-line height="360px" width="100%" lineRef="data_export_line_year" titleName="本月趋势">
        </v-echart-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vEchartDoughnut from '../../components/chart/EchartDoughnut';
import vEchartLine from '../../components/chart/EchartLine';
import api from './../../axios/api';

const _ = require('underscore');

export default {
  components: {
    vEchartDoughnut,
    vEchartLine,
  },
  data() {
    return {
      seriesData: [820, 932, 901, 934, 1290, 1330, 1320],
      doughnutData: {
        data: [],
        formatter: (name) => {
          const result = _.find(this.doughnutData.data, item => _.isEqual(item.name, name));
          return (`合同号：${result.name}  `);
        },
      },
    };
  },
  created() {
    this.initContract();
  },
  methods: {
    initContract() {
      const params = {
        startTime: '2018-07-01 00:00:00',
      };
      api.get('/api/contract/list/time', params).then((res) => {
        res.content.forEach(() => {
        });
      });
      setTimeout(() => {
        this.doughnutData.data = [{
          name: '司信息(16)',
          value: 50,
          finished: 50,
          unfinished: 50,
          finishedRate: '50%',
        }, {
          name: '司信息(17)',
          value: 50,
          finished: 50,
          unfinished: 50,
          finishedRate: '50%',
        }, {
          name: '司信息(18)',
          value: 50,
          finished: 50,
          unfinished: 50,
          finishedRate: '50%',
        }, {
          name: '司信息(19)',
          value: 50,
          finished: 50,
          unfinished: 50,
          finishedRate: '50%',
        }];
      }, 2000);
    },
  },
};
</script>
<style>

</style>
