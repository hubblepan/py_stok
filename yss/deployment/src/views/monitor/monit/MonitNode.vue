<template class="d2-theme-container-main-body">
  <div id="tem-upgrade">
    <div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">
      <span>监控信息</span>
<!--      <el-form ref="form" :model="formData" label-width="80px" label-position="left" style="margin-top: 10px">-->
<!--        <el-form-item label="节点信息" style="width: 400px;">-->
<!--          <el-select v-model="formData.value" placeholder="请选择" size="mini">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    </div>
    <el-divider></el-divider>
    <div style="height: 40px; font-size: 14px; line-height: 40px; margin-left: 20px; margin-top: 10px; display: none">
      <span>当前节点:&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-dropdown @command="handleCommand">
        <el-button :type="dropDownType" plain size="small">
          {{nodeSelected ? nodeSelected.ip : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择节点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in nodeList" :key="item.ip" :command="item">{{item.ip}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-tabs v-model="nodeLabel" type="card" @tab-click="handleCommand" style="margin-top: 20px;  margin-left: -1px;">
      <el-tab-pane v-for="item in nodeList" :key="item.ip" :label="item.ip" :name="item.ip"></el-tab-pane>
    </el-tabs>
    <div class="table-container" v-loading="configInfoLoading">
      <el-table :data="tableData" border style="width: 100%"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column align="left" fixed label="Tomcat名称" prop="tomcatName" width="190">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.tomcatDir" placement="top">
              <span>{{ scope.row.tomcatName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--端口号-->
        <el-table-column align="center" label="端 口" prop="tomcatPort" min-width="100" width="100"></el-table-column>
        <!--jdk版本-->
        <el-table-column align="center" label="  JDK版本号" prop="jdkVersionOfTomcat" min-width="100" width="130"></el-table-column>
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
        <el-table-column align="center" label="操作" min-width="300" width="400">
          <template slot-scope="scope">
            <el-button @click="handleUpgrade(scope.$index, scope.row)" size="mini" type="primary">监控</el-button>
            <el-button
              @click="handleReport(scope.$index, scope.row)"
              size="mini"
              type="success"
              :disabled="scope.row.runningStatus === 'DOWN'"
            >Druid</el-button>
            <el-button type="warning" @click="handleMonitReport(scope.$index, scope.row)" size="mini" :disabled="scope.row.runningStatus === 'DOWN'" v-if="false">巡检</el-button>
            <el-button @click.stop="handleRestart(scope.$index, scope.row)" size="mini" type="success" plain v-if="scope.row.runningStatus !== 'UP' && scope.row.deployStatus !== 'noDeploy' && scope.row.deployStatus !== 'deploying'">启动</el-button>
            <el-button @click.stop="handleRestart(scope.$index, scope.row)" size="mini" type="danger" v-if="scope.row.runningStatus === 'UP' && scope.row.deployStatus !== 'noDeploy' && scope.row.deployStatus !== 'deploying'">重启</el-button>
            <el-button type="info" plain size="mini" style="margin-left: 10px;" @click="handleDBLock(scope.$index, scope.row)" :disabled="scope.row.runningStatus === 'DOWN'">锁表检测</el-button>
            <el-button type="danger" plain size="mini" style="margin-left: 10px;" @click="handleDBSettings(scope.$index, scope.row)">DB配置</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <monit-db-setting ref="MonitDBSetting" :on-save="onSaveDbSetting"></monit-db-setting>
    <monit-db-lock ref="MonitDbLock"></monit-db-lock>
    <node-log-loading ref="NodeLogLoading"></node-log-loading>
  </div>
</template>
<script>
import * as validate from '@/libs/validate';
import NodeLogLoading from '../nodes/NodeLogLoading';
import * as api from '../api/node_deploy_api';
import * as manageApi from '../api/node_manage_api';
import * as upgradeApi from '../api/node_upgrade_api';
import * as monitApi from '../api/monit_api';
import MonitDbSetting from './MonitDbSetting';
import MonitDbLock from './MonitDbLock';

export default {
  name: 'MonitNode',
  components: { NodeLogLoading, MonitDbLock, MonitDbSetting },
  mounted() {
    // 获取升级包信息
    this.handleListNode();
  },
  data() {
    return {
      nodeList: [],
      nodeSelected: null,
      nodeLabel: '',
      dropDownType: 'danger',
      tableData: [], // {"deployStatus": "","runningStatus": "","tomcatDir": "","tomcatName": "","upgradeStatus": "","version": "","warDir": ""}
      configInfoLoading: false, // 是否loading
    };
  },
  methods: {
    onSaveDbSetting(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.MonitDBSetting.closeLoading();
        this.$refs.MonitDBSetting.close();
        // 刷新节点列表
        this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.MonitDBSetting.closeLoading();
      });
    },
    handleRestart(index, row) {
      if (row.runningStatus === 'UP') {
        this.$confirm('该操作将对Tomcat进行重启，是否继续！', '提示', {
          confirmButtonText: '重启',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$refs.NodeLogLoading.show(row);
          return api.restartTomcat(row.id);
        }).then((res) => {
          row.runningStatus = 'UP';
        }).catch(() => {
          // do nth
        });
      } else {
        this.$refs.NodeLogLoading.show(row);
        api.restartTomcat(row.id)
          .then(res => {
            row.runningStatus = 'UP';
          })
          .catch(reason => {
          });
      }
    },
    handleListNode() {
      // do nothing
      manageApi.listNode()
        .then(res => {
          // do
          this.nodeList = res.data.filter((item) => {
            return item.agentStatus === 'up';
          });
          this.nodeSelected = this.nodeList && this.nodeList.length > 0 && this.nodeList[0];
          this.nodeLabel = this.nodeSelected && this.nodeSelected.ip;
          this.nodeLabel && this.handleCommand({index: '0'});
        })
        .catch(reason => {
          // do
          this.$alert(reason);
        });
    },
    handleCommand({index}) {
      this.nodeSelected = this.nodeList[parseInt(index)];
      this.dropDownType = 'primary';
      this.tableData = [];
      this.configInfoLoading = true;
      upgradeApi.getTomcatInfoOfNode(this.nodeSelected.id).then(res => {
        this.configInfoLoading = false;
        // eslint-disable-next-line no-empty
        if (res.success) {
          this.tableData = res.data.filter(item => {
            return item.upgrade;
          });
        }
      }).catch(reason => {
        this.configInfoLoading = false;
      });
    },
    handleDBLock(index, row) {
      this.$refs.MonitDbLock.show(row.id);
    },
    handleDBSettings(index, row) {
      this.$refs.MonitDBSetting.show(row.id);
    },
    handleMonitReport(index, row) {
      this.$router.push({ name: 'MonitReport', params: {tomcatId: row.id, tomcatDir: row.tomcatDir} });
    },
    // 控制弹窗显示或隐藏状态
    getWindowState(data) {
      this.showUpgradePopup = data;
    },

    // 升级
    handleUpgrade(index, row) {
      // this.$router.push({ name: 'downloadInfo', params: {tomcatInfo: row} });
      monitApi.getOracleConfig(row.id)
        .then(res => {
          if (!res.data || !res.data.user) {
            this.$confirm('当前Tomcat没有配置数据库用户信息，会造成需要权限的数据库监控信息缺失，是否配置数据库用户信息？', {
              distinguishCancelAndClose: true,
              confirmButtonText: '配置',
              cancelButtonText: '跳过',
              type: 'warning',
            }).then(() => {
              this.handleDBSettings(index, row);
            }).catch(action => {
              // do nothing
              action === 'cancel' && this.$router.push({ name: 'downloadInfo', params: {tomcatInfo: row} });
            });
          } else {
            this.$router.push({ name: 'downloadInfo', params: {tomcatInfo: row} });
          }
        })
        .catch(reason => {
          // do nth
        });
    },

    handleReport(index, row) {
      api.connectInfo([row.id]).then(res => {
        if (res.success) {
          // this.rollback = false;
          // 查看报告url
          let reportUrl =
            'http://' +
            res.data[0].ip +
            ':' +
            res.data[0].tomcatPort +
            '/YSSUCOBRIDGE/druid/index.html';
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
  border-radius: 0;
}

</style>
