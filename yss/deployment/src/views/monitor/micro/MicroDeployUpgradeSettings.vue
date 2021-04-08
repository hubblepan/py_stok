<template>
  <!-- 新增服务器 -->
  <el-dialog title="服务配置" :visible.sync="showDialog" width="680px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="140px" :model="formData" :inline="true" style="height: 270px;" :rules="rules" ref="formAddNode">
      <el-form-item label="eureka地址" prop="eurekaDir">
        <el-input v-model="formData.eurekaDir" placeholder="eureka地址" style="width: 200px;" size="small">/home/test/eureka</el-input>
      </el-form-item>
      <br/>
      <el-form-item label="YSS_APP配置路径" prop="ip">
        <el-input v-model="formData.yssAppPath" style="width: 200px" placeholder="/home/test/yss_app" size="small"></el-input>
      </el-form-item>
<!--      <el-form-item label="代理端口">-->
<!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
<!--      </el-form-item>-->
      <br/>
      <el-form-item label="内置Tomcat目录" prop="tomcatDir">
        <el-input v-model="formData.tomcatDir" placeholder="/home/test/tomcatDir" size="small" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="tomcat端口" prop="tomcatPort">
        <el-input v-model="formData.tomcatPort" size="small" placeholder="22" style="width: 80px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="日志路径" prop="logDir">
        <el-input v-model="formData.logDir" size="small" placeholder="/log/dir" style="width: 200px"></el-input>
      </el-form-item>
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
  name: 'MicroDeployUpgradeSettings',
  props: ['onAdded'],
  data() {
    return {
      rules: {
        eurekaDir: [
          { required: true, message: '请输入eureka路径', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        yssAppPath: [
          { required: true, message: '请输入yss_app路径', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],
        tomcatDir: [
          { required: true, message: '请输入tomcat路径', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        // tomcat端口
        tomcatPort: [
          { required: true, message: '请输入SSH端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
      },
      showDialog: false,
      loading: false,
      formData: {
        eurekaDir: '',
        yssAppPath: '',
        tomcatDir: '',
        tomcatPort: '',
        logDir: '',
      },
    };
  },
  methods: {
    show() {
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs['formAddNode'].clearValidate();
        Object.assign(this.formData, {
          eurekaDir: '',
          yssAppPath: '',
          tomcatDir: '',
          tomcatPort: '',
          logDir: '',
        });
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
