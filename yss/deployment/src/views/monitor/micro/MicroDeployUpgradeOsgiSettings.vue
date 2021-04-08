<template>
  <div>
    <!-- 新增服务器 -->
    <!--  <el-dialog title="OSGI配置" :visible.sync="showDialog" width="980px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>-->
    <el-tabs :tab-position="'right'" v-model="currentStepName" style="margin: 20px; float: right">
      <el-tab-pane label="License" name="License">

      </el-tab-pane>
      <el-tab-pane label="数据库" name="DatabaseSettings">

      </el-tab-pane>
      <el-tab-pane label="消息总线" name="MsgSettings">

      </el-tab-pane>
      <el-tab-pane label="注册中心" name="ServiceSettings">

      </el-tab-pane>
      <el-tab-pane label="日志配置" name="LogSettings">

      </el-tab-pane>
    </el-tabs>
    <el-steps :active="STEP.indexOf(currentStepName)" align-center finish-status="finish" simple size="mini" v-if="false">
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
    </el-steps>
    <div class="tem-step-content">

      <el-row :gutter="20" v-loading="loadingData">
        <el-col :span="10" v-for="(item, index) in formDataList" :key="index" @mouseleave.native="onMouseOut(index)" style="height: 300px; margin-top: 20px;"> <!--index === activeCard ? 16 : (index === deactiveCard ? 8 : 12)-->
          <el-card :body-style="{ padding: '0px 10px 10px 10px'}" style="margin-bottom: 20px; height: 300px; margin-top: 20px;" shadow="hover">
            <div style="height: 50px; border-bottom: 1px dotted #dcdfe6; padding: 10px; margin-bottom: 10px">
              <span style="font-size: 14px; height: 30px; line-height: 30px; margin-right: 20px">{{item.tomcatInfo.tomcatName + ' (' + item.nodeInfo.ip + ')'}}</span>
              <el-button type="success" circle size="mini" v-if="item[currentStepName].isValid" class="tip"></el-button>
            </div>
            <div ref="ctn">
              <node-license
                :formData="item.License"
                :node-id="item.nodeInfo.id"
                :tomcat-id="item.tomcatInfo.id"
                ref="License"
                v-if="currentStepName === 'License'"
              ></node-license>
              <node-database-settings
                :formData="item.DatabaseSettings"
                ref="DatabaseSettings"
                v-if="currentStepName === 'DatabaseSettings'"
              ></node-database-settings>
              <node-msg-settings
                :formData="item.MsgSettings"
                :node-ip="item.nodeInfo.ip"
                ref="MsgSettings"
                v-if="currentStepName === 'MsgSettings'"
              ></node-msg-settings>
              <node-service-settings
                :formData="item.ServiceSettings"
                ref="ServiceSettings"
                v-if="currentStepName === 'ServiceSettings'"
              ></node-service-settings>
              <node-log-settings
                :form-data="item.LogSettings"
                ref="LogSettings"
                v-if="currentStepName === 'LogSettings'">
              </node-log-settings>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--    <span slot="footer" class="dialog-footer">-->
    <el-button @click="showDialog = false" size="small">取 消</el-button>
    <el-button
      :disabled="STEP.indexOf(currentStepName) === 0"
      @click="prevNext('prev')"
      type="info"
      plain
      v-if="STEP.indexOf(currentStepName) !== 0"
      size="small"
    >上一步</el-button>
    <el-button type="primary" @click="prevNext('next')" size="small" v-if="STEP.indexOf(currentStepName) !== STEP.length - 1">下一步</el-button>
    <el-button
      :disabled="false"
      @click="handleWsConnect"
      v-if="STEP.indexOf(currentStepName) === STEP.length - 1"
      type="primary"
      size="small"
      :loading="loading"
    >执行部署</el-button>
    <!--      </span>-->
    <!--  </el-dialog>-->
  </div>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
import NodeTomcatSettings from '../nodes/NodeTomcatSettings';
import NodeLicense from '../nodes/NodeLicense';
import NodeDatabaseSettings from '../nodes/NodeDatabaseSettings';
import NodeMsgSettings from '../nodes/NodeMsgSettings';
import NodeServiceSettings from '../nodes/NodeServiceSettings';
import NodeLogSettings from '../nodes/NodeLogSettings';

