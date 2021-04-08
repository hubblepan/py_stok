<template>
  <!-- 新增服务器 -->
  <el-dialog title="服务升级" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="100px" :model="formData" :inline="true" ref="formAddNode">
      <el-form-item label="服务名称" prop="name">
        <el-input v-model="formData.name" placeholder="方案名称" style="width: 180px;" size="small" readonly :disabled="true"></el-input>
      </el-form-item>
      <br/>
<!--      <el-form-item label="程序地址(单个升级):" prop="name">-->
<!--        <el-input v-model="formData.dir" placeholder="/home/test/tomcat1" style="width: 180px;" size="small" readonly :disabled="true"></el-input>-->
<!--      </el-form-item>-->
<!--      <br/>-->
      <el-form-item label="服务版本" prop="ip">
        <el-select v-model="formData.version" placeholder="请选择" size="small">
          <el-option
            label="V1.0.0.1"
            value="V1.0.0.1">
          </el-option>
          <el-option
            label="V2.0.0.1"
            value="V2.0.0.1">
          </el-option>
          <el-option
            label="V3.0.0.1"
            value="V4.0.0.1">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="代理端口">-->
<!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
<!--      </el-form-item>-->
      <br/>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '安装中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'MicroDeployUpgradeDialog',
  props: ['onAdded'],
  data() {
    return {
      formData: {
        name: 'osgi-fast',
        dir: '/home/test/tomcat1',
        version: '',
      },
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    show() {
      this.showDialog = true;
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
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.onAdded(api.createNode(this.formData)); // 将请求的promise返回给调用者
          // show loading
          this.showLoading();
        } else {
          return false;
        }
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
