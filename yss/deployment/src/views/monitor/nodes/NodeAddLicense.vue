<template>
    <el-dialog title="添加应用" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="本地文件" name="local">
          <div>
            <el-form label-position="right" label-width="130px" :inline="true" style="height: 140px;" ref="formAddTomcat">
              <el-form-item label="License文件" prop="fileList">
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="customUpload"
                  :file-list="fileList"
                  ref="upload"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :show-file-list="true"
                  accept=".lic"
                  :multiple="false">
                  <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
                </el-upload>
              </el-form-item>
              <br/>
            </el-form>
<!--            <div style="display: inline-block; float: right; width: 180px; margin-top: 10px;" v-if="local">-->
<!--              <span>debug.exe</span>-->
<!--              <i class="el-icon-close" @click="handleRemoveLocal" v-if="local" style="float: right; margin-top: 4px; margin-right: 20px;"></i>-->
<!--            </div>-->
          </div>
        </el-tab-pane>
        <el-tab-pane label="远程文件" name="remote">
          <div>
            <el-table :data="remote.tableData" border style="margin: 10px 20px 20px 20px; width:540px"  max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}" @row-click="handleClickRow" v-loading="loadingData">
              <el-table-column fixed="left" width="40" align="center">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.path"
                    v-model="remote.selectPath"
                    @change.native="handleClickRow(scope.row)"
                  >&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column property="path" label="lisence目录"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import * as api from '../api/node_deploy_api';
export default {
  name: 'NodeAddLicense',
  props: ['onLicenseAdded'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      loading: false,
      fileList: [],
      fileData: null,
      activeName: 'local',
      nodeId: '',
      tomcatId: '',
      remote: {
        selectPath: '',
        tableData: [],

      },
    };
  },
  created() {
  },
  methods: {
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('type', 'license');
      if (this.activeName === 'local') {
        this.fileData.append('file', file.file);
        this.fileData.append('isLocal', true);
      } else {
        this.fileData.append('fileDir', this.remote.selectPath);
        this.fileData.append('isLocal', false);
      }
      this.fileData.append('tomcatIds', [this.tomcatId].join(','));
      return false;
    },
    execAdd() {
      // 执行验证
      if (this.activeName === 'local') {
        if (!this.fileList || this.fileList.length === 0) {
          this.$message.error({message: '请选择一个License文件'});
          return;
        }
      } else {
        if (!this.remote.selectPath || this.remote.selectPath === '') {
          this.$message.error({message: '请选择一个License文件路径'});
          return;
        }
      }
      this.showLoading();
      if (this.activeName === 'local') {
        this.$refs.upload.submit();
      } else {
        this.customUpload(null);
      }
      this.onLicenseAdded(api.uploadWar(this.fileData));
    },
    execListLisense() {
      this.loadingData = true;
      api.listLicenseOfNode(this.nodeId)
        .then(res => {
          this.loadingData = false;
          this.remote.tableData = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
        });
    },
    handleClickRow(row, event, column) {
      this.remote.selectPath = row.path;
    },
    handleRemoveLocal() {
      this.local = null;
    },
    show(nodeId, tomcatId) {
      this.showDialog = true;
      this.nodeId = nodeId;
      this.tomcatId = tomcatId;
      this.local = null;
      this.remote = {
        selectPath: '',
        tableData: [],

      };
      this.execListLisense();
    },
    close() {
      this.showDialog = false;
    },
    showLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },

    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      console.log(this.fileList);
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
    display: none;
  }
  /deep/ .el-dialog__body{
    padding: 0;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-button--mini.is-circle {
    padding: 2px;
    padding-top: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    padding-left: 2px;
  }
</style>
