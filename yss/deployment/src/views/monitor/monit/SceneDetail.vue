<template>
  <div>
    <el-form v-if="false" label-position="left" label-width="50px" :model="queryFormData" :inline="true" size="mini" style="margin-top: 20px; margin-left: 10px; margin-right: 20px;" ref="formAddNode">
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
      <el-tabs v-model="activeName" type="card" size="small">
        <el-tab-pane :label="tomcatIdMap[node.applicationId].tomcatName" :name="node.applicationId" v-for="node in nodeList" :key="node.applicationId">
          <el-table class="d2-ml" size="small"
                    :data="node.tableData" border style="width: 98%; margin-top: 15px; margin-bottom: 20px" max-height="350"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
            <el-table-column
              prop="name"
              label="标签"
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
              sortable
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
          <div style="margin-left: 20px;">
            <el-row :gutter="12">
              <el-col :span="6" v-for="item in node.allMetricsIds" :key="item">
                <el-card  shadow="never">
                  <div style="position: relative" class="indicator-summary">
                    <scene-indicator-summary
                      ref="SceneIndicatorSummary"
                      :prop-scene-id="sceneVo.id"
                      :prop-application-id="node.applicationId"
                      :prop-metrics-vo="metricsMap[item]"
                      :prop-tags="node.tableData[0] && node.tableData[0].name"
                      :prop-big-mode="'1'">
                    </scene-indicator-summary>
                    <div class="indicator-summary-detail" @click="handleSummaryDetail(sceneVo.id, node.applicationId, metricsMap[item], node.tableData[0] && node.tableData[0].name)">
                      <span style="font-size: 0.5rem; color: white; margin: 0 auto">点击看大图</span>
                    </div>
                  </div>

                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
<!--      <div class="tableContainer" v-for="node in nodeList" :key="node.applicationId">-->
<!--        <div class="table_out_title">-->
<!--          <span style="font-size: 16px;">{{tomcatIdMap[node.applicationId].tomcatName}}</span>-->
<!--        </div>-->
<!--        -->
<!--      </div>-->
    </div>
    <scene-indicator :on-added="onAdded" ref="SceneIndicator"></scene-indicator>
    <scene-indicator-chart ref="SceneIndicatorChart"></scene-indicator-chart>
    <scene-indicator-text ref="SceneIndicatorText"></scene-indicator-text>
    <scene-indicator-summary-dialog ref="SceneSummaryDialog"></scene-indicator-summary-dialog>
  </div>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import SceneIndicator from './SceneIndicator';
import SceneIndicatorChart from './SceneIndicatorChart';
import SceneIndicatorText from './SceneIndicatorText';
import SceneIndicatorSummary from './SceneIndicatorSummary';
// import dateFormat from '../../../utils/dateFormat';
import * as api from '../api/scene_api';
import * as deployApi from '../api/node_deploy_api';
import * as dateUtil from '../util/dateUtil';
import SceneIndicatorSummaryDialog from './SceneIndicatorSummaryDialog';
export default {
  name: 'SceneDetail',
  props: ['propSceneVo'],
  components: {
    SceneIndicatorSummaryDialog,
    SceneIndicatorSummary,
    SceneIndicatorText,
    SceneIndicatorChart,
    SceneIndicator,
    AppHeader,
  },
  data() {
    return {
      title: '场景分析',
      activeName: (this.nodeList && this.nodeList[0] && this.nodeList[0].applicationId) || '',
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
      sceneVo: null,
      tomcatIdMap: null,
    };
  },
  created() {
    this.sceneVo = this.propSceneVo;
    this.sceneVo.analysisMetricsVos.forEach(metricItem => {
      this.metricsMap[metricItem.metricsId] = metricItem;
    });
    this.init();
  },
  methods: {
    handleSummaryDetail(sceneId, applicationId, metricsVo, tags) {
      this.$refs.SceneSummaryDialog.show(metricsVo, applicationId, tags, sceneId);
    },
    init() {
      // this.sceneVo = this.$route.params.sceneVo;
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
    refresh() {
      this.getLatestSceneData(true);
      this.$refs.SceneIndicatorSummary.forEach(refIndicatorSummary => {
        refIndicatorSummary.refresh();
      });
    },
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
      // this.metricsMap = {};
      api.getLatestSceneData(this.queryFormData.nodeSelected, this.sceneVo.id)
        .then(res => {
          this.loadingData = false;
          // 构建每个Node 的 tableData
          res.data.forEach((item, index) => {
            let tableData = [];
            item.analysisMetricsDataList = item.analysisMetricsDataList.filter(analysisMetrics => {
              return !analysisMetrics.hidden;
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
    getLatestSceneData(isRefresh = false) {
      if (!isRefresh) {
        this.loadingData = true;
      }
      // this.metricsMap = {};
      api.getLatestSceneData(this.sceneVo.applicationNodeIds, this.sceneVo.id)
        .then(res => {
          this.loadingData = false;
          // 构建每个Node 的 tableData
          res.data.forEach((item, index) => {
            let tableData = [];
            // 存储指标id 对应的指标数据 map
            // item.analysisMetricsDataList.forEach(metricItem => {
            //   this.metricsMap[metricItem.id] = metricItem;
            // });
            item.analysisMetricsDataList = item.analysisMetricsDataList.filter(analysisMetrics => {
              return !analysisMetrics.hidden;
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
          if (this.nodeList && this.nodeList[0]) {
            this.activeName = this.nodeList[0].applicationId;
          }
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
  .indicator-summary:hover .indicator-summary-detail {
    opacity: 0.5;
  }
  .indicator-summary-detail {
    height: 10%;
    width: 25%;
    background: gray;
    position: absolute;
    left: 40%;
    top: 40%;
    border-radius: 4px;
    text-align: center;
    opacity: 0;
    cursor: pointer;
  }
</style>
