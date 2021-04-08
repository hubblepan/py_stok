<template style="position: relative" id="temglic">
  <div class="tem-getLicense" v-if="showLic" v-loading="configInfoLoading">
    <div class="tab-ctn">
      <el-tabs @tab-click="getTab" style="height: 100%;" type="border-card">
        <el-tab-pane label="本地文件">
          <el-upload
            :file-list="fileList"
            class="upload-demo"
            ref="upload"
            action
            drag
            :http-request="customUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="uploadErr"
            :on-change="handleChange"
            show-file-list
            :limit="1"
            :auto-upload="false"
            accept=".lic"
            :disabled=isBtnAble
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传license文件</div>
          </el-upload>
          <div class="upload-progress">
              <el-progress v-if="progressFlag == true" :text-inside="true" :stroke-width="20" :percentage="progressPercent"></el-progress>
          </div>
          <div class="btns">
            <el-button @click="uploadWar()" type="primary" :disabled="isBtnAble">确定</el-button>
            <el-button @click="cancel()" :disabled="isBtnAble">取消</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="远程文件" style="overflow-y: scroll">
          <div class="table-container">
            <el-table :data="tableData" style="width: 90%;margin: 0 auto;" highlight-current-row
              @row-click="handleClickRow" v-loading="refreshLoading">
              <el-table-column fixed="left" width="50">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.license"
                    @change.native="getCurrentRow(scope.row)"
                    v-model="radio"
                  >&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column fixed="left" label="license" minWidth="180" prop="license"></el-table-column>
            </el-table>
          </div>
          <div class="btns">
            <el-button @click="confirmToChoose()" type="primary" :disabled="isBtnAble">确定</el-button>
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
  props: ['tomcatDir'],
  data() {
    return {
      tabIndex: '0', // tab的标识，识别到底选择了哪个tab
      radio: '',
      templateSelection: [],
      tableData: [],
      showLic: true,
      fileList: [],
      fileName: '',
      fileData: new FormData(),
      progressFlag: false,
      progressPercent: 0,
      isBtnAble: false,
      configInfoLoading: false,
      refreshLoading: false,
    };
  },
  methods: {
    /**
    handleChange(file, fileList) {
      console.log(file)
      var fileName = file.name
      var suffix = fileName.split('.')
      var reg = /(?:war|zip|xml)$/
      if (!reg.test(suffix[1])) {
        return false
      }
      if (fileList.length > 1) {
        fileList.shift()
      }
    },
    */
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    beforeUpload(file) {
      var fileName = file.name;
      this.fileName = fileName;
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      var reg = /(?:lic)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('请上传lic类型文件');
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
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      this.fileData.append('type', 'license');
      this.fileData.append('fileDir', '');
      this.fileData.append('isLocal', true);
      this.fileData.append('tomcatDir', this.tomcatDir);
      return false;
    },
    resetUpload() {
      this.isBtnAble = false;
      this.progressFlag = false;
      this.progressPercent = 0;
      this.fileData = new FormData();
    },
    uploadWar() {
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
        url: baseUrl + '/monitor/upload',
        method: 'post',
        data: this.fileData,
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 360000,
        onUploadProgress: progressEvent => {
          this.progressPercent = Math.round((progressEvent.loaded / progressEvent.total * 100)) - 1;
        },
      }).then(result => {
        this.isBtnAble = false;
        if (this.progressPercent === 99) {
          this.progressFlag = false;
          this.progressPercent = 0;
        }
        this.resetUpload();
        if (result.success) {
          this.$message.success('上传成功');
          this.showLic = false;
          this.$emit('hideLic', this.showLic);
          this.$emit('showLic', { showLic: this.showLic, templateSelection: result.data });
        } else {
          this.isBtnAble = false;
          this.$message.error('上传失败!' + result.msg);
        }
      }).catch(error => {
        this.isBtnAble = false;
        this.resetUpload();
        console.log(error);
      });
    },
    confirmToChoose() {
      if (this.radio === '') {
        this.$message.error('请选择一个license');
        return false;
      }
      this.configInfoLoading = true;
      this.fileData = new FormData();
      this.fileData.append('file', '');
      this.fileData.append('type', 'license');
      this.fileData.append('fileDir', this.templateSelection.license);
      this.fileData.append('isLocal', false);
      this.fileData.append('tomcatDir', this.tomcatDir);
      api
        .uploadFile(this.fileData)
        .then((result) => {
          if (result.success) {
            this.$message.success('上传成功');
            this.showLic = false;
            this.$emit('hideLic', this.showLic);
            this.$emit('showLic', { showLic: this.showLic, templateSelection: result.data });
          } else {
            this.$message.error('上传失败!' + result.msg);
          }
          this.configInfoLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.configInfoLoading = false;
        });
    },
    cancel() {
      this.showLic = false;
      this.$emit('hideLic', this.showLic);
    },
    getCurrentRow(row) {
      // 获取选中数据
      console.log(row);
      this.radio = row.license;
      this.templateSelection = row;
    },
    handleClickRow(row, event, column) {
      this.radio = row.license;
      this.templateSelection = row;
    },
    getTab(tab, event) {
      this.tabIndex = tab.paneName;
    },
    initForm() {
      this.refreshLoading = true;
      let { tomcatDir } = this.$parent.$data;
      api.getAllLicense({ tomcatDir }).then((res) => {
        var data = res.data;
        var arr = [];
        data.forEach((item, index) => {
          arr[index] = {};
          arr[index].license = item;
        });
        this.tableData = arr;
        this.refreshLoading = false;
      });
    },
  },
  created() {
    this.initForm();
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
  /*overflow-y: scroll;*/
}

.el-table >>> .el-table__body tr.current-row>td {
  background-color: #409eff8a !important;
  font-weight: bold;
}

.upload-demo {
  text-align: center;
  margin-top: 40px;
}
</style>
<style scoped>
#temglic >>> .el-table__fixed-header-wrapper .el-table_1_column_1 .el-checkbox__input .el-checkbox__inner {
  display: none !important;
}
/*!*radio出现一些多余的点，去掉*!*/
/*.el-radio:last-child {*/
/*margin-right: -10px;*/
/*}*/
/*去除table多出的横线*/
.el-table__fixed::before,
.el-table__fixed-right::before {
  z-index: inherit !important;
}
/*  element-ui table的去除右侧滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
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
