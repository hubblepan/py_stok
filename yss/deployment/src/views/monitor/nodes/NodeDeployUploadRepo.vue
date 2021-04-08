<template>
  <!-- 获取节点上的升级文件 -->
  <el-dialog title="选择部署包版本" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-row style="height: 32px; line-height: 32px; margin-left: 10px; margin-bottom: 10px;">
      <el-col :span="18"><el-input type="text" class="table-bar-input" placeholder="请部署版本目录" v-model="searchPath" size="small"></el-input></el-col>
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
  name: 'NodeDeployUploadRepo',
  props: ['onAdded'],
  data() {
    return {
      nodeId: '',
      tomcatId: '',
      tomcatInfo: null,
      showDialog: false,
      loadingData: false,
      searchPath: '',
      treeData: [],
      defaultProps: {
        children: 'children1', // 不需要展开节点, 给一个不存在的值
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
      this.cacheKey = this.nodeId + '_default_deploy_repo_search_path';
      this.showDialog = true;
      this.treeData = [];
      this.$nextTick(() => {
        this.$refs.Tree.setCheckedKeys([]);
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
        this.$alert('请选择一个部署包', {type: 'error'});
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
