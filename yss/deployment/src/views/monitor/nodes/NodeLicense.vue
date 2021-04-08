<template>
  <div class="tem-license">
    <div style="padding-right: 20px">
      <el-button type="primary" @click="getLicense()" size="mini" icon="el-icon-plus" style="margin-left: 10px; margin-top: 10px">License</el-button>
      <el-input v-model="formData.path" placeholder="当前lisence 地址" size="small" style="margin: 10px 20px 10px 10px" readonly></el-input>
    </div>
    <node-add-license :on-license-added="onLicenseAdded" ref="nodeAddLicense"></node-add-license>
  </div>
</template>

<script>
import NodeAddLicense from './NodeAddLicense';
export default {
  name: 'NodeLicense',
  components: {
    NodeAddLicense,
  },
  props: {
    nodeId: {
      type: String,
      require: true,
    },
    formData: {
      type: Object,
      require: true,
    },
    tomcatId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      rules: {
        path: [{ required: true, message: '请选择license', trigger: 'change' }],
      },
    };
  },
  methods: {
    onLicenseAdded(p) {
      p.then(res => {
        this.$refs.nodeAddLicense.closeLoading();
        this.$refs.nodeAddLicense.close();
        this.formData.path = res.data;
      }).catch(reason => {
        this.$refs.nodeAddLicense.closeLoading();
        // this.$message.error({
        //   message: '添加License失败:' + reason,
        // });
      });
    },
    getLicense() {
      this.$refs.nodeAddLicense.show(this.nodeId, this.tomcatId);
    },
    // 子组件校验，传递到父组件
    async validateForm(callback) {
      let valid = (this.formData.path && this.formData.path.trim() !== '');
      callback(valid);
    },
  },
  created() {
    // this.showLicsenceBox()
    // this.getCurrentLicense();
  },
  mounted() {
    //
  },
};
</script>

<style scoped>
</style>
