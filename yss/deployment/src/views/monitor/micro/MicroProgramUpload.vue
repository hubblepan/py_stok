<template>
  <div style="margin-left: 20px; margin-top: 30px;">
    <el-form label-position="left" label-width="120px" :model="formData" style="height: 120px;" ref="formMain">
      <el-form-item label="文件类型:">
        <el-radio-group v-model="formData.isLocal">
          <el-radio :label="true">本地文件</el-radio>
          <el-radio :label="false">git地址</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="git路径:" prop="fileDir" v-if="!formData.isLocal">
        <el-input v-model="formData.fileDir" placeholder="输入程序的git地址" style="width: 360px;" size="small"></el-input>
<!--        &nbsp;或-->
<!--        <el-button @click.prevent="handleUploadRemote" type="primary" size="small" class="ml-2">从服务器选择</el-button>-->
      </el-form-item>
      <el-form-item label="程序包文件:" prop="fileList" v-if="formData.isLocal">
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
          accept=".zip">
          <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '../api/node_deploy_api';

export default {
  name: 'MicroProgramUpload',
  props: ['type'],
  data() {
    return {
      nodeId: '',
      tomcatId: '',
      fileData: null,
      formData: {
        fileDir: '', // 远程文件路径
        isLocal: true, // 是否为本地文件
        fileList: [], // 本地文件
        distributed: false,
      },
    };
  },
  methods: {
    validForm() {
      if (this.formData.isLocal) {
        if (!this.formData.fileList || this.formData.fileList.length === 0) {
          this.$alert('请选择一个部署包文件', {type: 'error'});
          return false;
        }
        return true;
      } else {
        if (this.formData.fileDir === '') {
          this.$alert('请输入一个部署包路径', {type: 'error'});
          return false;
        }
        return true;
      }
    },
    onAdded(zipDir) {
      this.formData.fileDir = zipDir;
      this.formData.isLocal = false;
    },
    getFormData() {
      if (this.formData.isLocal) {
        this.$refs.upload.submit();
      } else {
        this.customUpload(null);
      }
      return this.fileData;
    },
    handleInit(tomcatId, nodeId = '') {
      this.nodeId = nodeId;
      this.tomcatId = tomcatId;
      this.formData = {
        fileDir: '', // 远程文件路径
        isLocal: true, // 是否为本地文件
        fileList: [], // 本地文件
      };
    },
    handleChange(file, fileList) {
      this.formData.fileList = fileList.slice(-1);
    },
    handleRemove() {
      this.formData.fileList = [];
    },
    handleUploadRemote() {
      this.$refs.UploadRemote.show(this.nodeId);
    },
    customUpload(file) {
      this.fileData = new FormData();
      let type = 'installWare';
      if (!this.formData.isLocal) {
        this.fileData.append('fileDir', this.formData.fileDir);
        this.fileData.append('isLocal', 'false');
        if (this.formData.fileDir.slice(-4) === '.zip') {
          type = 'installZip';
        }
      } else {
        this.fileData.append('file', file.file);
        this.fileData.append('isLocal', 'true');
        if (file.file.name.slice(-4) === '.zip') {
          type = 'installZip';
        }
      }
      this.fileData.append('type', type);
      return false;
    },
  },
};
</script>

<style scoped>
.upload-demo {
  width: 400px;
}
/deep/ .el-radio__label {
  display: inline;
}

/deep/ .el-form-item{
  margin-bottom: 10px;
}
</style>
