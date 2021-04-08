<template>
  <!-- 获取节点上的升级文件 -->
  <el-dialog title="选择升级文件" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-row style="height: 32px; line-height: 32px; margin-left: 10px; margin-bottom: 10px;">
      <el-col :span="18"><el-input type="text" class="table-bar-input" placeholder="请输入搜索路径" v-model="searchPath" size="small"></el-input></el-col>
      <el-col :span="2" style="margin-left: 10px;"><el-button type="primary" @click="handleSearchRemoteZipDir()" size="mini">查询</el-button></el-col>
    </el-row>
    <el-table :data="tableData" border style="margin: 0 20px 10px 10px; width:540px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData">
      <el-table-column fixed="left" width="40" align="center">
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.zip"
            v-model="selectZipDir"
            @change.native="handleClickRow(scope.row)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column property="zip" label="升级文件"></el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeUpgradeUploadRemote',
  props: ['onAdded'],
  data() {
    return {
      nodeId: '',
      showDialog: false,
      loadingData: false,
      selectZipDir: '',
      searchPath: '',
      tableData: [],
      tableItem: {
        id: 0,
        zip: '',
      },
      cacheKey: '',
    };
  },
  created() {
    // this.execListWar();
  },
  methods: {
    show(nodeId = '') {
      this.nodeId = nodeId;
      this.showDialog = true;
      this.loadingData = true;
      this.selectZipDir = '';
      this.tableData = [];
      this.searchPath = '';
      this.cacheKey = this.nodeId + '_default_upgrade_search_path';
      this.initData();
    },
    close() {
      this.showDialog = false;
    },
    async initData() {
      this.searchPath = await this.loadFromStorage(this.cacheKey) || '';
      if (this.searchPath) {
        this.execSearch(this.nodeId); // 从缓存目录 获取 war包列表
      } else {
        this.execListZip(this.nodeId); // 通过接口获取默认目录， 来获取 war包列表
      }
    },
    async saveToStorage(key, value) {
      const db = await this.$store.dispatch('d2admin/db/database');
      db
        .set(key, value)
        .write();
      console.log(key, value);
    },

    async loadFromStorage(key) {
      this.loadingData = true;
      try {
        let res = await api.getUserConfig(this.nodeId);
        this.loadingData = false;
        return res.data.osgiPackageDir;
      } catch (e) {
        this.loadingData = false;
        return '';
      }
      // const db = await this.$store.dispatch('d2admin/db/database');
      // return db.get(key) && db.get(key).value();
    },
    handleClickRow(row, event, column) {
      this.selectZipDir = row.zip;
    },
    handleSearchRemoteZipDir() {
      if (!this.searchPath || this.searchPath.trim().length === 0) {
        return;
      }
      this.execSearch(this.nodeId);
    },
    execSearch(nodeId) {
      this.loadingData = true;
      this.saveToStorage(this.cacheKey, this.searchPath);
      if (nodeId === '') {
        // 服务端节点
        api.getUpgradeFileOfServer(this.searchPath)
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, zip: item});
              });
            }
            this.tableData = tableData;
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      } else {
        // 其他节点
        api.getUpgradeFileOfNode(nodeId, this.searchPath)
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, zip: item});
              });
            }
            this.tableData = tableData;
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      }
    },
    execListZip(nodeId) {
      if (nodeId === '') {
        // 服务端节点
        api.getDefaultDirOfServer()
          .then(res => {
            this.searchPath = res.data;
            return api.getUpgradeFileOfServer(this.searchPath);
          })
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, zip: item});
              });
            }
            this.tableData = tableData;
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      } else {
        // 其他节点
        api.getDefaultDirOfNode(nodeId)
          .then(res => {
            this.searchPath = res.data;
            return api.getUpgradeFileOfNode(nodeId, this.searchPath);
          })
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, zip: item});
              });
            }
            this.tableData = tableData;
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      }
    },
    execAdd() {
      if (this.selectZipDir) {
        this.onAdded(this.selectZipDir); // 将选择的war包传给调用者
        this.close();
      } else {
        this.$alert('请选择一个升级包', {type: 'error'});
      }
    },
    execListFile() {
      // this.loadingData = true;
      // api.listWarOfServer()
      //   .then(res => {
      //     this.loadingData = false;
      //     this.tableData = res.data;
      //   })
      //   .catch(reason => {
      //     this.loadingData = false;
      //     this.$message.error({message: reason});
      //   });
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

  /deep/ .el-dialog__body {
    padding-top: 20px;
  }
</style>
