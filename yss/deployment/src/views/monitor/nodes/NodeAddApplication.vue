<template>
  <!-- 新增节点 -->
  <el-dialog title="添加Tomcat" :visible.sync="showDialog" width="440px">
    <div style="width: 400px; height: 215px">

      <div style="margin: 0 auto; padding-left: 10px;" v-if="!appFile.file">
        <el-upload
          class="upload-demo"
          drag
          :file-list="fileList"
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="uploadErr"
          :on-change="handleChange"
          :auto-upload="false"
          :show-file-list="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div>
        <el-form :label-position="'right'" :model="appFile" v-if="appFile.file" label-width="80px">
          <el-form-item label="应用名称:">
            <el-input v-model="appFile.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="修改时间:">
            <el-input v-model="appFile.modifyDate" readonly></el-input>
          </el-form-item>
          <el-form-item label="大小:">
            <el-input v-model="appFile.size" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import dateFormat from '../../../utils/dateFormat';
export default {
  name: 'NodeAddTomcat',
  props: ['onTomcatAdded'],
  data() {
    return {
      showDialog: false,
      loading: false,
      appFile: {
        file: null,
        name: '',
        size: '0kb',
        modifyDate: '',
      },
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
    /* TODO 添加节点 */
    execAdd() {
      this.loading = true;
      // this.onAdded(api.addNode()); // 将请求的promise返回给调用者
      // show loading
      // 执行添加操作
      // 关闭 loading
      // 处理结果
      this.close();
      // 通知回调
    },

    handleRemove(file, fileList) {},
    handlePreview(file) {},
    beforeUpload(file) {
      var fileName = file.name;
      this.fileName = fileName;
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      var reg = /(?:war)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('上传文件只能是war类型文件');
        return false;
      }
      if (fileName !== 'YSSUCOBRIDGE.war') {
        this.$message.error('上传文件必须是YSSUCOBRIDGE.war文件');
        return false;
      }
      return true;
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles(); // 清空文件列表
      this.$message.success('上传成功');
    },
    uploadErr(err, file, fileList) {
      console.log('err', err, file, fileList);
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 展示最后一次选择的文件
        this.appFile.name = file.raw.name;
        this.appFile.size = (file.raw.size / 1024).toFixed(2) + 'kb';
        this.appFile.modifyDate = dateFormat('yyyy-MM-dd hh:mm:ss', file.raw.lastModifiedDate);
        this.appFile.file = file.raw;
      } else {
        this.appFile.name = '';
        this.appFile.size = '0kb';
        this.appFile.modifyDate = '';
        this.appFile.file = null;
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
</style>
