<template>
  <div
    class="upgrade-popup tem-update-popup"
    v-loading="configInfoLoading">
    <!--标题栏 和 操作栏 -->
    <el-row>
      <el-col :xs="6" :sm="5" :md="4" :lg="3"><div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">补丁包列表</div></el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 上传文件后，生成的表格 -->
    <div style="margin: 0 20px 0px 20px">
      <span style="font-size: 14px; color: #606266; margin-right: 10px">补丁包路径</span>
      <el-input placeholder="" v-model="searchPath" title="路径" size="small" style="width: 700px; margin-right: 10px"></el-input>
      <el-button size="mini" type="primary" icon="el-icon-search" style="margin-right: 10px;" @click="handleQuery">查询</el-button>
      <el-upload
        :auto-upload="false"
        :disabled="mergeLoading"
        :http-request="customUpload"
        :on-change="handleChange"
        :show-file-list="false"
        accept=".zip"
        action
        class="upload-demo"
        multiple
        ref="upload">
        <el-button size="mini" type="success" icon="el-icon-upload">上传</el-button>
      </el-upload>
    </div>

<!--    <div style="margin: 0 20px 0px 20px">-->
<!--      -->
<!--    </div>-->

    <div class="upload-file-table-container" v-if="isShowUploadFileTable" style="padding-left: 20px; padding-right: 20px; margin-bottom: 30px;">
      <el-table :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        :data="uploadFileTableData"
        @row-click="handleClickTableRow"
        @selection-change="handleSelectionChange"
        border
        ref="fileTable"
        style="width: 100%;"
        max-height="250"
        v-loading="refreshLoading">
        <el-table-column @row-click="handleClickRow" type="selection" width="55"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          fixed="left"
          label="文件名"
          minWidth="200"
          prop="path"
        ></el-table-column>
        <el-table-column label="文件类型" minWidth="90" prop="fileType" width="150"></el-table-column>
        <el-table-column label="修改日期" minWidth="100" prop="formatterTime" width="200"></el-table-column>
        <el-table-column label="文件大小(mb)" prop="formatSize" width="200"></el-table-column>
      </el-table>
    </div>

    <!-- 合并补丁包 模块-->
    <el-row>
      <el-col  :xs="5" :sm="4" :md="3" :lg="2"><div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">合并补丁包</div></el-col>
      <el-col :span="4"><div class="btns" style="height: 60px; line-height: 60px;">
        <el-button :loading="mergeLoading" @click="confirmUploadFile()" type="primary" size="small">合并补丁包</el-button></div></el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="success-tip" style="margin:20px">
      <el-input :rows="15" readonly ref="console" type="textarea" v-model="textarea"></el-input>
    </div>
  </div>
