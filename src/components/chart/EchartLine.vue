<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="line">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  props: {
    className: {
      type: String,
      default: 'yourClassName',
    },
    id: {
      type: String,
      default: 'yourID',
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '500px',
    },
  },
  data() {
    return {
      chart: null,
    };
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
      this.chart = echarts.init(this.$refs.line);
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        }],
      };
      // 把配置和数据放这里
      this.chart.setOption(option);
    },
  },
};
</script>
