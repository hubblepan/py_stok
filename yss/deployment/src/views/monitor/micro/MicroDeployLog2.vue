<template>
  <el-drawer title="" :visible.sync="showDialog" size="50%"  :close-on-click-modal="false" :close-on-press-escape="false" >

    <el-radio-group v-model="activeName" style="margin-left: 20px; margin-top: -30px">
      <el-radio-button label="first">服务日志</el-radio-button>
      <el-radio-button label="second" v-if="serviceCode.startsWith('osgi') && serviceCode !== 'fomp-traceCenter'">OSGI日志</el-radio-button>
    </el-radio-group>
    <micro-deploy-log-tab ref="ServiceLog" :instance-id="instanceId" :log-type="'ServiceLog'" :key="instanceId" v-show="activeName === 'first'"></micro-deploy-log-tab>
    <micro-deploy-log-tab ref="OsgiLog" :instance-id="instanceId" :log-type="'OsgiLog'" :key="instanceId" v-show="activeName === 'second'"></micro-deploy-log-tab>
<!--      <div class="success-tip">-->
<!--        <el-input :rows="rows" readonly ref="console" type="textarea" v-model="textarea" style="border: none"></el-input>-->
<!--      </div>-->
  </el-drawer>
</template>

<script>
import * as api from '../api/micro_service_api';
import MicroDeployLogTab from './MicroDeployLogTab';
export default {
  name: 'MicroDeployLog2',
  components: { MicroDeployLogTab },
  props: ['instanceId', 'serviceCode'],
  data() {
    return {
      activeName: 'first',
      rows: 20,
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
      isStarting: true,
    };
  },
  created() {
    this.rows = (this.getClientHeight() - 70) / 22;
  },
  mounted() {

  },
  destroyed() {
    // if (this.websock !== null) {
    //   this.websock.close(); // 离开路由之后断开websocket连接
    // }
    //
    // if (this.timer) {
    //   clearInterval(this.timer);
    // }
    //
    // this.reconnectId !== -1 && clearTimeout(this.reconnectId);
  },
  methods: {
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    connect() {
      this.reset();
      this.ws = 'connecting';
      this.$refs.ServiceLog && this.$refs.ServiceLog.connect();
      this.$refs.OsgiLog && this.$refs.OsgiLog.connect();
    },
    show(forceClose = false) {
      this.showDialog = true;
      this.$nextTick(() => {
        forceClose && this.reset();
        if (this.ws === '') {
          this.connect();
        }
      });
    },
    close() {
      this.showDialog = false;
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
      this.ws = '';
      this.$refs.ServiceLog && this.$refs.ServiceLog.reset();
      this.$refs.OsgiLog && this.$refs.OsgiLog.reset();
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
