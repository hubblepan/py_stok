<template>
  <!-- 新增节点 -->
  <el-dialog title="添加部署包" :visible.sync="showDialog" width="680px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <node-deploy-upload ref="Upload"></node-deploy-upload>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">确 定</el-button>
      </span>
<!--    <node-upgrade-loading ref="UploadLoading"></node-upgrade-loading>-->
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_deploy_api';
import NodeDeployUpload from './NodeDeployUpload';

export default {
  name: 'NodeDeployUploadAdd',
  components: {NodeDeployUpload},
  props: ['onAdded'],
  data() {
    return {
      showDialog: false,
      index: -1,
      nodeId: '',
      tomcatId: '',
      loading: false,
    };
  },
  methods: {
    show(index, nodeId, tomcatId, tomcatInfo) {
      this.showDialog = true;
      this.index = index;
      this.nodeId = nodeId;
      this.tomcatId = tomcatId;
      this.$nextTick(() => {
        this.$refs.Upload.handleInit(tomcatId, nodeId, tomcatInfo);
      });
    },
    close() {
      this.showDialog = false;
    },
    showLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },
    execAdd() {
      if (!this.$refs.Upload.validForm()) {
        return;
      }
      this.loading = true;
      let fileData = this.$refs.Upload.getFormData();
      fileData.append('tomcatId', this.tomcatId);
      this.onAdded(api.uploadNodeWar(fileData), this.index);
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
    padding-top: 20px;
  }
</style>
