<template>
  <!-- 获取节点上的升级文件 -->
  <el-dialog title="选择升级版本或补丁" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-row style="height: 32px; line-height: 32px; margin-left: 10px; margin-bottom: 10px;">
      <el-col :span="18"><el-input type="text" class="table-bar-input" placeholder="请输入版本路径" v-model="searchPath" size="small"></el-input></el-col>
      <el-col :span="2" style="margin-left: 10px;"><el-button type="primary" @click="handleSearchRepoDir()" size="mini">查询</el-button></el-col>
    </el-row>

    <el-tree
      v-loading="loadingData"
      :data="treeData"
      :props="defaultProps"
      show-checkbox
      node-key="fullPath"
      :highlight-current="true"
      :default-expand-all="true"
      :check-strictly="true"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @check="handleCheck"
      ref="Tree"
      style="margin-left: 10px; margin-top: 20px; padding-left: 10px; padding-top: 10px; margin-right: 10px;">
      <span slot-scope="{ node, data }">
        <span>{{ data.fileName }}</span>
        <span v-if="data.fileName === currentVersion" style="margin-left: 30px; color: #107bf8;">
          当前版本
        </span>
      </span>
    </el-tree>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeUpgradeUploadRepo',
  props: ['onAdded'],
  data() {
    return {
      nodeId: '',
      tomcatId: '',
      tomcatInfo: null,
      showDialog: false,
      loadingData: false,
      currentVersion: '',
      currentVersionPath: '',
      searchPath: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'fileName',
      },
      cacheKey: '',
    };
  },
  created() {
    // this.execListWar();
  },
  methods: {
    show(nodeId = '', tomcatInfo = null) {
      this.nodeId = nodeId;
      this.tomcatId = tomcatInfo && tomcatInfo.id;
      this.tomcatInfo = tomcatInfo;
      this.cacheKey = this.nodeId + '_default_upgrade_repo_search_path';
      // this.searchPath = this.tomcatInfo && this.tomcatInfo.queryVersionDir;
      this.currentVersion = this.tomcatInfo && this.tomcatInfo.version;
      this.currentVersionPath = '';
      // this.currentVersion = '/home/c/V1.300.7.02100301';
      this.showDialog = true;
      this.treeData = [];
      this.tomcatInfo = tomcatInfo;
      this.$nextTick(() => {
        this.$refs.Tree.setCheckedKeys([]);
        this.$refs.Tree.setCurrentKey(this.currentVersionPath);
      });
      this.initData();
      // if (this.searchPath) {
      //   this.execSearch(this.nodeId);
      // }
      // (!this.tomcatInfo) && this.initServerVersion();
    },
    close() {
      this.showDialog = false;
    },
    async initData() {
      this.searchPath = await this.loadFromStorage(this.cacheKey) || '';
      this.execSearch(this.nodeId);
    },
    handleNodeClick(dataItem, node, tree) {
      console.log('node-click');
      if (!dataItem.disabled) {
        this.$refs.Tree.setCheckedKeys([dataItem.fullPath]);
      }
      this.$refs.Tree.setCurrentKey(this.currentVersionPath);
    },
    handleCheck() {
      console.log('check');
    },
    handleCurrentChange() {
      console.log('currentChange');
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
        return res.data.versionDir;
      } catch (e) {
        this.loadingData = false;
        return '';
      }
      // const db = await this.$store.dispatch('d2admin/db/database');
      // return db.get(key) && db.get(key).value();
    },

    handleSearchRepoDir() {
      this.execSearch(this.nodeId);
    },
    handleCheckChange(dataItem, checked) {
      if (checked) {
        // do nothing
      }
    },
    execSearch(nodeId) {
      this.loadingData = true;
      this.saveToStorage(this.cacheKey, this.searchPath);
      if (nodeId === '') {
        this.treeData = [];
        api.getServerVersionTree(this.searchPath)
          .then(res => {
            this.loadingData = false;
            console.log(res.data, this.treeData);
            if (res.data) {
              let treeData = res.data.children;
              this.traverseObjWithId(1, treeData);
              // console.log('debug:', treeData);
              this.treeData = treeData;
              this.$nextTick(() => {
                this.$refs.Tree.setCurrentKey(this.currentVersion);
              });
            }
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      } else {
        // 其他节点
        this.treeData = [];
        api.getVersionTree(this.tomcatId, this.searchPath)
          .then(res => {
            this.loadingData = false;
            console.log(res.data, this.treeData);
            if (res.data) {
              let treeData = res.data.children;
              this.traverseObjWithId(1, treeData);
              // console.log('debug:', treeData);
              this.treeData = treeData;
              this.$nextTick(() => {
                this.$refs.Tree.setCurrentKey(this.currentVersion);
              });
            }
          })
          .catch(reason => {
            this.loadingData = false;
            this.$message.error({message: reason});
          });
      }
    },

    // 深度遍历， 给对象增加i值
    traverseObjWithId(initialId, treeData) {
      if (treeData instanceof Array) {
        treeData.forEach((item, index) => {
          item.id = initialId++;
          for (let key in item) {
            if (key === 'children' && item[key]) {
              initialId = this.traverseObjWithId(initialId, item[key]);
            }
          }
          if (item['fileName'] && item['fileName'] === this.currentVersion) {
            this.currentVersionPath = item['fullPath'];
          }
        });
      }
      return initialId;
    },
    execAdd() {
      let checkedKeys = this.$refs.Tree.getCheckedKeys();
      console.log(checkedKeys);
      let selectPath = checkedKeys && checkedKeys.length > 0 && checkedKeys[0];
      if (selectPath) {
        this.onAdded(selectPath); // 将选择的war包传给调用者
        this.close();
      } else {
        this.$alert('请选择一个版本或补丁', {type: 'error'});
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

  /deep/ .el-dialog__body {
    padding-top: 20px;
  }

  /*/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {*/
  /*  background-color: #609bf8;*/
  /*}*/
</style>
