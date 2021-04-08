<template>
  <el-dialog title="日志" :visible.sync="showDialog" width="60%"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <div class="success-tip">
        <el-input :rows="20" readonly ref="console" type="textarea" v-model="textarea"></el-input>
      </div>
  </el-dialog>
</template>

<script>
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroDeployLog',
  props: ['instanceId'],
  data() {
    return {
      showDialog: false,
      editState: true, // 按钮是否可编
      reportUrl: '',
      websock: null,
      textarea: '',
      textareaArr: [],
      refreshFlag: true,
      timer: '',
      previewHeight: 560,
      tomcatDir: '',
      ip: '',
      socketPort: 0,
      runningStatus: 'NO_START',
      ws: '',
      errorCount: 0,
      reconnectId: -1,
    };
  },
  created() {},
  mounted() {
    this.previewHeight = this.getClientHeight() * 0.70;
  },
  destroyed() {
    if (this.websock !== null) {
      this.websock.close(); // 离开路由之后断开websocket连接
    }

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.reconnectId !== -1 && clearTimeout(this.reconnectId);
  },
  methods: {
    connect() {
      this.reset();
      api.getTomcatConnectInfo(this.instanceId)
        .then(res => {
          if (res.data) {
            this.ip = res.data.ip;
            this.socketPort = res.data.tomcatPort;
            this.tomcatDir = res.data.installDir;
            this.runningStatus = res.data.runningStatus;
            this.ws = 'ws://' + this.ip + ':' + this.socketPort + '/microservice_console?tomcatDir=' + encodeURIComponent(this.tomcatDir) + '&runningStatus=' + this.runningStatus;
            console.log(this.ws);
            this.$nextTick(() => {
              this.initWebSocket();
            });
          }
        })
        .catch(reason => {
        });
    },
    show() {
      this.showDialog = true;
      if (this.ws === '') {
        this.connect();
      }
    },
    close() {
      this.showDialog = false;
    },
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },

    initWebSocket() {
      this.textareaArr = [];
      console.log(this.ws);
      this.websock = new window.WebSocket(this.ws);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.refreshLog, 1000);
    },
    refreshLog() {
      if (this.refreshFlag) {
        this.textarea = this.textareaArr.join('');
        if (this.$refs && this.$refs.console) {
          this.$refs.console.$refs.textarea.scrollTop = this.$refs.console.$refs.textarea.scrollHeight;
        }
      }
      this.refreshFlag = false;
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      // let actions = { test: '12345' }
      // this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() {
      // 连接建立失败重连
      if (this.errorCount > 5) {
        this.errorCount = 0;
      }
      this.textareaArr.push('websocket已断开');
      this.ws = '';
      this.reconnectId !== -1 && clearTimeout(this.reconnectId);
      this.reconnectId = setTimeout(() => {
        this.initWebSocket(this.socketPort);
      }, 5 * 1000);
    },
    websocketonmessage(e) {
      // 数据接收
      // const redata = JSON.parse(e.data)
      // console.log('接收数据:' + e.data)
      this.textareaArr.push(e.data);
      // this.textarea = this.textarea + e.data;
      // if (this.textareaArr.length > 200) {
      //   this.textareaArr.shift(); // 删除第一个
      // }
      this.refreshFlag = true;
    },
    websocketsend(Data) {
      // 数据发送
      // this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e);
    },
    reset() {
      if (this.websock !== null) {
        this.websock.close(); // 离开路由之后断开websocket连接
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.textarea = '';
      this.textareaArr = [];
      this.refreshFlag = true;
      this.ws = '';
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
.div-label {
  text-align: right;
  margin-right: 10px;
}

.el-divider__text {
  font-size: 20px;
}
.verticalTable {
  border: 1px solid #ebeef5;
  margin-top: 10px;
  border-collapse: collapse;
}

.verticalTable td,
th {
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  max-width: 100px;
  border: 1px solid #ebeef5;
}
.table-column {
  width: 20%;
}
.verticalTable tr {
  text-align: center;
}
.content-column {
  text-align: left;
  padding-right: 15px;
}
.verticalTable tr {
  height: 40px;
}

.tem-success >>> .el-loading-spinner .circular {
  height: 100px;
  width: 100px;
}
</style>
