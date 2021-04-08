<template>
  <!-- 新增节点 -->
  <el-dialog title="添加Tomcat" :visible.sync="showDialog" width="480px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="130px" :model="formData" :rules="rules" :inline="true" style="height: 240px;" ref="formAddTomcat" v-loading="loadingData">
      <el-form-item label="Tomcat保存地址" prop="tomcatDir">
        <el-input v-model="formData.tomcatDir" placeholder="tomcat保存地址" style="width: 310px;" size="small">节点1</el-input>
      </el-form-item>
      <el-form-item label="Tomcat别名" prop="tomcatName">
        <el-input v-model="formData.tomcatName" placeholder="tomcat别名" style="width: 210px;" size="small">Tomcat别名</el-input>
      </el-form-item>
      <br/>
      <el-form-item label="Tomcat文件">
        <el-upload
          class="upload-demo"
          :http-request="customUpload"
          :file-list="formData.fileList"
          ref="upload"
          :on-change="handleChange"
          :auto-upload="false"
          :show-file-list="true"
          :multiple="false"
          accept=".zip">
          <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
        </el-upload>
      </el-form-item>

      <br/>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import dateFormat from '../../../utils/dateFormat';
import * as api from '../api/node_deploy_api';
import * as validate from '@/libs/validate';
export default {
  name: 'NodeAddTomcat',
  props: ['onTomcatAdded'],
  data() {
    return {
      loadingData: false,
      showDialog: false,
      loading: false,
      nodeId: '',
      fileData: null,
      tomcatNames: [],
      formData: {
        tomcatDir: '',
        fileList: [],
        tomcatName: '',
      },
      rules: {
        tomcatDir: [
          { required: true, message: '请输入格式正确的地址', trigger: 'blur' },
          {
            pattern: validate.cateExp().exp,
            message: validate.cateExp().msg,
            trigger: 'blur',
          },
        ],
        tomcatName: [
          { required: true, message: '请输入Tomcat别名, 并且不能与其他Tomcat名称重复', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    show(nodeId, tomcatNames) {
      this.showDialog = true;
      this.nodeId = nodeId;
      this.formData.tomcatDir = '';
      this.formData.fileList = [];
      this.formData.tomcatName = '';
      this.tomcatNames = tomcatNames;
      this.handleDefaultDir(nodeId);
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
    validTomcatName (str) {
      if (!str) {
        return false;
      }
      if (this.tomcatNames.indexOf(str) !== -1) {
        return false;
      }
      return true;
    },
    handleDefaultDir(nodeId) {
      this.loadingData = true;
      api.defaultTomcatDir(nodeId)
        .then(res => {
          this.loadingData = false;
          this.formData.tomcatDir = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
        });
    },
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      this.fileData.append('tomcatDir', this.formData.tomcatDir);
      this.fileData.append('type', 'installPackage');
      this.fileData.append('nodeId', this.nodeId);
      this.fileData.append('tomcatName', this.formData.tomcatName);
      return false;
    },
    execAdd() {
      this.$refs['formAddTomcat'].validate((valid) => {
        if (valid) {
          if (!validate.isFileDir(this.formData.tomcatDir)) {
            this.$message.error('错误的地址格式');
          } else if (!this.validTomcatName(this.formData.tomcatName)) {
            this.$message.error('存在相同的Tomcat名称');
          } else if (this.formData.fileList.length === 0) {
            this.$message.error('请选择Tomcat文件');
          } else {
            this.loading = true;
            this.$refs.upload.submit();
            this.onTomcatAdded(api.addTomcat(this.fileData)); // 将请求的promise返回给调用者
            // show loading
            this.showLoading();
          }
        } else {
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      this.formData.fileList = fileList.slice(-1);
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
</style>
