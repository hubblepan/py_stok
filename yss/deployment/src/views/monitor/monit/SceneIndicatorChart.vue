<template>
  <div>
    <el-dialog :title="title" :visible.sync="showDialog" width="815px">
      <el-form label-position="left" label-width="70px" :model="queryFormData" :inline="true" style="margin-top: 0px; margin-left: 0px; margin-right: 0px;" ref="formAddNode">
        <el-form-item  label="开始时间">
          <el-date-picker
            v-model="queryFormData.startTime"
            type="datetime"
            size="mini"
            style="width: 180px"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="queryFormData.endTime"
            type="datetime"
            size="mini"
            style="width: 180px"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMetricData" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <div v-loading="loadingData">
        <ve-line :data="chartData" :settings="chartSettings" v-if="type === 'line'"></ve-line>
        <ve-histogram :data="chartData" :settings="chartSettings" v-if="type === 'histogram'"></ve-histogram>
        <ve-pie :data="chartData" :settings="chartSettings" v-if="type === 'pie'"></ve-pie>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/scene_api';
import dateFormat from '../../../utils/dateFormat';
import * as dateUtil from '../util/dateUtil';
export default {
  name: 'SceneIndicatorChart',
  props: ['onAdded'],
  data() {
    return {
      queryFormData: {
        startTime: '',
        endTime: '',
      },
      title: '',
      showDialog: false,
      loadingData: false,
      applicationId: '',
      metricsId: '',
      metricsVo: null,
      tags: '',
      type: '',
      chartSettings: null,
      chartData: {
        columns: ['日期', '请求1', '请求2'],
        rows: [
          { '日期': '1/1', '请求1': 1393, '请求2': 1093 },
          { '日期': '1/2', '请求1': 3530, '请求2': 3230 },
          { '日期': '1/3', '请求1': 2923, '请求2': 2623 },
          { '日期': '1/4', '请求1': 1723, '请求2': 1423 },
          { '日期': '1/5', '请求1': 3792, '请求2': 3492 },
          { '日期': '1/6', '请求1': 4593, '请求2': 4293 },
        ],
      },
    };
  },
  created() {
  },
  methods: {
    show(metricsVo, applicationId, tags, alias = '') {
      this.showDialog = true;
      this.metricsVo = metricsVo;
      this.title = alias || tags;
      this.type = metricsVo.displayType;
      this.tags = tags;
      this.applicationId = applicationId;
      this.metricsId = metricsVo.metricsId;
      this.chartSettings = null;
      this.queryFormData = {
        startTime: dateUtil.addMinute(-10, new Date()),
        endTime: dateUtil.currentDate(),
      };
      this.getMetricData();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loadingData = false;
    },
    getMetricData() {
      this.loadingData = true;
      this.chartData = {
        columns: ['时间', this.metricsVo.metricsName],
        rows: [],
      };
      this.chartSettings = {
        metrics: [this.metricsVo.metricsName],
        dimension: ['时间'],
        showDataZoom: true,
      };
      console.log('获取指标数据接口参数:', this.queryFormData.startTime, this.queryFormData.endTime, this.applicationId, this.metricsId, this.tags);
      api.getMetricsData(this.queryFormData.startTime, this.queryFormData.endTime, this.applicationId, this.metricsId, this.tags)
        .then(res => {
          this.loadingData = false;
          const column1 = this.metricsVo.metricsName;
          res.data = res.data.sort((a, b) => {
            return a.createTime - b.createTime;
          });
          res.data.forEach(item => {
            let chartItem = {'时间': dateFormat('MM-dd hh:mm:ss', new Date(item.createTime))};
            chartItem[column1] = parseFloat(item.value);
            this.chartData.rows.push(chartItem);
          });
        })
        .catch(reason => {
          this.loadingData = false;
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
</style>