</template>
<script>
import bus from './bus.js';
import * as api from '../api/node_upgrade_api';
import * as deployApi from '../api/node_deploy_api';
import dateFormat from '../../../utils/dateFormat';
export default {
  name: 'UpgradeMerge',
  data() {
    return {
      searchPath: '',
      text: '合并补丁包',
      configInfoLoading: true,
      // updateTomcatName: '', // 正在升级的tomcat名称
      refreshLoading: false,
      mergeLoading: false, // 是否正在合并
      showUpgradeWindow: true, // 弹窗是否显示
      isShowUploadFileTable: true, // 是否显示本地文件的表格
      // 本地文件表格
      uploadFileTableData: [],
      multipleSelection: [], // 远程文件被选中的内容
      websock: null, // socket对象
      // 启动日志
      textarea: '', // 日志文本
      textareaArr: [], // 日志按条保存在数组里
      refreshFlag: true,
      // socket连接操作类型
      operate: 'merge',
      timer: null,
    };
  },

  destroyed() {
    if (this.websock !== null) {
      this.websock.close(); // 离开路由之后断开websocket连接
    }

    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  created() {
    this.initPage();
  },
  // updated() {
  //   var updateTomcatName = sessionStorage.getItem('updateTomcatName');
  //   updateTomcatName && (this.updateTomcatName = updateTomcatName);
  // },

  methods: {
    async initPage() {
      this.configInfoLoading = true;
      let cacheSearchPath = await this.loadFromStorage('searchPath');
      if (cacheSearchPath) {
        console.log('aaa', cacheSearchPath);
        this.searchPath = cacheSearchPath;
        this.handleListZip(this.searchPath);
      } else {
        api.getDefaultDirOfServer()
          .then((res) => {
            if (res.success) {
              this.searchPath = res.data;
              this.handleListZip(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
            this.configInfoLoading = false;
          });
      }
    },
    handleListZip(searchPath) {
      api.getUpgradeRemoteZipInfo(searchPath)
        .then((res) => {
          console.log(res);
          var result = res.data;
          result && result.forEach((ele) => {
            ele.fileType = '远程文件';
            ele.formatterTime = ele.updateTime;
            ele.formatSize = ele.size;
          });
          console.log(result, 'res');
          this.uploadFileTableData = result || [];
          this.configInfoLoading = false;
        }).catch((err) => {
          console.log(err);
          this.configInfoLoading = false;
        });
    },
    async saveToStorage(key, value) {
      const db = await this.$store.dispatch('d2admin/db/database');
      db
        .set(key, value)
        .write();
      console.log(key, value);
    },

    async loadFromStorage(key) {
      const db = await this.$store.dispatch('d2admin/db/database');
      return db.get(key) && db.get(key).value();
    },
    handleQuery() {
      if (this.searchPath) {
        this.saveToStorage('searchPath', this.searchPath);
      }
      api.getUpgradeRemoteZipInfo(this.searchPath).then((res) => {
        console.log(res);
        var result = res.data;
        result.forEach((ele) => {
          ele.fileType = '远程文件';
          ele.formatterTime = ele.updateTime;
          ele.formatSize = ele.size;
        });
        console.log(result, 'res');
        this.uploadFileTableData = result;
        this.configInfoLoading = false;
      }).catch((err) => {
        console.log(err);
        this.configInfoLoading = false;
      });
    },
    handleClickRow() {},
    // 远程文件多选
    handleSelectionChange(rows) {
      console.log(rows);
      this.multipleSelection = rows;
      console.log(this.multipleSelection);
    },
    handleChange(file, fileList) {
      console.log(file);
      // 判断文件类型
      var fileName = file.name;
      // this.fileName = fileName
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      let duplicated = false;
      this.uploadFileTableData.forEach((item) => {
        if (item.name === file.name) {
          duplicated = true;
        }
      });
      var reg = /(?:zip)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('上传文件只能是zip类型文件');
        return false;
      } else if (duplicated) {
        this.$message.error('不能选择重复的文件');
        return false;
      } else {
        let ele = file;
        ele.raw.path = ele.raw.name;
        ele.raw.fileType = '本地文件';
        ele.raw.formatSize = (ele.raw.size / 1024 / 1024).toFixed(2) + 'M';
        ele.raw.formatterTime = dateFormat('yyyy-MM-dd hh:mm:ss S', ele.raw.lastModifiedDate || this.getDateFromLong(ele.raw.lastModified));
        this.uploadFileTableData.push(ele.raw);
      }
    },

    getDateFromLong(longDate) {
      let date = new Date();
      date.setTime(longDate);
      return date;
    },

    // 自定义上传
    customUpload(file) {
      console.log(file);
    },

    // 点击本地文件表格的一行
    handleClickTableRow(row, event, column) {
      console.log(row);
      this.$refs.fileTable.toggleRowSelection(row);
    },

    execute() {},
    // 获取日志连接信息
    requestConnectInfo() {
      api.defaultConnectInfo().then(res => {
        if (res.success) {
          this.initWebSocket(res.data);
          console.log(res);
        }
      }).catch(reason => {
        console.log('获取日志连接信息失败');
      });
    },
    // 合并补丁包
    confirmUploadFile() {
      if (this.multipleSelection.length < 2) {
        this.$message.error('至少需要选择两个文件进行合并');
        return;
      }
      let fileDirs = [];
      this.fileData = new FormData();
      this.multipleSelection.forEach((ele, index) => {
        if (ele.fileType === '远程文件') {
          fileDirs.push(ele.path);
        }
        if (ele.fileType === '本地文件') {
          this.fileData.append('files', ele);
        }
      });
      this.fileData.append('fileDirs', fileDirs.toString());
      this.fileData.append('dir', this.searchPath);
      // console.log(fileDirs);
      // var data = {
      //   tomcatDir: tomcatDir,
      //   fileDirs: fileDirs.toString(),
      //   files: this.fileData,
      // };
      this.mergeLoading = true;
      // 获取日志连接信息
      this.requestConnectInfo();
      // 合并文件
      api
        .uploadZipFile(this.fileData)
        .then((res) => {
          this.mergeLoading = false;
          if (res.success) {
            // this.$message.success('上传成功');
            // this.$parent.prevNext('next');
          } else {
            this.$message.error('上传失败!' + res.msg);
          }
        })
        .catch((reason) => {
          this.mergeLoading = false;
        });
    },
    // 确认选择远程文件按钮
    confirmToChoose() {
      this.$emit('showUpgradeWindow', false);
    },
    // 取消按钮
    cancel() {
      this.$emit('showUpgradeWindow', false);
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
<style scoped>
  /deep/ .el-divider--horizontal {
    margin: 0px 0px 20px 0px;
    padding: 0px;
  }
  .bg-purple {
    background: #ffffff;
    border: 1px solid #dcdfe6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

.board-card {
  border-radius: 4px;
  min-height: 36px;
  background: #e5e9f2;
}

.upload-progress{
  margin-bottom: 10px;
}
.tem-update-popup .el-upload__tip {
  margin-top: 0 !important;
}
.upgrade-popup {
  /*width: 700px;*/
  /*height: 600px;*/
  background-color: #fff;
  /*z-index: 6;*/
  /*position: absolute;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*transform: translate(-50%, -50%);*/
}
.tab-ctn {
  height: 600px;
}
.upgrade-popup >>> .success-tip el-input {
  margin-top: 70px !important;
}

.upload-file-table-container {
  overflow-y: scroll;
}
.table-container {
  min-height: 40px;
  overflow-y: scroll;
}

.el-table >>> .el-table__body tr.current-row > td {
  background-color: #409eff8a !important;
  font-weight: bold;
}
.wrap-uplod-table {
  height: 600px;
}
.upload-demo {
  text-align: center;
  padding-bottom: 10px;
  display: inline-block;
  margin-right: 20px;
}

/*去除table多出的横线*/
.el-table__fixed::before,
.el-table__fixed-right::before {
  z-index: inherit !important;
}
/*  element-ui table的去除右侧滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
}

/**  /deep/ 是修改elementui等第三方组件内部样式，做的渗透 **/
/deep/ .el-list-enter-active,
/deep/ .el-list-leave-active {
  transition: none;
}

/deep/ .el-list-enter,
/deep/ .el-list-leave-active {
  opacity: 0;
}
/deep/ .el-upload-list {
  min-height: 40px;
}

/deep/ .el-upload-list__item-name {
  font-size: large;
  font-weight: 500;
}

/deep/ .el-upload-list__item .el-icon-close {
  font-size: 20px;
}

/deep/ .el-upload-dragger {
  width: 660px;
}

  .textarea-title{
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: #409eff;
    margin-bottom: -1px;
    color: #fff;
  }
</style>
<style>
.upgrade-popup >>> .el-table__row current-row .el-table td {
  padding: 6px 0 !important;
}
.tem-update-popup >>> .el-table__header th {
  padding: 6px 0 !important;
}
</style>
