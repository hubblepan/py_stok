<template>
  <el-dialog title="场景配置" :visible.sync="showDialog" width="515px" :close-on-click-modal="false" :close-on-press-escape="false">
    <scene-upload-settings ref="SceneUploadSettings"></scene-upload-settings>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execNext" size="small" :loading="loading">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import SceneUploadSettings from './SceneUploadSettings';
import * as api from '../api/scene_api';
export default {
  name: 'SceneAdd',
  components: { SceneUploadSettings },
  props: ['onUpload'],
  data() {
    return {
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    show() {
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },

    execNext() {
      this.$refs.SceneUploadSettings.validForm(success => {
        if (success) {
          this.loading = true;
          this.onUpload(api.uploadScene(this.$refs.SceneUploadSettings.getFormData()));
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
