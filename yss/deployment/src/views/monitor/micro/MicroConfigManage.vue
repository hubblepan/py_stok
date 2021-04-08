<template>
  <div>
    <el-dialog title="配置管理" :visible.sync="showDialog" width="860px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
<!--      <div>-->
<!--        <el-button type="primary" size="mini" @click="handleAddExtDbConfig">添加</el-button>-->
<!--      </div>-->
      <el-table
        :data="tableData"
        v-loading="loadingData"
        highlight-current-row
        @row-click="handleClickRow"
        border style="margin: 10px 20px 10px 10px; width: 820px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column fixed="left" width="60" align="center">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="versionId"
              @change.native="handleClickRow(scope.row)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="versionNo"-->
<!--          label="版本号"-->
<!--          width="120">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="200">
          <template slot-scope="scope">
            {{formatDate(scope.row.time)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click.stop="handleDeleteVerionConfig(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="mini" type="text">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="mini">切 换</el-button>
      </span>
      <micro-config-switch-tip :do-switch="handleSwitch" ref="SwitchTip"></micro-config-switch-tip>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/micro_service_api';
import * as dateUtil from '../util/dateUtil';
import MicroConfigSwitchTip from './MicroConfigSwitchTip';
export default {
  name: 'MicroConfigManage',
  components: { MicroConfigSwitchTip },
  props: ['onAdded'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      instanceId: '',
      tableData: [
        {
          versionNo: 1,
          name: 'v1',
          time: '2020-10-10 10:10:10',
        },
        {
          versionNo: 2,
          name: 'v2',
          time: '2020-10-10 10:10:10',
        },
        {
          versionNo: 3,
          name: 'v3',
          time: '2020-10-10 10:10:10',
        },
      ],
      tableItem: {
        versionNo: 1,
        name: 'v1',
        time: '2020-10-10 10:10:10',
      },
      currentRow: null,
      versionId: '',
    };
  },
  created() {
  },
  methods: {
    formatDate(dateTime) {
      return dateUtil.formatMilliSeconds(dateTime);
    },
    handleClickRow(row, event, column) {
      this.currentRow = row;
      this.versionId = row.id;
    },
    handleDeleteVerionConfig(item) {
      this.$confirm('确定删除该条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.loadingData = true;
        return api.deleteInstanceVersionConfig(item.id);
      }).then(res => {
        if (item === this.currentRow) {
          this.currentRow = null;
        }
        this.initData(this.instanceId);
      })
        .catch(reason => {
          this.closeLoading();
        });
    },
    show(instanceId) {
      this.instanceId = instanceId;
      this.showDialog = true;
      this.tableData = [];
      this.initData(instanceId);
    },
    initData(instanceId) {
      this.loadingData = true;
      api.listInstanceVersionConfig(instanceId)
        .then(res => {
          this.closeLoading();
          this.tableData = res.data;
        })
        .catch(reason => {
          console.log(reason);
          this.closeLoading();
        });
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loadingData = false;
    },
    handleSwitch(type) {
      if (type === 'DB配置') {
        api.switchInstanceDbVersionConfig(this.currentRow.id, this.instanceId)
          .then(res => {
            // 直接切换
            // this.onAdded(this.currentRow);
            this.$refs.SwitchTip.closeDbLoading();
            this.$refs.SwitchTip.closeDb();
          })
          .catch(reason => {
            console.log(reason);
            this.$refs.SwitchTip.closeDbLoading();
          });
      } else if (type === '公共服务配置') {
        api.switchInstanceCommonServiceVersionConfig(this.currentRow.id, this.instanceId)
          .then(res => {
            // 直接切换
            // this.onAdded(this.currentRow);
            this.$refs.SwitchTip.closeCommonServiceLoading();
            this.$refs.SwitchTip.closeCs();
          })
          .catch(reason => {
            console.log(reason);
            this.$refs.SwitchTip.closeCommonServiceLoading();
          });
      } else {
        // 直接切换
        this.onAdded(this.currentRow);
        this.$refs.SwitchTip.close();
      }
    },
    execAdd() {
      if (this.currentRow) {
        api.switchInstanceVersionConfig(this.currentRow.id, this.instanceId)
          .then(res => {
            if (res.data && res.data.length > 0) {
              // 提示对比
              this.$refs.SwitchTip.show(res.data);
            } else {
              // 直接切换
              this.onAdded(this.currentRow);
            }
          })
          .catch(reason => {
            console.log(reason);
          });
      }
    },
  }
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

  tr {
    padding: 12px;
  }
</style>
