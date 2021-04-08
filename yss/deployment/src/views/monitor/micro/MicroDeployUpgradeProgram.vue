<template>
  <d2-container>
    <div style="height: 100%;">
      <app-header-new :title="scheme.schemeName" :show-back="true"></app-header-new>
      <el-row style="height: 100%;">
        <el-col :span="5" style="min-height: 100%; border-right: 1px solid rgb(235, 238, 245)">
          <div v-if="false" style="width: 100%; height: 64px; border-top: 1px solid rgb(235, 238, 245); line-height: 64px; padding-left: 20px; padding-right: 60px;">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchContent" size="small"></el-input>
          </div>
          <el-table
            :data="tableData"
            class="testTable"
            style="margin: 0px 20px 0px 0px; width: 100%"
            ref="serviceListTable"
            @row-click="handleClickTableRow"
            :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"
            :header-row-style="{height: '40px'}"
            :row-style="{height: '40px'}"
            :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            border>
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="服务列表">
              <template slot-scope="scope">
                <!--          <el-button size="mini" type="danger" v-if="scope.row.type === 'server'">删除</el-button>-->
                <!--                  <el-checkbox v-if="scope.row.type === 'server'"></el-checkbox>-->
                <div style="height: 40px; line-height: 40px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                  <div style="display: inline-block; width: 50%">
<!--                    <i class="iconfont iconjiankong" style="vertical-align: middle"></i>-->
                    <div style="display: inline-block; width: 12px"><span style="color: #ff4d4f; vertical-align: middle" v-if="CONST_SERVICE.indexOf(scope.row.serviceCode) !== -1">*</span></div>
                    <span style="cursor: default; vertical-align: middle;">{{scope.row.serviceCode + (extServiceData[scope.row.serviceCode] && extServiceData[scope.row.serviceCode].used ? '(外)' : '')}}</span>
                  </div>
                  <div style="float: right; height: 40px;" v-if="extServiceData[scope.row.serviceCode] && extServiceData[scope.row.serviceCode].used">
                    <el-tooltip class="item" effect="light" content="外部服务异常" placement="top" v-if="extServiceData[scope.row.serviceCode].status === 'ERROR'">
                      <i class="el-icon-error" style="color: #ff4d4f"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" content="外部服务正常" placement="top" v-if="extServiceData[scope.row.serviceCode].status !== 'ERROR'">
                      <i class="el-icon-success" style="color: #13ce66" ></i>
                    </el-tooltip>
                  </div>
