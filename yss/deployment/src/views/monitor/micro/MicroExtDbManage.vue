<template>
  <div>
    <el-dialog title="数据库管理" :visible.sync="showDialog" width="860px" :close-on-click-modal="false" :close-on-press-escape="false" >
      <div>
        <el-button type="primary" size="mini" @click="handleAddExtDbConfig">添加</el-button>
      </div>
      <el-table
        :data="dbData"
        v-loading="loadingData"
        border style="margin: 10px 20px 10px 0px; width: 820px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="des"
          label="名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dbUrl"
          label="数据库地址">
          <template slot-scope="scope">
            {{handleGetDbUrl(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="账户名"
          width="140">
        </el-table-column>
<!--        <el-table-column-->
<!--          label="操作"-->
<!--          width="160">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" type="primary" @click="handleEditDatabase(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="danger" @click="handleDeleteExtDb(scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </el-dialog>
    <MicroExtDatabaseAdd ref="ExtDatabaseAdd" :on-added="onExtDbAdded"></MicroExtDatabaseAdd>
  </div>

</template>

<script>
import * as api from '../api/micro_service_api';
import MicroExtDatabaseAdd from './MicroExtDatabaseAdd';
export default {
  name: 'MicroExtDbManage',
  props: ['doRefresh'],
  components: { MicroExtDatabaseAdd },
  data() {
    return {
      showDialog: false,
      loadingData: false,
      schemeId: '',
      dbData: [
        {
          type: 'oracle',
          ip: '192.168.4.225',
          port: '22',
          dbName: 'orcl',
          racUrl: '',
          racData: '',
          schemeId: '1',
          userName: 'root',
          password: 'root123',
        },
        {
          type: 'mysql',
          ip: '192.168.4.31',
          port: '22',
          dbName: 'orcl',
          racUrl: '',
          racData: '',
          schemeId: '1',
          userName: 'root',
          password: 'root123',
        },
        {
          type: 'oracle',
          ip: '192.168.4.225',
          port: '22',
          dbName: 'orcl',
          racUrl: 'raclurlracurlracurl',
          racData: '',
          schemeId: '1',
          userName: 'root',
          password: 'root123',
        },
      ],
    };
  },
  created() {
  },
  methods: {
    handleAddExtDbConfig() {
      this.$refs.ExtDatabaseAdd.show(this.schemeId);
    },
    onExtDbAdded(p) {
      p.then(res => {
        this.initData();
        this.$refs.ExtDatabaseAdd.closeLoading();
        this.$refs.ExtDatabaseAdd.close();
        this.doRefresh();
      }).catch(reason => {
        this.$refs.ExtDatabaseAdd.closeLoading();
        // this.$refs.ExtDatabaseAdd.close();
      });
    },
    handleEditDatabase(item) {
      this.$refs.ExtDatabaseAdd.show(this.schemeId, item);
    },
    handleDeleteExtDb(item) {
      this.$confirm('确定删除该数据库配置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.loadingData = true;
        return api.deleteExtDbConfig(item.id);
      }).then(res => {
        this.initData();
        this.doRefresh();
      })
        .catch(reason => {
          this.closeLoading();
        });
    },
    show(schemeId) {
      this.schemeId = schemeId;
      this.dbData = [];
      this.showDialog = true;
      this.initData();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loadingData = false;
    },
    initData() {
      this.loadingData = true;
      api.getExtDbConfigBySchemeId(this.schemeId)
        .then(res => {
          this.loadingData = false;
          this.dbData = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
          console.log(reason);
        });
    },
    handleGetDbUrl(item) {
      if (item.type === 'mysql') {
        return 'jdbc:mysql://' + item.ip + ':' + item.port + '/' + 'fomp-trace-center?serverTimezone=UTC&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false';
      } else {
        if (item.racUrl) {
          return item.racUrl;
        } else {
          return 'jdbc:oracle:thin:@' + item.ip + ':' + item.port + '/' + item.dbName;
        }
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
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
    font-weight: 600;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-table th, .el-table td{
    padding: 12px;
  }
  .el-table th, /deep/ .el-table td{
    padding: 12px;
  }
</style>
