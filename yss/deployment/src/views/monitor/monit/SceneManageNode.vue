<template>
  <div>
    <el-dialog title="场景节点管理" :visible.sync="showDialog" width="760px">
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        border style="margin: 10px; width: 720px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="sceneName"
          label="场景名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" plain>停止</el-button>
            <el-button size="mini" type="success">启动</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/node_manage_api';
export default {
  name: 'SceneManageNode',
  data() {
    return {
      showDialog: false,
      loadingData: false,
      tableData: [
        {
          sceneName: '场景1',
          name: '节点1',
          ip: '192.168.4.225',
        },
        {
          sceneName: '场景2',
          name: '节点2',
          ip: '192.168.4.226',
        },
        {
          sceneName: '场景3',
          name: '节点4',
          ip: '192.168.4.227',
        },
      ],
    };
  },
  created() {
  },
  methods: {
    show(cacheSelectNodeIds, enableAdd = true) {
      this.showDialog = true;
      this.cacheNodeIds = cacheSelectNodeIds;
      this.enableAdd = enableAdd;
      this.execListNode();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
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

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }
</style>
