<template>
  <d2-container>
    <div>
      <app-header :title="type === 'upgrade' ? '升级结果' : '回退结果'"></app-header>
      <el-table
        :data="tableData"
        border style="margin: 20px; width: 98%" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="nodeName"
          label="节点名称"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.nodeName}}</span>
            <br/>
            <span>{{'(' + scope.row.ip + ')'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="tomcat名称"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.tomcatName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tomcatDir"
          label="选择的tomcat地址">
        </el-table-column>
        <el-table-column
          prop="backupTime"
          label="回退点"
          width="200"
          v-if="type === 'backup'">
        </el-table-column>
        <el-table-column
          align="center"
          prop="backupTime"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <i class="el-icon-loading" v-if="scope.row.status === 0"></i>
            <i class="el-icon-check" style="color: green;" v-if="scope.row.status === 1"></i>
            <i class="el-icon-error" style="color: red;" v-if="scope.row.status === -1"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200" width="200">
          <template slot-scope="scope">
            <el-button @click="handleLog(scope.$index, scope.row)" size="mini" type="plain" icon="el-icon-tickets">日志</el-button>
            <el-button @click="handleReport(scope.$index, scope.row)" size="mini" type="success" v-if="scope.row.status === 1">启动报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-button @click="handleBackup" size="small" type="warning" style="margin: 20px 0 20px 20px;" v-if="type === 'upgrade'">一键回退</el-button>
      </div>
      <!--日志-->
      <node-upgrade-log v-for="item in tableData" :tomcat-dir="item.tomcatDir" :connect-info="item.connectInfo" ref="Log" :key="item.tomcatDir"></node-upgrade-log>
      <!-- 回退-->
      <node-upgrade-backup ref="Backup" :on-rollback="onRollback"></node-upgrade-backup>
    </div>
  </d2-container>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import NodeUpgradeLog from './NodeUpgradeLog';
import NodeUpgradeBackup from './NodeUpgradeBackup';
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeUpgradeComplete',
  components: { NodeUpgradeBackup, AppHeader, NodeUpgradeLog },
  data() {
    return {
      type: '',
      tableData: [],
      tomcatIdMap: {},
      tableItem: {
        nodeName: 'node1',
        ip: '127.0.0.1',
        tomcatDir: '/homt/tomcat/1',
        tomcatId: '',
        tomcatName: '',
        fileName: '/home/upgrade/1',
        connectInfo: null,
        backupTime: '',
        status: '0',
      },
    };
  },
  mounted() {
    let data = JSON.parse(this.$route.params.data);
    let tableData = [];
    let tomcatIds = [];
    this.tomcatIdMap = {};
    data.forEach((item, index) => {
      tomcatIds.push(item.tomcatInfo.id);
      let tableItem = {
        nodeName: item.name,
        ip: item.ip,
        tomcatName: item.tomcatInfo.tomcatName,
        tomcatDir: item.tomcatInfo.tomcatDir,
        tomcatId: item.tomcatInfo.id,
        fileName: item.singleZip,
        backupTime: item.backupTime,
        connectInfo: item.connectInfo,
        status: 0, // 0 标识正在升级/回退  1表示已升级/回退 -1 标识升级/回退错误
      };
      tableData.push(tableItem);
      this.tomcatIdMap[item.tomcatInfo.id] = tableItem;
    });
    this.tableData = tableData;
    this.type = this.$route.params.type;
    // 连接websocket
    this.$nextTick(() => {
      this.$refs.Log.forEach((item, index) => {
        item.connect(this.type === 'upgrade' ? 'upgrade' : 'rollBack');
      });
    });
    // 执行升级
    if (this.$route.params.type === 'upgrade') {
      let force = Boolean(this.$route.params.force);
      api.upgrade(tomcatIds, force)
        .then(res => {
          //  do nothing
          this.tableData.forEach((item, index) => {
            item.status = 1;
          });
          if (res.data && res.data.failIdList) {
            res.data.failIdList.forEach((item, index) => {
              this.tomcatIdMap[item].status = -1;
            });
          }
          if (res.success) {
            this.$alert('升级已完成, 您可以通过日志查看Tomcat启动情况', {type: 'info'});
          } else {
            this.$alert('部分节点升级存在失败', {type: 'error'});
          }
        })
        .catch(reason => {
          // do nothing
          this.tableData.forEach((item, index) => {
            item.status = -1;
            this.$alert('部分节点升级存在失败', {type: 'error'});
          });
        });
    }

    // 执行回退
    if (this.$route.params.type === 'backup') {
      let backupPackageVos = [];
      this.tableData.forEach((item, index) => {
        backupPackageVos.push({
          rollBackTime: item.backupTime,
          tomcatId: item.tomcatId,
        });
      });
      api.rollBack(backupPackageVos)
        .then(res => {
          // do nothing
          this.tableData.forEach((item, index) => {
            item.status = 1;
          });
          if (res.data && res.data.failIdList) {
            res.data.failIdList.forEach((item, index) => {
              this.tomcatIdMap[item].status = -1;
            });
          }
        })
        .catch(reason => {
          this.tableData.forEach((item, index) => {
            item.status = -1;
            this.$alert('部分节点回退存在失败', {type: 'error'});
          });
        });
    }
  },
  methods: {
    handleReport(index, row) {
      let reportUrl =
        'http://' +
        row.connectInfo.ip +
        ':' +
        row.connectInfo.tomcatPort +
        '/YSSUCOBRIDGE/start/report';
      window.open(reportUrl);
    },
    onRollback(data) {
      this.type = 'backup';
      let tableData = [];
      this.tomcatIdMap = {};
      data.forEach((item, index) => {
        let tableItem = {
          nodeName: item.name,
          ip: item.ip,
          tomcatDir: item.tomcatInfo.tomcatDir,
          tomcatId: item.tomcatInfo.id,
          fileName: item.singleZip,
          backupTime: item.backupTime,
          connectInfo: item.connectInfo,
          status: 0, // 0 标识正在升级/回退  1表示已升级/回退
        };
        tableData.push(tableItem);
        this.tomcatIdMap[item.tomcatInfo.id] = tableItem;
      });
      this.tableData = tableData;
      let backupPackageVos = [];
      this.tableData.forEach((item, index) => {
        backupPackageVos.push({
          rollBackTime: item.backupTime,
          tomcatId: item.tomcatId,
        });
      });
      api.rollBack(backupPackageVos)
        .then(res => {
          console.log(res);
          this.tableData.forEach((item, index) => {
            item.status = 1;
          });
          if (res.data && res.data.failIdList) {
            res.data.failIdList.forEach((item, index) => {
              console.log(item, this.tomcatIdMap[item], this.tomcatIdMap[item].status);
              this.tomcatIdMap[item].status = -1;
            });
          }
        })
        .catch(reason => {
          this.tableData.forEach((item, index) => {
            item.status = -1;
            this.$alert('部分节点回退存在失败', {type: 'error'});
          });
        });
      this.$nextTick(() => {
        this.$refs.Log.forEach((item, index) => {
          item.reset();
          item.connect(this.type === 'upgrade' ? 'upgrade' : 'rollBack');
        });
      });
    },
    handleLog(index, item) {
      this.$refs.Log[index].show();
    },
    handleBackup() {
      this.$refs.Backup.show(JSON.parse(this.$route.params.data));
    },
  }
};
</script>

<style scoped>

</style>
