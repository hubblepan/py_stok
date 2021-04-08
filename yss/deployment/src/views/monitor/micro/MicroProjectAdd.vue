<template>
  <!-- 新增服务器 -->
  <el-dialog title="添加方案" :visible.sync="showDialog" width="450px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body v-loading="loadingData">
    <el-form label-position="right" label-width="100px" :model="formData" :inline="true" ref="formAddNode" :rules="rules" style="width: 460px; display: inline-block;">
      <el-form-item label="方案名称" prop="name">
        <el-input v-model="formData.name" placeholder="方案名称" style="width: 240px;" size="small"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="方案描述" prop="des">
        <el-input v-model="formData.des" placeholder="方案描述" style="width: 240px;" size="small"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="模板选择" prop="template">
        <el-select v-model="formData.template" placeholder="请选择" size="small" @change="handleServerChange" style="width: 240px;">
          <el-option v-for="item in templateList" :key="item.id"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{item.name}}</span>
            <el-popover
              style="float: right"
              placement="bottom"
              :title="item.name"
              width="200"
              trigger="hover">
              <i slot="reference" class="el-icon-question"></i>
              <span  style="float: left">{{item.des}}</span>
            </el-popover>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务器选择" prop="servers" v-if="formData.serversLimit > 0">
        <el-select v-model="formData.servers" :placeholder="'请选择'+ formData.serversLimit +'个服务器'" size="small" multiple :multiple-limit="formData.serversLimit" style="width: 240px;">
          <el-option
            v-for="item in serverList"
            :key="item.id"
            :label="item.ip"
            :value="item.id">
            <span style="float: left; width: 100px">{{ item.ip }}</span>
            <el-button style="margin-left: 20px; font-size: 13px" type="text" size="mini" v-if="item.multiNetworkCard" @click.stop="handleSwitchNetcard(item)">切网卡</el-button>
          </el-option>
        </el-select>
        <el-button type="text" style="margin-left: 10px" @click="handleMachineCode">机器码</el-button>
      </el-form-item>
      <el-form-item label="license文件" prop="licensePath" v-if="formData.serversLimit > 0">
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
          accept=".lic">
<!--          :data="{instanceId: currentInstance && currentInstance.id}"-->
          <el-button size="small" type="primary" style="border: 1px solid #d9d9d9; background-color: white; color: #3366ff; margin-left: -1px;">上传</el-button>
        </el-upload>
      </el-form-item>
      <br/>
      <el-checkbox v-model="formData.enableCluster" style="margin-left: 20px;" v-if="formData.serversLimit > 1">集群模式</el-checkbox>
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
    <app-loading ref="AppLoading"></app-loading>
    <micro-machine-code ref="MachineCode"></micro-machine-code>
    <micro-netcard-select ref="Netcard" :on-selected="onSelectNetcard"></micro-netcard-select>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import * as nodeApi from '../api/node_manage_api';
import AppLoading from '../../../components/AppLoading';
import MicroMachineCode from './MicroMachineCode';
import MicroProjectNodeAdd from './MicroProjectNodeAdd';
import MicroNetcardSelect from './MicroNetcardSelect';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MicroProjectAdd',
  components: { MicroNetcardSelect, MicroMachineCode },
  props: ['onAdded'],
  created() {
    this.initData();
  },
  computed: {
    ...mapState('d2admin/user', [
      'info',
    ]),
  },
  data() {
    let validTemplateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('方案名称不能为空'));
        return;
      }
      api.schemeExits(this.formData.name)
        .then(res => {
          if (!res.data) {
            callback();
          } else {
            callback(new Error('存在重复的方案名称'));
          }
        })
        .catch(reason => {
          // do nth
          callback(new Error('网络异常'));
        });
    };
    let validTemplateList = (rule, value, callback) => {
      if (value && value !== '') {
        callback();
      } else {
        callback(new Error('请选择一个模板方案'));
      }
    };
    let validServerList = (rule, value, callback) => {
      if (value && value.length !== this.formData.serversLimit) {
        callback(new Error('请选择' + this.formData.serversLimit + '个服务器'));
      } else {
        callback();
      }
    };
    return {
      loadingData: false,
      fileData: new FormData(),
      formData: {
        name: '',
        des: '',
        template: '',
        servers: [],
        serversLimit: 0,
        licensePath: '',
        enableCluster: true,
      },
      rules: {
        name: [
          {required: true, message: '方案名称不能为空', trigger: 'blur'},
          {validator: validTemplateName, trigger: 'blur'},
        ],
        des: [
          {required: true, message: '方案描述不能为空', trigger: 'blur'},
        ],
        template: [
          {validator: validTemplateList, trigger: 'change'},
        ],
        servers: [
          {validator: validServerList, trigger: 'change'},
        ],
      },
      templateList: [

      ],
      templateItem: {
        des: '',
        id: '',
        name: '',
        nodeNum: 0,
      },
      serverList: [
      ],
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
    onNetcardSelected(p, newIp, nodeId) {
      p.then(res => {
        this.$refs.Netcard.closeLoading();
        this.$refs.Netcard.close();
        this.serverList.forEach(item => {
          if (item.id === nodeId) {
            item.ip = newIp;
          }
        });
      })
        .catch(reason => {
          this.$refs.Netcard.closeLoading();
          this.$refs.Netcard.close();
        });
    },
    handleSwitchNetcard(item) {
      this.$refs.Netcard.show(item);
    },
    customUpload(file) {
      this.fileData = new FormData();
      this.fileData.append('file', file.file);
      //   name: name,
      //   templateId: templateId,
      //   nodeIds: nodeIds,
      //   enableCluster: enableCluster,
      this.fileData.append('name', this.formData.name);
      this.fileData.append('templateId', this.formData.template);
      this.fileData.append('nodeIds', this.formData.servers.join(','));
      this.fileData.append('enableCluster', this.formData.enableCluster);
      this.fileData.append('des', this.formData.des);
      this.fileData.append('creator', this.info.name);
      return false;
    },
    handleMachineCode() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.$refs.MachineCode.show(this.formData.servers);
        }
      });
      // api.getMachineCode(this.formData.servers)
      //   .then(res => {
      //     this.$alert(res.data.join('</br>'), '机器码', {
      //       confirmButtonText: '确定',
      //       dangerouslyUseHTMLString: true,
      //     });
      //   })
      //   .catch(reason => {
      //
      //   });

    },
    initData() {
      nodeApi.listNode()
        .then(res => {
          this.serverList = res.data;
        })
        .catch(reason => {
          // do nth
        });
      api.templateList()
        .then(res => {
          this.templateList = res.data;
        })
        .catch(reason => {
          // do nth
        });
    },
    handleServerChange(val) {
      this.templateList.forEach(item => {
        if (item.id === val) {
          this.formData.serversLimit = item.nodeNum;
          this.formData.servers = [];
        }
      });
      if (this.formData.serversLimit === 1) {
        this.formData.enableCluster = false;
      }
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
    show() {
      this.showDialog = true;
      this.fileData = new FormData();
      this.formData = {
        name: '',
        des: '',
        template: '',
        servers: [],
        serversLimit: 0,
        licensePath: '',
        enableCluster: true,
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
            this.onAdded(api.addScheme(this.fileData), this.formData.enableCluster); // 将请求的promise返回给调用者
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
