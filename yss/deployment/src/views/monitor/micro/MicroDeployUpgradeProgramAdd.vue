<template>
  <!-- 新增程序 -->
  <el-dialog title="添加程序" :visible.sync="addNode.showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="left" label-width="100px" :model="formData" style="margin-left: 10px" ref="formAddNode">
      <el-form-item label="程序" prop="name">
        <el-cascader
          v-model="formData.program"
          :options="options"
          size="small"
          style="width: 300px">
        </el-cascader>
<!--        <el-input v-model="formData.name" placeholder="服务器名称" style="width: 160px;" size="small">服务器1</el-input>-->
      </el-form-item>
      <el-form-item label="服务器地址" prop="ip">
        <el-select v-model="formData.ip" placeholder="请选择" size="small" multiple @change="handleServerChange">
          <el-option
            label="192.168.4.225"
            value="192.168.4.225">
          </el-option>
          <el-option
            label="192.168.4.226"
            value="192.168.4.226">
          </el-option>
          <el-option
            label="192.168.4.227"
            value="192.168.4.227">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="代理端口">-->
<!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item
        v-for="server in formData.servers"
        label="程序路径"
        :key="server.ip">
        <el-input v-model="server.dirs" placeholder="程序部署路径, 多个路径用';'隔开" size="small" style="width: 300px" type="textarea" :rows="2"></el-input>
        {{'  (' + server.ip + ')'}}
<!--        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
      </el-form-item>
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
  name: 'MicroDeployUpgradeProgramAdd',
  props: ['onAdded'],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入服务器的名称', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        ip: [
          { required: true, message: '请输入服务器的IP地址', trigger: 'blur' },
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
      formData: {
        program: [],
        name: '',
        ip: [],
        sshAccount: '',
        dirs: '',
        servers: [],
      },
      options: [
        {
          id: 1,
          value: 'osgi-fast',
          label: 'osgi-fast',
          children: [{
            id: 2,
            value: 'V1.0.0.1',
            label: 'V1.0.0.1',
            children: [{
              id: 3,
              value: '3',
              label: '可执行.jar',
            }, {
              id: 4,
              value: '4',
              label: '清算插件.jar',
            }, {
              id: 5,
              value: '5',
              label: '算法公式.jar',
            }],
          }],
        }, {
          id: 6,
          label: 'osgi-uco',
          value: 'osgi-uco',
          children: [{
            id: 7,
            value: 'V2.0.0.1',
            label: 'V2.0.0.1',
            children: [{
              id: 8,
              value: '8',
              label: '可执行.jar',
            }, {
              id: 9,
              value: '9',
              label: '清算插件.jar',
            }, {
              id: 10,
              value: '10',
              label: '算法公式.jar',
            }],
          }],
        }
      ],
      addNode: {
        showDialog: false,
        loading: false,

      },
    };
  },
  methods: {
    show() {
      this.addNode.showDialog = true;
      this.$nextTick(() => {
        this.$refs['formAddNode'].clearValidate();
        Object.assign(this.formData, {
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
    handleServerChange(val) {
      this.formData.servers = [];
      val.forEach(item => {
        this.formData.servers.push({
          ip: item,
          dirs: '',
        });
      });
    },
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.addNode.loading = true;
          this.onAdded(api.createNode(this.formData)); // 将请求的promise返回给调用者
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

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }
</style>