const STEP = [
  'License',
  'DatabaseSettings',
  'MsgSettings',
  'ServiceSettings',
  'LogSettings',
];

export default {
  name: 'MicroDeployUpgradeOsgiSettings',
  props: ['onAdded'],
  components: {
    NodeLicense,
    NodeDatabaseSettings,
    NodeMsgSettings,
    NodeServiceSettings,
    NodeLogSettings,
  },
  created() {
    this.show([
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
  data() {
    return {
      showDialog: false,
      loading: false,
      loadingData: false,
      noclick: false,
      canClick: true, // 步骤条是否可以点击
      validMap: {
        License: false,
        DatabaseSettings: false,
        MsgSettings: false,
        ServiceSettings: false,
        LogSettings: false,
      },
      formDataList: [],
      formDataMap: {},
      tomcatIds: [],
      STEP, // 步骤配置
      currentStepName: 'License',
    };
  },
  methods: {
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
    init(nodeList) {
      this.formDataList = [];
      this.formDataMap = {};
      this.tomcatIds = [];
      // let nodeList = JSON.parse(this.$route.params.nodeList);
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
    show(nodeList) {
      this.showDialog = true;
      this.init(nodeList);
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
    onMouseOut(index) {
      console.log(arguments);
      console.log('onMouseOut:' + index);
      this.$refs[this.currentStepName][index].validateForm(valid => {
        this.formDataList[index][this.currentStepName].isValid = valid;
      });
    },
    go(name, pre = false) {
      this.currentStepName = name;
      // if (this.currentStepName === this.STEP[this.STEP.length - 1]) {
      //   this.validMap[this.currentStepName] = true;
      //   this.currentStepName = name;
      //   return;
      // }
      //
      // let saveList = {
      //   TomcatSettings: this.onSaveTomcatSettings,
      //   License: this.onSaveLicense,
      //   DatabaseSettings: this.onSaveDbSettings,
      //   MsgSettings: this.onSaveMqSettings,
      //   ServiceSettings: this.onSaveRegistrySettings,
      //   LogSettings: this.onSaveLogSettings,
      // };
      // let initList = {
      //   TomcatSettings: this.onTomcatSettings,
      //   License: this.onLicense,
      //   DatabaseSettings: this.onDbSettings,
      //   MsgSettings: this.onMqSettings,
      //   ServiceSettings: this.onRegistrySettings,
      //   LogSettings: this.onLogSettings,
      //   CompleteSuccess: this.onPreviewSettings,
      // };
      //
      // if (this.validMap[name] && pre) {
      //   this.currentStepName = name;
      //   this.$nextTick(() => {
      //     this.loadingData = true;
      //     initList[this.currentStepName]();
      //   });
      //   return;
      // }
      // if (name === 'CompleteSuccess') {
      //   this.deploySuccess = false;
      // }
      //
      // // 对当前的 步骤 执行校验， 校验通过， 则执行保存操作
      // let validAll = true;
      // console.log(this.currentStepName);
      // this.$refs[this.currentStepName].forEach((item, index) => {
      //   item.validateForm(valid => {
      //     if (!valid) {
      //       validAll = false;
      //     }
      //   }, true);
      // });
      // if (!validAll) {
      //   // 验证不通过
      //   if (this.currentStepName === 'License') {
      //     this.$message.error('存在未配置License文件的节点');
      //   }
      //   return;
      // }
      // // 保存当前步骤数据， 后去下一步骤数据
      // this.loadingData = true;
      // saveList[this.currentStepName]()
      //   .then(res => {
      //     this.loadingData = false;
      //     this.validMap[this.currentStepName] = true;
      //     this.currentStepName = name;
      //     this.$nextTick(() => {
      //       this.loadingData = true;
      //       initList[this.currentStepName]();
      //     });
      //   })
      //   .catch(reason => {
      //     this.loadingData = false;
      //     this.$message.error({message: reason});
      //   });
    },

    execAdd() {
      // this.$refs['formAddNode'].validate((valid) => {
      //   if (valid) {
      //     this.loading = true;
      //     this.onAdded(api.createNode(this.formData)); // 将请求的promise返回给调用者
      //     // show loading
      //     this.showLoading();
      //   } else {
      //     return false;
      //   }
      // });
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

  /deep/ .el-steps--simple {
    width: 95%;
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
</style>
