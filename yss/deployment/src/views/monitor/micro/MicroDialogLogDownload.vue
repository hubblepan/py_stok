<template>
  <!-- 新增服务器 -->
  <el-dialog title="日志下载" :visible.sync="showDialog" width="60%"  :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form label-position="right" label-width="80px" :model="formData" :inline="true" ref="formAddNode">
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker
          size="mini"
          v-model="formData.startDate"
          value-format="yyyy-MM-dd"
          style="width: 160px"
          type="date"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="endDate">
        <el-date-picker
          size="mini"
          v-model="formData.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 160px"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleQuery" size="mini">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 0 10px; min-height: 350px" v-loading="loadingData">
      <el-tree
        ref="LogTree"
        :data="data"
        show-checkbox
        node-key="nodeId"
        :default-expanded-keys="[defaultServiceCode, defaultInstanceId]"
        :props="defaultProps">
      </el-tree>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '下载中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import {currentDate} from '../../../utils/dateUtil';
export default {
  name: 'MicroDialogLogDownload',
  data() {
    return {
      formData: {
        startDate: currentDate(),
        endDate: currentDate(),
      },
      data: [
      ],
      defaultProps: {
        children: 'childrenLogs',
        label: 'nodeName',
      },
      showDialog: false,
      loading: false,
      loadingData: false,
      schemeName: '',
      schemeId: '',
      defaultServiceCode: '',
      defaultInstanceId: '',
    };
  },
  methods: {
    handleQuery() {
      // 获取最新的日志列表
      this.loadingData = true;
      api.listLog(this.formData.startDate, this.formData.endDate, this.schemeId)
        .then(res => {
          this.loadingData = false;
          let rootChildrenLogs = res.data.childrenLogs;
          this.handleParseLogData(rootChildrenLogs);
          this.data = rootChildrenLogs;
          this.$nextTick(() => {
            console.log(this.defaultInstanceId);
            this.$refs.LogTree.setChecked(this.defaultInstanceId, true, true);
          });
        })
        .catch(reason => {
          this.loadingData = false;
          console.log(reason);
        });
    },
    show(schemeName, schemeId, serviceCode, instanceId) {
      this.data = [];
      this.showDialog = true;
      this.schemeName = schemeName;
      this.schemeId = schemeId;
      this.defaultServiceCode = serviceCode;
      this.defaultInstanceId = instanceId;
      this.handleQuery();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    showLoading() {
      this.loading = true;
    },
    // 创建模板下载链接
    downloads (data, fileName) {
      console.log(fileName);
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    execAdd() {
      let checkedNodes = this.$refs.LogTree.getCheckedNodes(true).filter(item => item.nodeType === 'log');
      this.loading = true;
      api.downloadLog(checkedNodes)
        .then(res => {
          this.loading = false;
          var fileName = res.headers['content-disposition'];
          fileName = fileName.split(';')[1].split('=')[1];
          this.downloads(res.data, fileName);
        })
        .catch(reason => {
          this.loading = false;
          console.log(reason);
        });
    },
    handleParseLogData(childrenLogs) {
      if (childrenLogs) {
        for (let item of childrenLogs) {
          if (item.nodeType === 'service') {
            item.nodeId = item.serviceCode;
          } else if (item.nodeType === 'instance') {
            // item.nodeId = item.nodeId;
          } else if (item.nodeType === 'logType') {
            item.nodeId = item.logType;
          } else if (item.nodeType === 'date') {
            item.nodeId = item.nodeName;
          } else if (item.nodeType === 'log') {
            item.nodeId = item.logPath;
            item.nodeName = item.logPath;
          }
          if (item.childrenLogs) {
            this.handleParseLogData(item.childrenLogs);
          }
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

  /deep/ .el-tree-node__content {
    height: 36px;
    line-height: 36px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
  }
</style>
