<template>
  <div>
    <el-dialog title="场景配置" :visible.sync="showDialog" width="715px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-tabs v-model="activeName">
        <el-tab-pane label="场景注册" name="Upload" :disabled="activeName !== 'Upload'">
          <scene-upload-settings ref="SceneUploadSettings"></scene-upload-settings>
        </el-tab-pane>
        <el-tab-pane label="关联指标" name="Indicator" :disabled="activeName !== 'Indicator'">
          <el-table
            ref="table"
            :data="tableData"
            v-loading="loadingData"
            border style="margin: 10px; width: 675px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
            <el-table-column
              prop="indicatorName"
              label="指标名称"
              width="160">
            </el-table-column>
            <el-table-column
              prop="type"
              label="指标类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="uiSetting"
              label="指标描述">
            </el-table-column>
            <el-table-column
              prop="uiSetting"
              label="预警阈值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" :step="10" style="width: 100px;" controls-position="right" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="uiSetting"
              label="触发时间">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.width" :step="10" style="width: 100px;" controls-position="right" size="small" :min="2"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="界面配置" name="UI" :disabled="activeName !== 'UI'">
          <scene-u-i-settings ref="SceneUISettings"></scene-u-i-settings>
        </el-tab-pane>
<!--        <el-tab-pane label="关联服务器" name="Server" :disabled="activeName !== 'Server'">-->
<!--          <scene-server-settings ref="SceneServerSettings"></scene-server-settings>-->
<!--        </el-tab-pane>-->
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="info" @click="execPre" size="small" v-if="activeName !== 'Upload'" plain>上一步</el-button>
        <el-button type="primary" @click="execNext" size="small">{{activeName === 'UI' ? '确定' : '下一步'}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import SceneUISettings from './SceneUISettings';
import SceneUploadSettings from './SceneUploadSettings';
const STEP = [
  'Upload',
  'Indicator',
  'UI',
  // 'Server',
];
export default {
  name: 'SceneIndicator',
  components: { SceneUploadSettings, SceneUISettings },
  props: ['onAdded'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      activeName: 'Upload',
      tableData: [],
    };
  },
  created() {
  },
  methods: {
    show() {
      this.showDialog = true;
      this.execListIndicator();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },

    execListIndicator() {
      this.tableData = [
        {
          indicatorName: '指标1',
          type: '关联指标',
          uiSetting: '',
        },
        {
          indicatorName: '指标2',
          type: '关联指标',
          uiSetting: '',
        },
        {
          indicatorName: '指标3',
          type: '触发指标',
          uiSetting: '',
        },
      ];
    },
    execPre() {
      let currentStep = STEP.indexOf(this.activeName);
      if (currentStep !== 0) {
        this.activeName = STEP[currentStep - 1];
      }
    },
    execNext() {
      let currentStep = STEP.indexOf(this.activeName);
      if (currentStep !== STEP.length - 1) {
        this.activeName = STEP[currentStep + 1];
      } else {
        // do sth
      }
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
