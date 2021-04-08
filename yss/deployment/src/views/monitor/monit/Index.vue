<template class="d2-theme-container-main-body">
  <div id="tem-upgrade">
    <div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">Tomcat 列表</div>
    <el-divider></el-divider>
    <div class="table-container" v-loading="configInfoLoading">
      <el-table :data="tableData" @row-click="handleClickRow" border style="width: 100%"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column align="left" fixed label="Tomcat名称" prop="tomcatName" width="200">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.tomcatDir" placement="top">
              <span>{{ scope.row.tomcatName }}</span>
            </el-tooltip>
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
        <el-table-column align="center" label="操作" min-width="300" width="300">
          <template slot-scope="scope">
            <el-button @click="handleUpgrade(scope.$index, scope.row)" size="mini" type="primary">监控报告</el-button>
            <el-button
              @click="handleReport(scope.$index, scope.row)"
              size="mini"
              type="success"
              :disabled="scope.row.runningStatus === 'DOWN'"
            >Druid 报告</el-button>
            <el-button type="warning" @click="handleMonitReport(scope.$index, scope.row)" size="mini" :disabled="scope.row.runningStatus === 'DOWN'">巡检报告</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>
<script>
import * as api from '../upgrade/api';

export default {
  name: 'monit',

  mounted() {
    // 获取升级包信息
    this.configInfoLoading = true;
    api.getUpgradeTomcat().then(res => {
      this.configInfoLoading = false;
      // eslint-disable-next-line no-empty
      if (res.success) {
        this.tableData = res.data;
      }
    }).catch(reason => {
      this.configInfoLoading = false;
    });
  },
  data() {
    return {
      selectRow: {}, // 被选中的行

      tableData: [], // {"deployStatus": "","runningStatus": "","tomcatDir": "","tomcatName": "","upgradeStatus": "","version": "","warDir": ""}
      radio: '',
      configInfoLoading: false, // 是否loading
    };
  },
  methods: {
    handleMonitReport(index, row) {
      this.$router.push({name: 'MonitReport', params: {tomcatDir: row.tomcatDir} });
    },
    // 控制弹窗显示或隐藏状态
    getWindowState(data) {
      this.showUpgradePopup = data;
    },
    // 选中的数据
    handleClickRow(row, event, column) {
      this.radio = row.tomcatDir;
    },
    // 升级
    handleUpgrade(index, row) {
      this.selectRow = row;
      this.$router.push({ name: 'downloadInfo', params: {tomcatDir: row.tomcatDir} });
    },

    handleReport(index, row) {
      api.upgradeConnectInfo(row.tomcatDir).then(res => {
        if (res.success) {
          // this.rollback = false;
          // 查看报告url
          let reportUrl =
            'http://' +
            res.data.ip +
            ':' +
            res.data.tomcatPort +
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
  margin: 20px 20px 0 20px;
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
