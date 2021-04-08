<template>
  <!-- 新增节点 -->
  <el-dialog title="修改节点" :visible.sync="updateNode.showDialog" width="580px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="80px" :model="updateNode.formData" :inline="true" :rules="updateNode.systemType === 'windows' ? windowsRules : linuxRules" ref="formUpdateNode">
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="updateNode.formData.name" style="width: 160px;" size="small">节点1</el-input>
      </el-form-item>
      <br/>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="updateNode.formData.ip" style="width: 160px" size="small" :disabled="disableChangeIp" readonly></el-input>
        <el-button size="mini" type="text" style="margin-left: 20px" @click="handleSwitchNetcard" v-if="updateNode.formData.multiNetworkCard">切网卡</el-button>
      </el-form-item>
<!--      <el-form-item label="代理端口">-->
<!--        <el-input v-model="updateNode.formData.port" style="width: 80px" size="small"></el-input>-->
<!--      </el-form-item>-->
      <br/>
      <el-form-item label="ssh账号" prop="sshAccount">
        <el-input v-model="updateNode.formData.sshAccount" size="small" style="width: 160px"></el-input>
      </el-form-item>

      <el-form-item label="ssh密码" prop="sshPassword">
        <el-input v-model="updateNode.formData.sshPassword" size="small" :show-password="false" style="width: 160px" type="password"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="ssh端口" prop="sshPort">
        <el-input v-model="updateNode.formData.sshPort" size="small" style="width: 80px"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="updateNode.showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execUpdate" size="small" :loading="updateNode.loading">确 定</el-button>
      </span>
    <micro-netcard-select ref="Netcard" :on-selected="onNetcardSelected"></micro-netcard-select>
  </el-dialog>
</template>

<script>
import * as api from '../api/node_manage_api';
import * as validate from '@/libs/validate';
import MicroNetcardSelect from '../micro/MicroNetcardSelect';
export default {
  name: 'NodeUpdate',
  components: { MicroNetcardSelect },
  props: ['onUpdated'],
  data() {
    return {
      disableChangeIp: false,
      windowsRules: {
        name: [
          { required: true, message: '请输入节点的名称', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        ip: [
          { required: true, message: '请输入节点的IP地址', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],
        // sshAccount: [
        //   { required: true, message: '请输入SSH账户', trigger: 'blur' },
        //   { validator: validate.isNotEmpty, trigger: 'blur' },
        // ],
        // // tomcat端口
        // sshPort: [
        //   { required: true, message: '请输入SSH端口' },
        //   {
        //     pattern: validate.portExp().exp,
        //     message: validate.portExp().msg,
        //     trigger: 'blur',
        //   },
        // ],
        // // ssh密码
        // sshPassword: [
        //   { required: true, message: '请输入SSH密码' },
        //   {
        //     pattern: validate.isNotEmpty.exp,
        //     message: validate.isNotEmpty.msg,
        //     trigger: 'blur',
        //   },
        // ],
      },
      linuxRules: {
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
      },
      updateNode: {
        showDialog: false,
        loading: false,
        systemType: '',
        formData: {
          name: '',
          ip: '',
          port: 0,
          sshAccount: '',
          sshPassword: '',
          sshPort: '',
          id: '',
        },
      },
    };
  },
  methods: {
    onNetcardSelected(p, newIp) {
      p.then(res => {
        this.$refs.Netcard.closeLoading();
        this.$refs.Netcard.close();
        this.formData.ip = newIp;
      })
        .catch(reason => {
          this.$refs.Netcard.closeLoading();
          this.$refs.Netcard.close();
        });
    },
    handleSwitchNetcard(node) {
      this.$refs.Netcard.show(this.updateNode.formData);
    },
    show(nodeData) {
      this.updateNode.showDialog = true;
      this.disableChangeIp = nodeData.agentStatus !== 'noDeploy';
      // this.disableChangeIp = false;
      this.systemType = nodeData.systemType;
      Object.assign(this.updateNode.formData, nodeData);
      this.$nextTick(() => {
        this.$refs['formUpdateNode'].clearValidate();
      });
    },
    close() {
      this.updateNode.showDialog = false;
    },
    showLoading() {
      this.updateNode.loading = true;
    },
    closeLoading() {
      this.updateNode.loading = false;
    },
    execUpdate() {
      this.$refs['formUpdateNode'].validate((valid) => {
        if (valid) {
          this.updateNode.loading = true;
          this.onUpdated(api.updateNode(this.updateNode.formData));
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
