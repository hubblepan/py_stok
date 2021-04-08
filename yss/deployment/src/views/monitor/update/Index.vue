<template class="d2-theme-container-main-body">
  <div id="tem-upgrade">
    <div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">Tomcat 列表</div>
    <el-divider></el-divider>
    <div style="height: 40px; font-size: 14px; line-height: 40px; margin-left: 20px; margin-top: 20px; display: none">
      <el-dropdown @command="handleSwitchNode">
        <el-button :type="dropDownType" plain size="small">
          {{nodeSelected ? nodeSelected.ip : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择节点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in nodeList" :key="item.ip" :command="item">{{item.ip}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-tabs v-model="nodeLabel" type="card" @tab-click="handleCommand" style="margin-top: 20px; margin-left: -1px;">
      <el-tab-pane v-for="item in nodeList" :key="item.ip" :label="item.ip" :name="item.ip"></el-tab-pane>
    </el-tabs>
    <div class="table-container" v-loading="configInfoLoading">
      <el-table :data="tableData" border style="width: 100%"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column align="left" fixed label="Tomcat名称" prop="tomcatName" width="200">
          <template slot-scope="scope">
            <div>
              <el-tooltip :content="scope.row.tomcatDir" placement="top">
                <span >{{ scope.row.tomcatName }}</span>
              </el-tooltip>
<!--              <el-button type="info" icon="el-icon-edit" circle size="mini" @click="changeTomcatName(scope.$index, scope.row)"></el-button>-->
            </div>
          </template>
        </el-table-column>
        <!--端口号-->
        <el-table-column align="center" label="端 口" prop="tomcatPort" min-width="100" width="120"></el-table-column>
        <!--jdk版本-->
        <el-table-column align="center" label="  JDK版本号" prop="jdkVersionOfTomcat" min-width="100" width="150"></el-table-column>
        <!--版本号-->
        <el-table-column align="center" label="  应用版本号" prop="version" min-width="120" width="120"></el-table-column>
        <!--运行状态-->
        <el-table-column align="center" label="运行状态" prop="runningStatus"   min-width="120" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.runningStatus === 'DOWN'">未启动</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">未启动</div>
            </el-tooltip>

            <el-tag type="success" v-if="scope.row.runningStatus === 'UP'">运行中</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">运行中</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--路径-->
        <el-table-column align="center" label="路径" prop="tomcatDir" min-width="100"></el-table-column>
        <el-table-column align="center" label="操作" min-width="400" width="400">
          <template slot-scope="scope">
            <el-button @click="handleUpgrade(scope.$index, scope.row)" size="mini" type="primary" :disabled="!scope.row.upgrade">升级</el-button>
            <el-button @click="handleBack(scope.$index, scope.row)" size="mini" type="warning" :disabled="!scope.row.upgrade">回退</el-button>
            <el-button @click="handleHistory(scope.$index, scope.row)" size="mini" type="info">升级历史</el-button>
            <el-button
              @click="handleReport(scope.$index, scope.row)"
              size="mini"
              type="success"
              :disabled="scope.row.runningStatus === 'DOWN'"
            >启动报告</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    &lt;!&ndash; 升级弹窗 &ndash;&gt;-->
    <!--    <div class="mask" v-if="showUpgradePopup">-->
    <!--      <upgrade-merge @showUpgradeWindow="getWindowState($event)"></upgrade-merge>-->
    <!--    </div>-->
    <!-- 回退弹窗  -->
    <el-dialog title="执行回退" :visible.sync="backup.show">
      <back-popup v-bind:tomcatDir="backup.tomcatDir" v-bind:tomcat-id="backup.tomcatId" v-if="backup.show"></back-popup>
    </el-dialog>

    <!-- 升级历史弹窗 -->
    <el-drawer
      title="历史升级记录"
      :visible.sync="updateHistory.show"
      direction="rtl"
      :with-header="false">
      <div>
        <el-divider></el-divider>
        <update-history v-bind:tomcat-id="updateHistory.tomcatId" v-if="updateHistory.show"></update-history>
      </div>

    </el-drawer>

  </div>
</template>
<script>
import bus from './bus.js';
import BackPopup from './BackPopup.vue';
import UpdateHistory from './UpdateHistory';
import * as api from '../api/node_upgrade_api';
import * as nodeManageApi from '../api/node_manage_api';
import * as deployApi from '../api/node_deploy_api';

export default {
  name: 'Update',
  components: {
    BackPopup,
    UpdateHistory,
  },
  mounted() {
    this.handleListNode();
  },
  data() {
    return {
      nodeList: '',
      nodeSelected: null,
      nodeLabel: '',
      dropDownType: 'danger',
      selectRow: {}, // 被选中的行
      showUpgradePopup: false, // 是否显示升级弹窗
      showBackPopup: false, // 是否显示回退弹窗
      backup: {
        show: false,
        tomcatDir: '',
        tomcatId: '',
      },
      updateHistory: {
        show: false,
        tomcatId: '',
      },
      tableData: [], // {"deployStatus": "","runningStatus": "","tomcatDir": "","tomcatName": "","upgradeStatus": "","version": "","warDir": ""}
      configInfoLoading: false, // 是否loading
    };
  },
  methods: {
    changeTomcatName(index, item) {
      this.$alert(item.tomcatName);
    },
    handleCommand({index}) {
      this.nodeSelected = this.nodeList[parseInt(index)];
      this.dropDownType = 'primary';
      this.tableData = [];
      this.configInfoLoading = true;
      this.execListTomcat();
    },

    handleListNode() {
      // do nothing
      this.configInfoLoading = true;
      nodeManageApi.listNode()
        .then(res => {
          this.configInfoLoading = false;
          // do
          this.nodeList = res.data.filter((item) => {
            return item.agentStatus === 'up';
          });
          this.nodeSelected = this.nodeList && this.nodeList.length > 0 && this.nodeList[0];
          this.nodeLabel = this.nodeSelected && this.nodeSelected.ip;
          this.nodeLabel && this.handleCommand({index: '0'});
        })
        .catch(reason => {
          this.configInfoLoading = false;
          // do
          this.$alert(reason);
        });
    },

    handleSwitchNode(newNode) {
      this.nodeSelected = newNode;
      this.dropDownType = 'primary';
      this.execListTomcat();
      this.$emit('modifyNode', this.nodeSelected); // 切换tomcat重置数据
    },

    execListTomcat() {
      this.configInfoLoading = true;
      this.editState = false;
      this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
      api.getTomcatInfoOfNode(this.nodeSelected.id)
        .then(res => {
          this.configInfoLoading = false;
          this.tableData = res.data;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
        })
        .catch(reason => {
          this.configInfoLoading = false;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
        });
    },

    // 控制弹窗显示或隐藏状态
    getWindowState(data) {
      this.showUpgradePopup = data;
    },
    // 升级
    handleUpgrade(index, row) {
      this.selectRow = row;
      this.$router.push({ name: 'upgrade', params: {nodeId: this.nodeSelected.id, tomcatInfo: row} });
    },
    // 回退
    handleBack(index, row) {
      this.backup.show = true;
      this.backup.tomcatDir = row.tomcatDir;
      this.backup.tomcatId = row.id;
    },
    handleHistory(index, row) {
      this.updateHistory.show = true;
      this.updateHistory.tomcatId = row.id;
    },
    handleReport(index, row) {
      deployApi.connectInfo([row.id]).then(res => {
        if (res.success) {
          // this.rollback = false;
          // 查看报告url
          let connectVo = res.data[0];
          let reportUrl =
            'http://' +
            connectVo.ip +
            ':' +
            connectVo.tomcatPort +
            '/YSSUCOBRIDGE/deploy_console/index.html';
          window.open(reportUrl);
        }
      }).catch(reason => {
        // 提示获取连接信息失败
        this.$message.error({
          message: '获取tomcat地址失败',
        });
      });
    },
  },
  beforeDestroy() {
    bus.$emit('selectedRow', this.selectRow);
    sessionStorage.setItem('updateTomcatName', this.selectRow.tomcatName);
  },
};
</script>
<style lang="css" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 5;
}
.table-container {
  /* width: 990px; */
  margin: 10px 20px 0 20px;
}
h5 {
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
/*选中一行，颜色加深，字体加粗*/
#tem-upgrade >>> .current-row > td {
  background-color: #409eff8a !important;
  font-weight: bold;
}
.list {
  max-height: 500px;
}

/deep/ .el-divider--horizontal {
  margin: 0px;
  padding: 0px;
}

  /*升级历史标题栏*/
/deep/ .el-drawer__header {
  height: 60px;
  color: #303133;
  font-size: 18px;
  line-height: 60px;
  margin: 0px;
  padding: 0px 0px 0px 20px;
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
  padding-top: 10px;
}
/deep/ .el-dialog__title{
  font-size: 16px;
}
</style>
<style>
.d2-theme-container-main-body {
  overflow-y: scroll;
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

</style>
