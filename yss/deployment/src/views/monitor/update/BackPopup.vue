<template>
<div class="tem-back">
  <div class="back-tip">
    <el-input :rows="20" readonly ref="console" type="textarea" v-model="textarea" autofocus=false></el-input>
  </div>

  <el-dialog title="选择版本回退时间点" :visible.sync="showBackPoint" width="380px" append-to-body :before-close="handleCloseBackPoint">
    <el-table :data="backupData" v-loading="loadingBackPoint" max-height="219px" @row-click="handleClickRow" highlight-current-row>
      <el-table-column fixed="left" width="40" align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="backPoint" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column property="date" label="时间" width="300px"></el-table-column>
    </el-table>
    <div style="margin: 5px 0"><span style="font-size: 12px; color: #909399;">提示: 回退操作只回退应用，不回退数据库</span></div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmBackPoint">确 定</el-button>
      <el-button @click="handleCloseBackPoint(()=>{})">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import * as api from '../api/node_upgrade_api';
import * as deployApi from '../api/node_deploy_api';
export default {
  name: 'BackPopup',
  props: ['tomcatId', 'tomcatDir'],

  mounted() {
    this.showBackPoint = true;
    this.requestBackPackage();
  },
  destroyed() {
    console.log('backpopup destroyed');
    if (this.websock !== null) {
      this.websock.close(); // 离开路由之后断开websocket连接
    }

    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  created() {
    console.log('backpopup created');
  },
  data () {
    return {
      /* 回退相关 */
      backPoint: 0,
      showBackPoint: false,
      loadingBackPoint: false,
      backupData: [], // {id:1, date: '2020-11-22 09:01:00 000'}
      /* 日志输出 */
      textarea: '',
      textareaArr: [],
      refreshFlag: true,
      connectVo: {
        ip: '',
        socketPort: 0,
      },
      websock: null,
      timer: null,
    };
  },

  methods: {
    requestConnectInfo() {
      deployApi.connectInfo([this.tomcatId]).then(res => {
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
          this.initWebSocket();

          // 执行回滚
          return api.rollBack([{
            rollBackTime: this.backupData[this.backPoint].date,
            tomcatId: this.tomcatId,
          }]);
        }
      }).then(res => {
        // 执行回滚结果
        if (!res.success) {
          this.closeWebsocket();
          this.$message.error({
            message: '回滚失败',
          });
        }
      }).catch(reason => {
        // 提示获取连接信息失败
        this.closeWebsocket();
        this.$message.error({
          message: reason,
        });
      });
    },
    requestBackPackage() {
      // 清空备份数据
      this.backupData = [];
      this.backPoint = 0;
      // 执行数据请求
      this.loadingBackPoint = true;
      api.getBackupOfAll([this.tomcatId]).then(res => {
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
    handleCloseBackPoint(done) {
      this.backupData = [];
      this.loadingBackPoint = false;
      this.$parent.hide(true);
      done();
    },

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
          this.closeWebsocket();
          this.requestConnectInfo();
        }).catch(() => {

        });
      } else {
        this.handleCloseBackPoint(() => {});
      }
    },
    confirmBackVersion() {
      this.showBackPoint = true;
      this.loadingBackPoint = true;
      // 清空备份数据
      this.backupData = [];
      this.backPoint = 0;
      // 执行数据请求
      api.getBackupOfAll([this.tomcatId]).then(res => {
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

    initWebSocket() {
      this.textarea = '';
      this.textareaArr = [];
      var tomcatDir = encodeURIComponent(this.tomcatDir);
      // var operate = this.rollback ? 'rollBack' : 'upgrade';
      // 初始化weosocket  7890端口固定
      const wsuri = 'ws://' + this.connectVo.ip + ':' + this.connectVo.socketPort + '/monitor/version/upgrade/console?tomcatDir=' + tomcatDir + '&operate=rollBack';
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
};
</script>
<style lang="css" scoped>
.tem-back {
  width: 100%;
  height: 500px;
  background-color: #fff;
}

.tem-back .back-tip {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 26px;
}

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
/deep/ .el-dialog__body{
  padding-top: 0;
  padding-left: 20px;
  padding-bottom: 20px;
}
/deep/ .el-dialog__title{
  font-size: 16px;
}
</style>
