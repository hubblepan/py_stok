<template>
  <div>
    <el-dialog title="选择节点" :visible.sync="showDialog" width="615px">
      <el-button @click="handleCreateNode" size="small" type="success" style="margin-left: 10px;" v-if="enableAdd">创建节点</el-button>
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        @selection-change="onSelectionChange"
        @row-click="handleClickTableRow"
        border style="margin: 10px; width: 575px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="nodeStatus"
          label="代理端状态"
          v-if="statusRequired"
          width="180">
          <template slot-scope="scope">
            <el-button @click.stop="execDeployAgent(scope.$index, scope.row)" size="mini" type="danger" plain v-if="scope.row.agentStatus === 'noDeploy'" :loading="scope.row.agentAction">{{scope.row.agentAction ? '安装中': '点击安装'}}</el-button>
            <el-button @click.stop="execStartAgent(scope.$index, scope.row)" size="mini" type="danger" plain v-if="scope.row.agentStatus === 'down'" :loading="scope.row.agentAction">{{scope.row.agentAction ? '启动中': '点击启动'}}</el-button>
            <el-tag type="success" v-if="scope.row.agentStatus === 'up'">运行中</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execSelect" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增节点 -->
    <node-add :on-added="onNodeCreated" ref="nodeCreate"></node-add>
  </div>

</template>

<script>
import NodeAdd from './NodeAdd';
import * as api from '../api/node_manage_api';
export default {
  name: 'NodeSelect',
  props: ['onSelected'],
  components: {
    NodeAdd,
  },
  data() {
    return {
      showDialog: false,
      loadingData: false,
      cacheNodeIds: [],
      selectData: [],
      tableData: [],
      deployLoadingMap: {},
      enableAdd: true,
      statusRequired: true,
    };
  },
  created() {
  },
  methods: {
    show(cacheSelectNodeIds = [], enableAdd = true, statusRequired = true) {
      this.showDialog = true;
      this.cacheNodeIds = cacheSelectNodeIds;
      this.enableAdd = enableAdd;
      this.statusRequired = statusRequired;
      this.execListNode();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    onSelectionChange(val) {
      this.selectData = val;
    },
    onNodeCreated(p) {
      p.then(res => {
        // 成功
        this.$refs.nodeCreate.closeLoading();
        this.$refs.nodeCreate.close();
        this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeCreate.closeLoading();
        this.$message.error({
          message: '添加节点失败:' + reason,
        });
      });
    },

    handleCreateNode() {
      this.$refs.nodeCreate.show();
    },

    // 点击本地文件表格的一行
    handleClickTableRow(row, event, column) {
      console.log(row, event, column);
      this.$refs.table.toggleRowSelection(row);
    },
    execSelect() {
      // 验证 所选节点的 代理端是否已全部启动
      let valid = true;
      this.selectData.forEach((item, index) => {
        if (item.agentStatus !== 'up') {
          valid = false;
        }
      });
      if (!valid && this.statusRequired) {
        this.$message.error('所选的节点存在未启动的代理端');
        return false;
      }
      this.onSelected(this.selectData);
      this.close();
    },

    execListNode() {
      this.loadingData = true;
      api.listNode()
        .then(res => {
          this.loadingData = false;
          // 过滤
          // if (this.filterSet) {
          //   res.data = res.data.filter(item => {
          //     return !this.filterSet.has(item.id);
          //   });
          // }
          // 保存原来的 table data信息
          for (let k = 0; k < res.data.length; k++) {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id === res.data[k].id) {
                Object.assign(this.tableData[i], res.data[k]);
                res.data[k] = this.tableData[i];
              }
            }
          }
          // 保存已选择的数据
          let selectIds = [];
          this.cacheNodeIds && this.cacheNodeIds.forEach((item, index) => {
            selectIds.push(item);
          });
          this.selectData.forEach((item, index) => {
            if (selectIds.indexOf(item.id) === -1) {
              selectIds.push(item.id);
            }
          });
          this.tableData = res.data;
          // 重新初始化已选择的数据
          this.selectData = [];
          console.log(selectIds);
          console.log(this);
          this.$nextTick(() => {
            this.tableData.forEach((item, index) => {
              if (selectIds.indexOf(item.id) > -1) {
                this.$refs.table.toggleRowSelection(item);
              }
            });
          });
          // 初始化节点部署状态数据
          this.tableData.forEach((item, index) => {
            if (!this.deployLoadingMap[item.id]) {
              this.deployLoadingMap[item.id] = false;
            }
            this.$set(item, 'agentAction', this.deployLoadingMap[item.id]);
          });
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({
            message: reason,
          });
        });
    },
    execDeployAgent(index, nodeItem) {
      if (!nodeItem.sshAccount || nodeItem.sshAccount.trim() === '') {
        this.$message.error('ssh账号为空， 无法部署');
        return;
      }
      this.deployLoadingMap[nodeItem.id] = true;
      nodeItem.agentAction = true;
      api.deployAgent(nodeItem.id)
        .then(res => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
          nodeItem.agentStatus = res.data;
        })
        .catch(reason => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
        });
    },
    execStartAgent(index, nodeItem) {
      if (!nodeItem.sshAccount || nodeItem.sshAccount.trim() === '') {
        this.$message.error('ssh账号为空， 无法启动');
        return;
      }
      this.deployLoadingMap[nodeItem.id] = true;
      nodeItem.agentAction = true;
      api.startAgent(nodeItem.id)
        .then(res => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
          nodeItem.agentStatus = res.data;
        })
        .catch(reason => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
        });
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
    padding: 20px 10px;
  }
</style>
