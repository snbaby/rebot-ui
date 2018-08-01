<template>
  <div :style="{height:height,width:width}" ref="doughnutRef">
  </div>
</template>

<script>
import echarts from 'echarts';

const _ = require('underscore');

export default {
  name: 'vEchartDoughnut',
  props: {
    doughnutRef: {
      type: String,
      default: 'doughnutRef',
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '360px',
    },
    doughnutData: {
      type: Object,
      default: () => {
        const dataResult = [{
          name: '司信息(15)',
          value: 50,
          finished: 50,
          unfinished: 50,
          finishedRate: '50%',
        }, {
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
        return {
          data: dataResult,
          formatter: (name) => {
            const result = _.find(dataResult, item => _.isEqual(item.name, name));
            return (`合同号：${result.name}  `);
          },
        };
      },
    },
  },
  watch: {
    'doughnutData.data': function (val) {
      if (val && val.length > 0) {
        this.initChart();
      }
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs[this.doughnutRef]);
      const option = {
        title: {
          text: '本月合同验机情况',
          x: 'left',
        },
        tooltip: {
          trigger: 'item',
          formatter: '合同号：{b} <br/> 验机数：{c} <br/>',
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          x: '55%',
          formatter: this.doughnutData.formatter,
          data: _.pluck(this.doughnutData.data, 'name'),
        },
        series: [
          {
            center: ['30%', '50%'],
            name: '信息',
            type: 'pie',
            radius: ['30%', '45%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.doughnutData.data,
          },
        ],
      };
      // 把配置和数据放这里
      this.chart.setOption(option);
    },
  },
};
</script>
