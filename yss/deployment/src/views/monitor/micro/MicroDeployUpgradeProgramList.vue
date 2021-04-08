<template>
  <div>
    <el-button type="success" style="margin: 20px 20px 0 20px" size="mini" @click="handleUpgrade">升级</el-button>
    <el-button type="danger" style="margin: 20px 20px 0 20px" size="mini" @click="handleUpgrade">回退</el-button>
    <el-table
      :data="tableData"
      border style="margin: 20px 20px 0px 20px; width: 95%" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}"
      row-key="id"
      :expand-row-keys="['2']"
      :tree-props="{children: 'children'}">
      <el-table-column
        prop="name"
        label="名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本"
        width="160">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="地址"
        width="160">
      </el-table-column>
      <el-table-column
        label="操作"
        width="230">
        <template slot-scope="scope">
<!--          <el-button size="mini" type="danger" v-if="scope.row.type === 'server'">删除</el-button>-->
          <el-button size="mini" type="success" plain v-if="scope.row.type === 'server' && scope.row.status === '运行中'" @click="handleServerDeploy">新增</el-button>
          <el-button size="mini" type="danger" plain v-if="scope.row.type === 'server' && scope.row.status === '未部署'" @click="handleServerDeploy">部署</el-button>
        </template>
      </el-table-column>
    </el-table>
    <micro-deploy-upgrade-step-dialog ref="StepDialog"></micro-deploy-upgrade-step-dialog>
    <micro-deploy-upgrade-dialog ref="UpgradeDialog"></micro-deploy-upgrade-dialog>
  </div>

</template>

<script>
import MicroDeployUpgradeStepDialog from './MicroDeployUpgradeStepDialog';
import MicroDeployUpgradeDialog from './MicroDeployUpgradeDialog';
export default {
  name: 'MicroDeployUpgradeProgramList',
  props: ['onChangeDeploy'],
  components: { MicroDeployUpgradeDialog, MicroDeployUpgradeStepDialog },
  data() {
    return {
      tableData: [
        {
          id: '2',
          name: '服务器1',
          status: '运行中',
          version: '',
          type: 'server',
          ip: '192.168.4.225',
          children: [
            {
              id: '21',
              name: 'tomcat1',
              status: '运行中',
              type: 'tomcat',
              // ip: '192.168.4.225',
              ip: '/home/path/tomcat1',
              version: 'v1.0.0.1',
            },
            {
              id: '22',
              name: 'tomcat2',
              status: '停止',
              type: 'tomcat',
              // ip: '192.168.4.225',
              ip: '/home/path/tomcat2',
              version: 'v2.0.0.1',
            },
          ],
        },
        {
          id: '3',
          name: '服务器2',
          status: '未部署',
          type: 'server',
          version: '',
          ip: '192.168.4.226',
          // children: [
          //   {
          //     id: '31',
          //     name: 'tomcat1',
          //     status: '运行中',
          //     type: 'tomcat',
          //     // ip: '192.168.4.225',
          //     ip: '/home/path/tomcat3',
          //   },
          //   {
          //     id: '32',
          //     name: 'tomcat2',
          //     status: '停止',
          //     type: 'tomcat',
          //     // ip: '192.168.4.225',
          //     ip: '/home/path/tomcat4',
          //   },
          // ],
        }],
    };
  },
  methods: {
    handleUpgrade() {
      this.$refs.UpgradeDialog.show();
    },
    handleServerDeploy() {
      this.onChangeDeploy();
      // this.$refs.StepDialog.show();
    },
  },
};
</script>

<style scoped>

</style>
