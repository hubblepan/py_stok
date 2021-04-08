<template>
  <div>
    <el-dialog title="IP校准" :visible.sync="showDialog" width="250px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        highlight-current-row
        @current-change="handleCurrentChange"
        border style="margin: 10px; width: 210px;" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
<!--        <el-table-column fixed="left" width="40" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-radio :label="scope.row.id" v-model="backPoint" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="ip"
          label="ip">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execSelect" size="small" :loading="loadingData">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroNetcardSelect',
  props: ['onSelected'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      nodeInfo: null,
      nodeId: '',
      tableData: [{
        name: '卡1',
        ip: '192.168.4.225',
      }, {
        name: '卡2',
        ip: '192.168.4.226',
      }],
      currentRow: null,
    };
  },
  created() {
  },
  methods: {
    show(nodeInfo) {
      this.showDialog = true;
      this.nodeInfo = nodeInfo;
      this.nodeId = nodeInfo.id;
      this.tableData = [];
      this.execNetcard();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    // 点击本地文件表格的一行
    handleCurrentChange(row) {
      this.currentRow = row;
    },
    execSelect() {
      let data = Object.assign({}, this.nodeInfo);
      data.ip = this.currentRow.ip;
      this.onSelected(api.adjustNodeIp(data, this.currentRow.ip, this.nodeId));
    },

    execNetcard() {
      this.loadingData = true;
      api.geNodeIps(this.nodeId)
        .then(res => {
          this.loadingData = false;
          if (res.data) {
            this.tableData = res.data.map(item => {
              return {ip: item};
            });
          }
        })
        .catch(reason => {
          this.loadingData = false;
          console.log(reason);
        });
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
