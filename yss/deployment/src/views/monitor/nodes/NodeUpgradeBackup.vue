<template>
  <div>
    <el-dialog title="回退" :visible.sync="showDialog" width="795px">
      <el-table
        :data="tableData"
        border style="margin: 10px; width: 98%" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="name"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tomcatInfo.tomcatDir"
          label="选择的tomcat地址">
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          prop="backupTime"
          label="回退点">
          <template slot-scope="scope">
            <span v-if="scope.row.backupTime !== ''">{{scope.row.backupTime}}</span>
            <el-button @click="handleSelectBackup(scope.$index, scope.row)" size="mini" type="danger" plain v-if="scope.row.backupTime === ''">选择回退点</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button @click="handleReset" size="small">重置</el-button>
        <el-button type="primary" @click="handleBackup" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--回滚选择-->
    <node-upgrade-backup-select :on-added="onBackupSelected" ref="BackupSelect"></node-upgrade-backup-select>
  </div>

</template>

<script>
import NodeUpgradeBackupSelect from './NodeUpgradeBackupSelect';
import * as api from '../api/node_upgrade_api';
import * as deployApi from '../api/node_deploy_api';
export default {
  name: 'NodeUpgradeBackup',
  components: {
    NodeUpgradeBackupSelect,
  },
  props: ['onRollback'],
  data() {
    return {
      showDialog: false,
      tableData: [],
      tableItem: {
        name: '', // 节点名称
        ip: '', // 节点ip
        id: '', // 节点id
        singleZip: '', // 独立升级包
        tomcatInfo: {
          id: '',
          deployStatus: '', // 部署状态
          runningStatus: '', // 运行状态
          tomcatDir: '', // tomcatDir
        },
        backupTime: '',
      },
    };
  },
  created() {
  },
  methods: {
    show(data) {
      this.showDialog = true;
      this.tableData = data;
      this.tableData.forEach((item, index) => {
        item.backupTime = '';
      });
    },
    close() {
      this.showDialog = false;
    },

    onBackupSelected(selectTime, index) {
      // do nothing
      this.tableData[index].backupTime = selectTime;
    },
    handleLog(index, item) {
      this.$refs.Log.show();
    },
    handleSelectBackup(index, item) {
      console.log(item);
      this.$refs.BackupSelect.show(item.tomcatInfo.id, index);
    },
    handleReset() {
      this.tableData.forEach((item, index) => {
        item.backupTime = '';
      });
    },
    validNodeData() {
      let valid = true;
      if (this.tableData.length === 0) {
        this.$alert('至少选择一个节点', {type: 'error'});
        valid = false;
      }
      this.tableData.forEach((item, index) => {
        if (!item.tomcatInfo || !item.tomcatInfo.id) {
          valid = false;
          this.$alert('存在没有配置tomcat的节点', {type: 'error'});
        }
        // 2. 如果是回退, 则选择了回退时间点
        if (!item.backupTime || item.backupTime === '') {
          valid = false;
          this.$alert('存在没有配置回退点的Tomcat', {type: 'error'});
        }
      });
      return valid;
    },
    handleBackup() {
      if (!this.validNodeData()) {
        return;
      }
      let tomcatIds = [];
      let formDataMap = {};
      // 1. 判断是否包含正在运行的Tomcat
      this.tableData.forEach((item, index) => {
        formDataMap[item.tomcatInfo.id] = item;
        tomcatIds.push(item.tomcatInfo.id);
      });
      this.loadingData = true;
      deployApi.connectInfo(tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (formDataMap[item.tomcatId]) {
              formDataMap[item.tomcatId].connectInfo = item;
            }
          });
          this.onRollback(this.tableData);
          this.close();
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
