<template>
  <!-- 新增服务器 -->
  <el-dialog title="RAC模式" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false"
             :before-close="handleCancel" append-to-body>
    <el-form label-position="right" label-width="100px" :model="formData" :inline="false" :rules="rules" ref="formAddNode">
      <el-form-item
        v-for="(ip, index) in formData.ipList"
        :label="'ip' + index"
        :key="ip.key"
        :prop="'ipList.' + index + '.value'"
        :rules="rules.ip">
        <el-input v-model="ip.value" size="small" placehoder="127.0.0.1" style="width: 240px; margin-right: 15px"></el-input>
        <el-button  circle icon="el-icon-delete" @click.prevent="removeIp(ip)" size="mini" v-if="index > 1"></el-button>
        <el-button circle icon="el-icon-plus" @click.prevent="addIp" size="mini" v-if="index === formData.ipList.length - 1"></el-button>
      </el-form-item>
      <el-form-item label="端口" prop="dbPort">
        <el-input v-model="formData.dbPort" size="small" placeholder="1521" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="实例名称" prop="dbName">
        <el-input v-model="formData.dbName" size="small" placeholder="orcl" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="负载均衡" prop="loadBalance">
        <el-switch
          v-model="formData.loadBalance"
          active-text="开启"
          inactive-text="">
        </el-switch>
      </el-form-item>
      <el-form-item label="故障转移" prop="failover">
        <el-switch
          v-model="formData.failOver"
          active-text="开启"
          inactive-text="">
        </el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="small" type="text">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'MicroRacEdit',
  props: ['onAdded'],
  watch: {

  },
  data() {
    return {
      rules: {
        dbName: [
          { required: true, message: '请输入实例名称', trigger: 'blur' },
        ],
        ip: [
          { required: true, message: '请输入IP地址', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],
        dbPort: [
          { required: true, message: '请输入端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
      },
      showDialog: false,
      loading: false,
      formData: {
        ipList: [{
          key: Date.now(),
          value: '',
        }],
        dbPort: 0,
        dbName: '',
        loadBalance: false,
        failOver: true,
      },
    };
  },
  methods: {
    show(racData) {
      this.showDialog = true;
      if (racData) {
        this.formData = JSON.parse(racData);
      } else {
        this.formData = {
          ipList: [{
            key: Date.now(),
            value: '',
          },
          {
            key: Date.now() + 1,
            value: '',
          }],
          dbPort: 0,
          dbName: '',
          loadBalance: false,
          failOver: true,
        };
      }
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
    removeIp(ip) {
      let index = this.formData.ipList.indexOf(ip);
      if (index !== -1 && index !== 0) {
        this.formData.ipList.splice(index, 1);
      }
    },
    addIp() {
      this.formData.ipList.push({
        value: '',
        key: Date.now(),
      });
    },
    generateRacUrl() {
      let addressList = this.formData.ipList.map(item => {
        return `(ADDRESS=(PROTOCOL=TCP)(HOST=${item.value})(PORT = ${this.formData.dbPort}))`;
      }).join();
      let loadBanance = this.formData.loadBalance ? 'ON' : 'OFF';
      let failover = this.formData.failOver ? 'ON' : 'OFF';
      let dbName = this.formData.dbName;
      let racUrl = `jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS_LIST= (LOAD_BALANCE=${loadBanance})(FAILOVER=${failover})${addressList})(CONNECT_DATA=(SERVER = DEDICATED)(SERVICE_NAME=${dbName})(failover_mode=(type=select)(method=basic))))`;
      return racUrl;
    },
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.onAdded(JSON.stringify(this.formData), this.generateRacUrl()); // 将请求的promise返回给调用者
          this.close();
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.onAdded('', '');
      this.close();
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
    font-weight: 600;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }
</style>
