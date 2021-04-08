<template>
  <div style="margin-left: 20px; margin-top: 20px;">
    <el-form label-position="left" label-width="120px" :model="formData" :rules="rules" style="height: 120px;" ref="formMain">
      <el-form-item label="场景文件:" prop="fileList">
        <el-upload
          class="upload-demo"
          :http-request="customUpload"
          :file-list="formData.fileList"
          ref="upload"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          :show-file-list="true"
          :multiple="false"
          accept=".jar">
          <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="预警邮箱:" required prop="email">
        <el-input v-model="formData.email" placeholder="邮件地址" style="width: 300px;" size="small"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SceneUploadSettings',
  data() {
    return {
      tomcatInfo: null,
      fileData: null,
      formData: {
        fileList: [], // 本地文件
        email: '',
      },
      rules: {
        email: [
          {type: 'email', required: true, message: '请输入预警邮箱'},
        ],
      }
    };
  },
  methods: {
    validForm(callback) {
      if (!this.formData.fileList || this.formData.fileList.length === 0) {
        this.$alert('请选择一个jar文件', {type: 'error'});
        return callback(false);
      }
      return this.$refs.formMain.validate(callback);
    },

    getFormData() {
      this.$refs.upload.submit();
      return this.fileData;
    },
    handleChange(file, fileList) {
      this.formData.fileList = fileList.slice(-1);
    },
    handleRemove() {
      this.formData.fileList = [];
    },
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      this.fileData.append('email', this.formData.email);

      return false;
    },
  },
};
</script>

<style scoped>
.upload-demo {
  width: 400px;
}

/deep/ .el-form-item{
  margin-bottom: 10px;
}
/deep/ .el-upload-dragger{
  height: 140px;
}

/deep/ .el-radio__label{
  display: inline;
}
</style>
