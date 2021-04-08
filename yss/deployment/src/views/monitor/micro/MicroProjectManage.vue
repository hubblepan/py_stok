<template>
    <d2-container>
<!--      <div style="padding: 20px 0; margin: 0 0px 0 20px;border-bottom: 1px dotted #dcdcdc;">-->
<!--        <el-radio v-model="mode" label="graph">图表模式</el-radio>-->
<!--        <el-radio v-model="mode" label="list">列表模式</el-radio>-->
<!--      </div>-->
<!--      <div class="d2-mt-20 d2-ml-20 d2-pb-10">-->
<!--        <el-button size="mini" type="primary" @click="handleAddProject">添加方案</el-button>-->
<!--      </div>-->
      <div v-if="mode === 'list'">
        <el-table
          :data="tableData"
          border style="margin: 0px 20px 0px 20px;" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}"
          row-key="id"
          :expand-row-keys="['1']"
          :tree-props="{children: 'children'}">
          <el-table-column
            prop="name"
            label="名称"
            width="240">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'project'"  style="width: 160px; display: inline-block">
                <span @dblclick.stop="changeName(scope.$index, scope.row)" v-if="!(scope.row.editState)">{{scope.row.name}}</span>
                <el-input v-if="scope.row.editState" v-model="scope.row.name" @blur.native.capture="handleSaveTomcatName(scope.$index, scope.row)" v-on:keyup.enter.native="onEnterName(scope.$index, scope.row)" size="mini" style="margin-right: 10px; width: 80%" ref="InputTomcatName"></el-input>
              </div>
              <span v-if="scope.row.type !== 'project'">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="ip地址"
            width="300">
          </el-table-column>
          <el-table-column
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-tooltip content="删除该服务器" placement="top" effect="light" v-if="scope.row.type === 'server'">
                <el-button size="mini" type="danger">删除</el-button>
              </el-tooltip>
              <el-tooltip content="新增一个服务器" placement="top" effect="light" v-if="scope.row.type === 'project'">
                <el-button size="mini" type="success" @click="handleAddNode">新增</el-button>
              </el-tooltip>
              <el-button size="mini" type="info" plain v-if="scope.row.type === 'tomcat'" @click="handleUpgrade">升级</el-button>
              <el-button size="mini" type="info" plain v-if="scope.row.type === 'project'" @click="handleDeploy">部署/升级</el-button>
            </template>
          </el-table-column>
        </el-table>
        <micro-server-add :on-added="onServerAdded" ref="MicroServerAdd"></micro-server-add>
        <node-select ref="NodeSelect"></node-select>
        <div>
          原型说明：
          1. 双击可修改方案名称
        </div>
      </div>
      <div v-if="mode === 'graph'">
        <micro-monit ref="MicroMonit" :on-add-project="handleAddProject" :on-add-project-node="handleAddProjectNode"></micro-monit>
      </div>
      <micro-project-add :on-added="onProjectAdded" ref="ProjectAdd"></micro-project-add>
      <micro-project-preview ref="ProjectPreview" :on-added="onProjectPreviewed"></micro-project-preview>
      <micro-project-node-add ref="ProjectNodeAdd" :on-added="onProjectNodeAdded"></micro-project-node-add>
    </d2-container>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import MicroServerAdd from './MicroServerAdd';
