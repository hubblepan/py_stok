<template>
    <d2-container>
      <app-header-new :title="'服务列表'"></app-header-new>
      <el-row :gutter="20" style="margin: 0 30px 0px 10px; width: 98%;">
        <el-col :span="12">
          <el-upload
            style="width: 100%"
            drag
            :action="baseUrl + '/microservice/program/upload'"
            :on-progress="onUploadProgress"
            :on-error="onUploadError"
            :on-success="onUploadSuccess"
            :before-upload="onBeforeUnload"
            :auto-upload="true"
            :show-file-list="false">
            <div class="el-upload__text" style="width: 100%">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入maven路径" v-model="mavenPath">
            <template slot="append"><span style="cursor: pointer;" @click="handleLoadmaven">载入</span></template>
          </el-input>
        </el-col>
      </el-row>
      <div style="margin-top: -6px;">
        <div class="app-collapse" v-for="item in tableData" :key="item.code" style="border: 1px solid #e8e8e8; margin: 10px 20px; background: #fafafa">
          <!--title-->
          <div class="app-collapse-header"  @click="handleCollapse(item)" style="height: 40px; line-height: 40px; font-size: 14px; font-weight: 500; color: #333333;">
            <i :class="{'el-icon-caret-right': !item.collapse, 'el-icon-caret-bottom': item.collapse}" style="color: #999999; margin-left: 14px;"></i>
            <div style="margin-left: 9px; width: 240px; display: inline-block">{{item.code}}</div>
            <div style="width: 200px; display: inline-block">关联方案数: {{item.schemeCount}}</div>
            <div style="width: 200px; display: inline-block">部署实例数: {{item.instanceCount}}</div>
          </div>
          <!--折叠面板-->
          <div class="app-collapse-content" style="margin: 14px 20px" v-if="item.collapse">
            <el-table :data="item.children"
                      v-loading="item.childrenLoading"
                      border
                      style="width: 1202px;"
                      max-height="750"
                      :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"
                      :header-row-style="{height: '40px'}"
                      :row-style="{height: '40px'}"
                      :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}">
              <el-table-column
                prop="versionNo"
                label="版本号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="schemeCount"
                label="关联方案数"
                width="200">
              </el-table-column>
              <el-table-column
                prop="instanceCount"
                label="部署实例数"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fileSize"
                label="文件大小"
                width="200">
              </el-table-column>
              <el-table-column
                prop="uploadTime"
                label="上传时间"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button @click="handleDownloadLog(item.code, scope.row.versionNo)" size="mini" type="info">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <micro-program-upload-add :on-added="onProgramAdded" ref="Upload"></micro-program-upload-add>
      <div v-if="false">
        <span>testest</span>
      </div>
      <app-loading ref="AppLoading"></app-loading>
      <micro-act-pwd ref="ActPwd" :on-added="onLoadMaven"></micro-act-pwd>
    </d2-container>
</template>

<script>
import AppLoading from '../../../components/AppLoading';
import AppHeaderNew from '../../../components/header/AppHeaderNew';
import MicroProgramUploadAdd from './MicroProgramUploadAdd';
import MicroActPwd from './MicroActPwd';
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroProgramManage',
  components: {MicroProgramUploadAdd, AppHeaderNew, AppLoading, MicroActPwd},
  data() {
    return {
      baseUrl: process.env.VUE_APP_MONITOR_API,
      mavenPath: '',
      mavenAccount: '',
      mavenPassword: '',
      loadingData: false,
      activeNames: 1,
      tableData: [
      ],
      tableItem: {
        id: '1',
        code: 'osgi-fast', // 微服务名称
        instanceCount: 11,
        schemeCount: 12,
        collapse: false,
        children: [{
          code: 'fast-osgi',
          fileSize: '19kb',
          id: '1',
          instanceCount: 5,
          schemeCount: 4,
          uploadTime: '2020-01-02 10:10:10',
          versionNo: 'V1.0.0.1',
        }],
      },
    };
  },
  mounted() {
    this.handleListProgram();
    api.getDefaultMavenDir()
      .then(res => {
        this.mavenPath = res.data.mvnAdrr;
        this.mavenAccount = res.data.account;
        this.mavenPassword = res.data.password;
      })
      .catch(reason => {
        console.log(reason);
      });
  },
  methods: {
    handleDownloadLog(serviceCode, versionNo) {
      this.showLoading();
      api.downloadProgram(serviceCode, versionNo)
        .then(res => {
          this.hideLoading();
          this.loading = false;
          var fileName = res.headers['content-disposition'];
          fileName = fileName.split(';')[1].split('=')[1];
          this.downloads(res.data, fileName);
        })
        .catch(reason => {
          this.hideLoading();
          this.loading = false;
          console.log(reason);
        });
    },
    downloads (data, fileName) {
      console.log(fileName);
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onBeforeUnload() {
      this.$refs.AppLoading.show();
      return true;
    },
    onUploadSuccess() {
      this.$refs.AppLoading.dismiss();
      this.handleListProgram();
    },
    onUploadError(err) {
      this.$refs.AppLoading.dismiss();
      this.$alert(err);
    },
    onUploadProgress() {
    },
    showLoading() {
      this.$refs.AppLoading.show();
    },
    hideLoading() {
      this.$refs.AppLoading.dismiss();
    },
    handleCollapse(item) {
      item.collapse = !item.collapse;
      if (item.collapse && item.children.length === 0) {
        this.handleProgramDetail(item);
      }
    },
    handleProgramDetail(item) {
      item.childrenLoading = true;
      api.programDetail(item.code)
        .then(res => {
          item.childrenLoading = false;
          item.children = res.data;
        })
        .catch(reason => {
          item.childrenLoading = false;
        });
    },
    handleListProgram() {
      this.showLoading();
      api.programList()
        .then(res => {
          this.hideLoading();
          res.data && res.data.forEach(item => {
            item.children = [];
            item.collapse = false;
            item.childrenLoading = false;
          });
          this.tableData = res.data;
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
        });
    },
    handleLoadmaven() {
      if (this.mavenPath) {
        this.$refs.ActPwd.show(this.mavenPath, this.mavenAccount, this.mavenPassword);
      }
    },
    onLoadMaven(p) {
      p.then(res => {
        this.$refs.ActPwd.close();
        this.$refs.ActPwd.closeLoading();
        this.handleListProgram();
      })
        .catch(reason => {
          console.log(reason);
          this.$refs.ActPwd.close();
          this.$refs.ActPwd.closeLoading();
        });
    },
    onProgramAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.Upload.closeLoading();
        this.$refs.Upload.close();
        // 刷新节点列表
        // TODO this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.Upload.closeLoading();
        this.$message.error({
          message: '添加程序失败:' + reason,
        });
      });
    },
  },
};
</script>

<style scoped>
  /deep/ .el-table th, .el-table td{
    padding: 0px;
  }
  .el-table th, /deep/ .el-table td{
    padding: 0px;
  }
  .app-table-header {
    height: 40px;
    background: #fafafa;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
  /deep/ .el-upload-dragger{
    height: 40px;
    padding-top: 10px;
    width: 100%;
  }
  /deep/ .el-upload--text{
    width: 100%;
  }
</style>
