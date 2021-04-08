<template>
  <div class="tem-success" v-loading="configInfoLoading">
    <el-scrollbar id="scrollbar" ref="scrollbar" v-if="showBtnDeploy">
        <div>
        <el-form ref="form" v-if="!showTomcatLog">
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
    <div class="success-tip" v-if="showTomcatLog">
      <el-input :rows="20" readonly ref="console" type="textarea" v-model="textarea"></el-input>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <a :href="reportUrl" rel="nofollow noreferrer" target="_blank" v-if="showReport" style="margin: 0 auto">
        <el-button type="primary">查看启动报告</el-button>
      </a>
    </div>

  </div>
</template>

<script>

export default {
  name: 'NodeCompleteSuccess',
  props: ['tomcatDir', 'data'],
  data() {
    return {
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
      // data: {
      //   dbConfigVo: {
      //     advanceDbUrl: '',
      //     dbIp: '',
      //     dbName: '',
      //     dbPort: 0,
      //     description: '',
      //     password: '',
      //     userName: '',
      //   },
      //   licenseDir: '',
      //   mqConfigVo: {
      //     brokerName: '',
      //     brokerPort: 0,
      //     description: '',
      //     ip: '',
      //     ipList: [],
      //     messageStoreDir: '',
      //     port: 0,
      //   },
      //   registryCenterConfigVo: {
      //     dataStoreDir: '',
      //     description: '',
      //     port: 0,
      //   },
      //   tomcatConfigVo: {
      //     appConfigDir: '',
      //     appDir: '',
      //     description: '',
      //     dir: '',
      //     ip: '',
      //     memorySize: 0,
      //     port: 0,
      //   },
      //   logConfigVo: {
      //     path: '',
      //   },
      // },
    };
  },
  created() {},
  mounted() {
    this.showData();
    this.previewHeight = this.getClientHeight() - 320;
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
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    async showData() {
      // await api
      //   .previewAll(this.tomcatDir)
      //   .then((result) => {
      //     if (result.success) {
      //       this.data = result.data;
      //     } else {
      //       this.$message.error('预览配置查询失败。' + result.msg);
      //       return false;
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      this.$refs.scrollbar.wrap.scrollTop = this.$refs.scrollbar.wrap.scrollHeight;
    },

    deploy: function() {
      this.editState = false;
      this.configInfoLoading = true;
      // api
      //   .executeDeploy(this.tomcatDir)
      //   .then((result) => {
      //     this.$emit('canClick', true); // 步骤条的按钮不能点击了
      //     if (result.success) {
      //       this.$emit('resetTomcatDir', this.tomcatDir); // 切换tomcat重置数据
      //       // this.$message.success('进行部署成功。')
      //       this.showTomcatLog = true;
      //       this.showBtnDeploy = false;
      //       // tomcatType 值若为：SPECIAL 就没有启动报告了
      //       if (result.data.tomcatType === 'SPECIAL') {
      //         this.showReport = false;
      //       } else {
      //         this.showReport = true;
      //       }
      //       this.configInfoLoading = false;
      //       // 查看报告url
      //       this.reportUrl =
      //         'http://' +
      //         this.data.tomcatConfigVo.ip +
      //         ':' +
      //         this.data.tomcatConfigVo.port +
      //         '/YSSUCOBRIDGE/start/report';
      //       // 日志框 滚动条到底部
      //       this.initWebSocket(result.data.socketPort);
      //     } else {
      //       this.configInfoLoading = false;
      //       this.$message.error('进行部署失败。' + result.msg);
      //       return false;
      //     }
      //     this.editState = true;
      //     this.configInfoLoading = false;
      //   })
      //   .catch((e) => {
      //     this.configInfoLoading = false;
      //     console.log(e);
      //   });
    },

    getUrl: function() {
      let routeData = this.$router.resolve({ path: this.reportUr });
      window.open(routeData.href, '_blank');
    },

    initWebSocket(socketPort) {
      var tomcatDir = encodeURIComponent(this.tomcatDir);
      this.textareaArr = [];
      // 初始化weosocket  7890端口固定
      const wsuri = 'ws://' + this.data.tomcatConfigVo.ip + ':' + socketPort + '/console?tomcatDir=' + tomcatDir;
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
        if (this.$refs) {
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
      this.initWebSocket();
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
.tem-success .success-tip {
  font-size: 26px;
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
