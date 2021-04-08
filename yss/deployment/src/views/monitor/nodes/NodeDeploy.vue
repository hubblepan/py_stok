<template>
  <d2-container>
    <div>
      <div class="app-header">开始应用部署</div>
      <el-divider></el-divider>
      <!-- 进度条 -->
      <div>
        <el-steps :active="STEP.indexOf(currentStepName)" align-center finish-status="finish" simple>
          <el-step
            :class="{noclick:!validMap.TomcatSettings}"
            @click.native="go('TomcatSettings')"
            description
            icon="el-icon-s-platform"
            style="cursor: pointer"
            title="Tomcat"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.License}"
            @click.native="go('License')"
            description
            icon="el-icon-tickets"
            style="cursor: pointer"
            title="License"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.DatabaseSettings}"
            @click.native="go('DatabaseSettings')"
            description
            icon="el-icon-coin"
            style="cursor: pointer"
            title="数据库"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.MsgSettings}"
            @click.native="go('MsgSettings')"
            description
            icon="el-icon-chat-dot-square"
            style="cursor: pointer"
            title="消息总线"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.ServiceSettings}"
            @click.native="go('ServiceSettings')"
            description
            icon="el-icon-notebook-2"
            style="cursor: pointer"
            title="注册中心"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.LogSettings}"
            @click.native="go('LogSettings')"
            description
            icon="el-icon-document"
            style="cursor: pointer"
            title="日志配置"
          ></el-step>
          <el-step
            :class="{noclick:!validMap.CompleteSuccess}"
            @click.native="go('CompleteSuccess')"
            description
            icon="el-icon-finished"
            style="cursor: pointer"
            title="完成"
          ></el-step>
        </el-steps>
        <el-progress :percentage="100" :format="percentage=>{''}" :stroke-width="2" style="margin: -10px 20px 0px 20px; width: 1280px;"></el-progress>
        <!--      <div style="border-bottom: dotted; border-bottom-color: rgba(0, 0, 0, 0.2); border-bottom-width: 1px; margin: 0 20px;"/>-->
        <!-- 显示区域 -->
        <div class="tem-step-content">
          <div style="margin: 0 0 15px 20px;"  v-if="currentStepName === 'ServiceSettings'">
            <el-radio-group v-model="zkCluster" @change="onZkClusterChanged">
              <el-radio :label="zkClusterType.normal">默认</el-radio>
              <el-radio :label="zkClusterType.inner">内部集群</el-radio>
              <el-radio :label="zkClusterType.outer">外部集群</el-radio>
              <el-radio :label="zkClusterType.self">独立部署</el-radio>
            </el-radio-group>
          </div>
          <div style="margin: 0 0 15px 20px;"  v-if="currentStepName === 'MsgSettings'">
            <el-checkbox v-model="mqCluster" @change="onMqClusterChanged">集群配置</el-checkbox>
          </div>
          <el-row :gutter="20" v-if="currentStepName !== 'CompleteSuccess' && showCard" v-loading="loadingData">
            <el-col :span="12" v-for="(item, index) in formDataList" :key="index" @mouseleave.native="onMouseOut(index)"> <!--index === activeCard ? 16 : (index === deactiveCard ? 8 : 12)-->
              <el-card :body-style="{ padding: '0px 10px 10px 10px'}" style="margin-bottom: 20px" shadow="hover" v-show="!hideSettingsChard(index)">
                <div  @click="handleChangeCard(index)" style="height: 50px; border-bottom: 1px dotted #dcdfe6; padding: 10px; margin-bottom: 10px">
                  <span style="font-size: 14px; height: 30px; line-height: 30px; margin-right: 20px">{{item.tomcatInfo.tomcatName + ' (' + item.nodeInfo.ip + ')'}}</span>
                  <el-button type="success" circle size="mini" v-if="item[currentStepName].isValid" class="tip"></el-button>
                  <!--                <div style="float: right; margin-left: 10px;">-->
                  <!--                  <el-tooltip class="item" effect="dark" content="移除节点" placement="top-start">-->
                  <!--                    <el-button circle size="mini" icon="el-icon-close" @click="handleRemoveCard(index, item)"></el-button>-->
                  <!--                  </el-tooltip>-->
                  <!--                </div>-->