import MicroProjectAdd from './MicroProjectAdd';
import NodeSelect from '../nodes/NodeSelect';
import MicroMonit from './MicroMonit';
import MicroProjectPreview from './MicroProjectPreview';
import MicroProjectNodeAdd from './MicroProjectNodeAdd';
export default {
  name: 'MicroProjectManage',
  components: {MicroMonit, NodeSelect, MicroProjectAdd, MicroServerAdd, AppHeader, MicroProjectPreview, MicroProjectNodeAdd},
  data() {
    return {
      mode: 'graph',
      tableData: [
        {
          id: '1',
          name: '方案一', // 方案名称
          status: '启用',
          type: 'project',
          ip: '',
          editState: false,
          children: [{
            id: '2',
            name: '服务器1', // 方案名称
            status: '运行中',
            type: 'server',
            ip: '192.168.4.225',
            children: [
              {
                id: '22',
                name: 'tomcat1',
                status: 'xxx',
                type: 'tomcat',
                ip: '/home/test/tomcat1',
              },
            ],
          }, {
            id: '3',
            name: '服务器2', // 方案名称
            status: '未部署',
            type: 'server',
            ip: '192.168.4.226',
          }],
        },
        {
          id: '4',
          name: '方案二', // 方案名称
          status: '停用',
          type: 'project',
          ip: '',
          editState: false,
          children: [{
            id: '5',
            name: '服务器1', // 方案名称
            status: '运行中',
            type: 'server',
            ip: '192.168.4.227',
          }, {
            id: '6',
            name: '服务器2', // 方案名称
            status: '未启动',
            type: 'server',
            ip: '192.168.4.228',
          }],
        },
      ],
    };
  },
  methods: {
    onEnterName(index, row) {
      row.editState = false;
      // this.handleSaveTomcatName(index, row);
    },
    handleSaveTomcatName(index, row) {
      // this.$refs.InputTomcatName.focus();
      row.editState = false;
      // if (row.tomcatInfo.tomcatName === row.tomcatInfo.tomcatNameCache) {
      //   return;
      // }
      // for (let i = 0; i < this.tableData.length; i++) {
      //   if (i !== index && this.tableData[i].tomcatInfo && this.tableData[i].tomcatInfo.tomcatName === row.tomcatInfo.tomcatNameCache) {
      //     this.$alert('存在相同的Tomcat名称, 请重新修改');
      //     return;
      //   }
      // }
      // let originName = row.tomcatInfo.tomcatName;
      // row.tomcatInfo.tomcatName = row.tomcatInfo.tomcatNameCache;
      // api.updateTomcatName(row.tomcatInfo)
      //   .then(res => {
      //     // do nth
      //   })
      //   .catch(reason => {
      //     // do nth
      //     row.tomcatInfo.tomcatName = originName;
      //   });
    },
    changeName(index, item) {
      item.editState = true;
      this.$nextTick(() => {
        this.$refs.InputTomcatName.focus();
      });

      // this.$refs.TomcatModify.show(item);
    },
    onProjectPreviewed(p) {
      p.then(res => {
        this.$refs.ProjectPreview.closeLoading();
        this.$refs.ProjectPreview.close();
        this.$refs.MicroMonit.initData();
      }).catch(reason => {
        console.log(reason);
        this.$refs.ProjectPreview.closeLoading();
      });
    },
    onProjectAdded(p, enableCluster) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.ProjectAdd.closeLoading();
        this.$refs.ProjectAdd.close();
        // 刷新节点列表
        if (res.data && res.data.length > 1 && !enableCluster) {
          this.$refs.ProjectPreview.show(res.data);
        } else {
          this.$refs.MicroMonit.initData();
        }
      }).catch(reason => {
        console.log(reason);
        this.$refs.ProjectAdd.closeLoading();
        this.$message.error({
          message: '添加方案失败:' + reason,
        });
      });
    },
    onProjectNodeAdded(p, enableCluster) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.ProjectNodeAdd.closeLoading();
        this.$refs.ProjectNodeAdd.close();
        // 刷新节点列表
        if (res.data && res.data.length > 1 && !enableCluster) {
          this.$refs.ProjectPreview.show(res.data);
        } else {
          this.$refs.MicroMonit.initData();
        }
      }).catch(reason => {
        console.log(reason);
        this.$refs.ProjectNodeAdd.closeLoading();
        this.$message.error({
          message: '扩容方案失败:' + reason,
        });
      });
    },
    handleAddNode() {
      this.$refs.NodeSelect.show([], false, false);
    },
    handleAddProject() {
      // this.$refs.ProjectPreview.show();
      this.$refs.ProjectAdd.show();
    },
    handleAddProjectNode(schemeId, enableCluster, schemeServerIps) {
      this.$refs.ProjectNodeAdd.show(schemeId, enableCluster, schemeServerIps);
    },
    handleDeploy() {
      this.$router.push({name: 'MicroDeployUpgrade'});
    },
    handleUpgrade() {
      this.$router.push({name: 'MicroDeployUpgrade'});
    },
    onServerAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.MicroServerAdd.closeLoading();
        this.$refs.MicroServerAdd.close();
        // 刷新节点列表
        // TODO this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.MicroServerAdd.closeLoading();
        this.$message.error({
          message: '添加服务器失败:' + reason,
        });
      });
    },
    handleAddServer(index, item) {
      this.$refs.MicroServerAdd.show();
    },
  },
};
</script>

<style scoped>
  /deep/ .el-radio__label{
    display: inline;
  }
</style>
