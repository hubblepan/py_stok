<template>
    <div>
      <app-header :title="'方案列表'"></app-header>

      <div class="d2-mt-20 d2-ml-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">
        <el-button size="mini" type="primary" @click="handleAddProject">添加方案</el-button>
      </div>
      <el-table
        :data="tableData"
        :span-method="configTableSpan"
        border style="margin: 20px 20px 0px 20px; width: 98%" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}">
        <el-table-column
          prop="name"
          label="方案名称"
          width="160">
        </el-table-column>

        <el-table-column
          label="服务器名称"
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.serverInfo">{{scope.row.serverInfo.ip}}</span>
<!--            <el-button @click="handleAddServer(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.serverInfo)">新增服务器</el-button>-->
          </template>
        </el-table-column>

        <el-table-column
          label="xxx1"
          width="160">
        </el-table-column>

        <el-table-column
          label="xxx2">
        </el-table-column>

        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button @click="handleAddProject(scope.$index, scope.row)" size="mini" type="info" plain>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <micro-server-add :on-added="onServerAdded" ref="MicroServerAdd"></micro-server-add>
      <micro-project-add :on-added="onProjectAdded" ref="ProjectAdd"></micro-project-add>
    </div>

</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import MicroServerAdd from './MicroServerAdd';
import MicroProjectAdd from './MicroProjectAdd';
export default {
  name: 'MicroProjectManage_Temp',
  components: {MicroProjectAdd, MicroServerAdd, AppHeader},
  data() {
    return {
      tableData: [
        {
          name: '方案一', // 方案名称
          id: '1',
          header: true,
          group: 1,
          count: 3,
          last: false,
          serverInfo: {
            ip: '192.168.4.225',
            serverName: '服务器1',
          },
        },
        {
          name: '方案一',
          id: '2',
          header: false,
          group: 1,
          count: 3,
          last: false,
          serverInfo: {
            ip: '192.168.4.226',
            serverName: '服务器1',
          },
        },
        {
          name: '方案一',
          id: '3',
          header: false,
          group: 1,
          count: 3,
          last: true,
          serverInfo: null,
        },

        {
          name: '方案二',
          id: '4',
          header: true,
          group: 2,
          count: 3,
          last: false,
          serverInfo: {
            ip: '192.168.4.227',
            serverName: '服务器1',
          },
        },
        {
          name: '方案二',
          id: '5',
          header: false,
          group: 2,
          count: 3,
          last: false,
          serverInfo: {
            ip: '192.168.4.228',
            serverName: '服务器1',
          },
        },
        {
          name: '方案二',
          id: '7',
          header: false,
          group: 1,
          count: 3,
          last: true,
          serverInfo: null,
        },
      ],
    };
  },
  methods: {
    onProjectAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.ProjectAdd.closeLoading();
        this.$refs.ProjectAdd.close();
        // 刷新节点列表
        // TODO this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.ProjectAdd.closeLoading();
        this.$message.error({
          message: '添加方案失败:' + reason,
        });
      });
    },
    handleAddProject(index, item) {
      this.$refs.ProjectAdd.show();
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
    configTableSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
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
  },
};
</script>

<style scoped>

</style>
