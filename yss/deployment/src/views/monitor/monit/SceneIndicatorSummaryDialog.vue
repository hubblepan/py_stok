<template>
  <el-dialog :title="title" :visible.sync="showDialog" width="70%"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <scene-indicator-summary ref="IndicatorSummary" v-if="showDialog" :prop-tags="propTags" :prop-metrics-vo="propMetricsVo" :prop-application-id="propApplicationId" :prop-scene-id="propSceneId" :prop-big-mode="'2'"></scene-indicator-summary>
  </el-dialog>
</template>

<script>
import SceneIndicatorSummary from './SceneIndicatorSummary';
export default {
  name: 'SceneIndicatorSummaryDialog',
  components: { SceneIndicatorSummary },
  data() {
    return {
      title: '',
      showDialog: false,
      loading: false,
      propMetricsVo: null,
      propApplicationId: '',
      propTags: '',
      propSceneId: '',
    };
  },
  methods: {
    show(propMetricsVo, propApplicationId, propTags, propSceneId) {
      this.showDialog = true;
      this.propMetricsVo = propMetricsVo;
      this.propApplicationId = propApplicationId;
      this.propTags = propTags;
      this.propSceneId = propSceneId;
      this.title = this.propMetricsVo.metricsName;
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
  }
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
