<template>
  <!-- 新增服务器 -->
  <el-dialog title="添加方案节点" :visible.sync="showDialog" width="450px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body v-loading="loadingData">
    <el-form label-position="right" label-width="100px" :model="formData" :inline="true" ref="formAddNode" :rules="rules" style="width: 460px; display: inline-block;">
      <el-form-item label="节点选择" prop="servers">
        <el-select v-model="formData.servers" placeholder="请选择" size="small" multiple @change="handleServerChange" style="width: 240px;">
          <el-option v-for="item in serverList"
            :key="item.id"
            :label="item.ip"
            :value="item.id"
            :disabled="schemeServerIpList.indexOf(item.ip) !== -1">
            <span style="float: left">{{item.name}}</span>
          </el-option>
        </el-select>
        <el-button type="text" style="margin-left: 10px" @click="handleMachineCode">机器码</el-button>
      </el-form-item>
      <br/>
      <el-form-item label="服务选择" prop="serviceCodes" v-if="!enableCluster">
        <el-select v-model="formData.serviceCodes" placeholder="请选择要扩容的服务" size="small" multiple style="width: 240px;">
          <el-option
            v-for="item in serviceCodeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="license文件" prop="licensePath">
<!--        <el-input v-model="formData.licensePath" placeholder="通过机器码获取license" style="width: 185px;" size="small"></el-input>-->
        <el-upload
          class="upload-demo"
          ref="upload"
          style="display: inline-block"
          :http-request="customUpload"
          :on-progress="onUploadProgress"
          :on-error="onUploadError"
          :on-success="onUploadSuccess"
          :show-file-list="true"
          :file-list="fileList"
          accept=".lic">
<!--          :data="{instanceId: currentInstance && currentInstance.id}"-->
          <el-button size="small" type="primary" style="border: 1px solid #d9d9d9; background-color: white; color: #3366ff; margin-left: -1px;">上传</el-button>
        </el-upload>
      </el-form-item>
      <br/>
<!--      <el-form-item-->
<!--        v-for="server in formData.servers"-->
<!--        label="服务器ip"-->
<!--        :key="server.id">-->
<!--        <el-input v-model="server.ip" placeholder="服务器IP地址" size="small" style="width: 200px"></el-input>-->
<!--      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
    <micro-machine-code ref="MachineCode"></micro-machine-code>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import * as nodeApi from '../api/node_manage_api';
import MicroMachineCode from './MicroMachineCode';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MicroProjectNodeAdd',
  components: { MicroMachineCode },
  props: ['onAdded'],
  created() {
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState('d2admin/user', [
      'info',
    ]),
  },
  data() {
    let validServerList = (rule, value, callback) => {
      if (!value || value.length < 1) {
        callback(new Error('请至少选择一个服务器'));
      } else {
        callback();
      }
    };
    let validServer = (rule, value, callback) => {
      if (value && value !== '') {
        callback();
      } else {
        callback(new Error('请选择一个扩容节点'));
      }
    };
    let validServiceCodeList = (rule, value, callback) => {
      if (value && value.length === 0) {
        callback(new Error('请选择要扩容的服务'));
      } else {
        callback();
      }
    };

    return {
      loadingData: false,
      fileData: new FormData(),
      fileList: [],
      formData: {
        servers: '',
        serviceCodes: 0,
        licensePath: '',
      },
      rules: {
        servers: [
          {validator: validServerList, trigger: 'change'},
        ],
        serviceCodes: [
          {validator: validServiceCodeList, trigger: 'change'},
        ],
      },
      serverList: [
      ],
      // 目前方案中已包含的服务器列
      schemeServerIpList: [
      ],
      serviceCodeList: [

      ],
      schemeId: '',
      enableCluster: false,
      serverItem: {
        id: '',
        name: '',
        ip: '',
        agentPort: 8080,
        sshAccount: 'root',
        sshPassword: '123456',
        sshPort: 22,
        agentStatus: 'noDeploy',
        agentDir: '/home/test/agent',
      },
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      let schemeServerIds = this.serverList.filter(item => this.schemeServerIpList.indexOf(item.ip) !== -1).map(item => item.id);
      this.fileData.append('nodeIds', schemeServerIds.concat(this.formData.servers).join(','));
      this.fileData.append('schemeId', this.schemeId);
      this.fileData.append('serviceCodes', !this.enableCluster ? this.formData.serviceCodes.join(',') : '');
      return false;
    },
    handleMachineCode() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          let schemeServerIds = this.serverList.filter(item => this.schemeServerIpList.indexOf(item.ip) !== -1).map(item => item.id);
          this.$refs.MachineCode.show(this.formData.servers.concat(schemeServerIds));
        }
      });
    },
    initData() {
      nodeApi.listNode()
        .then(res => {
          this.serverList = res.data;
          return api.listScalableService();
        })
        .then(res => {
          this.serviceCodeList = res.data;
        })
        .catch(reason => {
          // do nth
        });
    },
    handleServerChange(val) {
    },
    beforeUpload(file) {
      var fileName = file.name;
      this.fileName = fileName;
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      var reg = /(?:lic)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('上传文件只能是lic类型文件');
        return false;
      }
      return true;
    },
    onUploadSuccess(response) {
      // 处理上传成功
      console.log(response);
    },
    onUploadError() {
    },
    onUploadProgress() {
    },
    show(schemeId, enableCluster, serverIPs) {
      this.showDialog = true;
      this.schemeId = schemeId;
      this.enableCluster = enableCluster;
      this.schemeServerIpList = serverIPs;
      this.fileData = new FormData();
      this.fileList = [];
      this.formData = {
        server: '',
        serviceCodes: 0,
        licensePath: '',
      };
      this.$nextTick(() => {
        this.$refs['formAddNode'].clearValidate();
      });
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
    validateForm() {
      // rules
    },
    execAdd() {
      if (this.$refs.upload) {
        this.$refs.upload.submit();
        if (this.fileData.get('file') === null) {
          this.$message.warning('请选择 license文件');
          return false;
        } else {
          if (!this.beforeUpload(this.fileData.get('file'))) { // 上传前校验
            this.$refs.upload.clearFiles(); // 清空文件列表
            this.fileData = new FormData();
            return false;
          }
        }
        this.loading = true;
        this.$refs['formAddNode'].validate((valid) => {
          if (valid) {
            this.onAdded(api.expandSchemeNode(this.fileData), this.enableCluster); // 将请求的promise返回给调用者
            this.showLoading();
          } else {
            this.loading = false;
            return false;
          }
        });
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
    background-color: white;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }
</style>
