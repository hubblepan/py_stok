<template>
  <div>
    <el-form label-position="left" label-width="70px" :model="queryFormData" :inline="true" style="margin-top: 0px; margin-left: 0px; margin-right: 0px;" ref="formAddNode" v-if="this.propBigMode === '2'">
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
    <div v-loading="loadingData" :style="{height: chartHeight-60 + 'px'}">
      <ve-line :data="chartData" :settings="chartSettings" v-if="type === 'line'" :height="chartHeight + 'px'" :extend="chartExtend" :legend-visible="false"></ve-line>
      <ve-histogram :data="chartData" :settings="chartSettings" v-if="type === 'histogram'" height="340px"  :extend="chartExtend" :legend-visible="false"></ve-histogram>
      <ve-pie :data="chartData" :settings="chartSettings" v-if="type === 'pie'"></ve-pie>
    </div>
  </div>

</template>

<script>
import * as api from '../api/scene_api';
import dateFormat from '../../../utils/dateFormat';
import * as dateUtil from '../util/dateUtil';
export default {
  name: 'SceneIndicatorSummary',
  props: ['propMetricsVo', 'propApplicationId', 'propTags', 'propSceneId', 'propBigMode'], // bigMode 1为小图， 2为大图
  data() {
    return {
      queryFormData: {
        startTime: dateUtil.addMinute(-2, new Date()),
        endTime: dateUtil.currentDate(),
      },
      title: '',
      showDialog: false,
      loadingData: false,
      enableToolTip: false,
      showAxis: false,
      chartHeight: 340,
      applicationId: '',
      metricsId: '',
      sceneId: '',
      tags: '',
      type: '',
      chartSettings: {},
      chartExtend: {
        title: {
          text: '',
          left: 'center',
        },
      },
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
    this.show(this.propMetricsVo, this.propApplicationId, this.propTags, this.propSceneId, false, this.propBigMode);
  },
  methods: {
    // 设置大图模式
    setEnableToolTip(val) {
      this.enableToolTip = val;
      this.showAxis = val;
      if (val) {
        // 大图模式
        this.chartHeight = 540;
        this.queryFormData = {
          startTime: dateUtil.addMinute(-10, new Date()),
          endTime: dateUtil.currentDate(),
        };
      } else {
        this.chartHeight = 340;
        this.queryFormData = {
          startTime: dateUtil.addMinute(-2, new Date()),
          endTime: dateUtil.currentDate(),
        };
      }
    },
    refresh() {
      this.show(this.propMetricsVo, this.propApplicationId, this.propTags, this.propSceneId, true, this.propBigMode);
    },
    show(metricsVo, applicationId, tags, sceneId, isRefresh = false, bigMode = '1') {
      this.showDialog = true;
      this.title = metricsVo.metricsName;
      this.type = metricsVo.displayType;
      this.tags = tags;
      this.applicationId = applicationId;
      this.metricsId = metricsVo.metricsId;
      this.sceneId = sceneId;
      this.chartSettings = {};
      if (bigMode === '1') {
        this.setEnableToolTip(false);
      } else {
        this.setEnableToolTip(true);
      }
      this.getMetricData(isRefresh);
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loadingData = false;
    },
    getMetricData(isRefresh = false) {
      if (!isRefresh) {
        this.loadingData = true;
        this.chartData = {
          columns: ['时间', this.title],
          rows: [],
        };
        this.chartSettings = {
          metrics: [this.title],
          dimension: ['时间'],
          showDataZoom: true,
        };
      }
      api.getMetricsSummaryData(this.queryFormData.startTime, this.queryFormData.endTime, this.applicationId, this.metricsId, this.sceneId)
        .then(res => {
          this.loadingData = false;
          let rows = [];
          let tagList = [];
          let tagDisplayMap = res.data.tagDisplayMap || {};
          for (let key in res.data.analysisMetricsDataMap) {
            tagList.push(tagDisplayMap[key] || key);
          }
          let tagTimeMapMap = {};
          for (let tag in res.data.analysisMetricsDataMap) {
            let timeMap = {};
            res.data.analysisMetricsDataMap[tag].forEach(o => {
              timeMap[dateFormat('hh:mm:ss', new Date(o.createTime))] = o.value;
            });
            tagTimeMapMap[(tagDisplayMap[tag] || tag)] = timeMap;
          }
          res.data.collectTimes.forEach((item, index) => {
            let formatTime = dateFormat('hh:mm:ss', new Date(item));
            let row = {'时间': formatTime};
            tagList.forEach((tag) => {
              row[tag] = tagTimeMapMap[tag][formatTime];
            });
            rows.push(row);
          });
          this.chartData.rows = rows;
          this.chartData.columns = ['时间'].concat(tagList);
          this.chartSettings = {
            metrics: tagList,
            dimension: ['时间'],
          };
          this.chartExtend = {
            animation: false,
            title: {
              text: this.propMetricsVo.metricsName,
              left: 'center',
              textStyle: {
                fontSize: 14,
              },
            },
            xAxis: {
              show: this.showAxis,
            },
            'xAxis.0.axisLabel.rotate': 45,
            tooltip: {
              show: this.enableToolTip,
              position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              },
            },
          };
        })
        .catch(reason => {
          this.loadingData = false;
        });
      // api.getMetricsData(this.queryFormData.startTime, this.queryFormData.endTime, this.applicationId, this.metricsId, this.tags)
      //   .then(res => {
      //     this.loadingData = false;
      //     const column1 = this.title;
      //     res.data = res.data.sort((a, b) => {
      //       return a.createTime - b.createTime;
      //     });
      //     res.data.forEach(item => {
      //       let chartItem = {'时间': dateFormat('mm:ss', new Date(item.createTime))};
      //       chartItem[column1] = parseFloat(item.value);
      //       this.chartData.rows.push(chartItem);
      //     });
      //   })
      //   .catch(reason => {
      //     this.loadingData = false;
      //   });
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
