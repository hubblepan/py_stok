<template>
  <d2-container>
    <div>
      <app-header-new :title="'服务器列表'">
        <template v-slot:title>
          <div>
            <span class="title-container">服务器列表</span>
            <app-switch style="display: inline-block; margin-left: 20px;" v-model="listMode">
              <template v-slot:left>
                <i class="iconfont iconkapianmoshi" style="font-size: 11px; width: 16px; height: 12px; font-weight: normal"></i>
              </template>
              <template v-slot:right>
                <i class="iconfont iconliebiao" style="font-size: 12px; width: 14px; height: 13px; font-weight: normal"></i>
              </template>
            </app-switch>
          </div>
        </template>
        <template v-slot:button-group>
          <div class="app-text-button" @click="handleAddNode" v-if="listMode">
            <i class="iconfont iconadd-o"></i>
            <span>新增</span>
          </div>
        </template>
      </app-header-new>
<!--      <el-button class="d2-ml d2-mt d2-mb-10" type="success" size="small" @click="handleAddNode">新增服务器</el-button>-->
      <div v-if="!listMode">
        <el-row :gutter="16" style="margin: 0 14px">
          <el-col :span="6">
            <div class="app-card-add-server" @click="handleAddNode" style="border: 1px dashed #e8e8e8; height: 167px; background: #fafafa; text-align: center; color: rgba(0, 0, 0, 0.4); cursor: pointer; padding-top: 50px;">
                <i class="iconfont iconfuwuqi" style="font-size: 28px"></i>
                <div style="font-size: 14px">新增服务器</div>
            </div>
          </el-col>
          <el-col v-for="(item, index) in nodeList" :key="item.id" :span="6">
            <div class="app-card-server">
              <span class="server-name">
                {{item.name}}
              </span>
              <div style="float: right; font-size: 14px; font-weight: 500; color: rgba(0,0,0,0.8); margin-left: 16px;margin-right: 16px;">
                {{item.ip}}
              </div>
              <div style="font-size: 14px; font-weight: 500; color: rgba(0,0,0,0.6); margin-left: 16px; margin-right: 16px; margin-top: 20px">
                <div style="width: 100px; display: inline-block; margin-right: 40px">
                  ssh端口:  {{item.sshPort}}
                </div>

                <div style="width: 160px; display: inline-block; ">
                  ssh账号:  {{item.sshAccount}}
                </div>

                <div style="width: 200px; margin-top: 10px">
                  系统类型:  {{item.systemType}}
                </div>
              </div>
              <div style="position: absolute; left: 0; bottom: 0px; height: 40px; border-top: 1px solid #e8e8e8; width: 100%">
                <el-row>
                  <el-col :span="8">
                    <div class="app-text-button app-button-group" style="color: #ff4d4f" @click="execDeployAgent(index, item)" v-if="item.agentStatus === 'noDeploy'" v-bind:class="{'no-click': item.agentAction}">
                        <i v-bind:class="{ 'el-icon-loading': item.agentAction, 'el-icon-download': !item.agentAction}"></i>
                        <span>{{item.agentAction ? '安装中': '安装'}}</span>
                    </div>
                    <div class="app-text-button app-button-group" style="color: #ff4d4f" @click="execStartAgent(index, item)" v-if="item.agentStatus === 'down'" v-bind:class="{'no-click': item.agentAction}">
                      <i v-bind:class="{ 'el-icon-loading': item.agentAction, 'el-icon-video-play': !item.agentAction}"></i>
                      <span>{{item.agentAction ? '启动中': '启动'}}</span>
                    </div>
                    <div class="app-text-button app-button-group" v-if="item.agentStatus === 'up'">
                      <span>运行中</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="app-text-button app-button-group" @click="handleModifyNode(index, item)">
                      <i class="iconfont iconedit"></i>
                      <span>修改</span>
                    </div>
                  </el-col>

                  <el-col :span="8">
                    <el-popover
                      popper-class="myPopover"
                      :visible-arrow="false"
                      :offset="20"
                      placement="bottom"
                      trigger="hover">
                      <div>
                        <div class="app-text-button app-button-more" @click="handleTerminal(index, item)" v-if="item.sshAccount && item.sshAccount.trim().length > 0">
                          <i class="iconfont iconcreate-Ta"></i>
                          <span>终端</span>
                        </div>
                        <div class="app-text-button app-button-more" @click="execReDeployAgent(index, item)" v-if="!(item.serverNode) && item.agentStatus === 'up' && (item.sshAccount || item.systemType === 'windows')">
                          <i class="iconfont iconclose"></i>
                          <span>更新</span>
                        </div>
                      </div>

                      <div class="app-text-button app-button-group" slot="reference">
                        <i class="el-icon-more"></i>
                        <span>更多</span>
                      </div>
                    </el-popover>

                  </el-col>
                </el-row>
              </div>

            </div>
          </el-col>
        </el-row>
      </div>
      <el-table v-if="listMode" header-row-class-name="app-table-header" class="d2-ml"
                :data="nodeList"
                border style="width: 98%"
                max-height="750"
                :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"
                :header-row-style="{height: '40px'}"
                :row-style="{height: '40px'}"
                :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}">
        <el-table-column
          prop="name"
          width="200"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          prop="ip"
          width="200"
          label="ip地址">
        </el-table-column>
        <el-table-column
          prop="sshPort"
          label="ssh端口"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sshAccount"
          label="ssh账号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="systemType"
          label="系统类型"
          width="120">
        </el-table-column>
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
        <el-table-column align="left" label="操作" min-width="200" width="200">
          <template slot-scope="scope">
            <div style="height: 40px; line-height: 40px; padding-top: 3px;">
              <i class="app-icon-button iconfont iconedit" @click="handleModifyNode(scope.$index, scope.row)"></i>
              <i class="app-icon-button iconfont iconcreate-Ta" @click="handleTerminal(scope.$index, scope.row)" v-if="scope.row.sshAccount && scope.row.sshAccount.trim().length > 0"></i>
              <i class="app-icon-button iconfont iconclose" @click="handleDeleteNode(scope.$index, scope.row)" v-if="scope.row.sshAccount || scope.row.agentStatus !== 'up'"></i>
            </div>

