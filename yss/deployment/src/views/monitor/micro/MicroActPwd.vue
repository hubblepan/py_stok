<template>
  <!-- 新增服务器 -->
  <el-dialog title="用户名和密码" :visible.sync="showDialog" width="340px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="80px" :model="formData" :rules="rules" ref="formAddNode">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="formData.account" placeholder="mvn_account" size="small" style="width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :show-password="false" type="password">
        <el-input v-model="formData.password" size="small" placeholder="******" :show-password="false" style="width: 180px"  type="password"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small" type="text">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '同步中' : '确 定'}}</el-button>
      </span>

    <div style="margin: 0 10px;" v-if="logs.length > 0">
      <div v-bind:style="{height: (expandLog ? Math.min(10 * 24, (logs.length + 1) * 24) : 48) + 'px'}" class="log-container" ref="logContainer">
        <p v-for="item in logs" :key="item">{{item}}</p>
        <div style="height: 25px"></div>
      </div>
      <el-button type="text" style="margin-left: 150px" size="mini" @click="handleExpandLog">{{expandLog ? "收起" : "展开"}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroActPwd',
  props: ['onAdded'],
  watch: {

  },
  data() {
    return {
      rules: {
        account: [
          { required: true, message: '请输入maven用户名', trigger: 'blur' },
        ],
        // ssh密码
        password: [
          { required: true, message: '请输入密码' },
        ],
      },
      showDialog: false,
      loading: false,
      formData: {
        account: '',
        password: '',
        mvnAddr: '',
      },
      logHeight: 24,
      expandLog: false,
      logs: ['正在下载1', '正在下载2', '正在下载3', '正在下载4', '正在下载5'],
      websock: null,
    };
  },
  methods: {
    handleExpandLog() {
      this.expandLog = !this.expandLog;
      this.$nextTick(() => {
        this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight;
      });
    },
    show(mvnAddr, account, password) {
      this.showDialog = true;
      this.logs = [];
      this.expandLog = false;
      this.$nextTick(() => {
        this.$refs['formAddNode'].clearValidate();
        Object.assign(this.formData, {
          account: account,
          password: password,
          mvnAddr: mvnAddr,
        });
      });
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
      if (this.websock) {
        this.websock.close();
      }
    },
    showLoading() {
      this.loading = true;
    },
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.loading = true;
          api.serverInfo()
            .then(res => {
              this.onAdded(api.programSelectMaven(this.formData)); // 将请求的promise返回给调用者
              this.initWebSocket('ws://' + res.data.ip + ':' + res.data.socketPort + '/monitor/microservice/program/console');
              this.showLoading();
            })
            .catch(reason => {
              console.log(reason);
            });
        } else {
          return false;
        }
      });
    },

    initWebSocket(ws) {
      this.textareaArr = [];
      console.log(ws);
      this.websock = new window.WebSocket(ws);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
    },
    websocketonerror() {
    },
    websocketonmessage(e) {
      this.logs.push(e.data);
      this.$nextTick(() => {
        this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight;
      });
    },
    websocketsend(Data) {
      // 数据发送
      // this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e);
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
    font-weight: 600;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }
  .log-container{
    overflow:auto;
    scrollbar-base-color: transparent;
    -ms-scrollbar-base-color: transparent
  }
</style>
