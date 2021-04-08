<template>
  <!-- 新增节点 -->
  <el-dialog title="添加节点" :visible.sync="addNode.showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="100px" :model="addNode.formData" :inline="true" style="height: 320px;" :rules="rules" ref="formAddNode">
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="addNode.formData.name" placeholder="节点名称" style="width: 160px;" size="small">节点1</el-input>
      </el-form-item>
      <br/>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="addNode.formData.ip" style="width: 160px" placeholder="127.0.0.1" size="small"></el-input>
      </el-form-item>
<!--      <el-form-item label="代理端口">-->
<!--        <el-input v-model="addNode.formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
<!--      </el-form-item>-->
      <br/>
      <el-form-item label="ssh账号" prop="sshAccount">
        <el-input v-model="addNode.formData.sshAccount"  @input="handleAccountChange" placeholder="root" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="ssh端口" prop="sshPort">
        <el-input v-model="addNode.formData.sshPort" size="small" placeholder="22" style="width: 80px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="ssh密码" prop="sshPassword" :show-password="false" type="password">
        <el-input v-model="addNode.formData.sshPassword" size="small" placeholder="******" :show-password="false" style="width: 160px"  type="password"></el-input>
      </el-form-item>
      <el-form-item label="代理端目录" prop="agentDir">
        <el-input v-model="addNode.formData.agentDir" @change="addNode.autoChangeAgentDir = false" placeholder="/home/root" size="small" style="width: 430px"></el-input>
      </el-form-item>
      <br/>
      <el-checkbox v-model="addNode.formData.installingAgent" style="margin-left: 20px;">同时安装代理端</el-checkbox>
      <br/>
      <span v-if="addNode.formData.installingAgent" style="font-size: 12px; color: #909399; margin-left: 20px;">提示: 安装代理端可能会花费几分钟时间，请耐心等待</span>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="addNode.showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="addNode.loading">{{addNode.loading ? '安装中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'NodeAdd',
  props: ['onAdded'],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入节点的名称', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        ip: [
          { required: true, message: '请输入节点的IP地址', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],
        sshAccount: [
          { required: true, message: '请输入SSH账户', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        // tomcat端口
        sshPort: [
          { required: true, message: '请输入SSH端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        // ssh密码
        sshPassword: [
          { required: true, message: '请输入SSH密码' },
          {
            pattern: validate.isNotEmpty.exp,
            message: validate.isNotEmpty.msg,
            trigger: 'blur',
          },
        ],
        agentDir: [
          { required: true, message: '请输入代理端存放地址', trigger: 'blur' },
          {
            pattern: validate.cateExp().exp,
            message: validate.cateExp().msg,
            trigger: 'blur',
          },
        ],
      },
      addNode: {
        showDialog: false,
        loading: false,
        autoChangeAgentDir: true,
        formData: {
          name: '',
          ip: '',
          sshAccount: '',
          sshPassword: '',
          sshPort: '',
          installingAgent: true,
          agentDir: '',
        },
      },
    };
  },
  methods: {
    handleAccountChange(val) {
      if (this.addNode.autoChangeAgentDir) {
        if (val === 'root') {
          this.addNode.formData.agentDir = '/home';
        } else {
          this.addNode.formData.agentDir = '/home/' + val;
        }
      }
    },
    show() {
      this.addNode.showDialog = true;
      this.$nextTick(() => {
        this.$refs['formAddNode'].clearValidate();
        Object.assign(this.addNode.formData, {
          name: '',
          ip: '',
          sshAccount: '',
          sshPassword: '',
          sshPort: '',
          installingAgent: true,
          agentDir: '',
        });
      });
    },
    close() {
      this.addNode.showDialog = false;
    },
    closeLoading() {
      this.addNode.loading = false;
    },
    showLoading() {
      this.addNode.loading = true;
    },
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.addNode.loading = true;
          this.onAdded(api.createNode(this.addNode.formData)); // 将请求的promise返回给调用者
          // show loading
          this.showLoading();
        } else {
          return false;
        }
      });
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
</style>
