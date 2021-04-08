<template>
  <div>
    <!-- 新增节点 -->
    <el-dialog title="选择Tomcat" :visible.sync="showDialog" width="960px" style="padding-right: 10px">
      <el-table :data="tomcatData" border style="margin: 10px; width:920px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData" >
        <el-table-column fixed="left" width="40" align="center">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="selectTomcat"
              @change.native="onChangeSelect(scope.row)"
              :disabled="!scope.row.upgrade"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="tomcatName" label="Tomcat名称" width="180"></el-table-column>
        <el-table-column label="升级状态" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.upgrade">可升级</el-tag>
            <el-tag type="danger" v-if="!scope.row.upgrade">不可升级</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="runningStatus" label="运行状态" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.runningStatus === 'DOWN'">未启动</el-tag>
            <el-tag type="success" v-if="scope.row.runningStatus === 'UP'">运行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="tomcatDir" label="tomcat目录"></el-table-column>
        <el-table-column label="启动报告" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="handleReport(scope.$index, scope.row)" size="mini" type="success" v-if="scope.row.runningStatus === 'UP'">启动报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="execSelect" size="small">确 定</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/node_upgrade_api';
import * as deployApi from '../api/node_deploy_api';
export default {
  name: 'NodeUpgradeSelectTomcat',
  props: ['onTomcatSelected'],
  data() {
    return {
      nodeId: '',
      nodeIndex: 0,
      loadingData: '',
      showDialog: false,
      selectTomcat: '',
      selectTomcatInfo: null,
      tomcatData: [],
    };
  },
  created() {
    //
  },
  methods: {
    show(nodeIndex, nodeId) {
      this.showDialog = true;
      this.nodeId = nodeId;
      this.nodeIndex = nodeIndex;
      this.tomcatData = [];
      this.selectTomcatInfo = null;
      this.execListNodeTomcat();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    execSelect() {
      if (this.selectTomcatInfo) {
        this.onTomcatSelected(this.nodeIndex, this.nodeId, this.selectTomcatInfo);
      } else {
        this.$message.error('请选择一个Tomcat选项');
      }
      this.close();
    },
    handleReport(index, row) {
      deployApi.connectInfo([row.id])
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            let reportUrl =
              'http://' +
              item.ip +
              ':' +
              item.tomcatPort +
              '/YSSUCOBRIDGE/start/report';
            window.open(reportUrl);
          });
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
        });
    },
    handleAddTomcat() {
      this.$refs.nodeAddTomcat.show(this.nodeId);
    },
    onChangeSelect(row) {
      // 获取选中数据
      this.selectTomcatInfo = row;
      this.selectTomcat = row.id;
    },
    handleClickRow(row, event, column) {
      if (row.upgrade) {
        this.selectTomcatInfo = row;
        this.selectTomcat = row.id;
      }
    },
    onTomcatAdded(p) {
      p.then(res => {
        // 成功
        this.$refs.nodeAddTomcat.close();
        this.$refs.nodeAddTomcat.closeLoading();
        this.execListNodeTomcat();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeAddTomcat.closeLoading();
        this.$message.error({
          message: '添加Tomcat失败:' + reason,
        });
      });
    },

    execListNodeTomcat() {
      this.loadingData = true;
      api.getTomcatInfoOfNode(this.nodeId)
        .then(res => {
          this.loadingData = false;
          // res.data.forEach((item, index) => {
          //   this.$set(item, 'id', index);
          // });
          this.tomcatData = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({
            message: reason,
          });
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
