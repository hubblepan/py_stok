<template>
    <div>
      <div class="d2-mt-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">
        <el-button size="mini" type="primary" @click="handleAddProgram">添加程序</el-button>
      </div>
      <el-table
        :data="tableData"
        :span-method="configTableSpan"
        border style="margin: 20px 0px 0px 0px; width: 100%" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}">
        <el-table-column
          prop="name"
          label="程序类型"
          width="160">
        </el-table-column>

        <el-table-column
          label="程序名称"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.programInfo">{{scope.row.programInfo.programName}}</span>
            <el-button @click="handleAddProgram(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.programInfo)">新增程序</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="ip"
          label="关联服务器"
          width="320">
          <template slot-scope="scope">
            <span v-if="scope.row.programInfo">{{scope.row.programInfo.ip}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="ip"
          label="部署数量"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.programInfo">4个</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="服务配置">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleMicroSettings(scope.$index, scope.row)" type="danger" plain>配置微服务</el-button>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="OSGI配置">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleOsgiSettings(scope.$index, scope.row)" type="success" icon="el-icon-success">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <div v-if="scope.row.programInfo">
              <el-button size="mini" type="success" plain>启动</el-button>
              <el-button size="mini" type="danger" plain>停止</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center; width: 100%; height: 60px; margin-top: 40px">
        <el-button type="primary" size="small">一键部署</el-button>
      </div>

      <micro-deploy-upgrade-program-add ref="ProgramAdd"></micro-deploy-upgrade-program-add>
      <micro-deploy-upgrade-settings ref="MicroSettings" :on-added="onMicroSettings"></micro-deploy-upgrade-settings>
      <micro-deploy-upgrade-osgi-settings ref="OsgiSettings" :on-added="onOsgiSettings"></micro-deploy-upgrade-osgi-settings>
    </div>
</template>

<script>
import MicroDeployUpgradeSettings from './MicroDeployUpgradeSettings';
import MicroDeployUpgradeOsgiSettings from './MicroDeployUpgradeOsgiSettings';
import MicroDeployUpgradeProgramAdd from './MicroDeployUpgradeProgramAdd';

export default {
  name: 'MicroDeployUpgradeProgram_Temp',
  components: { MicroDeployUpgradeOsgiSettings, MicroDeployUpgradeSettings, MicroDeployUpgradeProgramAdd },
  data() {
    return {
      tableData: [
        {
          name: 'osgi-fast',
          id: '1',
          header: true,
          group: 1,
          count: 3,
          last: false,
          programInfo: {
            ip: '192.168.4.225',
            programName: '算法公式.jar',
          },
        },
        {
          name: 'osgi-fast',
          id: '2',
          header: false,
          group: 1,
          count: 3,
          last: false,
          programInfo: {
            ip: '192.168.4.226',
            programName: '算法公式.jar',
          },
        },
        {
          name: 'osgi-fast',
          id: '3',
          header: false,
          group: 1,
          count: 3,
          last: true,
          programInfo: null,
        },

        {
          name: 'osgi-uco',
          id: '4',
          header: true,
          group: 2,
          count: 3,
          last: false,
          programInfo: {
            ip: '192.168.4.227',
            programName: '清算文件.jar',
          },
        },
        {
          name: 'osgi-uco',
          id: '5',
          header: false,
          group: 2,
          count: 3,
          last: false,
          programInfo: {
            ip: '192.168.4.228',
            programName: '可执行.jar',
          },
        },
        {
          name: 'osgi-uco',
          id: '7',
          header: false,
          group: 1,
          count: 3,
          last: true,
          programInfo: null,
        },
      ],
    };
  },
  methods: {
    handleMicroSettings(index, item) {
      this.$refs.MicroSettings.show();
    },
    onMicroSettings(p) {
      p.then(res => {
        this.$refs.MicroSettings.close();
        this.$refs.MicroSettings.closeLoading();
      }).catch(reason => {
        this.$refs.MicroSettings.closeLoading();
      });
    },
    handleOsgiSettings(index, item) {
      this.$refs.OsgiSettings.show([
        {
          id: 'n1',
          name: 'node1',
          ip: '192.168.4.225',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't1',
            tomcatNameCache: 'tomcat1',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/1', // tomcatDir
            tomcatName: 'tomcat1',
            version: '',
          },
        },
        {
          id: 'n2',
          name: 'node2',
          ip: '192.168.4.226',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't2',
            tomcatNameCache: 'tomcat2',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/2', // tomcatDir
            tomcatName: 'tomcat2',
            version: '',
          },
        },
        {
          id: 'n3',
          name: 'node3',
          ip: '192.168.4.227',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't3',
            tomcatNameCache: 'tomcat3',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/3', // tomcatDir
            tomcatName: 'tomcat3',
            version: '',
          },
        },
      ]);
    },
    onOsgiSettings(p) {
      p.then(res => {
        this.$refs.OsgiSettings.close();
        this.$refs.OsgiSettings.closeLoading();
      }).catch(reason => {
        this.$refs.OsgiSettings.closeLoading();
      });
    },
    handleAddProgram(index, item) {
      this.$refs.ProgramAdd.show();
    },
    configTableSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 4 || columnIndex === 5) {
        if (row.header) {
          return {
            rowspan: row.count,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  }
};
</script>

<style scoped>

</style>