<!--                  <span style="cursor: default">{{scope.row.microServiceStatus}}</span>-->
                  <div style="float: right; height: 40px;" v-if="!extServiceData[scope.row.serviceCode] || !extServiceData[scope.row.serviceCode].used">
                    <div v-if="scope.row.instanceVoList && scope.row.instanceVoList.length > 0">
                      <el-tooltip class="item" effect="light" content="实例未配置" placement="top" v-if="showServiceDeployIcon(scope.row) &&  scope.row.serviceCode !== deploySelected.currentServiceCode">
                        <i class="el-icon-setting" style="color: #ff4d4f;" @click="clickDeployIcon"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="light" content="部分实例异常" placement="top" v-if="!showServiceDeployIcon(scope.row) && scope.row.microServiceStatus === microServiceStatus.WARN && scope.row.serviceCode !== deploySelected.currentServiceCode">
                        <i class="el-icon-warning" style="color: #faad15;"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="light" content="全部实例异常" placement="top" v-if="!showServiceDeployIcon(scope.row) && scope.row.microServiceStatus === microServiceStatus.ERROR && scope.row.serviceCode !== deploySelected.currentServiceCode">
                        <i class="el-icon-error" style="color: #ff4d4f"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="light" content="正常运行" placement="top" v-if="!showServiceDeployIcon(scope.row) && scope.row.microServiceStatus === microServiceStatus.NORMAL && scope.row.serviceCode !== deploySelected.currentServiceCode">
                        <i class="el-icon-success" style="color: #13ce66" ></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="light" content="实例未启动" placement="top" v-if="!showServiceDeployIcon(scope.row) && scope.row.microServiceStatus === microServiceStatus.INIT && scope.row.serviceCode !== deploySelected.currentServiceCode">
                        <i class="el-icon-remove" style="color: rgba(0, 0, 0, 0.4)"></i>
                      </el-tooltip>
                    </div>
                    <el-tooltip class="item" effect="light" content="缺失实例" placement="top" v-if="!scope.row.instanceVoList || scope.row.instanceVoList.length < 1">
                      <i class = "el-icon-plus" style="color: #2f74ff" @click="handleRepair(scope.row.serviceCode)"></i>
                    </el-tooltip>
                    <div style="display: inline-block" v-if="scope.row.serviceCode === deploySelected.currentServiceCode">
                      <div style="display: inline-block; vertical-align: top; color: #3366ff">启动中</div>
                      <i class="el-icon-loading" style="margin-left: 10px; color: #3366ff; vertical-align: middle"></i>
                    </div>
                  </div>
                </div>

              </template>
            </el-table-column>
          </el-table>
          <span style="font-size: 12px; color: #909399; margin-left: 10px;">注1: 标'*'的是必须启动的微服务</span>
          <div>
            <div style="display: inline-block; height: 33px; line-height: 33px; font-size: 14px; margin: 20px 20px 0 20px;">
              <span style="color: rgba(0, 0, 0, 0.6)">已选择</span><span style="color: #3366ff">{{tableSelectionData.length}}</span> <span style="color: rgba(0, 0, 0, 0.6)">项</span>
            </div>
            <div style="width: 94px; height: 33px; float: right; margin-top: 20px; margin-right: 20px;">
              <el-popover
                popper-class="myPopover"
                :visible-arrow="false"
                placement="bottom"
                trigger="hover">
                <div>
                  <div class="app-text-button" @click="confirmStopSelected">
                    <span>停止</span>
                  </div>
                  <div class="app-text-button" @click="confirmRestartSelected">
                    <span>重启</span>
                  </div>
                </div>

                <div slot="reference">
                  <div class="app-dropdown-button" @click="handleStartSelected">
                  <span>
                    启动
                  </span>
                  </div>
                  <div class="app-dropdown-arrow">
                    <i class="el-icon-arrow-down" style="font-size: 14px;"></i>
                  </div>
                </div>
              </el-popover>
            </div>
          </div>
        </el-col>
        <el-col :span="19" style="min-height: 100%; border-top: 1px solid rgb(235, 238, 245); position: relative">
          <div style="width: 6px; background: #f5f5f5; min-height: 100%; position: absolute; left: 0; top: 0; border-right: 1px solid rgb(235, 238, 245);">

          </div>

          <div style="margin-left: 6px; width: 100%">
            <app-header-new>
              <template v-slot:title>
                <div>
                  <span class="title-container">{{currentRow && currentRow.serviceCode}}</span>
<!--                  <span class="app-project-status" style="padding: 6px; color: #666666; margin-left: 20px; font-size: 12px;">{{scheme.schemeStatus}}</span>-->
                </div>
              </template>
              <template v-slot:button-group>
                <el-radio-group v-model="deployMode" size="mini" style="margin-right: 40px">
                  <el-radio-button :label="false" :disabled="!deploySelected.completeDeploy">服务概览</el-radio-button>
                  <el-radio-button :label="true" :disabled="!deploySelected.completeDeploy">部署升级</el-radio-button>
                </el-radio-group>
