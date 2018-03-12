<template>
  <div>
    <el-row>
      <el-col :span="8">
        <v-total-img></v-total-img>
      </el-col>
      <el-col :span="8">
        <v-total-rate :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"></v-total-rate>
      </el-col>
      <el-col :span="8">
        <v-total-rate :bgColor="{ 'background-color': '#000000' }"></v-total-rate>
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
            <span>应用</span>
            <el-button >创建</el-button>
          </div>
        <el-table :data="tableData">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            property="date"
            label="日期"
            >
          </el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            property="address"
            label="地址">
          </el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vTotalImg from '../../components/framework/TotalImg';
import vTotalRate from '../../components/framework/TotalRate';
import vDivide from '../../components/framework/Divide';

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  components: {
    vTotalImg,
    vTotalRate,
    vDivide,
  },
};
</script>
<style scoped>

</style>
