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
        <v-echart-line :xAxisData="weekXAxisData" :seriesData="weekSeriesData"
                       height="360px" width="100%" lineRef="data_export_line_year"
                       titleName="本周趋势">
        </v-echart-line>
      </el-col>
    </el-row>
    <el-row style="padding-top: 20px">
      <el-col style="border: 1px solid #ddd">
        <v-echart-line :xAxisData="monthXAxisData" :seriesData="monthSeriesData"
                       height="360px" width="100%" lineRef="data_export_line_year" titleName="本月趋势">
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
const async = require('async');

export default {
  components: {
    vEchartDoughnut,
    vEchartLine,
  },
  data() {
    return {
      weekXAxisData: [],
      weekSeriesData: [],
      monthXAxisData: [],
      monthSeriesData: [],
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
    this.initVerfiedWeek();
    this.initVerfiedMonth();
  },
  methods: {
    initContract() {
      const self = this;
      self.doughnutData.data = [];
      async.waterfall([
        (cbWaterfall) => {
          const params = {
            pageNo: 1,
            pageSize: 1000,
            contract: '',
            startTime: '',
            endTime: '',
          };
          api.get('/api/contract/page', params).then((res) => {
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
          const tempResult = [];
          result.forEach((item) => {
            tempResult.push({
              name: item.contract,
              value: item.contractConfirm,
              finished: item.contractConfirm,
              unfinished: item.contractUnConfirm,
              finishedRate: item.contractConfirmRate,
            });
          });
          self.doughnutData.data = tempResult;
        }
      });
    },
    initVerfiedWeek() {
      const self = this;
      const date = new Date();
      const thisDay = date.getDay();

      const dayArray = [];
      const dateParams = [];

      for (let i = 0; i < thisDay; i += 1) {
        dayArray.push(i + 1);
        dateParams.push({
          startTime: `${this.getWeek(i)} 00:00:00`,
          endTime: `${this.getWeek(i)} 23:59:59`,
          status: 'YES',
        });
      }

      async.map(dateParams, (param, cbMap) => {
        api.get('/api/contract-detail/count/time', param).then((res) => {
          cbMap(null, res.content.total);
        });
      }, (err, results) => {
        if (!err) {
          self.weekXAxisData = dayArray;
          self.weekSeriesData = results;
        }
      });
    },
    initVerfiedMonth() {
      const self = this;
      const date = new Date();
      const thisDate = date.getDate();

      const dayArray = [];
      const dateParams = [];

      for (let i = 0; i < thisDate; i += 1) {
        dayArray.push(i + 1);
        dateParams.push({
          startTime: `${this.getMonth(i)} 00:00:00`,
          endTime: `${this.getMonth(i)} 23:59:59`,
          status: 'YES',
        });
      }

      async.map(dateParams, (param, cbMap) => {
        api.get('/api/contract-detail/count/time', param).then((res) => {
          cbMap(null, res.content.total);
        });
      }, (err, results) => {
        if (!err) {
          self.monthXAxisData = dayArray;
          self.monthSeriesData = results;
        }
      });
    },
    getWeek(i) {
      const now = new Date();
      const firstDay = new Date(now - ((now.getDay() - 1) * 86400000));
      firstDay.setDate(firstDay.getDate() + i);
      const mon = Number(firstDay.getMonth()) + 1;
      return `${now.getFullYear()}-${mon}-${firstDay.getDate()}`;
    },
    getMonth(i) {
      const now = new Date();
      const firstDay = new Date(now - ((now.getDate() - 1) * 86400000));
      firstDay.setDate(firstDay.getDate() + i);
      const mon = Number(firstDay.getMonth()) + 1;
      return `${now.getFullYear()}-${mon}-${firstDay.getDate()}`;
    },
  },
};
</script>
<style>

</style>
