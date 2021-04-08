<template>
  <!-- 新增节点 -->
  <el-dialog title="添加远程War包" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-row style="height: 32px; line-height: 32px; margin-left: 10px; margin-bottom: 10px;">
      <el-col :span="20"><el-input type="text" class="table-bar-input" placeholder="请输入搜索路径" v-model="searchPath" size="small"></el-input></el-col>
      <el-col :span="2" style="margin-left: 10px;"><el-button type="primary" @click="handleSearchRemoteWarDir()" size="mini">查询</el-button></el-col>
    </el-row>
    <el-table :data="tableData" border style="margin: 0 20px 10px 10px; width:540px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData">
      <el-table-column fixed="left" width="40" align="center">
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.path"
            v-model="selectWarDir"
            @change.native="handleClickRow(scope.row)"
          >&nbsp;</el-radio>
        </template>3
      </el-table-column>
      <el-table-column property="path" label="war目录"></el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_deploy_api';
export default {
  name: 'NodeAddWarRemote',
  props: ['onAdded'],
  data() {
    return {
      nodeId: '',
      showDialog: false,
      loadingData: false,
      selectWarDir: '',
      searchPath: '',
      tableData: [],
      tableItem: {
        id: 0,
        path: '',
      },
      cacheKey: '',
    };
  },
  // created() {
  //   this.execListWar();
  // },
  methods: {
    show(nodeId = '') {
      this.showDialog = true;
      this.selectWarDir = '';
      this.searchPath = '';
      this.tableData = [];
      this.loadingData = false;
      this.nodeId = nodeId;
      this.cacheKey = this.nodeId + '_default_war_search_path';
      this.initData();
      // this.execListWar(nodeId);
    },
    close() {
      this.showDialog = false;
    },
    handleClickRow(row, event, column) {
      this.selectWarDir = row.path;
    },
    execAdd() {
      if (this.selectWarDir) {
        this.onAdded(this.selectWarDir); // 将选择的war包传给调用者
        this.close();
      } else {
        this.$alert('请选择一个war包', {type: 'error'});
      }
    },
    execListWar(nodeId) {
      this.loadingData = true;
      if (nodeId === '') {
        // 服务端节点
        api.getDefaultWarDirOfServer()
          .then(res => {
            this.searchPath = res.data;
            return api.getWarFileOfServer(this.searchPath);
          })
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, path: item.path});
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
        api.getDefaultWarDirOfNode(nodeId)
          .then(res => {
            this.searchPath = res.data;
            return api.getWarFileOfNode(nodeId, this.searchPath);
          })
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, path: item.path});
              });
            }
            this.tableData = tableData;
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      }
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
    async initData() {
      this.searchPath = await this.loadFromStorage(this.cacheKey) || '';
      if (this.searchPath) {
        this.execSearch(this.nodeId); // 从缓存目录 获取 war包列表
      } else {
        this.execListWar(this.nodeId); // 通过接口获取默认目录， 来获取 war包列表
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
      try {
        this.loadingData = true;
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
    handleSearchRemoteWarDir() {
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
        api.getWarFileOfServer(this.searchPath)
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, path: item.path});
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
        api.getWarFileOfNode(nodeId, this.searchPath)
          .then(res => {
            this.loadingData = false;
            let tableData = [];
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, index) => {
                tableData.push({id: index, path: item.path});
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
</style>
