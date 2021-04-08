<template>
  <div id="tem-index">

    <div style="margin:50px auto 20px auto;">
      <!--进度条-->
      <el-steps :active="STEP.indexOf(currentStepName)" align-center finish-status="finish">
        <el-step
           @click.native="go('Upload')"
          description
          icon="el-icon-upload"
          style="cursor: pointer"
          title="上传文件"
          :class="{noclick:true}"
        ></el-step>
        <el-step
           @click.native="go('Compare')"
          description
          icon="el-icon-s-platform"
          style="cursor: pointer"
          title="文件对比"
           :class="{noclick:noclickCompare}"
        ></el-step>
        <el-step
           @click.native="next('Complete')"
          description
          icon="el-icon-finished"
          style="cursor: pointer"
          title="完成"
           :class="{noclick:noclickComplete}"
        ></el-step>
      </el-steps>
      <!--显示区域-->
      <div style="margin: 40px 60px 0 60px;">
        <div ref="ctn" style="margin:50px auto 0 auto;width: 80%">
          <upgrade-merge
            ref="UpgradeMerge"
            v-if="currentStepName === 'UpgradeMerge'"
            @modifyTomcatDir="modifyTomcatDir"
            :tomcatDir="tomcatDir"
          ></upgrade-merge>
          <compare
            ref="Compare"
            v-if="currentStepName === 'Compare'"
            :tomcatDir="tomcatDir"
          ></compare>
          <complete
            ref="Complete"
            v-if="currentStepName === 'Complete'"
            :tomcatDir="tomcatDir"
          ></complete>
        </div>
        <!--操作按钮 -->
        <div style="width:95%">
          <div style="text-align: center">
            <el-button
              :disabled="!(STEP.indexOf(currentStepName) !== 0 && STEP.indexOf(currentStepName) !== STEP.length - 1)"
              @click="prev('Upload')"
              class="mt-3 mr-4"
              type="primary"
              v-if="STEP.indexOf(currentStepName) === 1"
            >上一步</el-button>
            <el-button
              :disabled="!btnIsAvailable"
              @click="next('Complete')"
              class="mt-3 ml-4"
              type="primary"
              v-if="STEP.indexOf(currentStepName) === 1"
            >下一步</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UpgradeMerge from './UpgradeMerge';
import Compare from '../upgrade/Compare';
import Complete from '../upgrade/Complete';
import * as api from '../upgrade/api';
import bus from './bus.js';
const STEP = [
  'UpgradeMerge',
  'Compare',
  'Complete',
];
export default {
  name: 'step',
  components: {
    UpgradeMerge,
    Compare,
    Complete,
  },

  data() {
    return {
      noClickFromIndex: '',
      noclick: true,
      noclickCompare: true,
      noclickComplete: false,
      canClick: false, // 步骤条是否可以点击
      isLoading: true,
      btnIsAvailable: true, // 按钮是否可用
      STEP, // 步骤配置
      currentStepName: 'UpgradeMerge',
      isEdit: false,
      tomcatDir: '',
      webSocketIP: '',
      webSocketPort: 0,
      formData: {

      },
    };
  },
  methods: {
    // 上一步
    prev(name) {
      this.currentStepName = name;
    },
    // 下一步
    next(name) {
      console.log(name);
      console.log(this.currentStepName);
      if (name === 'Complete') {
        // 获取tomcat运行状态
        api.getTomcatStatus(this.tomcatDir).then(res => {
          console.log(res);
          if (res.data === 'UP') {
            this.$message.error('tomcat正在运行中，请先停止tomcat');
            this.currentStepName = 'Compare';
          } else {
            this.currentStepName = 'Complete';
          }
        });
      }
    },
    getnoClickFromIndex(data) {
      this.noclick = data;
    },
    getCanClickValue(data) {
      this.noclick = data;
      this.noClickFromIndex = data;
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
      /**
      if (
        this.currentStepName === 'Upload' ||
        this.currentStepName === 'Compare'
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
      **/
      return true;
    },
    async valid(name) {
      // 校验全部完成后去掉ifelse
      let start = this.STEP.indexOf(this.currentStepName);
      let next = this.STEP[start + 1];
      let nameIndex = this.STEP.indexOf(name);
      // if (this.currentStepName !== 'Upload') {
      // 完成步骤是特例，直接赋值true即可
      // if (!this.formData[this.currentStepName]) {
      //   this.formData[this.currentStepName] = {};
      //   this.$refs[this.currentStepName].validateForm = () => true;
      //   this.$refs[this.currentStepName].saveForm = () => { return {success: true}; };
      // }
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
    },
    async go(name) {
      if (name === this.currentStepName) {
        return false;
      }

      if (name === 'Upload') {
        this.currentStepName = name;
      }
      if (this.currentStepName === 'Upload' && name === 'Compare') {
        // 执行 Upload 组件的 upload方法
        this.$refs[this.currentStepName].upload();
      } else if (this.currentStepName === 'Compare' && name !== 'Upload') {
        // 获取tomcat运行状态
        this.next('Complete');
        // api.getTomcatStatus({tomcatDir: this.tomcatDir}).then(res => {
        //   console.log(res);
        //   if (res.data) {
        //     this.$message.error('tomcat正在运行中，请先停止tomcat');
        //     return false;
        //   } else {
        //     this.currentStepName = name;
        //     // 执行升级
        //     // api.execute({tomcatDir: this.tomcatDir}).then(res => {
        //     //   console.log(res);
        //     // });
        //   }
        // });
      }

      // 注释了以下代码，解决了点击上一步的报错 by lgk 2020.3.28
      // const valid = await this.valid(name);
      // console.log(valid, 'valid');

      // if (valid) {
      //   const isSaved = await this.saveForm();
      //   if (isSaved) {
      //     this.currentStepName = name;
      //   }
      // }
    },
    async prevNext(devops) {
      const currentStep = this.STEP.indexOf(this.currentStepName);
      const newStep = devops === 'prev' ? currentStep - 1 : currentStep + 1;
      const newStepName = this.STEP[newStep];
      this.currentStepName = newStepName;
      /**
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
      */
    },

    setEdit(bool) {
      this.isEdit = bool;
    },

    modifyTomcatDir(tomcatDir) {
      this.tomcatDir = tomcatDir;
    },
  },
};
</script>
<style>
  .d2-theme-container-main-body {
    overflow-y: auto;
  }
  .el-step__head.is-finish {
    color: #67c23a !important;
    border-color: #67c23a !important;
  }

  .el-step__title.is-finish {
    color: #67c23a !important;
  }

  .noclick {
    pointer-events: none;
  }
</style>
<style scoped>
  /*步骤条图标变大*/
  #tem-index >>> .el-step__icon-inner[class*=el-icon]:not(.is-status){
    font-size: 44px;
  }
  #tem-index >>> .el-step__icon-inner[class*=el-icon]:not(.is-status){
    font-size: 44px;
  }
  /*步骤条横线变短*/
  #tem-index >>>  .el-step.is-center .el-step__line{
    margin: 0 40px 0 40px !important;
  }
</style>
