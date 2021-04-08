<template>
  <div class="tem-success">
    <div class="success-tip">
      <el-input :rows="20" readonly ref="console" type="textarea" v-model="textarea" autofocus=false></el-input>
    </div>

    <el-dialog title="选择版本回退时间点" :visible.sync="showBackPoint" width="360px">
      <el-table :data="backupData" v-loading="loadingBackPoint" max-height="219px" @row-click="handleClickRow" highlight-current-row>
        <el-table-column fixed="left" width="40" align="center">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="backPoint" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="date" label="时间" width="300px"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmBackPoint">确 定</el-button>
        <el-button @click="showBackPoint = false">取 消</el-button>
      </div>
    </el-dialog>

    <div style="width:95%">
      <div style="text-align: center">
        <a :href="reportUrl" rel="nofollow noreferrer" target="_blank" v-if="showReport">
          <el-button
            class="mt-3 mr-4"
            type="primary"
          >查看启动报告</el-button>
        </a>

        <el-button
          @click="confirmBackVersion()"
          class="mt-3 ml-4"
          type="primary"
          :disabled="disableBack"
        >版本回退</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as deployApi from '../api/node_deploy_api';
import * as api from '../api/node_upgrade_api';
export default {
  name: 'Complete',
  props: ['tomcatDir', 'socketIp', 'socketPort', 'forceExecute'],
  data() {
    return {
      tomcatInfo: null,
      // 是否显示启动报告
      showReport: true,
      // 查看启动报告的url
      reportUrl: '',
      // websocket 实例
      websock: null,
      // 启动日志
      textarea: '',
      textareaArr: [],
      refreshFlag: true,
      // socket连接操作类型
      operate: 'upgrade',

      connectVo: {
        ip: '',
        socketPort: 0,
        tomcatPort: 0,
      },
      backPoint: 0,
      showBackPoint: false,
      loadingBackPoint: false,
      backupData: [], // {id:1, date: '2020-11-22 09:01:00 000'}
      disableBack: true,
      timer: '',
    };
  },
  methods: {
    getCurrentRow(row) {
      // 获取选中数据
      this.backPoint = row.id;
    },
    handleClickRow(row, event, column) {
      this.backPoint = row.id;
    },
    confirmBackPoint() {
      this.showBackPoint = false;
      if (this.backupData && this.backupData.length > 0) {
        this.$confirm('确定回滚到 ' + this.backupData[this.backPoint].date + ' 吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 先关闭websocket, 再重新连接
          // this.rollback = true;
          if (this.websock) {
            this.websock.close();
          }
          // 重新连接websocket
          this.operate = 'rollBack';
          this.initWebSocket('rollBack');
          this.disableBack = true;
          api.rollBack([{
            rollBackTime: this.backupData[this.backPoint].date,
            tomcatId: this.tomcatInfo.id,
          }])
            .then(res => {
              this.disableBack = false;
              if (res.success) {
                console.log('');
              } else {
                // 提示失败
                this.closeWebsocket();
                this.$message.error({
                  message: '回滚失败',
                });
              }
            })
            .catch(() => {
              this.disableBack = false;
              console.log('error');
            });
        });
      }
    },
    confirmBackVersion() {
      this.showBackPoint = true;
      this.loadingBackPoint = true;
      // 清空备份数据
      this.backupData = [];
      this.backPoint = 0;
      // 执行数据请求
      api.getBackupOfAll([this.tomcatInfo.id]).then(res => {
        if (res.success) {
          this.loadingBackPoint = false;

          if (res.data && res.data.length > 0) {
            if (res.data[0]['backUpTime']) {
              let tableData = [];
              res.data[0]['backUpTime'].forEach((item, index) => {
                tableData.push({id: index, date: item});
              });
              this.backupData = tableData;
            }
          }
        }
      }).catch(reason => {
        this.loadingBackPoint = false;
      });
    },

    backVersion() {
      console.log('版本回退');
    },
    async saveForm() {
      return {success: true};
    },

    async validateForm() {
      return true;
    },
    initWebSocket(operate) {
      this.textarea = '';
      this.textareaArr = [];
      var tomcatDir = encodeURIComponent(this.tomcatInfo.tomcatDir);
      // var operate = this.rollback ? 'rollBack' : 'upgrade';
      // 初始化weosocket  7890端口固定
      const wsuri = 'ws://' + this.connectVo.ip + ':' + this.connectVo.socketPort + '/monitor/version/upgrade/console?tomcatDir=' + tomcatDir + '&operate=' + operate;
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
      console.log('已连接');
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket(this.operate);
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
      console.log(e.data);
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e);
    },
    closeWebsocket() {
      if (this.websock) {
        this.websock.close();
      }
    },
  },
  created() {
  },
  mounted() {
    this.$parent.noclickCompare = true;
    this.$parent.noclickComplete = true;
    this.tomcatInfo = this.$parent.tomcatInfo;
    deployApi.connectInfo([this.tomcatInfo.id]).then(res => {
      if (res.success) {
        this.connectVo = res.data[0];
        // this.rollback = false;
        // 查看报告url
        this.reportUrl =
          'http://' +
          this.connectVo.ip +
          ':' +
          this.connectVo.tomcatPort +
          '/YSSUCOBRIDGE/deploy_console/index.html';
        console.log(this.reportUrl);
        // 连接webSocket获取日志
        this.operate = 'upgrade';
        this.initWebSocket('upgrade');
        // 执行升级
        // 调用升级操作
        api.upgrade([this.tomcatInfo.id], true)
          .then(res => {
            this.disableBack = false;
            if (res.success) {
              // 提示升级成功， 日志已经有提示了
              // 显示 版本回滚按钮
            } else {
              // 提示升级失败， 关闭日志输出
              this.$message.error({
                message: '升级失败',
              });
              if (this.websock !== null) {
                this.websock.close(); // 离开路由之后断开websocket连接
              }
            }
          })
          .catch(reason => {
            this.disableBack = false;
          });
      }
    });
  },
  destroyed() {
    if (this.websock !== null) {
      this.websock.close(); // 离开路由之后断开websocket连接
    }

    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style scoped>
  .tem-success .success-tip {
    text-align: center;
    margin-top: 10px;
    font-size: 26px;
  }

  /*选中一行，颜色加深，字体加粗*/
  .el-table >>> .el-table__body tr.current-row>td {
    background-color: #409eff8a !important;
    font-weight: bold;
  }
</style>

<style>
  .el-dialog__header {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .el-dialog__body {
    margin-top: 0;
    padding-top: 0;
  }
</style>
