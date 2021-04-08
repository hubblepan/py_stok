<template>
  <d2-container>
    <div>
      <app-header :title="title"></app-header>
      <el-form label-position="left" label-width="50px" :model="queryFormData" :inline="true" style="margin-top: 20px; margin-left: 10px; margin-right: 20px;" ref="formAddNode">
        <el-form-item  v-for="item in query" :key="item.name" :label="item.name">
          <el-date-picker
            v-model="queryFormData[item.key]"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            v-if="item.type === 'datetime'">
          </el-date-picker>
          <el-radio-group v-model="queryFormData[item.key]" v-else-if="item.type === 'radio'">
            <el-radio v-for="radio in item.group" :key="radio.value" :label="radio.value">{{radio.title}}</el-radio>
          </el-radio-group>
          <el-input
            v-model="queryFormData[item.key]"
            size="small"
            v-else>
          </el-input>
        </el-form-item>
        <el-form-item label="节点">
          <el-select
            v-model="queryFormData.nodeSelected"
            multiple
            size="small"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择节点">
            <el-option
              v-for="node in sceneVo.tomcatList"
              :key="node.id"
              size="small"
              :label="node.tomcatName"
              :value="node.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <div  v-loading="loadingData">
        <div class="tableContainer" v-for="node in nodeList" :key="node.applicationId">
          <div class="table_out_title">
            <span style="font-size: 16px;">{{tomcatIdMap[node.applicationId].tomcatName}}</span>
          </div>
          <el-table class="d2-ml"
                    :data="node.tableData" border style="width: 98%; margin-top: 15px; margin-bottom: 20px" max-height="750"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
            <el-table-column
              prop="name"
              label=""
              min-width="200">
              <template slot-scope="scope">
                  <el-tooltip placement="top" style="width: 260px;" effect="light" :open-delay="800">
                    <div slot="content"><pre>{{scope.row.name}}</pre></div>
                    <span>{{scope.row.alias}}</span>
                  </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              v-for="item in node.analysisMetricsDataList"
              :key="item.id"
              :prop="item.id"
              :label="item.metricName"
              min-width="100"
              :width="item.tableWidth !== 0 ? item.tableWidth : null" align="center">
              <template slot-scope="scope">
                <el-button @click="handleShowChart(scope.$index, scope.row, item)" type="text" size="small" v-if="item.displayType === 'line' || item.displayType === 'histogram' || item.displayType === 'pie'">
                  {{scope.row[item.id]}}
                </el-button>
                <el-button @click="handleShowText(scope.$index, scope.row, item)" type="text" size="small" v-else-if="item.displayType === 'textArea'">
                  {{scope.row[item.id]}}
                </el-button>
                <span v-else>{{scope.row[item.id]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <scene-indicator :on-added="onAdded" ref="SceneIndicator"></scene-indicator>
      <scene-indicator-chart ref="SceneIndicatorChart"></scene-indicator-chart>
      <scene-indicator-text ref="SceneIndicatorText"></scene-indicator-text>
    </div>
  </d2-container>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import SceneIndicator from './SceneIndicator';
import SceneIndicatorChart from './SceneIndicatorChart';
import SceneIndicatorText from './SceneIndicatorText';
// import dateFormat from '../../../utils/dateFormat';
import * as api from '../api/scene_api';
import * as deployApi from '../api/node_deploy_api';
import * as dateUtil from '../util/dateUtil';
export default {
  name: 'SceneAnalysis',
  components: {
    SceneIndicatorText, SceneIndicatorChart, SceneIndicator, AppHeader,
  },
  data() {
    return {
      title: '场景分析',
      loadingData: false,
      query: [
        // {
        //   name: '开始时间',
        //   type: 'datetime',
        //   key: 'startTime',
        //   default: null,
        //   required: true,
        // },
        // {
        //   name: '结束时间',
        //   type: 'datetime',
        //   key: 'endTime',
        //   default: null,
        //   required: true,
        // },
      ], // 模板数据
      queryFormData: {
        startTime: '',
        endTime: '',
        nodeSelected: [],
      },
      tableData: [],
      metricsMap: {},
      nodeList: [],
      sceneDataOfNode: {},
      deployLoadingMap: {},
      nodeOptions: [
        {
          name: '节点1',
          ip: '192.168.4.225',
        },
        {
          name: '节点2',
          ip: '192.168.4.226',
        },
        {
          name: '节点3',
          ip: '192.168.4.227',
        },
      ],
      sceneVo: null,
      tomcatIdMap: null,
    };
  },
  created() {
    // this.query = [
    //   {
    //     name: '开始时间',
    //     type: 'datetime',
    //     key: 'startTime',
    //     default: null,
    //     required: true,
    //   },
    //   {
    //     name: '结束时间',
    //     type: 'datetime',
    //     key: 'endTime',
    //     default: null,
    //     required: true,
    //   },
    // ];
    // // 固定查询头部
    // this.query.forEach((item, index) => {
    //   this.$set(this.queryFormData, item.key, item.default);
    // });
    this.sceneVo = this.$route.params.sceneVo;
    this.title = this.sceneVo.name;
    this.tomcatIdMap = {};
    this.sceneVo.tomcatList.forEach(item => {
      this.tomcatIdMap[item.id] = item;
    });
    this.queryFormData = {
      startTime: dateUtil.addMinute(-10, new Date()),
      endTime: dateUtil.currentDate(),
      nodeSelected: this.sceneVo.tomcatList.map(item => {
        return item.id;
      }),
    };
    // 根据场景 id 互殴场景接口数据
    this.getLatestSceneData();
  },
  methods: {
    onAdded(p) {
      p.then(res => {
        // 成功
        this.$refs.nodeAdd.closeLoading();
        this.$refs.nodeAdd.close();
        // 刷新节点列表
        this.getLatestSceneData();
      }).catch(reason => {
        this.$refs.nodeAdd.closeLoading();
        this.$message.error({
          message: '添加节点失败:' + reason,
        });
      });
    },
    handleQuery() {
      this.loadingData = true;
      this.metricsMap = {};
      api.getLatestSceneData(this.queryFormData.nodeSelected, this.sceneVo.id)
        .then(res => {
          this.loadingData = false;
          // 构建每个Node 的 tableData
          res.data.forEach((item, index) => {
            let tableData = [];
            item.analysisMetricsDataList = item.analysisMetricsDataList.filter(analysisMetrics => {
              return !analysisMetrics.hidden;
            });
            item.analysisMetricsDataList.forEach(metricItem => {
              this.metricsMap[metricItem.id] = metricItem;
            });
            for (let key in item.analysisMetricsDataMap) {
              let tableItem = {};
              let attrList = item.analysisMetricsDataMap[key];
              attrList && attrList.forEach(attr => {
                tableItem[attr.id] = attr.value;
              });
              tableItem.applicationId = item.applicationId;
              tableItem.name = key;
              tableData.push(tableItem);
            }
            this.$set(item, 'tableData', tableData);
          });
          this.nodeList = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
        });
    },
    handleAddScene() {
      this.$refs.SceneIndicator.show();
    },
    handleStop(index, item) {
      // do nothing
    },
    handleAnalysis(index, item) {

    },
    handleShowText(index, item, template) {
      this.$refs.SceneIndicatorText.show(template.name, item.stack);
    },
    handleShowChart(index, item, template) {
      this.$refs.SceneIndicatorChart.show(this.metricsMap[template.id], item.applicationId, item.name, item.alias);
    },
    getLatestSceneData() {
      this.loadingData = true;
      this.metricsMap = {};
      api.getLatestSceneData(this.sceneVo.applicationNodeIds, this.sceneVo.id)
        .then(res => {
          this.loadingData = false;
          // 构建每个Node 的 tableData
          res.data.forEach((item, index) => {
            let tableData = [];
            item.analysisMetricsDataList = item.analysisMetricsDataList.filter(analysisMetrics => {
              return !analysisMetrics.hidden;
            });
            item.analysisMetricsDataList.forEach(metricItem => {
              this.metricsMap[metricItem.id] = metricItem;
            });
            let tagAliasMap = item.tagDisplayMap || {};
            for (let key in item.analysisMetricsDataMap) {
              let tableItem = {};
              let attrList = item.analysisMetricsDataMap[key];
              attrList && attrList.forEach(attr => {
                tableItem[attr.id] = attr.value;
              });
              tableItem.applicationId = item.applicationId;
              tableItem.name = key;
              tableItem.alias = tagAliasMap[key] || key;
              tableData.push(tableItem);
            }

            this.$set(item, 'tableData', tableData);
          });
          this.nodeList = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
          // do nth
        });
      // this.tableData = [
      //   {
      //     name: '场景1',
      //     currentRequestNumber: '10',
      //     requestNumber: '8',
      //     percent: '10',
      //     maxTime: '100s',
      //     time: '10s, 1s, 100s, 90s, 5s, 1s',
      //     maxStack: 'com.util.Exception',
      //     chartData: [],
      //     stack: '123456',
      //   },
      //   {
      //     name: '场景2',
      //     currentRequestNumber: '12',
      //     requestNumber: '9',
      //     percent: '11',
      //     maxTime: '110s',
      //     time: '11s, 1s, 100s, 90s, 5s, 1s',
      //     maxStack: 'com.util.Exception2',
      //     chartData: [],
      //     stack: '123456',
      //   },
      // ];
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
  /deep/ .el-radio__label{
    display: inline;
  }
  /deep/ .el-form-item{
    margin-left: 20px;
  }
  .tableContainer{
    border: 1px solid #dcdfe6;
    margin: 0 20px 20px 20px;
  }
  .table_out_title {
    background-color: rgb(245, 247, 250);
    height: 50px;
    border-bottom: 1px solid #dcdfe6;
    padding-top: 10px;
    padding-left: 20px;

  }
</style>
