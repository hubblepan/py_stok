<template>
  <el-dialog title="处理中..." :visible.sync="showDialog" width="20%" style="margin-top: 17vh" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <div style="margin-left: 10px;">
      <i class="el-icon-loading" style="font-size: 20px;"></i><span style="font-size: 16px;">&nbsp;&nbsp;正在进行补丁包处理， 请耐心等待...</span>
    </div>
    <div v-if="showLog" style="margin-top: 30px;">
      <el-input :rows="5" readonly ref="console" type="textarea" v-model="textarea"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleDetailLog" size="mini" type="info" plain>详细信息</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeUpgradeLoading',
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
      connectInfo: null,
      showLog: false,
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
  },
  methods: {
    show() {
      this.showDialog = true;
      this.reset();
      this.requestConnectInfo();
    },
    close() {
      this.reset();
      this.showDialog = false;
    },
    handleDetailLog() {
      this.showLog = !this.showLog;
    },
    requestConnectInfo() {
      api.defaultConnectInfo().then(res => {
        if (res.success) {
          this.connectInfo = res.data;
          this.initWebSocket(res.data);
          console.log(res);
        }
      }).catch(reason => {
        console.log('获取日志连接信息失败');
      });
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

    initWebSocket(connectVo) {
      this.textarea = '';
      this.textareaArr = [];
      // var operate = this.rollback ? 'rollBack' : 'upgrade';
      // 初始化weosocket  7890端口固定
      const wsuri = 'ws://' + connectVo.ip + ':' + connectVo.socketPort + '/monitor/version/upgrade/console?operate=merge';
      this.websock = new window.WebSocket(wsuri);
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
      this.initWebSocket(this.connectInfo);
    },
    websocketonmessage(e) {
      // 数据接收
      // const redata = JSON.parse(e.data)
      // console.log('接收数据:' + e.data)
      this.textareaArr.push(e.data);
      // this.textarea = this.textarea + e.data;
      if (this.textareaArr.length > 200) {
        this.textareaArr.shift(); // 删除第一个
      }
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
    }
  },
};
</script>

<style scoped>
/*/deep/ .el-dialog{*/
/*  border-radius: 3px;*/
/*}*/
/*/deep/ .el-dialog__header{*/
/*  background-color: #F5F7FA;*/
/*  border-bottom: 1px solid #DCDFE6;*/
/*  padding-top: 10px;*/
/*  padding-bottom: 10px;*/
/*  padding-left: 20px;*/
/*  border-radius: 3px;*/
/*}*/
/*/deep/ .el-dialog__title{*/
/*  font-size: 16px;*/
/*}*/
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

/deep/ .el-textarea__inner{
  font-size: 10px;
  padding-top: 10px;
}
</style>
