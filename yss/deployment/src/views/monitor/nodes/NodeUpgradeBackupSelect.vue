<template>
  <!-- 获取节点上的升级文件 -->
  <el-dialog title="选择回滚时间" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-table :data="tableData" border style="margin: 0 20px 10px 10px; width:540px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData">
      <el-table-column fixed="left" width="40" align="center">
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.time"
            v-model="selectTime"
            @change.native="handleClickRow(scope.row)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column property="time" label="回退点"></el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeAddWarRemote',
  props: ['onAdded'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      tomcatId: '',
      index: 0,
      selectTime: '',
      tableData: [],
      tableItem: {
        id: 0,
        time: '',
      },
    };
  },
  created() {
    // this.execListWar();
  },
  methods: {
    show(tomcatId, index) {
      this.showDialog = true;
      this.tomcatId = tomcatId;
      this.index = index;
      this.selectTime = '';
      this.tableData = [];
      this.execListBackup();
    },
    close() {
      this.showDialog = false;
    },
    handleClickRow(row, event, column) {
      this.selectTime = row.time;
    },

    execAdd() {
      if (this.selectTime) {
        this.onAdded(this.selectTime, this.index); // 将选择的war包传给调用者
        this.close();
      } else {
        this.$alert('请选择一个回退时间点', {type: 'error'});
      }
    },
    execListBackup() {
      this.loadingData = true;
      api.getBackupOfAll([this.tomcatId])
        .then(res => {
          this.loadingData = false;
          if (res.data && res.data.length > 0) {
            if (res.data[0]['backUpTime']) {
              let tableData = [];
              res.data[0]['backUpTime'].forEach((item, index) => {
                tableData.push({id: index, time: item});
              });
              this.tableData = tableData;
            }
          }
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
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
    background-color: #F5F7FA;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }
</style>
