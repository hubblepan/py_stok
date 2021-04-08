<template style="position: relative" id="temglic">
  <div class="tem-getLicense" v-if="showTomcat">
    <div class="tab-ctn">
      <el-tabs type="border-card" style="height: 100%;">
        <el-tab-pane label="添加Tomcat">
          <el-input placeholder="tomcat上传服务器的默认路径" v-model="tomcatDefaultDir"></el-input>
          <el-upload
            :file-list="fileList"
            class="upload-demo"
            ref="upload"
            action
            drag
            :http-request="customUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-error="uploadErr"
            :on-change="handleChange"
            show-file-list
            :auto-upload="false"
            accept=".zip"
            :disabled=isBtnAble
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传一个zip文件</div>
          </el-upload>
          <div class="upload-progress">
              <el-progress v-if="progressFlag" :text-inside="true" :stroke-width="20" :percentage="progressPercent" ></el-progress>
          </div>
          <div class="btns">
            <el-button type="primary" @click="upload()" :disabled="isBtnAble">确定</el-button>
            <el-button @click="cancel()" :disabled="isBtnAble">取消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as api from './api';
import request from '@/plugin/axios';
const baseUrl = process.env.VUE_APP_TOOLS_API;

export default {
  name: 'get-license',
  data() {
    return {
      showTomcat: true,
      fileList: [],
      // fileName: '',
      tomcatDefaultDir: '',
      fileData: new FormData(),
      progressFlag: false,
      progressPercent: 0,
      isBtnAble: false,
    };
  },
  mounted() {
    // this.showData();
  },
  methods: {
    showData: function() {
      api
        .getTomcatDefaultDir()
        .then(result => {
          if (result.success === true) {
            this.tomcatDefaultDir = result.data;
          } else {
            this.$message.error('查询tomcat默认目录失败' + result.msg);
            return false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    beforeUpload(file) {
      var fileName = file.name;
      // this.fileName = fileName
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      var reg = /(?:zip)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('上传文件只能是zip类型文件');
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
      }
    },
    resetUpload() {
      this.isBtnAble = false;
      this.progressFlag = false;
      this.progressPercent = 0;
      this.fileData = new FormData();
    },
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      this.fileData.append('tomcatDir', this.tomcatDefaultDir);
      this.fileData.append('type', 'installPackage');
      return false;
    },
    upload() {
      this.$refs.upload.submit();
      if (this.fileData.get('file') === null) {
        this.$message.warning('请选择一个上传文件');
        return false;
      } else {
        if (!this.beforeUpload(this.fileData.get('file'))) { // 上传前校验
          this.$refs.upload.clearFiles(); // 清空文件列表
          this.fileData = new FormData();
          return false;
        }
      }
      this.isBtnAble = true;
      this.progressFlag = true;
      this.progressPercent = 0;
      request({
        url: baseUrl + '/monitor/add/tomcat',
        method: 'post',
        data: this.fileData,
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 360000,
        onUploadProgress: progressEvent => {
          this.progressPercent = Math.round((progressEvent.loaded / progressEvent.total * 100)) - 1;
        },
      }).then(result => {
        this.isBtnAble = false;
        this.resetUpload();
        if (this.progressPercent === 99) {
          this.progressFlag = false;
          this.progressPercent = 0;
        }
        if (result.success) {
          this.$message.success('上传成功');
          this.$parent.showData(true); // 重新刷新tomcat树
          this.showTomcat = false;
          this.$emit('hideTomcat', this.showTomcat);
          this.$emit('refreshTomcatData', result.data);
        } else {
          this.isBtnAble = false;
          this.$message.error('上传失败!' + result.msg);
        }
      }).catch(error => {
        this.resetUpload();
        console.log(error);
      });
    },
    cancel() {
      this.showTomcat = false;
      this.$emit('hideTomcat', this.showTomcat);
    },
  },
};
</script>

<style scoped>
.tem-getLicense {
  width: 700px;
  height: 500px;
  background-color: #fff;
  z-index: 6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tab-ctn {
  height: 500px;
}

.btns {
  position: fixed;
  bottom: 30px;
  right: 20px;
}

.table-container {
  height: 350px;
  overflow-y: scroll;
}

.upload-demo {
  text-align: center;
  margin-top: 40px;
}

/**  /deep/ 是修改elementui等第三方组件内部样式，做的渗透 **/
/deep/ .el-list-enter-active,
/deep/ .el-list-leave-active {
  transition: none;
}

/deep/ .el-list-enter,
/deep/ .el-list-leave-active {
  opacity: 0;
}
/deep/ .el-upload-list {
  height: 40px;
}

/deep/ .el-upload-list__item-name {
  font-size: large;
  font-weight: 500;
}

/deep/ .el-upload-list__item .el-icon-close {
  font-size: 20px
}

/deep/ .el-upload-dragger {
  width: 660px;
}
</style>