<!--                  <div style="float: right" v-if="index === 0">-->
<!--                    <el-tooltip class="item" effect="dark" content="同步到所有节点" placement="top-start" v-if="currentStepName !== 'License'">-->
<!--                      <el-button circle size="mini" icon="el-icon-refresh" @click="handleSyncAllCard(index)"></el-button>-->
<!--                    </el-tooltip>-->
<!--                  </div>-->
                </div>
                <div ref="ctn"  @click="handleChangeCard(index)">
                  <NodeTomcatSettings
                    :formData="item.TomcatSettings"
                    :node-id="item.tomcatInfo.id"
                    @editState="getStateOfBtn(arguments)"
                    ref="TomcatSettings"
                    v-if="currentStepName === 'TomcatSettings'"
                  ></NodeTomcatSettings>
                  <node-license
                    :formData="item.License"
                    :node-id="item.nodeInfo.id"
                    :tomcat-id="item.tomcatInfo.id"
                    @editState="getStateOfBtn(arguments)"
                    ref="License"
                    v-if="currentStepName === 'License'"
                  ></node-license>
                  <node-database-settings
                    :formData="item.DatabaseSettings"
                    @editState="getStateOfBtn(arguments)"
                    ref="DatabaseSettings"
                    v-if="currentStepName === 'DatabaseSettings'"
                  ></node-database-settings>
                  <node-msg-settings
                    :formData="item.MsgSettings"
                    :node-ip="item.nodeInfo.ip"
                    @editState="getStateOfBtn(arguments)"
                    ref="MsgSettings"
                    v-if="currentStepName === 'MsgSettings'"
                  ></node-msg-settings>
                  <node-service-settings
                    :formData="item.ServiceSettings"
                    @editState="getStateOfBtn(arguments)"
                    ref="ServiceSettings"
                    v-if="currentStepName === 'ServiceSettings'"
                  ></node-service-settings>
                  <node-log-settings
                    :form-data="item.LogSettings"
                    @editState="getStateOfBtn(arguments)"
                    ref="LogSettings"
                    v-if="currentStepName === 'LogSettings'">
                  </node-log-settings>
                  <!--                <node-complete-success-->
                  <!--                  :tomcatDir="tomcatDir"-->
                  <!--                  :data="item.CompleteSuccess"-->
                  <!--                  @canClick="getCanClickValue($event)"-->
                  <!--                  v-if="currentStepName === 'CompleteSuccess'"-->
                  <!--                  ref="CompleteSuccess"-->
                  <!--                  @resetTomcatDir="resetTomcatDir"-->
                  <!--                ></node-complete-success>-->
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!--分布式情况下， 消息总线和注册中心配置-->
          <div v-if="distributed">
            <node-msg-settings-dist
              :formData="item.MsgSettings"
              :node-ip="item.nodeInfo.ip"
              @editState="getStateOfBtn(arguments)"
              ref="MsgSettingsDist"
              v-if="currentStepName === 'MsgSettings'"
            ></node-msg-settings-dist>
            <node-service-settings-dist
              :formData="item.ServiceSettings"
              @editState="getStateOfBtn(arguments)"
              ref="ServiceSettingsDist"
              v-if="currentStepName === 'ServiceSettings'"
            ></node-service-settings-dist>
          </div>
          <div v-if="currentStepName === 'CompleteSuccess'">
            <el-table class="d2-ml" v-loading="loadingPreviewData"
                      :data="formDataList" border style="width: 98%"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
              <el-table-column
                prop="nodeName"
                label="节点名称"
                width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.nodeInfo.name}}</span>
                  <br/>
                  <span>{{'(' + scope.row.nodeInfo.ip + ')'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="tomcat名称"
                width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.tomcatInfo.tomcatName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CompleteSuccess.tomcatConfigVo.dir"
                label="tomcat地址">
              </el-table-column>
              <el-table-column align="center" label="部署结果" min-width="240" width="240">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.deployResult === 1">部署成功</el-tag>
                  <el-tag type="success" v-if="scope.row.deployResult === -1">部署失败</el-tag>
                  <el-tag type="success" v-if="scope.row.deployResult === 0">未部署</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="240" width="240">
                <template slot-scope="scope">
                  <el-button @click="handlePreviewSettings(scope.$index, scope.row)" size="mini" type="danger" plain>预览</el-button>
                  <el-button @click="handlePreviewLog(scope.$index, scope.row)" size="mini" type="info">日志</el-button>
                  <el-button @click="handleReport(scope.$index, scope.row)" size="mini" type="success" :disabled="scope.row.CompleteSuccess.tomcatType === 'SPECIAL' || !deploySuccess">报告</el-button>
                </template>
              </el-table-column>
            </el-table>
            <node-complete-deploy v-for="item in formDataList" :data="item.CompleteSuccess" :connectInfo="item.connectInfo" :key="item.nodeInfo.id" :tomcat-dir="''" ref="nodeCompleteDeploy"></node-complete-deploy>
          </div>
          <!-- 操作按钮 -->
          <!--v-if="STEP.indexOf(currentStepName) !== 0 && STEP.indexOf(currentStepName) !== STEP.length - 1"-->
          <div style="width:100%">
            <div style="text-align: center; margin-top: 60px;">
              <el-button
                :disabled="STEP.indexOf(currentStepName) === 0"
                @click="prevNext('prev')"
                type="info"
                plain
                v-if="STEP.indexOf(currentStepName) !== STEP.length - 1"
                size="small"
              >上一步</el-button>
              <el-button
                :disabled="false"
                @click="prevNext('next')"
                v-if="STEP.indexOf(currentStepName) !== STEP.length - 1"
                type="primary"
                size="small"
              >下一步</el-button>

              <el-button
                :disabled="false"
                @click="handleWsConnect"
                v-if="STEP.indexOf(currentStepName) === STEP.length - 1 && !deploySuccess"
                type="primary"
                size="small"
                :loading="loadingDeploy"
              >执行部署</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </d2-container>

</template>
<script>

import NodeTomcatSettings from './NodeTomcatSettings';
import NodeLicense from './NodeLicense';
import NodeDatabaseSettings from './NodeDatabaseSettings';
import NodeMsgSettings from './NodeMsgSettings';
import NodeServiceSettings from './NodeServiceSettings';
import NodeLogSettings from './NodeLogSettings';
import NodeCompleteSuccess from './NodeCompleteSuccess';
import NodeCompleteDeploy from './NodeCompleteDeploy';
import * as api from '../api/node_deploy_api';
import CompleteSuccess from '../setup/CompleteSuccess';
import NodeMsgSettingsDist from './NodeMsgSettingsDist';
import NodeServiceSettingsDist from './NodeServiceSettingsDist';

const STEP = [
  'TomcatSettings',
  'License',
  'DatabaseSettings',
  'MsgSettings',
  'ServiceSettings',
  'LogSettings',
  'CompleteSuccess',
];

export default {
  name: 'NodeDeploy',
  components: {
    NodeCompleteDeploy,
    NodeLicense,
    NodeTomcatSettings,
    NodeDatabaseSettings,
    NodeMsgSettings,
    NodeServiceSettings,
    NodeLogSettings,
    NodeMsgSettingsDist,
    NodeServiceSettingsDist,
  },
  computed: {
    showCard() {
      if (!this.distributed) {
        return true;
      } else {
        // 分布式下
        if (this.currentStepName === 'MsgSettings' || this.currentStepName === 'ServiceSettings') {
          return false;
        }
        return true;
      }
    },
  },
  mounted() {
    this.formDataList = [];
    this.formDataMap = {};
    let nodeList = JSON.parse(this.$route.params.nodeList);
    nodeList.forEach((item, index) => {
      this.tomcatIds.push(item.tomcatInfo.id);
      let formData = {
        nodeInfo: item,
        tomcatInfo: item.tomcatInfo,
        // 消息总线配置
        MsgSettings: {
          isValid: false,
          ip: '',
          ipList: [],
          port: '',
          brokerName: '',
          messageStoreDir: '',
          brokerPort: '',
          description: '',
          mqAddress: '',
          tomcatId: '',
          isAdvance: false,
        },
        // 数据库配置
        DatabaseSettings: {
          isValid: false,
          dbIp: '',
          dbPort: '',
          dbName: '',
          advanceDbUrl: '',
          userName: '',
          password: '',
          description: '',
          tomcatId: '',
          isAdvance: false,
        },
        // tomcat 功能完成后置空！
        TomcatSettings: {
          isValid: false,
          port: '',
          memorySize: '',
          ip: '',
          dir: '',
          appDir: '',
          appConfigDir: '',
          tomcatId: '',
        },
        // license
        License: {
          isValid: false,
          path: '',
        },
        // 服务注册中心配置
        ServiceSettings: {
          isValid: false,
          port: '',
          dataStoreDir: '',
          ip: '',
          cluster: false,
          type: '',
          outsideZkAddr: '',
        },
        // 日志配置
        LogSettings: {
          isValid: false,
          path: '',
          tomcatDir: '',
          tomcatId: '',
        },
        CompleteSuccess: {
          isValid: true,
          dbConfigVo: {
            advanceDbUrl: 'advanceDbUrl',
            dbIp: 'dbIp',
            dbName: 'dbName',
            dbPort: 0,
            description: 'description',
            password: 'password',
            tomcatDir: 'tomcatDir',
            tomcatId: 'tomcatId',
            userName: 'userName',
          },
          expectMemory: 0,
          licenseDir: 'licenseDir',
          logConfigVo: {
            path: 'path',
            tomcatDir: 'tomcatDir',
            tomcatId: 'tomcatId',
          },
          mqConfigVo: {
            brokerName: 'brokerName',
            brokerPort: 0,
            description: 'description',
            ip: 'ip',
            ipList: [],
            messageStoreDir: 'messageStoreDir',
            mqAddress: 'mqAddress',
            port: 0,
            tomcatDir: 'tomcatDir',
            tomcatId: 'tomcatId',
          },
          registryCenterConfigVo: {
            dataStoreDir: 'dataStoreDir',
            description: 'description',
            port: 0,
            tomcatDir: 'tomcatDir',
            tomcatId: 't1',
          },
          tomcatConfigVo: {
            appConfigDir: 'appConfigDir',
            appDir: 'appDir',
            description: 'description',
            dir: 'dir',
            ip: 'ip',
            memorySize: 0,
            port: 0,
            tomcatId: 't1',
          },
          socketPort: 0,
          tomcatId: 't1',
          tomcatType: 'tomcatType1',
          wareDir: 'wareDir1',
        },
        connectInfo: {
          tomcatPort: 0,
          ip: '',
          socketPort: 0,
          tomcatId: '',
        },
        deployResult: 0,
      };
      this.formDataList.push(formData);
      this.formDataMap[item.tomcatInfo.id] = formData;
    });
    this.$nextTick(function () {
      this.onTomcatSettings();
    });
  },
  data() {
    return {
      distributed: false, // 分布式配置
      tomcatIds: [],
      activeCard: 0,
      deactiveCard: 1,
      activeNames: ['1', '2'],
      noClickFromIndex: '',
      noclick: false,
      canClick: true, // 步骤条是否可以点击
      isLoading: true,
      btnIsAvailable: false, // 按钮是否可用
      STEP, // 步骤配置
      currentStepName: 'TomcatSettings',
      isEdit: false,
      tomcatDir: '',
      warDir: '',
      loadingData: false,
      loadingPreviewData: false,
      formDataList: [],
      formDataMap: {},
      zkClusterType: {
        normal: 'alone',
        inner: 'cluster',
        outer: 'outside',
        self: 'deploy',
      },
      zkCluster: 'alone',
      mqCluster: false,
      validMap: {
        TomcatSettings: false,
        License: false,
        DatabaseSettings: false,
        MsgSettings: false,
        ServiceSettings: false,
        LogSettings: false,
        CompleteSuccess: false,
      },
      deploySuccess: false,
      loadingDeploy: false,
    };
  },
  methods: {
    hideSettingsChard(cardIndex) {
      return cardIndex !== 0 && this.currentStepName === 'ServiceSettings' && this.zkCluster !== this.zkClusterType.normal && this.zkCluster !== this.zkClusterType.inner;
    },
    onZkClusterChanged(val) {
      for (let tomcatId in this.formDataMap) {
        this.formDataMap[tomcatId].ServiceSettings.type = val;
        this.formDataMap[tomcatId].ServiceSettings.cluster = val !== this.zkClusterType.normal;
        this.formDataMap[tomcatId].ServiceSettings.ip = this.formDataMap[tomcatId].nodeInfo.ip;
      }
    },
    onMqClusterChanged(val) {
      // console.log('xxxxx', val);
      for (let tomcatId in this.formDataMap) {
        this.formDataMap[tomcatId].MsgSettings.isAdvance = val;
        // this.formDataMap[tomcatId].MsgSettings.ip = this.formDataMap[tomcatId].nodeInfo.ip;
      }
      this.$refs.MsgSettings.forEach(msgSettingsVue => {
        msgSettingsVue.onAdvanceChanged(val);
      });
    },
    // 获取所有的 tomcat 配置，并更新
    onTomcatSettings() {
      api.getTomcatConfig(this.tomcatIds)
        .then(res => {
          this.loadingData = false;
          // 将tomcat 配置列表更新到每个Tomcat card界面
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].TomcatSettings, item);
            }
          });
          // 对每个 TomcatSettings 组件 执行校验，触发 绿点提示
          this.$refs.TomcatSettings.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['TomcatSettings'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          // do nothings
          this.loadingData = false;
        });
    },
    // 保存修改的Tomcat配置
    onSaveTomcatSettings() {
      let tomcatSettingList = [];
      this.formDataList.forEach((item, index) => {
        tomcatSettingList.push(item.TomcatSettings);
      });
      return api.saveTomcatConfig(tomcatSettingList);
    },
    onLicense() {
      api.getLicenseConfig(this.tomcatIds)
        .then(res => {
          // 将tomcat 配置列表更新到每个Tomcat card界面
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].License, item);
            }
          });
          // 对每个 License 组件 执行校验，触发 绿点提示
          this.$refs.License.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['License'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          this.loadingData = false;
          // do nothings
        });
    },
    onSaveLicense() {
      return new Promise(function(resolve, reject) {
        let valid = true;
        let error = 'Lisence 文件错误';
        if (valid) {
          resolve({
            code: 'SUCCESS',
            msg: 'string',
            success: true,
          });
        } else {
          reject(error);
        }
      });
    },
    // 获取所有的 消息总线配置，并更新
    onMqSettings() {
      api.getMQConfig(this.tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].MsgSettings, item);
              let mqAddress = this.formDataMap[item.tomcatId].DatabaseSettings.mqAddress;
              if (mqAddress && mqAddress !== '') {
                this.formDataMap[item.tomcatId].DatabaseSettings.isAdvance = true;
              } else {
                this.formDataMap[item.tomcatId].DatabaseSettings.isAdvance = false;
              }
            }
          });
          // 对每个 MsgSettings 组件 执行校验，触发 绿点提示
          this.$refs.MsgSettings.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['MsgSettings'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          this.loadingData = false;
          // do notings
        });
    },
    // 保存修改MQ配置
    onSaveMqSettings() {
      let mqSettingList = [];
      this.$refs.MsgSettings.forEach((item, index) => {
        mqSettingList.push(item.getFormData());
      });
      return api.saveMQConfig(mqSettingList);
    },

    // 获取所有的 数据库配置，并更新
    onDbSettings() {
      // this.loadingData = true;
      api.getDBConfig(this.tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].DatabaseSettings, item);
              let advanceDbUrl = this.formDataMap[item.tomcatId].DatabaseSettings.advanceDbUrl;
              if (advanceDbUrl && advanceDbUrl !== '') {
                this.formDataMap[item.tomcatId].DatabaseSettings.isAdvance = true;
              } else {
                this.formDataMap[item.tomcatId].DatabaseSettings.isAdvance = false;
              }
            }
          });

          // 对每个 DatabaseSettings 组件 执行校验，触发 绿点提示
          this.$refs.DatabaseSettings.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['DatabaseSettings'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          // do nothings
          this.loadingData = false;
        });
    },

    // 保存修改数据库配置
    onSaveDbSettings() {
      let dbSettingList = [];
      this.$refs.DatabaseSettings.forEach((item, index) => {
        dbSettingList.push(item.getFormData());
      });
      // this.formDataList.forEach((item, index) => {
      //   dbSettingList.push(item.DatabaseSettings);
      // });
      return api.saveDBConfig(dbSettingList);
    },
    // 获取所有的 注册中心配置，并更新
    onRegistrySettings() {
      api.getRegistryConfig(this.tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].ServiceSettings, item);
              if (this.zkCluster === this.zkClusterType.normal) {
                this.formDataMap[item.tomcatId].ServiceSettings.type = this.zkCluster;
              }
            }
          });
          // 对每个 ServiceSettings 组件 执行校验，触发 绿点提示
          this.$refs.ServiceSettings.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['ServiceSettings'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          this.loadingData = false;
          // do nothings
        });
    },
    // 保存修注册中心配置
    onSaveRegistrySettings() {
      if (this.zkCluster !== this.zkClusterType.normal) {
        this.onZkClusterChanged(this.zkCluster);
        // 独立部署 拼接 outsideZkAddr 路径
        if (this.zkCluster === this.zkClusterType.self) {
          this.formDataList.forEach((item, index) => {
            item.ServiceSettings.outsideZkAddr = item.ServiceSettings.ip + ':' + item.ServiceSettings.port;
          });
        }
        // 独立部署 和 外部部署 的 其他Tomcat 和 一个Tomcat 参数一致
        if (this.zkCluster !== this.zkClusterType.inner) {
          for (let i = 1; i < this.formDataList.length; i++) {
            this.formDataList[i].ServiceSettings.outsideZkAddr = this.formDataList[0].ServiceSettings.outsideZkAddr;
            this.formDataList[i].ServiceSettings.port = this.formDataList[0].ServiceSettings.port;
          }
        }
      }
      let registrySettingList = [];
      this.formDataList.forEach((item, index) => {
        registrySettingList.push(item.ServiceSettings);
      });
      console.log('xxx', registrySettingList);
      return api.saveRegistryConfig(registrySettingList);
    },
    // 获取所有的 日志配置，并更新
    onLogSettings() {
      api.getLogConfig(this.tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].LogSettings, item);
            }
          });

          // 对每个 LogSettings 组件 执行校验，触发 绿点提示
          this.$refs.LogSettings.forEach((item, index) => {
            item.validateForm(valid => {
              this.formDataList[index]['LogSettings'].isValid = valid;
            });
          });
        })
        .catch(reason => {
          this.loadingData = false;
          // do nothings
        });
    },
    // 保存修改日志配置
    onSaveLogSettings() {
      let logSettingList = [];
      this.formDataList.forEach((item, index) => {
        logSettingList.push(item.LogSettings);
      });
      return api.saveLogConfig(logSettingList);
    },
    // 获取所有节点配置预览
    onPreviewSettings() {
      this.loadingPreviewData = true;
      this.loadingData = false;
      api.previewAllConfig(this.tomcatIds)
        .then(res => {
          this.loadingPreviewData = false;
          res.data.forEach((item, index) => {
            if (this.formDataMap[item.tomcatId]) {
              Object.assign(this.formDataMap[item.tomcatId].CompleteSuccess, item);
            }
          });
        })
        .catch(reason => {
          this.loadingPreviewData = false;
          // do nothings
        });
    },
    handlePreviewSettings(index, item) {
      // do nothings
      this.$refs.nodeCompleteDeploy[index].show();
    },
    handlePreviewLog(index, item) {
      // do nothings
      this.$refs.nodeCompleteDeploy[index].showLogPage();
    },
    handleReport(index, item) {
      window.open(
        'http://' +
        item.CompleteSuccess.tomcatConfigVo.ip +
        ':' +
        item.CompleteSuccess.tomcatConfigVo.port +
        '/YSSUCOBRIDGE/start/report');
    },
    onMouseOut(index) {
      console.log('onMouseOut:' + index);
      this.$refs[this.currentStepName][index].validateForm(valid => {
        this.formDataList[index][this.currentStepName].isValid = valid;
      });
    },
    handleChangeCard(index) {
      this.activeCard = index;
      if (index % 2 === 0) {
        // 第一列
        this.deactiveCard = index + 1;
      } else {
        this.deactiveCard = index - 1;
      }
    },
    // handleRemoveCard(index, item) {
    //   this.formDataList.splice(index, 1);
    //   this.tomcatIds.splice(index, 1);
    //   this.formDataMap[item.tomcatId] = null;
    // },
    handleSyncAllCard(index) {
      // 获取当前的 currentName
      let template = this.formDataList[0][this.currentStepName];
      // 赋值
      this.formDataList.forEach((item, index) => {
        if (index > 0) {
          Object.assign(item[this.currentStepName], template);
        }
      });
      // 触发一次验证
      this.$refs[this.currentStepName].forEach((item, index) => {
        item.validateForm(valid => {});
      });
    },
    // 获取按钮状态以及是否loading
    getStateOfBtn(args) {
      this.btnIsAvailable = args[0];
      this.isLoading = args[1];
    },

    go(name, pre = false) {
      if (this.currentStepName === this.STEP[this.STEP.length - 1]) {
        this.validMap[this.currentStepName] = true;
        this.currentStepName = name;
        return;
      }

      let saveList = {
        TomcatSettings: this.onSaveTomcatSettings,
        License: this.onSaveLicense,
        DatabaseSettings: this.onSaveDbSettings,
        MsgSettings: this.onSaveMqSettings,
        ServiceSettings: this.onSaveRegistrySettings,
        LogSettings: this.onSaveLogSettings,
      };
      let initList = {
        TomcatSettings: this.onTomcatSettings,
        License: this.onLicense,
        DatabaseSettings: this.onDbSettings,
        MsgSettings: this.onMqSettings,
        ServiceSettings: this.onRegistrySettings,
        LogSettings: this.onLogSettings,
        CompleteSuccess: this.onPreviewSettings,
      };

      if (this.validMap[name] && pre) {
        this.currentStepName = name;
        this.$nextTick(() => {
          this.loadingData = true;
          initList[this.currentStepName]();
        });
        return;
      }
      if (name === 'CompleteSuccess') {
        this.deploySuccess = false;
      }

      // 对当前的 步骤 执行校验， 校验通过， 则执行保存操作
      let validAll = true;
      console.log(this.currentStepName);
      this.$refs[this.currentStepName].forEach((item, index) => {
        item.validateForm(valid => {
          if (!valid) {
            validAll = false;
          }
        }, true);
      });
      if (!validAll) {
        // 验证不通过
        if (this.currentStepName === 'License') {
          this.$message.error('存在未配置License文件的节点');
        }
        return;
      }
      // 保存当前步骤数据， 后去下一步骤数据
      this.loadingData = true;
      saveList[this.currentStepName]()
        .then(res => {
          this.loadingData = false;
          this.validMap[this.currentStepName] = true;
          this.currentStepName = name;
          this.$nextTick(() => {
            this.loadingData = true;
            initList[this.currentStepName]();
          });
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
        });
    },
    prevNext(devops) {
      const currentStep = this.STEP.indexOf(this.currentStepName);
      const newStep = devops === 'prev' ? currentStep - 1 : currentStep + 1;
      const newStepName = this.STEP[newStep];
      // 下一步
      if (devops === 'next') {
        this.go(newStepName);
      } else if (devops === 'prev') {
        // 上一步
        this.go(newStepName, true);
      }
    },
    handleWsConnect() {
      api.connectInfo(this.tomcatIds)
        .then(res => {
          res.data.forEach((item, index) => {
            Object.assign(this.formDataMap[item.tomcatId].connectInfo, item);
          });
          this.handleDeploy();
        })
        .catch(reason => {
          this.$message.error({message: '获取连接信息失败'});
        });
    },
    // 执行部署
    handleDeploy() {
      this.loadingDeploy = true;
      this.$refs.nodeCompleteDeploy.forEach((item, index) => {
        item.connect();
      });
      api.deployAll(this.tomcatIds)
        .then(res => {
          this.loadingDeploy = false;
          this.deploySuccess = true;
          // 不可以点击步骤条l
          for (let item of Object.keys(this.validMap)) {
            this.validMap[item] = false;
          }
          if (res.data && res.data.failIdList) {
            this.formDataList.forEach((item, index) => {
              item.deployResult = 1;
            });
            res.data.failIdList.forEach((item, index) => {
              this.formDataMap[item].deployResult = -1;
            });
          } else {
            res.data.forEach((item, index) => {
              if (this.formDataMap[item.tomcatId]) {
                this.formDataMap[item.tomcatId].deployResult = 1;
                Object.assign(this.formDataMap[item.tomcatId].CompleteSuccess, item);
              }
            });
          }
        })
        .catch(reason => {
          this.loadingDeploy = false;
          console.log(reason);
          this.$message.error({message: reason});
          this.formDataList.forEach((item, index) => {
            item.deployResult = -1;
            this.$alert('部分节点部署存在失败', {type: 'error'});
          });
        });
    },
    // 清理2-6步表单
    resetTomcatDir(tomcatDir) {
      this.isEdit = false;
      this.tomcatDir = tomcatDir;
      Object.keys(this.formData).forEach((key) => {
        if (key !== 'Upload') {
          let componentFormData = this.formData[key];
          Object.keys(componentFormData).forEach((_key) => {
            componentFormData[_key] = '';
          });
        }
      });
    },

    modifyTomcatDir(tomcatDir) {
      if (this.tomcatDir === tomcatDir) {
        return false;
      }
      if (!this.tomcatDir) {
        this.resetTomcatDir(tomcatDir);
        return false;
      }

      // 判断是否填写过
      if (!this.isEdit) {
        this.resetTomcatDir(tomcatDir);
        // this.$refs.Upload.$refs.tree.setCurrentKey(this.tomcatDir)
      }

      this.resetTomcatDir(tomcatDir);
    },

    setEdit(bool) {
      this.isEdit = bool;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-radio__label{
    display: inline;
  }
  .tem-step-content{
    margin: 10px 20px 20px 20px;
    border: 1px solid #dcdfe6;
    width: 100%;
    padding: 20px 30px 20px 20px;
  }
  /deep/ .el-steps--simple {
    width: 1280px;
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
  }

  /deep/ .el-step.is-simple:not(:last-of-type) .el-step__title {
    width: 55%;
    max-width: 55%;
    font-size: 14px;
  }

  /deep/ .el-divider--horizontal {
    margin: 0px 0px;
    padding: 0px;
  }

  .noclick {
    pointer-events: none;
  }
  .app-header {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
  }

  /deep/ .el-button--mini.is-circle {
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
  }
</style>
