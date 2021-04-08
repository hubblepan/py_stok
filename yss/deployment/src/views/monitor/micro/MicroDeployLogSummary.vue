<template>
  <!-- 新增服务器 -->
  <el-dialog title="部署日志" :visible.sync="showDialog" width="50%"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body v-loading="loadingData"
             :before-close="handleClose">
    <div style="padding:0 10px">
      <el-timeline>
        <el-timeline-item v-for="item in microServiceDigestVoList" :key="item.serviceCode" :timestamp="item.serviceCode" placement="top">
          <div>
            <div v-for="instanceItem in item.instanceVoList" :key="instanceItem.id">
              <div style="display: inline-block; vertical-align: middle; width: 80%;">{{instanceItem.ip + '&nbsp;&nbsp;' + instanceItem.installDir}}</div>
              <el-link type="primary" style="vertical-align: middle" @click="handleShowDeployLog(instanceItem.id, false)" v-show="serviceCodeStatusMap[item.serviceCode].finish">日志</el-link>
              <i class="el-icon-error" style="margin-left: 20px; color: #ff4d4f" v-if="serviceCodeStatusMap[item.serviceCode].finish && instanceStatusMap[instanceItem.id].failed"></i>
              <i class="el-icon-success" style="margin-left: 20px; color: #13ce66" v-if="serviceCodeStatusMap[item.serviceCode].finish && !instanceStatusMap[instanceItem.id].failed"></i>
            </div>
            <div v-if="serviceCodeStatusMap[item.serviceCode].loading">
              <div style="display: inline-block; vertical-align: top; color: #3366ff">启动中</div>
              <i class="el-icon-loading" style="margin-left: 10px; color: #3366ff; vertical-align: middle"></i>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-dialog>
</template>

<script>
import * as api from '../api/micro_service_api';

export default {
  name: 'MicroDeployLogSummary',
  props: ['onDeployLog', 'onConnectLog'],
  data() {
    return {
      loadingData: false,
      showDialog: false,
      microServiceDigestVoList: [],
      currentServiceCode: '',
      serviceCodeStatusMap: {
      },
      serviceCodeStatusMapItem: {
        loading: false, // 是否处于请求中状态
        finish: false, // 是否已部署完成
        success: false, // 是否部署成功
      },
      instanceStatusMap: {
      },
      instanceStatusMapItem: {
        failed: false,
      },
      completeDeploy: true,
    };
  },
  methods: {
    handleShowDeployLog(instanceId, forceClose = false) {
      this.onDeployLog(instanceId, forceClose);
    },
    handleClose(done) {
      if (!this.completeDeploy) {
        this.$confirm('部署操作还未完成，关闭提示框后需要自行确定服务的启动状态， 是否继续？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      } else {
        done();
      }
    },
    show(schemeId, microServiceDigestVoList) {
      this.microServiceDigestVoList = microServiceDigestVoList;
      let serviceCodeStatusMap = {};
      let instanceStatusMap = {};
      this.microServiceDigestVoList.forEach(item => {
        serviceCodeStatusMap[item.serviceCode] = {
          loading: false, // 是否处于请求中状态
          finish: false, // 是否已部署完成
          success: false, // 是否部署成功
        };
        item.instanceVoList.forEach(instanceItem => {
          instanceStatusMap[instanceItem.id] = {
            failed: false, // 是否部署失败
          };
        });
      });
      this.serviceCodeStatusMap = serviceCodeStatusMap;
      this.instanceStatusMap = instanceStatusMap;
      this.showDialog = true;
      this.$nextTick(() => {
        this.start(schemeId);
      });
    },
    close() {
      this.showDialog = false;
    },
    async start(schemeId) {
      this.completeDeploy = false;
      for (const item of this.microServiceDigestVoList) {
        let serviceCode = item.serviceCode;
        this.currentServiceCode = serviceCode;
        this.serviceCodeStatusMap[serviceCode].loading = true;
        try {
          let result = await api.startService(schemeId, serviceCode);
          this.serviceCodeStatusMap[serviceCode].loading = false;
          item.instanceVoList.forEach(instanceItem => {
            this.onConnectLog(instanceItem.id);
          });
          // 处理部署失败
          if (result.data && result.data.trim() && result.data.split(',').length > 0) {
            this.serviceCodeStatusMap[serviceCode].finish = true;
            this.serviceCodeStatusMap[serviceCode].success = false;
            let failedInstanceIds = result.data.split(',');
            failedInstanceIds.forEach(instanceId => {
              this.instanceStatusMap[instanceId].failed = true;
            });
            // 全部实例部署失败
            if (failedInstanceIds.length === item.instanceVoList.length) {
              this.$alert('服务【' + serviceCode + '】全部实例部署失败， 部署中止');
              break;
            }
          } else {
            // 部署成功
            this.serviceCodeStatusMap[serviceCode].finish = true;
            this.serviceCodeStatusMap[serviceCode].success = true;
          }
        } catch (e) {
          // 异常
          this.serviceCodeStatusMap[serviceCode].loading = false;
          this.serviceCodeStatusMap[serviceCode].finish = true;
          this.serviceCodeStatusMap[serviceCode].success = false;
          this.$alert('服务【' + serviceCode + '】部署发生异常， 部署中止');
          item.instanceVoList.forEach(instanceItem => {
            this.instanceStatusMap[instanceItem.id].failed = true;
          });
          this.completeDeploy = true;
          return '';
        }
      }
      this.completeDeploy = true;
      this.$confirm('部署已完成， 是否关闭提示框?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.close();
      });
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: white;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }
  /deep/ .el-timeline-item__timestamp {
    color: rgba(0,0,0,0.8);
    font-weight: 500;
    font-size: 16px;
    padding-top: 0px;
  }
</style>
