<template>
  <div>
    <el-row>
      <el-col :span="8">
        <v-total-img title="当前待验机总数" number="245"></v-total-img>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': '#000000' }"
                      title="已验" number="9">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                        title="在验" number="1">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': '#000000' }"
                        title="已确认" number="6">
        </v-total-number>
      </el-col>
      <el-col :span="4" >
        <v-total-number :bgColor="{ 'background-color': 'rgba(45, 182, 244, 1)' }"
                        title="待确认" number="3">
        </v-total-number>
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
            <span>设备验机</span>
            <el-button class="btn_template_create" type="text">开始验机</el-button>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column property="equipmentNumber" label="设备统一编号"></el-table-column>
                <el-table-column property="equipmentModel" label="设备型号"></el-table-column>
                <el-table-column property="computerName" label="计算机名"></el-table-column>
                <el-table-column property="equipmentSequenceNumber" label="设备序列号"></el-table-column>
                <el-table-column property="operatingSystem" label="操作系统"></el-table-column>
                <el-table-column property="cpuModel" label="CPU型号"></el-table-column>
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
                <el-table-column property="status" label="状态"></el-table-column>
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
import vTotalNumber from '../../components/framework/TotalNumber';
import vDivide from '../../components/framework/Divide';

export default {
  data() {
    return {
      tableData: [{
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }, {
        equipmentNumber: 'JPC-001',
        equipmentModel: 'Dell-R1301',
        computerName: 'JPC-004',
        equipmentSequenceNumber: 'SN21.46363L',
        operatingSystem: 'Windows 7',
        cpuModel: 'AMD',
        systemInstallationTime: (new Date()).toLocaleDateString(),
        diskInterface: 'USB3.0',
        diskSerialNumber: 'SN21.4263363L',
        diskCapacity: '50G',
        macAddress: '00-01-6C-06-A6-29',
        memoryType: 'DDR3',
        memoryCapacity: '8G',
        graphicsModel: 'NVIDIA',
        diskShellNumber: '1546784523784',
        status: '0',
      }],
    };
  },
  components: {
    vTotalImg,
    vTotalNumber,
    vDivide,
  },
};
</script>
<style>

</style>
