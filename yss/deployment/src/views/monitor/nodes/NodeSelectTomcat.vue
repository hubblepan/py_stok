<template>
  <div>
    <!-- 新增节点 -->
    <el-dialog title="选择Tomcat" :visible.sync="showDialog" width="960px" style="padding-right: 10px">
      <el-button @click="handleAddTomcat" size="small" type="success" style="margin-left: 10px;">添加Tomcat</el-button>
      <el-table :data="tomcatData" border style="margin: 10px; width:920px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData">
        <el-table-column fixed="left" width="40" align="center">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.tomcatDir"
              v-model="selectTomcat"
              @change.native="onChangeSelect(scope.row)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="tomcatName" label="Tomcat名称" width="180"></el-table-column>
        <el-table-column property="deployStatus" label="部署状态" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.deployStatus==='noDeploy'">未部署</el-tag>
            <el-tag type="success" v-if="scope.row.deployStatus==='deploying'">部署中</el-tag>
            <el-tag type="success" v-if="scope.row.deployStatus==='redeploy'">部署中</el-tag>
            <el-tag type="success" v-if="scope.row.deployStatus==='deployed'">已部署</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="runningStatus" label="运行状态" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.runningStatus === 'DOWN'">未启动</el-tag>
            <el-tag type="success" v-if="scope.row.runningStatus === 'UP'">运行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="tomcatDir" label="tomcat目录"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="execSelect" size="small">确 定</el-button>
    </span>
    </el-dialog>

    <node-add-tomcat :on-tomcat-added="onTomcatAdded" ref="nodeAddTomcat"></node-add-tomcat>
  </div>

</template>

<script>
import NodeAddTomcat from './NodeAddTomcat';
import * as api from '../api/node_deploy_api';
export default {
  name: 'NodeSelectTomcat',
  props: ['onTomcatSelected'],
  components: {
    NodeAddTomcat,
  },
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
      this.selectTomcat = '';
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
    handleAddTomcat() {
      this.$refs.nodeAddTomcat.show(this.nodeId);
    },
    onChangeSelect(row) {
      // 获取选中数据
      this.selectTomcatInfo = row;
      this.selectTomcat = row.tomcatDir;
    },
    handleClickRow(row, event, column) {
      this.selectTomcatInfo = row;
      this.selectTomcat = row.tomcatDir;
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
      api.listNodeTomcat(this.nodeId)
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
  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }
</style>