<!--                <app-switch style="display: inline-block; margin-left: 20px; margin-right: 40px; width: 176px" v-model="deployMode" :enabled="deploySelected.completeDeploy">-->
<!--                  <template v-slot:left>-->
<!--                    <span>服务概览</span>-->
<!--                  </template>-->
<!--                  <template v-slot:right>-->
<!--                    <span>部署升级</span>-->
<!--                  </template>-->
<!--                </app-switch>-->
              </template>
            </app-header-new>
            <el-table
              v-if="!deployMode && currentRow && (!extServiceData[currentRow.serviceCode] || !extServiceData[currentRow.serviceCode].used)"
              :data="summaryTableData"
              border
              :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"
              :header-row-style="{height: '40px'}"
              :row-style="{height: '40px'}"
              :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}"
              row-key="id">
              <el-table-column
                prop="name"
                label="名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="ip"
                label="ip地址"
                width="150">
              </el-table-column>
              <el-table-column
                prop="installDir"
                label="配置路径">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.installDir" placement="top">
                    <span class="single-line">{{scope.row.installDir}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="deployStatus"
                label="配置状态"
                width="120">
                <template slot-scope="scope">
                  <span>{{INST_DEPLOY_STATUS[scope.row.deployStatus]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="runningStatus"
                label="运行状态"
                width="120">
                <template slot-scope="scope">
                  <span>{{INST_RUNNING_STATUS[scope.row.runningStatus]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="runningVersion"
                label="运行版本"
                width="120">
              </el-table-column>
              <el-table-column align="left" label="操作" min-width="150" width="180">
                <template slot-scope="scope">
                  <div style="height: 40px; line-height: 40px; padding-top: 3px;">
                    <el-tooltip content="日志下载" placement="bottom" effect="light">
                      <i class="app-icon-button el-icon-download" @click="handleShowLogDownload(scope.row)"></i>
                    </el-tooltip>
                    <el-tooltip content="日志" placement="bottom" effect="light">
                      <i class="app-icon-button el-icon-tickets" @click="handleShowDeployLog(scope.row.id, false)"></i>
                    </el-tooltip>
                    <el-tooltip content="启动微服务实例" placement="bottom" effect="light" v-if="scope.row.runningStatus === 'NO_START'">
                      <i class="app-icon-button el-icon-video-play" @click="handleStartInstance(scope.row.id)"></i>
                    </el-tooltip>
                    <el-tooltip content="停止微服务实例" placement="bottom" effect="light" v-if="scope.row.runningStatus !== 'NO_START'">
                      <i class="app-icon-button el-icon-circle-close" @click="handleStopInstance(scope.row.id)"></i>
                    </el-tooltip>
                    <el-tooltip content="启动报告" placement="bottom" effect="light" v-if="scope.row.runningStatus !== 'NO_START' && currentRow.serviceCode.startsWith('osgi') && currentRow.serviceCode !== 'osgi-gateway'">
                      <i class="app-icon-button el-icon-document" @click="handleReport(scope.row)"></i>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <micro-deploy-panel ref="Panel" v-if="deployMode" :key="currentRow && currentRow.serviceCode" :micro-service-digest-vo="currentRow" :ext-service-vo="extServiceData[currentRow.serviceCode]" :on-deploying="handleShowDeployLog" :do-update="updateStatus"></micro-deploy-panel>
          </div>
        </el-col>
      </el-row>
      <div :key="logKey + ''">
        <micro-deploy-log2 v-for="item in getAllInstance" :ref="item.id" :key="item.id" :instance-id="item.id" :service-code="item.serviceCode"></micro-deploy-log2>
      </div>

<!--      <div :key="currentRow.serviceCode" v-if="currentRow">-->
<!--        -->
<!--      </div>-->

      <app-loading ref="AppLoading"></app-loading>
      <micro-deploy-log-summary ref="LogSummary" :on-deploy-log="handleShowDeployLog" :on-connect-log="handleConnectLog"></micro-deploy-log-summary>
      <micro-dialog-log-download ref="LogDownload"></micro-dialog-log-download>
    </div>
  </d2-container>
</template>

<script>
import MicroDeployPanel from './MicroDeployPanel';
import AppHeaderNew from '../../../components/header/AppHeaderNew';
import AppSwitch from '../../../components/AppSwitch';
import MicroDeployLog from './MicroDeployLog';
import MicroDeployLog2 from './MicroDeployLog2';
import MicroDeployLogSummary from './MicroDeployLogSummary';
import * as api from '../api/micro_service_api';
import AppLoading from '../../../components/AppLoading';
import MicroDialogLogDownload from './MicroDialogLogDownload';
import { message } from '../../../utils/resetMessage';
export default {
  name: 'MicroDeployUpgradeProgram',
  components: { MicroDeployLogSummary, MicroDeployLog2, MicroDeployPanel, AppHeaderNew, AppSwitch, AppLoading, MicroDialogLogDownload },
  computed: {
    getAllInstance: function() {
      let instanceList = [];
      this.tableData.forEach(item => {
        instanceList = instanceList.concat(item.instanceVoList);
      });
      console.log(instanceList);
      return instanceList;
    },
  },
  data() {
    return {
      logKey: 1,
      CONST_SERVICE: ['zookeeper', 'fomp-eureka', 'fomp-traceCenter', 'redis', 'osgi-mq', 'fomp-mq-rocketmq-namesrv', 'fomp-mq-rocketmq-broker', 'fomp-mq-rocketmq-console', 'fomp-mq-proxy', 'osgi-gateway', 'osgi-fast', 'osgi-basebusiness'],
      INST_DEPLOY_STATUS: {
        NOT_DEPLOYED: '未配置',
        DEPLOYING: '配置中',
        DEPLOYED: '已配置',
      },
      INST_RUNNING_STATUS: {
        ERROR: '异常',
        NO_START: '未启动',
        NORMAL: '运行中',
      },
      showPopper: false,
      microServiceStatus: {
        WARN: 'WARN',
        ERROR: 'ERROR',
        NORMAL: 'NORMAL',
        INIT: 'INIT',
      },
      // 启动
      serviceCodeStatusMap: {
      },
      serviceCodeStatusMapItem: {
        loading: false, // 是否处于请求中状态
        finish: false, // 是否已配置完成
        success: false, // 是否配置成功
      },
      deployMode: false,
      extServiceData: {}, // 外部服务map, serviceCode->extServiceItem
      searchContent: '',
      scheme: {},
      summaryTableData: [],
      tableData: [],
      tableSelectionData: [],
      tableDataItem: {
        id: '1',
        order: 0, // 前端排序id
        errorCount: 1,
        microServiceStatus: '',
        normalCount: 1,
        serviceCode: '微服务1',
        instanceVoList: [
          // 微服务1 --- 实例1
          {
            deployStatus: 'deployed', // deploying
            id: '1',
            installDir: '/home/tomcat/1',
            ip: '192.168.4.225',
            name: '实例1',
            runningStatus: 'DOWN',
            schemeId: '1',
            schemeName: '方案1',
            serverId: '1',
            serviceCode: '微服务1',
            runningVersion: '',
            programVersion: '',
          },
        ],
      },
      currentRow: null,
      refreshId: -1,

      deploySelected: {
        completeDeploy: true, // 是否已全部皮遏制完成
        currentServiceCode: '', // 当前正在配置的 serviceCode
      },
    };
  },
  mounted() {
    this.scheme = JSON.parse(this.$route.params.scheme);
    this.scheme.microServiceDigestVoList.forEach((item, index) => {
      item.order = index;
    });
    this.tableData = this.scheme.microServiceDigestVoList;
    this.currentRow = this.tableData[0];
    this.summaryTableData = this.currentRow.instanceVoList;
    this.updateStatus();
    this.initExtServiceData();
  },
  destroyed() {
    this.refreshId !== -1 && clearTimeout(this.refreshId);
  },
  methods: {
    clickDeployIcon() {
      this.deployMode = true;
    },
    initExtServiceData() {
      api.getExtServiceBySchemeId(this.scheme.schemeId)
        .then(res => {
          let serviceDataMap = {};
          res.data && res.data.forEach(item => {
            if (item.extraParameter) {
              item.extraParameter = JSON.parse(item.extraParameter);
            }
            serviceDataMap[item.serviceCode] = item;
          });
          this.extServiceData = serviceDataMap;
          this.$nextTick(() => {
            if (this.extServiceData[this.currentRow.serviceCode] && this.extServiceData[this.currentRow.serviceCode].used) {
              this.deployMode = true;
            }
          });
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    handleRepair(serviceCode) {
      let schemeId = this.scheme.schemeId;
      this.showLoading('正在分配服务器');
      api.repairScheme(schemeId, serviceCode)
        .then(res => {
          this.updateStatus();
        })
        .catch(reason => {
          this.hideLoading();
          console.log(reason);
        });
    },
    showLoading(message = '加载中') {
      this.$refs.AppLoading.show(message);
    },
    hideLoading() {
      this.$refs.AppLoading.dismiss();
    },
    updateStatus(updateInstance = false) {
      let updateLogComponents = false;
      this.refreshId !== -1 && clearTimeout(this.refreshId);
      api.schemeDetail(this.scheme.schemeId)
        .then(res => {
          this.hideLoading();
          let schemeDigest = res.data;
          // 微服务状态
          let microServiceList = schemeDigest.microServiceDigestVoList;
          let serviceCodeMap = {};
          microServiceList.forEach(item => {
            serviceCodeMap[item.serviceCode] = item;
          });
          this.tableData.forEach(item => {
            item.microServiceStatus = serviceCodeMap[item.serviceCode].microServiceStatus;
            item.errorCount = serviceCodeMap[item.serviceCode].errorCount;
            item.normalCount = serviceCodeMap[item.serviceCode].normalCount;
            // 微服务下的实例状态
            let instanceMap = {};
            serviceCodeMap[item.serviceCode].instanceVoList.forEach(instanceItem => {
              instanceMap[instanceItem.id] = instanceItem;
            });
            // 对于前面没有分配实例的微服务，直接将返回的微服务实例数据赋值到tableData item 上, ，需要重新刷新日志
            if (!item.instanceVoList || item.instanceVoList.length < 1) {
              updateLogComponents = true;
              item.instanceVoList = serviceCodeMap[item.serviceCode].instanceVoList;
              if (this.currentRow && this.currentRow.serviceCode === item.serviceCode) {
                this.summaryTableData = item.instanceVoList;
              }
            }
            // 对于新增的微服务实例， 将新增的微服务实例添加到现有的服务实例上，需要重新刷新日志
            if (item.instanceVoList.length !== serviceCodeMap[item.serviceCode].instanceVoList.length) {
              updateLogComponents = true;
              let instanceIdMap = {};
              item.instanceVoList.forEach(oldItem => {
                instanceIdMap[oldItem.id] = oldItem;
              });
              serviceCodeMap[item.serviceCode].instanceVoList.forEach(newItem => {
                if (!instanceIdMap[newItem.id]) {
                  item.instanceVoList.push(newItem);
                }
              });
              if (this.currentRow && this.currentRow.serviceCode === item.serviceCode) {
                this.summaryTableData = item.instanceVoList;
              }
            }
            // 更新到最新状态
            item.instanceVoList.forEach(instanceItem => {
              instanceItem.deployStatus = instanceMap[instanceItem.id].deployStatus;
              instanceItem.runningStatus = instanceMap[instanceItem.id].runningStatus;
              instanceItem.runningVersion = instanceMap[instanceItem.id].runningVersion;
              instanceItem.installDir = instanceMap[instanceItem.id].installDir;
              instanceItem.ip = instanceMap[instanceItem.id].ip;
              this.deployMode && this.currentRow.serviceCode === instanceItem.serviceCode && this.$refs.Panel.handleUpdateInstanceStatus(instanceItem);
            });
          });
          if (updateLogComponents || updateInstance) {
            this.logKey += 1;
            this.$refs.Panel.onInstanceListChanged();
          }
          this.refreshId = setTimeout(() => { this.updateStatus(); }, 10 * 1000);
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
          this.refreshId = setTimeout(() => { this.updateStatus(); }, 10 * 1000);
        });
    },
    validateStartSelectd(data) {
      if (!data || data.length === 0) {
        this.$alert('至少选择一个微服务');
        return false;
      }
      for (const item of data) {
        let order = item.order;
        for (const instanceItem of item.instanceVoList) {
          if (instanceItem.deployStatus !== 'DEPLOYED') {
            this.$alert('服务【' + item.serviceCode + '】的实例【' + instanceItem.installDir + '】未进行配置， 无法启动');
            return false;
          }
        }
        if (order !== 0) {
          let preServiceItem = this.tableData[order - 1];
          if (preServiceItem.microServiceStatus !== this.microServiceStatus.NORMAL && preServiceItem.microServiceStatus !== this.microServiceStatus.WARN) {
            if (data.indexOf(preServiceItem) === -1 && !(this.extServiceData[preServiceItem.serviceCode] && this.extServiceData[preServiceItem.serviceCode].used)) {
              this.$alert('服务【' + item.serviceCode + '】的前置服务【' + preServiceItem.serviceCode + '】状态异常，请检查');
              return false;
            }
          }
        }
      }
      return true;
    },
    showServiceDeployIcon(serviceItem) {
      for (let item of serviceItem.instanceVoList) {
        if (item.deployStatus !== 'DEPLOYED') {
          return true;
        }
      }
      return false;
    },
    handleStartSelected() {
      if (!this.filterDeployingSelected()) {
        return;
      }
      let selectData = this.tableSelectionData.sort((a, b) => {
        return a.order - b.order;
      });
      if (this.validateStartSelectd(selectData)) {
        // this.$refs.LogSummary.show(this.scheme.schemeId, selectData);
        this.deployMode = false;
        this.startSelected(selectData);
      }
    },
    // handleRestartSelected() {
    //   this.handleStopSelected();
    //
    // },
    confirmStopSelected() {
      this.$confirm('此操作将停止所选服务的全部实例， 可能会引起依赖这些服务的服务产生异常，确认继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.handleStopSelected();
      });
    },
    confirmRestartSelected() {
      this.$confirm('此操作将重启所选服务的全部实例， 可能会引起依赖这些服务的服务产生异常，确认继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.handleStartSelected();
      });
    },
    async handleStopSelected() {
      for (let item of this.tableSelectionData) {
        for (let instanceItem of item.instanceVoList) {
          this.showLoading('正在停止服务实例:' + instanceItem.id);
          await api.stopInstance(instanceItem.id);
          this.hideLoading();
          this.updateStatus();
          // this.syncHandleStopInstance(instanceItem.id);
        }
      }
      // this.tableSelectionData.forEach(item => {
      //   item.instanceVoList.forEach(instanceItem => {
      //     this.showLoading('正在停止服务实例:' + instanceId);
      //     await api.stopInstance(instanceId);
      //     this.hideLoading();
      //     // this.syncHandleStopInstance(instanceItem.id);
      //   });
      // });
    },
    // 是否正在进行配置
    filterDeployingSelected() {
      if (!this.deploySelected.completeDeploy) {
        this.$alert('服务【' + this.deploySelected.currentServiceCode + '】正在启动， 请稍后操作');
        return false;
      }
      return true;
    },
    async startSelected(selectData) {
      this.deploySelected.completeDeploy = false;
      for (const item of selectData) {
        let serviceCode = item.serviceCode;
        this.deploySelected.currentServiceCode = serviceCode;
        try {
          // 更新当前启动的微服务的摘要信息
          this.summaryTableData = item.instanceVoList;
          for (let instanceItem of item.instanceVoList) {
            // this.showLoading('正在停止服务实例:' + instanceItem.id);
            await api.stopInstance(instanceItem.id);
            // this.hideLoading();
            // this.syncHandleStopInstance(instanceItem.id);
          }
          this.updateStatus();
          let result = await api.startService(this.scheme.schemeId, serviceCode);
          item.instanceVoList.forEach(instanceItem => {
            this.handleConnectLog(instanceItem.id);
          });
          // 处理部署失败
          if (result.data && result.data.trim() && result.data.split(',').length > 0) {
            let failedInstanceIds = result.data.split(',');
            // 全部实例部署失败
            if (failedInstanceIds.length === item.instanceVoList.length) {
              this.$alert('服务【' + serviceCode + '】全部实例部署失败:' + result.msg);
              this.deploySelected.completeDeploy = true;
              this.deploySelected.currentServiceCode = '';
              item.microServiceStatus = this.microServiceStatus.ERROR;
              return '';
            } else {
              item.microServiceStatus = this.microServiceStatus.WARN;
            }
          } else {
            item.microServiceStatus = 'NORMAL';
          }
        } catch (e) {
          // 异常
          this.$alert('服务【' + serviceCode + '】部署发生异常,' + e);
          this.deploySelected.completeDeploy = true;
          this.deploySelected.currentServiceCode = '';
          return '';
        }
      }
      this.deploySelected.completeDeploy = true;
      this.deploySelected.currentServiceCode = '';
      return '';
      // this.$alert('服务【' + serviceCode + '】部署发生异常， 部署中止');
    },
    handleStartInstance(instanceId) {
      if (!this.filterDeployingSelected()) {
        return;
      }
      this.showLoading();
      api.startInstance(this.scheme.schemeId, this.currentRow.serviceCode, instanceId)
        .then(res => {
          this.hideLoading();
          if (res.data && res.data.trim() && res.data.split(',').length > 0) {
            this.$alert('实例启动失败：' + res.msg);
          } else {
            this.handleShowDeployLog(instanceId, true);
          }
        })
        .catch(reason => {
          this.hideLoading();
          // do nth
          console.log(reason);
        });
    },
    handleReport(item) {
      api.getInstanceConfigSingle(item.schemeId, item.serviceCode, item.id)
        .then(res => {
          this.hideLoading();
          if (res.data) {
            let reportUrl =
              'http://' +
              item.ip +
              ':' +
              res.data.microserviceConfigVo.tomcatPort +
              '/YSSUCOBRIDGE/start/report';
            window.open(reportUrl);
          }
        })
        .catch(reason => {
          this.hideLoading();
        });
    },
    handleStopInstance(instanceId) {
      if (!this.filterDeployingSelected()) {
        return;
      }
      this.showLoading('正在停止服务实例:' + instanceId);
      api.stopInstance(instanceId)
        .then(res => {
          this.hideLoading();
          this.updateStatus();
        })
        .catch(reason => {
          this.hideLoading();
          // do nth
        });
    },
    async syncHandleStopInstance(instanceId) {
      this.showLoading('正在停止服务实例:' + instanceId);
      await api.stopInstance(instanceId);
      this.hideLoading();
    },
    handleShowLogDownload({schemeName, schemeId, serviceCode, id}) {
      console.log(schemeName, schemeId, serviceCode, id);
      this.$refs.LogDownload.show(schemeName, schemeId, serviceCode, id);
    },
    handleShowDeployLog(instanceId, forceClose = false) {
      console.log(this.$refs, 'xxx');
      this.$refs[instanceId][0].isStarting = (this.deploySelected.currentServiceCode === this.summaryTableData[0].serviceCode);
      this.$refs[instanceId][0].show(forceClose);
    },
    handleConnectLog(instanceId) {
      this.$refs[instanceId][0].connect();
    },
    handleSelectionChange(val) {
      this.tableSelectionData = val;
    },
    onCurrentRowChanged() {
      this.summaryTableData = this.currentRow.instanceVoList;
      this.$nextTick(() => {
        if (this.extServiceData[this.currentRow.serviceCode] && this.extServiceData[this.currentRow.serviceCode].used) {
          this.deployMode = true;
        }
      });
    },
    handleClickTableRow(row, event, column) {
      if (!this.$refs.Panel) {
        this.currentRow = row;
        this.onCurrentRowChanged();
      } else {
        this.$refs.Panel.onSwitchService()
          .then(() => {
            this.currentRow = row;
            this.onCurrentRowChanged();
          });
      }
    },
    handleDeploy() {

    },
    tableRowClassName({row, rowIndex}) {
      if (this.currentRow && this.currentRow.serviceCode === row.serviceCode) {
        return 'warning-row';
      }
      return '';
    },
    handleMicroSettings(index, item) {
      this.$refs.MicroSettings.show();
    },
    onMicroSettings(p) {
      p.then(res => {
        this.$refs.MicroSettings.close();
        this.$refs.MicroSettings.closeLoading();
      }).catch(reason => {
        this.$refs.MicroSettings.closeLoading();
      });
    },
    handleOsgiSettings(index, item) {
      this.$refs.OsgiSettings.show([
        {
          id: 'n1',
          name: 'node1',
          ip: '192.168.4.225',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't1',
            tomcatNameCache: 'tomcat1',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/1', // tomcatDir
            tomcatName: 'tomcat1',
            version: '',
          },
        },
        {
          id: 'n2',
          name: 'node2',
          ip: '192.168.4.226',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't2',
            tomcatNameCache: 'tomcat2',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/2', // tomcatDir
            tomcatName: 'tomcat2',
            version: '',
          },
        },
        {
          id: 'n3',
          name: 'node3',
          ip: '192.168.4.227',
          agentStatus: 'up',
          singleWar: '',
          isSelected: false,
          tomcatInfo: {
            id: 't3',
            tomcatNameCache: 'tomcat3',
            editState: false,
            loadingStart: false,
            deployStatus: 'deploying', // 部署状态
            runningStatus: 'UP', // 运行状态
            tomcatDir: '/home/tomcat/3', // tomcatDir
            tomcatName: 'tomcat3',
            version: '',
          },
        },
      ]);
    },
    onOsgiSettings(p) {
      p.then(res => {
        this.$refs.OsgiSettings.close();
        this.$refs.OsgiSettings.closeLoading();
      }).catch(reason => {
        this.$refs.OsgiSettings.closeLoading();
      });
    },
    handleAddProgram(index, item) {
      this.$refs.ProgramAdd.show();
    },
    configTableSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 4 || columnIndex === 5) {
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
  /deep/ .app-switch{
    width: 176px;
    height: 32px;
    line-height: 32px;
  }
  /deep/ .switchButton{
    width: 87px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .testTable /deep/ .el-table th, .el-table td{
    padding: 0px;
  }
  .testTable .el-table th, /deep/ .el-table td{
    padding: 0px;
  }
  .app-table-header {
    height: 40px;
    background: #fafafa;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }

  .app-icon-button {
    width: 24px;
    height: 24px;
    margin: 0px 4px;
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.4);
  }
  .app-dropdown-arrow {
    display: inline-block;
    line-height: 33px;
    height: 33px;
    width: 33px;
    text-align: center;
    background-color: #3366ff;
    border: 1px solid #3366ff;
    border-left-color: white;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    color: white;
    font-weight: 400;
    font-size: 10px;
    margin-left: -1px;
    cursor: default;
    vertical-align: top;
  }
  .app-dropdown-arrow:hover{
    opacity: 0.9;
  }
  .app-dropdown-button {
    display: inline-block;
    line-height: 33px;
    height: 33px;
    width: 60px;
    text-align: center;
    background-color: #3366ff;
    border: 1px solid #3366ff;
    border-right-color: white;
    border-radius: 2px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    cursor: default;
    vertical-align: top;
  }
  .app-dropdown-button:hover{
    opacity: 0.9;
  }
  .app-icon-button:hover {
    color: rgba(41, 105, 255, 1);
  }
  .app-text-button {
    height: 33px;
    line-height: 33px;
    width: 100%;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .app-text-button:hover {
    color: rgba(41, 105, 255, 1);
  }

  .single-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 95%;
    display: inline-block;
    margin-top: 10px;
  }
</style>
<style>
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #3366ff;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 24px;
  }
</style>
