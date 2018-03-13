<template>
  <div>
    <el-row >
      <el-col :span="10" align="left">
        <v-echart-line lineId="data_export_line_year"></v-echart-line>
      </el-col>
      <el-col :span="4" align="center">
        <div style="height: 330px;display: table-cell;vertical-align: middle">
          <v-total-img title="历史总验机" number="64518"></v-total-img>
        </div>
      </el-col>
      <el-col :span="10" align="right">
        <v-echart-line lineId="data_export_line_year"></v-echart-line>
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
            <span>数据导出</span>
            <el-button class="btn_inspection_batch_export" type="text">批量导出</el-button>
            <el-button class="btn_inspection_report_export" type="text">导出验机报告</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="二维图形">
                  <template slot-scope="scope">
                    <img style="width: 30px;height: 30px"
                         src="../../../static/default/images/u003.png" />
                  </template>
                </el-table-column>
                <el-table-column property="inspectionTime" label="验机时间"></el-table-column>
                <el-table-column property="equipmentNumber" label="设备统一编号"></el-table-column>
                <el-table-column property="equipmentModel" label="设备型号"></el-table-column>
                <el-table-column property="equipmentName" label="设备名称"></el-table-column>
                <el-table-column property="contractNumber" label="合同编号"></el-table-column>
                <el-table-column property="contractName" label="合同名称"></el-table-column>
                <el-table-column property="equipmentSequenceNumber" label="设备序列号"></el-table-column>
                <el-table-column property="operatingSystem" label="操作系统"></el-table-column>
                <el-table-column property="systemInstallationTime" label="操作系统安装时间">
                </el-table-column>
                <el-table-column property="diskInterface" label="硬盘接口类型"></el-table-column>
                <el-table-column property="diskSerialNumber" label="硬盘序列号"></el-table-column>
                <el-table-column property="diskCapacity" label="硬盘容量"></el-table-column>
                <el-table-column property="macAddress" label="MAC地址"></el-table-column>
                <el-table-column property="memoryType" label="内存类型"></el-table-column>
                <el-table-column property="memoryCapacity" label="内存容量"></el-table-column>
                <el-table-column property="graphicsModel" label="显卡型号"></el-table-column>
                <el-table-column property="diskShellNumber" label="硬盘外壳号"></el-table-column>
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
import vEchartLine from '../../components/chart/EchartLine';
import vDivide from '../../components/framework/Divide';
import vTotalImg from '../../components/framework/TotalImg';

export default {
  data() {
    return {
      tableData: [{
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }, {
        inspectionTime: (new Date()).toLocaleDateString(),
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        equipmentName: 'JPC-001',
        contractNumber: '00123',
        contractName: '#3项目',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
      }],
    };
  },
  components: {
    vEchartLine,
    vDivide,
    vTotalImg,
  },
};
</script>
<style>

</style>
