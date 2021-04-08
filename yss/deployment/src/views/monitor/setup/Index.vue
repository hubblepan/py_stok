<template>
  <div>
    <div class="app-header">开始应用部署</div>
    <el-divider></el-divider>
    <!-- 进度条 -->
    <div>
      <el-steps :active="STEP.indexOf(currentStepName)" align-center finish-status="finish" simple>
        <el-step
          @click.native="go('Upload')"
          description
          icon="el-icon-upload"
          style="cursor: pointer"
          title="上传文件"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('TomcatSettings')"
          description
          icon="el-icon-s-platform"
          style="cursor: pointer"
          title="Tomcat"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('License')"
          description
          icon="el-icon-tickets"
          style="cursor: pointer"
          title="License"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('DatabaseSettings')"
          description
          icon="el-icon-coin"
          style="cursor: pointer"
          title="数据库"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('MsgSettings')"
          description
          icon="el-icon-chat-dot-square"
          style="cursor: pointer"
          title="消息总线"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('ServiceSettings')"
          description
          icon="el-icon-notebook-2"
          style="cursor: pointer"
          title="注册中心"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
          @click.native="go('LogSettings')"
          description
          icon="el-icon-document"
          style="cursor: pointer"
          title="日志配置"
        ></el-step>
        <el-step
          :class="{noclick:noclick}"
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
        <div ref="ctn">
          <upload
          @noClickFromIndex="getnoClickFromIndex($event)"
          :noClickFromIndex="noClickFromIndex"
            @editState="getStateOfBtn(arguments)"
            @modifyTomcat="modifyTomcat"
            @modifyNode="modifyNode"
            @tcdir="handleSelectTomcat(arguments)"
            ref="Upload"
            v-show="currentStepName === 'Upload'"
          ></upload>
          <tomcat-settings
            :formData="formData.TomcatSettings"
            @editState="getStateOfBtn(arguments)"
            ref="TomcatSettings"
            v-if="currentStepName === 'TomcatSettings'"
          ></tomcat-settings>
          <license
            :formData="formData.License"
            :nodeId="nodeSelected.id"
            :tomcatId="tomcatSelected.id"
            @editState="getStateOfBtn(arguments)"
            ref="License"
            v-if="currentStepName === 'License'"
          ></license>
          <database-settings
            :formData="formData.DatabaseSettings"
            @editState="getStateOfBtn(arguments)"
            ref="DatabaseSettings"
            v-if="currentStepName === 'DatabaseSettings'"
          ></database-settings>
          <msg-settings
            :formData="formData.MsgSettings"
            @editState="getStateOfBtn(arguments)"
            ref="MsgSettings"
            v-if="currentStepName === 'MsgSettings'"
          ></msg-settings>
          <service-settings
            :formData="formData.ServiceSettings"
            @editState="getStateOfBtn(arguments)"
            ref="ServiceSettings"
            v-if="currentStepName === 'ServiceSettings'"
          ></service-settings>
          <log-settings
            :form-data="formData.LogSettings"
            @editState="getStateOfBtn(arguments)"
            ref="LogSettings"
            v-if="currentStepName === 'LogSettings'">
          </log-settings>
          <complete-success
            :tomcatDir="tomcatSelected.tomcatDir"
            @canClick="getCanClickValue($event)"
            v-if="currentStepName === 'CompleteSuccess'"
          ></complete-success>
        </div>
        <!-- 操作按钮 -->
        <!--v-if="STEP.indexOf(currentStepName) !== 0 && STEP.indexOf(currentStepName) !== STEP.length - 1"-->
        <div style="width:100%">
          <div style="text-align: center; margin-top: 60px;">
            <el-button
              :disabled="!(STEP.indexOf(currentStepName) !== 0 && STEP.indexOf(currentStepName) !== STEP.length - 1)"
              @click="prevNext('prev')"
              type="info"
              plain
              v-if="STEP.indexOf(currentStepName) !== STEP.length - 1"
              size="small"
            >上一步</el-button>
            <el-button
              :disabled="!btnIsAvailable"
              @click="prevNext('next')"
              v-if="STEP.indexOf(currentStepName) !== STEP.length - 1"
              type="primary"
              size="small"
            >下一步</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Upload from '@/views/monitor/setup/Upload';
import TomcatSettings from '@/views/monitor/setup/TomcatSettings';
import License from '@/views/monitor/setup/License';
import DatabaseSettings from '@/views/monitor/setup/DatabaseSettings';
import MsgSettings from '@/views/monitor/setup/MsgSettings';
import ServiceSettings from '@/views/monitor/setup/ServiceSettings';
import LogSettings from './LogSettings';
import CompleteSuccess from '@/views/monitor/setup/CompleteSuccess';
import * as api from '../api/node_deploy_api';

const STEP = [
  'Upload',
  'TomcatSettings',
  'License',
  'DatabaseSettings',
  'MsgSettings',
  'ServiceSettings',
  'LogSettings',
  'CompleteSuccess',
];

