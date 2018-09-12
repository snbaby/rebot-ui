<template>
  <div v-loading="loading">
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>日志</span>
          </div>
          <el-row>
            <el-col>
              <el-table :data="tableData">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column property="userName" label="用户名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="message" label="操作" show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="crtTime" label="创建时间">
                  <template slot-scope="scope">
                    {{dateFormat(scope.row.crtTime)}}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../axios/api';
import utils from './../../util/utils';


export default {
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.queryPage();
  },
  methods: {
    dateFormat(time) {
      return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryPage();
    },
    queryPage() {
      const self = this;
      const params = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
      };
      api.get('/api/log/page', params).then((res) => {
        self.total = res.content.total;
        self.pageNo = res.content.pageNum;
        self.tableData = res.content.list;
      });
    },
  },
};
</script>
<style>

</style>
