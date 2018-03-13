<template>
  <div>
    <el-row >
      <el-col :span="11" align="left" style="border: 1px solid #ddd">
        <v-echart-doughnut height="360px" width="100%"></v-echart-doughnut>
      </el-col>
      <el-col :span="2">
        &nbsp;
      </el-col>
      <el-col :span="11" align="right" style="border: 1px solid #ddd">
        <v-echart-line height="360px" width="100%" lineRef="data_export_line_year"></v-echart-line>
      </el-col>
    </el-row>
    <el-row style="padding-top: 20px">
      <el-col style="border: 1px solid #ddd">
        <v-echart-line height="360px" width="100%" lineRef="data_export_line_year"></v-echart-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vEchartDoughnut from '../../components/chart/EchartDoughnut';
import vEchartLine from '../../components/chart/EchartLine';

export default {
  components: {
    vEchartDoughnut,
    vEchartLine,
  },
};
</script>
<style>

</style>
