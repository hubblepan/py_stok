<template>
  <d2-container>
    <div>
      <app-header-new :title="'服务器列表'">
        <template v-slot:button-group>
          <div class="app-text-button" @click="handleAddNode">
            <i class="iconfont iconadd-o"></i>
            <span>新增</span>
          </div>
        </template>
      </app-header-new>

      <el-button class="d2-ml d2-mt d2-mb-10" type="success" size="small" @click="handleAddNode" v-if="false">新增节点</el-button>
      <el-table class="d2-ml" v-loading="loadingData"
                :data="nodeList" border style="width: 98%" max-height="750"
                :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"
                :header-row-style="{height: '40px'}"
                :row-style="{height: '40px'}"
                :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}">
        <el-table-column
          prop="name"
          label="节点名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址"
          width="160">
        </el-table-column>
        <el-table-column
          prop="sshPort"
          label="ssh端口"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sshAccount"
          label="ssh账号"
          width="120">
        </el-table-column>

        <el-table-column
          prop="systemType"
          label="系统类型"
          width="100">
        </el-table-column>
        <!--      <el-table-column-->
        <!--        prop="sysType"-->
        <!--        label="系统类型"-->
        <!--        width="80">-->
        <!--      </el-table-column>-->
        <el-table-column
          prop="agentStatus"
          label="代理端状态"
          width="140">
          <template slot-scope="scope">
            <el-button @click="execDeployAgent(scope.$index, scope.row)" size="mini" type="danger" plain v-if="scope.row.agentStatus === 'noDeploy'" :loading="scope.row.agentAction">{{scope.row.agentAction ? '安装中': '点击安装'}}</el-button>
            <el-button @click="execStartAgent(scope.$index, scope.row)" size="mini" type="danger" plain v-if="scope.row.agentStatus === 'down'" :loading="scope.row.agentAction">{{scope.row.agentAction ? '启动中': '点击启动'}}</el-button>
            <el-tag type="success" v-if="scope.row.agentStatus === 'up'">运行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="agentDir"
          label="代理端目录">
        </el-table-column>
        <el-table-column align="left" label="操作" min-width="240" width="320">
          <template slot-scope="scope">
            <el-button @click="handleModifyNode(scope.$index, scope.row)" size="mini" type="warning">修改</el-button>

            <el-button @click="execReDeployAgent(scope.$index, scope.row)" size="mini" type="success" :loading="scope.row.agentAction" v-if="!(scope.row.serverNode) && scope.row.agentStatus === 'up' && (scope.row.sshAccount || scope.row.systemType === 'windows')">更新</el-button>

            <el-button @click="handleTerminal(scope.$index, scope.row)" size="mini" type="info" v-if="scope.row.sshAccount && scope.row.sshAccount.trim().length > 0">终端</el-button>

            <el-button @click="handleDeleteNode(scope.$index, scope.row)" size="mini" type="danger" v-if="scope.row.sshAccount || scope.row.agentStatus !== 'up'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span style="font-size: 12px; color: #909399; margin-left: 20px;">注1: 仅手动添加的节点支持修改</span>

      <node-add :on-added="onNodeAdded" ref="nodeAdd"></node-add>
      <node-update :on-updated="onNodeUpdated" ref="nodeUpdate"></node-update>
      <node-terminal ref="nodeTerminal"></node-terminal>
    </div>
  </d2-container>
</template>

<script>
import AppHeaderNew from '../../../components/header/AppHeaderNew';
import NodeAdd from './NodeAdd';
import NodeUpdate from './NodeUpdate';
import * as api from '../api/node_manage_api';
import NodeTerminal from './NodeTerminal';
import deploymentMock from '../../../../mock/api/monitor/deploymentMock';

export default {
  name: 'NodeManage',
  components: {
    AppHeaderNew, NodeAdd, NodeUpdate, NodeTerminal,
  },
  data() {
    return {
      loadingData: false,
      nodeList: [
        {
          name: '',
          ip: '',
          sshPort: '',
        },
        {
          name: '',
          ip: '',
          sshPort: '',
        },
      ],
      deployLoadingMap: {},
    };
  },
  created() {
    this.execListNode();
  },
  methods: {
    onNodeAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.nodeAdd.closeLoading();
        this.$refs.nodeAdd.close();
        // 刷新节点列表
        this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeAdd.closeLoading();
        this.$message.error({
          message: '添加节点失败:' + reason,
        });
      });
    },
    onNodeUpdated(p) {
      console.log('更新节点');
      p.then(res => {
        this.$refs.nodeUpdate.closeLoading();
        this.$refs.nodeUpdate.close();
        this.execListNode();
      }).catch(reason => {
        this.$refs.nodeUpdate.closeLoading();
        this.$message.error({
          message: '修改节点失败:' + reason,
        });
      });
    },
    handleAddNode() {
      this.$refs.nodeAdd.show();
    },
    handleModifyNode(index, nodeItem) {
      console.log(nodeItem);
      this.$refs.nodeUpdate.show(nodeItem);
    },

    execReDeployAgent(index, nodeItem) {
      if (!nodeItem.sshAccount || nodeItem.sshAccount.trim() === '') {
        this.$message.error('ssh账号为空， 无法部署');
        return;
      }
      this.deployLoadingMap[nodeItem.id] = true;
      nodeItem.agentAction = true;
      api.reDeployAgent(nodeItem.id)
        .then(res => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
          nodeItem.agentStatus = res.data;
          this.execListNode();
        })
        .catch(reason => {
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
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
        // 如果为linux 系统， 提示去配置 ssh 账号
        nodeItem.systemType === 'linux' && this.$confirm('需要配置 ssh 信息才能启动代理端！', '提示', {
          confirmButtonText: '去配置',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$refs.nodeUpdate.show(nodeItem);
        }).catch(() => {
          // do nth
        });
        // 如果为windows 系统， 提示进行手动配置
        nodeItem.systemType === 'windows' && this.$alert('没有ssh账号的windows系统需要手动启动代理端！', {type: 'warning'});
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
    handleTerminal(index, nodeItem) {
      api.terminalInfo()
        .then(res => {
          this.$refs.nodeTerminal.show('ws://' + res.data.ip + ':' + res.data.socketPort + '/monitor/node/ssh/console?nodeId=' + nodeItem.id);
          // this.$router.push({name: 'WebSSH', params: {ws: 'ws://' + res.data.ip + ':' + res.data.socketPort + '/monitor/node/ssh/console?nodeId=' + nodeItem.id}});
        })
        .catch(reason => {
          // do nothing
        });
    },

    handleDeleteNode(index, nodeItem) {
      this.$confirm('此操作将移除该节点信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        return api.deleteAgent(nodeItem.id);
      }).then((res) => {
        this.execListNode();
      }).catch(() => {
        // do nth
      });
    },

    execListNode() {
      this.loadingData = true;
      api.listNode()
        .then(res => {
          this.loadingData = false;
          this.nodeList = res.data;
          this.nodeList.forEach((item, index) => {
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
  },
};
</script>

<style scoped>
  .app-text-button {
    height: 48px;
    line-height: 48px;
    width: 68px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }

  .app-text-button i, span{
    width: 24px;
    height: 18px;
    font-size: 14px;
  }
  .app-text-button span{
    font-weight: 500;
    margin-left: 4px;
  }
  .app-text-button:hover {
    color: rgba(41, 105, 255, 1);
  }
</style>
