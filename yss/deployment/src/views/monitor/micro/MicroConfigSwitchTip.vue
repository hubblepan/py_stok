<template>
  <div>
    <el-dialog title="提示" :visible.sync="showDialog" width="460px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <div>
        <div v-for="item in data" :key="item.name">
          <span>{{item.name + '已经发生变化,'}}</span>
          <el-button type="text" size="mini" style="margin-left: 10px" @click="showCompareConfigPart(item)">查看变化</el-button>
        </div>
        <div>
          如果切换，会还原这些配置， 并影响其它使用这些配置的服务， 是否继续切换?
        </div>
      </div>
      <micro-compare-config-part ref="CompareConfigPart"></micro-compare-config-part>
      <span slot="footer" class="dialog-footer">
        <el-button @click="execAdd('')" size="mini" type="text">关闭</el-button>
        <el-button v-for="item in data" :key="item.name" type="primary" @click="execAdd(item.name)" size="mini"
                   :disabled="item.name === 'DB配置' ? disableDb : disableCs"
                   :loading="item.name === 'DB配置' ? loadingDb : loadingCS">
          {{'切换' + item.name}}
        </el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/micro_service_api';
import * as dateUtil from '../util/dateUtil';
import MicroCompareConfigPart from './MicroCompareConfigPart';
export default {
  name: 'MicroConfigSwitchTip',
  components: { MicroCompareConfigPart },
  props: ['doSwitch'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      loadingDb: false,
      loadingCS: false,
      disableDb: false,
      disableCs: false,
      instanceId: '',
      data: [],
    };
  },
  created() {
  },
  methods: {
    showCompareConfigPart(data) {
      this.$refs.CompareConfigPart.show(data);
    },
    show(resultData) {
      this.showDialog = true;
      this.data = resultData;
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loadingData = false;
    },
    closeCommonServiceLoading() {
      this.loadingCS = false;
    },
    closeDbLoading() {
      this.loadingDb = false;
    },
    closeDb() {
      this.disableDb = true;
      this.$message({
        message: 'DB配置切换成功',
        type: 'success',
      });
    },
    closeCs() {
      this.disableCs = true;
      this.$message({
        message: '公共服务配置切换成功',
        type: 'success',
      });
    },
    execAdd(type) {
      if (type === 'DB配置') {
        this.loadingDb = true;
      } else if (type === '公共服务配置') {
        this.loadingCS = true;
      }
      this.doSwitch(type);
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
