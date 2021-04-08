<template>
  <el-dialog :title="title" :visible.sync="showDialog" width="715px" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="Basic">
        <el-form label-position="left" label-width="80px" :model="sceneVo" style="height: 120px;" ref="formMain">
          <el-form-item label="场景名称:" prop="name">
            <el-input v-model="sceneVo.name" placeholder="场景名称" style="width: 300px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label="预警邮箱:" prop="email">
            <el-input v-model="sceneVo.mailConfig.mailAddress" placeholder="邮件地址" style="width: 300px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label="场景描述:" prop="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3}"
              placeholder="请输入场景描述"
              style="width: 300px;"
              v-model="sceneVo.description">
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="分析指标" name="Analysis">
        <scene-analysis-settings ref="SceneAnalysisSettings" v-if="showDialog" :analysis-metrics="sceneVo.analysisMetricsVos"></scene-analysis-settings>
      </el-tab-pane>
      <el-tab-pane label="触发指标" name="Trigger">
        <scene-trigger-settings ref="SceneTriggerSettings" v-if="showDialog" :trigger-data="sceneVo.triggerMetricsVos"></scene-trigger-settings>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="info" @click="execPre" size="small" v-if="false" plain>上一步</el-button>
        <el-button type="primary" @click="execNext" size="small">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import SceneAnalysisSettings from './SceneAnalysisSettings';
import SceneTriggerSettings from './SceneTriggerSettings';
import * as api from '../api/scene_api';
const STEP = [
  'Basic',
  'Analysis',
  'Trigger',
  // 'Server',
];
export default {
  name: 'SceneUpdate',
  components: {SceneAnalysisSettings, SceneTriggerSettings},
  props: ['onUpdate'],
  data() {
    return {
      showDialog: false,
      loading: false,
      activeName: 'Basic',
      sceneVo: {
        mailConfig: {mailAddress: ''},
      },
      title: '',
      mailAddress: '',
    };
  },
  methods: {
    show(sceneVo) {
      this.activeName = 'Basic';
      if (!sceneVo.mailConfig) {
        sceneVo.mailConfig = {mailAddress: ''};
      }
      this.sceneVo = sceneVo;
      this.title = '场景修改';
      this.$nextTick(() => {
        this.showDialog = true;
      });
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },

    execPre() {
      let currentStep = STEP.indexOf(this.activeName);
      if (currentStep !== 0) {
        this.activeName = STEP[currentStep - 1];
      }
    },
    execNext() {
      this.loading = true;
      this.sceneVo.analysisMetricsVos = this.$refs.SceneAnalysisSettings.getFormData();
      this.sceneVo.triggerMetricsVos = this.$refs.SceneTriggerSettings.getFormData();
      this.onUpdate(api.updateScene(this.sceneVo));
      // let currentStep = STEP.indexOf(this.activeName);
      // if (currentStep !== STEP.length - 1) {
      //   this.activeName = STEP[currentStep + 1];
      // } else {
      //   this.loading = true;
      //   this.sceneVo.analysisMetricsVos = this.$refs.SceneAnalysisSettings.getFormData();
      //   this.sceneVo.triggerMetricsVos = this.$refs.SceneTriggerSettings.getFormData();
      //   this.onUpdate(api.updateScene(this.sceneVo));
      // }
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
    padding: 20px 20px;
  }
</style>
