<template>
  <el-dialog title="预览节点" :visible.sync="showDialog" width="60%"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <div style="margin: 10px">
      <el-radio-group v-model="tabLabel" style="margin-bottom: 10px;">
        <el-radio-button label="previewLabel">预览</el-radio-button>
        <el-radio-button label="logLabel">日志</el-radio-button>
      </el-radio-group>
      <el-scrollbar id="scrollbar" ref="scrollbar" v-if="tabLabel === 'previewLabel'" v-bind:style="{height: previewHeight-46 + 'px'}">
        <div style="padding-bottom: 20px">
          <el-form ref="form" v-if="!showTomcatLog" v-bind:style="{height: previewHeight + 40 + 'px'}">
            <!--tomcat-->
            <h5>tomcat配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr>
                <th class="table-column">应用目录</th>
                <td class="content-column pl-3">{{ this.data.tomcatConfigVo.appDir }}</td>
              </tr>
              <tr>
                <th class="table-column">IP地址</th>
                <td class="content-column pl-3">{{ this.data.tomcatConfigVo.ip }}</td>
              </tr>
              <tr>
                <th class="table-column">端口号</th>
                <td class="content-column pl-3">{{ this.data.tomcatConfigVo.port }}</td>
              </tr>
              <tr>
                <th class="table-column">内存大小(G)</th>
                <td class="content-column pl-3">{{ this.data.tomcatConfigVo.memorySize }}</td>
              </tr>
              <tr>
                <th class="table-column">描述信息</th>
                <td class="content-column pl-3">{{ this.data.tomcatConfigVo.description }}</td>
              </tr>
            </table>

            <p class="mt-2" style="height: 20px;"></p>
            <!--lic-->
            <h5>license目录配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr>
                <th class="table-column">license目录</th>
                <td class="content-column pl-3">{{ this.data.licenseDir }}</td>
              </tr>
            </table>

            <p class="mt-2" style="height: 20px;"></p>
            <!--db-->
            <h5>数据库配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr v-if="data.dbConfigVo.advanceDbUrl !== '' && data.dbConfigVo.advanceDbUrl !== null">
                <th class="table-column">数据库url</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.advanceDbUrl }}</td>
              </tr>
              <tr v-if="data.dbConfigVo.advanceDbUrl === '' || data.dbConfigVo.advanceDbUrl === null">
                <th class="table-column">SID</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.dbName }}</td>
              </tr>
              <tr v-if="data.dbConfigVo.advanceDbUrl === '' || data.dbConfigVo.advanceDbUrl === null">
                <th class="table-column">数据库IP</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.dbIp }}</td>
              </tr>
              <tr v-if="data.dbConfigVo.advanceDbUrl === '' || data.dbConfigVo.advanceDbUrl === null">
                <th class="table-column">数据库端口</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.dbPort }}</td>
              </tr>
              <tr>
                <th class="table-column">数据库用户名</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.userName }}</td>
              </tr>
              <!--        <tr>-->
              <!--          <th class="table-column">数据库密码</th>-->
              <!--          <td class="content-column pl-3">{{ this.data.dbConfigVo.password }}</td>-->
              <!--        </tr>-->
              <tr>
                <th class="table-column">描述信息</th>
                <td class="content-column pl-3">{{ this.data.dbConfigVo.description }}</td>
              </tr>
            </table>

            <p class="mt-2" style="height: 20px;"></p>
            <!--msg-->
            <h5>消息总线配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr>
                <th class="table-column">broker名称</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.brokerName }}</td>
              </tr>
              <tr>
                <th class="table-column">broker端口</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.brokerPort }}</td>
              </tr>
              <tr>
                <th class="table-column">消息存储目录</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.messageStoreDir }}</td>
              </tr>
              <tr>
                <th class="table-column">消息总线IP</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.ip }}</td>
              </tr>
              <tr>
                <th class="table-column">消息总线端口</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.port }}</td>
              </tr>
              <tr>
                <th class="table-column">描述信息</th>
                <td class="content-column pl-3">{{ this.data.mqConfigVo.description }}</td>
              </tr>
            </table>

            <p class="mt-2" style="height: 20px;"></p>
            <!--service-->
            <h5>服务注册中心配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr>
                <th class="table-column">数据存储目录</th>
                <td class="content-column pl-3">{{ this.data.registryCenterConfigVo.dataStoreDir }}</td>
              </tr>
              <tr>
                <th class="table-column">端口</th>
                <td class="content-column pl-3">{{ this.data.registryCenterConfigVo.port }}</td>
              </tr>
              <tr>
                <th class="table-column">描述信息</th>
                <td class="content-column pl-3">{{ this.data.registryCenterConfigVo.description }}</td>
              </tr>
            </table>

            <p class="mt-2" style="height: 20px;"></p>
            <!--service-->
            <h5>日志配置</h5>
            <table border="1" class="verticalTable" width="100%">
              <tr>
                <th class="table-column">日志存储目录</th>
                <td class="content-column pl-3">{{ this.data.logConfigVo.path }}</td>
              </tr>
            </table>
          </el-form>
          <!--        <div style="text-align: center; margin-top: 20px;">-->
          <!--          <el-button @click="deploy" type="primary" v-show="showBtnDeploy">确认部署</el-button>-->
          <!--        </div>-->
        </div>
      </el-scrollbar>
      <div class="success-tip" v-if="tabLabel === 'logLabel'">
        <el-input :rows="20" readonly ref="console" type="textarea" v-model="textarea"></el-input>
      </div>
    </div>

  </el-dialog>
</template>

<script>

export default {
  name: 'NodeCompleteDeploy',
  props: ['tomcatDir', 'data', 'connectInfo'],
  data() {
    return {
      tabLabel: 'previewLabel',
      showDialog: false,
      tomcatTableData: [],
      licenseTableData: [],
      databaseTableData: [],
      msgTableData: [],
      serviceTableData: [],
      configInfoLoading: false, // 是否loading
      editState: true, // 按钮是否可编辑
      showTomcatLog: false,
      showBtnDeploy: true,
      showReport: false,
      reportUrl: '',
      websock: null,
      textarea: '',
      textareaArr: [],
      refreshFlag: true,
      timer: '',
      previewHeight: 560,
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
      this.tabLabel = 'previewLabel';
    },
    // 显示日志信息页面
    showLogPage() {
      this.showDialog = true;
      this.tabLabel = 'logLabel';
      this.$nextTick(() => {
        this.$refs.console.$refs.textarea.scrollTop = this.$refs.console.$refs.textarea.scrollHeight;
      });
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
    connect() {
      this.initWebSocket(this.connectInfo.socketPort);
    },

    initWebSocket(socketPort) {
      let tomcatDir = encodeURIComponent(this.data.tomcatConfigVo.dir);
      this.textareaArr = [];
      // 初始化weosocket  7890端口固定
      const wsuri = 'ws://' + this.connectInfo.ip + ':' + socketPort + '/console?tomcatDir=' + tomcatDir;
      console.log(wsuri);
      // const wsuri = 'ws://127.0.0.1:7890/console'
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
      this.initWebSocket(this.connectInfo.socketPort);
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
