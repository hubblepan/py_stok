<template>
  <!-- 新增节点 -->
  <el-dialog title="正在处理补丁包" :visible.sync="addNode.showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>

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
      },
      addNode: {
        showDialog: false,
        loading: false,
        formData: {
          name: '',
          ip: '',
          sshAccount: '',
          sshPassword: '',
          sshPort: '',
          installingAgent: true,
        },
      },
    };
  },
  methods: {
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
