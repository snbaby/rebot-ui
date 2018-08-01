<template>
  <div :style="{height:height,width:width}" :ref="lineRef">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'vEchartLine',
  props: {
    lineRef: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '528px',
    },
    height: {
      type: String,
      default: '329px',
    },
    xAxisData: {
      type: Array,
      default: () => (['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']),
    },
    seriesData: {
      type: Array,
      default: () => ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]),
    },
    titleName: {
      type: String,
      default: '本周趋势',
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    seriesData(val) {
      if (val && val.length > 0) {
        this.initChart();
      }
    },
  },
  mounted() {
    this.initChart();
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
      this.chart = echarts.init(this.$refs[this.lineRef]);
      const option = {
        title: {
          text: this.titleName,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 45,
            margin: 2,
          },
          data: this.xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        grid: {
          left: 45,
        },
        series: [{
          data: this.seriesData,
          type: 'line',
        }],
      };
      // 把配置和数据放这里
      this.chart.setOption(option);
    },
  },

};
</script>
