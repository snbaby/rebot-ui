<template>
  <div>
    <el-row>
      <el-col :span="8">
        <v-total-img title="模板总数" number="10"></v-total-img>
      </el-col>
      <el-col :span="8" align="middle">
        <v-total-rate :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                      title="总完成率" number="10" rate="0%">
        </v-total-rate>
      </el-col>
      <el-col :span="8" align="right">
        <v-total-rate :bgColor="{ 'background-color': '#000000' }"
                      title="总未完成率" number="10" rate="100%">
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
            <span>操作系统模板</span>
            <el-button class="btn_template_create" type="text">创建</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column
                  property="brandModel"
                  label="品牌型号"
                >
                </el-table-column>
                <el-table-column
                  property="templateVersion"
                  label="操作系统版本"
                >
                </el-table-column>
                <el-table-column
                  property="templateAddress"
                  label="路径">
                </el-table-column>
                <el-table-column
                  property="templateStatus"
                  label="状态">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.templateStatus"
                      active-value="1"
                      inactive-value="0">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
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

export default {
  data() {
    return {
      tableData: [{
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '1',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '0',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '1',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '0',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '1',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '0',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '1',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '0',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '1',
      }, {
        brandModel: 'Dell-R1308',
        templateVersion: 'Windows 64 旗舰版',
        templateAddress: '/user/mode/windows64.iso',
        templateStatus: '0',
      }],
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