export default {
  name: 'Setup',
  components: {
    Upload,
    TomcatSettings,
    License,
    DatabaseSettings,
    MsgSettings,
    ServiceSettings,
    LogSettings,
    CompleteSuccess,
  },

  data() {
    return {
      noClickFromIndex: '',
      noclick: false,
      canClick: true, // 步骤条是否可以点击
      isLoading: true,
      btnIsAvailable: false, // 按钮是否可用
      STEP, // 步骤配置
      currentStepName: 'Upload',
      isEdit: false,
      nodeSelected: '',
      tomcatSelected: '',
      formData: {
        // 上传
        Upload: {
        },
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
          tomcatId: '',
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
          path: '',
          tomcatId: '',
        },
      },
    };
  },
  methods: {
    getnoClickFromIndex(data) {
      this.noclick = data;
    },
    getCanClickValue(data) {
      this.noclick = data;
      this.noClickFromIndex = data;
    },
    handleSelectTomcat(data) {
      console.log(data);
      this.tomcatSelected = data[0];
    },
    // 获取按钮状态以及是否loading
    getStateOfBtn(args) {
      this.btnIsAvailable = args[0];
      this.isLoading = args[1];
    },
    // 只供子组件初始化时调用
    initForm(resData) {
      let componentFormData = this.formData[this.currentStepName];
      Object.keys(resData).map((key) => {
        componentFormData[key] = resData[key];
      });
    },
    // 保存提交当前页面
    async saveForm() {
      // 保存全部完成后去掉ifelse
      if (
        this.currentStepName === 'DatabaseSettings' ||
        this.currentStepName === 'MsgSettings' ||
        this.currentStepName === 'TomcatSettings' ||
        this.currentStepName === 'ServiceSettings' ||
        this.currentStepName === 'LogSettings'
      ) {
        const res = await this.$refs[this.currentStepName].saveForm();
        if (res.success) {
          // this.$message.success(res.msg)
          return true;
        } else {
          this.$message.error(res.msg);
          return false;
        }
      }
      return true;
    },
    async valid(name) {
      // 校验全部完成后去掉ifelse
      let start = this.STEP.indexOf(this.currentStepName);
      let next = this.STEP[start + 1];
      let nameIndex = this.STEP.indexOf(name);
      if (this.currentStepName !== 'Upload') {
        // 完成步骤是特例，直接赋值true即可
        if (!this.formData[this.currentStepName]) {
          this.formData[this.currentStepName] = {};
          this.$refs[this.currentStepName] = { validateForm: () => true };
        }
        const ret = await this.$refs[this.currentStepName].validateForm();
        if (ret) {
          this.formData[this.currentStepName].isValid = ret;
          // 1.允许下一步
          // 2.如果在前面，直接返回true
          if (name === next || nameIndex <= start) {
            return true;
          }

          for (let i = start + 2; i < nameIndex + 1; i++) {
            let step = STEP[i];
            if (!this.formData[step].isValid || !this.formData[step]) {
              return false;
            }
          }
          return true;
        }
        return ret;
      } else {
        if (!this.tomcatSelected || !this.tomcatSelected.tomcatDir) {
          this.$message.error('请选择中间件服务器！');
          return false;
        }
        if (!this.tomcatSelected || !this.tomcatSelected.warDir) {
          this.$message.error('请选择war包！');
          return false;
        }

        this.formData[this.currentStepName].isValid = true;
        // 1.允许下一步
        // 2.如果在前面，直接返回true
        if (name === next || nameIndex <= start) {
          return true;
        }

        for (let i = start + 2; i < nameIndex + 1; i++) {
          let step = STEP[i];
          if (!this.formData[step].isValid) {
            return false;
          }
        }

        return true;
      }
    },
    async go(name) {
      if (name === this.currentStepName) {
        return false;
      }
      const valid = await this.valid(name);
      if (valid) {
        const isSaved = await this.saveForm();
        if (isSaved) {
          this.currentStepName = name;
        }
      }
    },
    async prevNext(devops) {
      const currentStep = this.STEP.indexOf(this.currentStepName);
      const newStep = devops === 'prev' ? currentStep - 1 : currentStep + 1;
      const newStepName = this.STEP[newStep];
      if (devops === 'next') {
        const valid = await this.valid(newStepName);
        if (valid) {
          const isSaved = await this.saveForm();
          if (isSaved) {
            this.currentStepName = newStepName;
          }
        }
      } else if (devops === 'prev') { // 上一步不做保存校验
        var currentStepData = this.formData[this.currentStepName];
        if (!currentStepData.isValid) { // 为空，说明是第一次进入这个步骤，可以不校验
          this.currentStepName = newStepName;
        } else { // 否则需要校验保存
          const valid = await this.valid(newStepName);
          if (valid) {
            const isSaved = await this.saveForm();
            if (isSaved) {
              this.currentStepName = newStepName;
            }
          }
        }
      }
    },
    // 清理2-6步表单
    resetTomcat(tomcat) {
      this.isEdit = false;
      this.tomcatSelected = tomcat;
      Object.keys(this.formData).forEach((key) => {
        if (key !== 'Upload') {
          let componentFormData = this.formData[key];
          Object.keys(componentFormData).forEach((_key) => {
            componentFormData[_key] = '';
          });
        }
      });
    },
    modifyNode(node) {
      if (node) {
        if (this.nodeSelected && this.nodeSelected.id === node.id) {
          return false;
        }
      }
      this.nodeSelected = node;
      this.modifyTomcat();
    },
    modifyTomcat(tomcat) {
      if (tomcat) {
        if (this.tomcatSelected && this.tomcatSelected.id === tomcat.id) {
          return false;
        }
      }
      this.resetTomcat(tomcat);

      /**
      this.$confirm('此操作将重置后续步骤填写的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.resetTomcatDir(tomcatDir)
          // this.$refs.Upload.$refs.tree.setCurrentKey(this.tomcatDir)
          // this.$message({
          //   type: 'success',
          //   message: '修改成功!',
          // })
        })
        .catch(() => {
          // this.$refs.Upload.$refs.tree.setCurrentKey(this.tomcatDir)
          return false
        })
            **/
    },

    setEdit(bool) {
      this.isEdit = bool;
    },
  },
};
</script>

<style scoped>
  .tem-step-content{
    margin: 10px 20px 20px 20px;
    border: 1px solid #dcdfe6;
    width: 1230px;
    padding: 20px 20px;
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
</style>
