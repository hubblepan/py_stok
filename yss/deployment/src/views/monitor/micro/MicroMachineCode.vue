<template>
  <!-- 新增服务器 -->
  <el-dialog title="机器码" :visible.sync="showDialog" width="550px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-table
      ref="table"
      :data="tableData"
      v-loading="loadingData"
      border style="margin: 10px; width: 500px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
      <el-table-column
        prop="ip"
        label="ip地址"
        width="150">
      </el-table-column>
      <el-table-column
        prop="value"
        label="机器码">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="execAdd" size="small">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/micro_service_api';

export default {
  name: 'MicroMachineCode',
  props: ['onAdded'],
  created() {
  },
  data() {
    return {
      loadingData: false,
      tableData: [],
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    show(ipList) {
      this.showDialog = true;
      this.tableData = [];
      this.loadingData = true;
      api.getMachineCode(ipList)
        .then(res => {
          this.loadingData = false;
          let tableData = [];
          res.data.forEach(item => {
            let tableItem = {};
            let itemArr = item.split(':');
            tableItem.ip = itemArr[0];
            tableItem.value = itemArr[1];
            tableData.push(tableItem);
          });
          this.tableData = tableData;
        })
        .catch(reason => {
          this.loadingData = false;
          console.log(reason);
        });
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    showLoading() {
      this.loading = true;
    },
    execAdd() {
      this.close();
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: white;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }
</style>
