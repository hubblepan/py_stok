<template>
  <div style="margin-left: 20px; margin-top: 30px;">
    <el-form label-position="left" label-width="120px" :model="formData" style="height: 120px;" ref="formMain">
      <el-form-item label="补丁类型:">
        <el-radio-group v-model="formData.fileType">
          <el-radio :label="'1'">版本仓库</el-radio>
          <el-radio :label="'2'">手工上传</el-radio>
          <el-radio :label="'3'">远程文件</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="升级包路径:" prop="fileDir" v-if="formData.fileType === '3'">
        <el-input v-model="formData.fileDir" placeholder="输入一个升级包路径或者从服务器中选择一个升级包" style="width: 360px;" size="small"></el-input>
        &nbsp;或
        <el-button @click.prevent="handleUploadRemote" type="primary" size="small" class="ml-2">从服务器选择</el-button>
      </el-form-item>
      <el-form-item label="升级包文件:" prop="fileList" v-if="formData.fileType === '2'">
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
      <el-form-item label="补丁名称:" prop="fileRepo" v-if="formData.fileType === '1'">
        <el-input v-model="formData.fileRepo" placeholder="输入一个补丁包路径或者从版本仓库中选择一个补丁包" style="width: 360px;" size="small"></el-input>
        &nbsp;或
        <el-button @click.prevent="handleUploadRepo" type="primary" plain size="small" class="ml-2">版本仓库</el-button>
      </el-form-item>
    </el-form>
    <node-upgrade-upload-remote :on-added="onAdded" ref="UploadRemote"></node-upgrade-upload-remote>
    <node-upgrade-upload-repo :on-added="onRepoAdded" ref="UploadRepo"></node-upgrade-upload-repo>
  </div>
</template>

<script>
import NodeUpgradeUploadRemote from './NodeUpgradeUploadRemote';
import NodeUpgradeUploadRepo from './NodeUpgradeUploadRepo';
import * as api from '../api/node_upgrade_api';
export default {
  name: 'NodeUpgradeUpload',
  components: {NodeUpgradeUploadRepo, NodeUpgradeUploadRemote},
  props: ['type'],
  data() {
    return {
      nodeId: '',
      tomcatId: '',
      tomcatInfo: null,
      fileData: null,
      formData: {
        fileDir: '', // 远程文件路径
        isLocal: true, // 是否为本地文件
        fileList: [], // 本地文件
        fileType: '1', // 1 为 版本仓库， 2为本地文件 3 为远程文件
        fileRepo: '',
      },
    };
  },
  methods: {
    validForm() {
      if (this.formData.fileType === '2') {
        if (!this.formData.fileList || this.formData.fileList.length === 0) {
          this.$alert('请选择一个升级包文件', {type: 'error'});
          return false;
        }
        return true;
      } else if (this.formData.fileType === '3') {
        if (this.formData.fileDir === '') {
          this.$alert('请输入一个升级包路径', {type: 'error'});
          return false;
        }
        return true;
      } else {
        // 版本仓库地址
        if (this.formData.fileRepo === '') {
          this.$alert('请选择一个版本或者补丁文件', {type: 'error'});
          return false;
        }
        return true;
      }
    },
    onAdded(zipDir) {
      this.formData.fileDir = zipDir;
    },

    onRepoAdded(repoPath) {
      this.formData.fileRepo = repoPath;
    },

    getFormData() {
      if (this.formData.fileType === '2') {
        this.$refs.upload.submit();
      } else {
        this.customUpload(null);
      }
      return this.fileData;
    },
    handleInit(tomcatId, nodeId = '', tomcatInfo) {
      this.nodeId = nodeId;
      this.tomcatInfo = tomcatInfo;
      this.tomcatId = tomcatId;
      this.formData = {
        fileDir: '', // 远程文件路径
        isLocal: true, // 是否为本地文件
        fileList: [], // 本地文件
        fileType: '1', // 1 为 版本仓库， 2为本地文件 3 为远程文件
        fileRepo: (tomcatInfo && tomcatInfo.selectVersionDir) || '',
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
    handleUploadRepo() {
      this.$refs.UploadRepo.show(this.nodeId, this.tomcatInfo);
    },
    customUpload(file) {
      this.fileData = new FormData();
      if (this.formData.fileType === '3') {
        this.fileData.append('fileDir', this.formData.fileDir);
        this.fileData.append('isLocal', 'false');
        this.fileData.append('type', 'upgrade');
      } else if (this.formData.fileType === '2') {
        this.fileData.append('file', file.file);
        this.fileData.append('isLocal', 'true');
        this.fileData.append('type', 'upgrade');
      } else {
        this.fileData.append('fileDir', this.formData.fileRepo);
        this.fileData.append('isLocal', 'false');
        this.fileData.append('type', 'dir');
      }

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
