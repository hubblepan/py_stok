<template>
  <div class="tem-license" v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" ref="configForm" label-position="top" label-width="180px">
      <el-form-item label="当前 license文件路径" prop="path">
        <el-input v-model="formData.path" readonly></el-input>
      </el-form-item>
    </el-form>

    <el-button type="warning" @click="getLicense()" size="small">选择 license文件</el-button>
    <node-add-license :on-license-added="onLicenseAdded" ref="nodeAddLicense"></node-add-license>
  </div>
</template>

<script>
import NodeAddLicense from '../nodes/NodeAddLicense';
import * as api from '../api/node_deploy_api';
export default {
  name: 'License',
  components: {
    NodeAddLicense,
  },
  props: {
    formData: {
      type: Object,
      require: true,
    },
    tomcatId: {
      type: String,
      require: true,
    },
    nodeId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      configInfoLoading: true, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      licPathClass: true, // licsence路径的蓝色线框
      isValid: false,
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
        this.validateForm();
      }).catch(reason => {
        this.$refs.nodeAddLicense.closeLoading();
      });
    },
    getLicense() {
      console.log(this.nodeId, this.tomcatId);
      this.$refs.nodeAddLicense.show(this.nodeId, this.tomcatId);
    },
    // 子组件校验，传递到父组件
    async validateForm() {
      const ret = await new Promise((resolve, reject) => {
        this.$refs['configForm'].validate((valid) => {
          resolve(valid);
        });
      });
      return ret;
    },
    initEdit() {
      // let path = document.querySelectorAll('#path');
      // path[0].addEventListener('change', () => {
      //   this.$parent.setEdit(true);
      // });
    },
    // 获取当前lic
    getCurrentLicense() {
      this.configInfoLoading = true;
      this.$emit('editState', this.editState, this.configInfoLoading); // 禁用父组件按钮
      let { tomcatSelected } = this.$parent.$data;
      api.getLicenseConfig([tomcatSelected.id])
        .then(res => {
          this.configInfoLoading = false;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
          this.formData.path = res.data[0].path;
        })
        .catch(reason => {
          this.configInfoLoading = false;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
          // do nothings
        });
    },
  },
  created() {
    this.getCurrentLicense();
  },
  mounted() {
    this.initEdit();
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 5;
}

/deep/ .el-form--label-top .el-form-item__label {
  padding-bottom: 0px;
}

/*.tem-license >>> .el-form-item__error {*/
/*left: 18px !important;*/
/*}*/

.add-lic-btn {
  width: 95%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 2px;
  border: 1px dotted #096dd9;
  color: #096dd9;
  cursor: pointer;
}

.add-lic-btn:active {
  color: #096dd9;
  background-color: #fff;
  border-color: #096dd9;
}
.add-lic-btn:hover {
  color: #40a9ff;
  background-color: #fff;
  border-color: #40a9ff;
}

.licPath {
  width: 95%;
  display: inline-block;
  border: 1px dotted grey;
  border-radius: 2px;
  padding-left: 10px;
  margin-bottom: 20px;
  min-height: 40px;
  color: grey;
}
</style>