<!--            <el-button @click="handleModifyNode(scope.$index, scope.row)" size="mini" type="warning">修改</el-button>-->

<!--            <el-button @click="handleTerminal(scope.$index, scope.row)" size="mini" type="info" v-if="scope.row.sshAccount && scope.row.sshAccount.trim().length > 0">终端</el-button>-->

<!--            <el-button @click="handleDeleteNode(scope.$index, scope.row)" size="mini" type="danger" v-if="scope.row.sshAccount || scope.row.agentStatus !== 'up'">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
<!--      <span style="font-size: 12px; color: #909399; margin-left: 20px;">注1: 仅手动添加的服务器支持修改</span>-->

      <micro-server-add :on-added="onNodeAdded" ref="nodeAdd"></micro-server-add>
      <node-update :on-updated="onNodeUpdated" ref="nodeUpdate"></node-update>
      <node-terminal ref="nodeTerminal"></node-terminal>
      <app-loading ref="AppLoading"></app-loading>
    </div>
  </d2-container>
</template>

<script>
import AppHeaderNew from '../../../components/header/AppHeaderNew';
import AppSwitch from '../../../components/AppSwitch';
import MicroServerAdd from './MicroServerAdd';
import NodeUpdate from '../nodes/NodeUpdate';
import * as api from '../api/node_manage_api';
import NodeTerminal from '../nodes/NodeTerminal';
import AppLoading from '../../../components/AppLoading';

export default {
  name: 'MicroServerManage',
  components: {
    AppHeaderNew, MicroServerAdd, NodeUpdate, NodeTerminal, AppSwitch, AppLoading,
  },
  data() {
    return {
      listMode: false,
      loadingData: false,
      mode: 'list', // list or grid
      nodeList: [],
      deployLoadingMap: {},
    };
  },
  created() {

  },
  mounted() {
    this.execListNode();
  },
  methods: {
    onNodeAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.nodeAdd.closeLoading();
        this.$refs.nodeAdd.close();
        // 刷新服务器列表
        this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeAdd.closeLoading();
        this.$message.error({
          message: '添加服务器失败:' + reason,
        });
      });
    },
    onNodeUpdated(p) {
      console.log('更新服务器');
      p.then(res => {
        this.$refs.nodeUpdate.closeLoading();
        this.$refs.nodeUpdate.close();
        this.execListNode();
      }).catch(reason => {
        this.$refs.nodeUpdate.closeLoading();
        this.$message.error({
          message: '修改服务器失败:' + reason,
        });
      });
    },
    showLoading() {
      console.log(this, this.$refs.AppLoading);
      this.$refs.AppLoading.show();
    },
    hideLoading() {
      this.$refs.AppLoading.dismiss();
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
      this.showLoading();
      api.reDeployAgent(nodeItem.id)
        .then(res => {
          this.hideLoading();
          this.deployLoadingMap[nodeItem.id] = false;
          nodeItem.agentAction = false;
          nodeItem.agentStatus = res.data;
          this.execListNode();
        })
        .catch(reason => {
          this.hideLoading();
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
      this.$confirm('此操作将移除该服务器信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.showLoading();
        return api.deleteAgent(nodeItem.id);
      }).then((res) => {
        this.execListNode();
      }).catch(() => {
        this.hideLoading();
        // do nth
      });
    },

    execListNode() {
      this.loadingData = true;
      this.showLoading();
      api.listNode()
        .then(res => {
          this.loadingData = false;
          this.hideLoading();
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
          this.hideLoading();
          this.$message.error({
            message: reason,
          });
        });
    },
  },
};
</script>

<style scoped>
  /deep/ .el-table th, .el-table td{
    padding: 0px;
  }
  .el-table th, /deep/ .el-table td{
    padding: 0px;
  }
  .app-table-header {
    height: 40px;
    background: #fafafa;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }

  .app-icon-button {
    width: 24px;
    height: 24px;
    margin: 0px 4px;
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.4);
  }

  .app-icon-button:hover {
    color: rgba(41, 105, 255, 1);
  }
  .app-text-button {
    height: 48px;
    line-height: 48px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }

  .app-text-button i{
    width: 24px;
    height: 18px;
    font-size: 12px;
  }
  .app-text-button span{
    font-weight: 500;
    margin-left: 4px;
  }
  .app-text-button:hover {
    color: rgba(41, 105, 255, 1);
  }
  .app-button-more {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  .app-button-more i{
    width: 24px;
    font-size: 16px;
  }
  .app-button-group {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  .app-button-group i{
    width: 24px;
    font-size: 16px;
  }

  .app-card-server {
    position: relative;
    width: 100%;
    height: 168px;
    border: 1px solid #e8e8e8;
    padding-top: 10px;
    margin-bottom: 16px;
  }
  .server-name {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0,0,0,0.8);
    margin-left: 16px;
    margin-right: 16px;
  }
  .no-click {
    pointer-events: none;
  }
</style>
<style>
  .myPopover{
    padding: 0 0px;
    min-width: 90px;
    width: 90px;
    color: white;
  }
  .el-popover{
    min-width: 90px;
  }
</style>
