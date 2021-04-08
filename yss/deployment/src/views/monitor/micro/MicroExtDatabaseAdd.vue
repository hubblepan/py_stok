<template>
  <!-- 新增服务器 -->
  <el-dialog title="新增数据库" :visible.sync="showDialog" width="600px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="100px" :model="formData" :inline="true" :rules="rules" ref="formAddNode">
      <el-form-item label="简要描述" prop="des">
        <el-input v-model="formData.des" placeholder="简要描述" size="small" style="width: 200px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="数据库类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择" size="small">
          <el-option label="mysql" value="mysql">
          </el-option>
          <el-option label="oracle" value="oracle">
          </el-option>
        </el-select>
      </el-form-item>
      <br/>
      <el-form-item label="数据库地址" prop="dbIp">
        <el-input placeholder="ip地址" v-model="formData.ip" size="small" style="width: 200px" v-if="!isRac || formData.type !== 'oracle'"></el-input>
        <div style="display: inline-block" v-if="isRac && formData.type === 'oracle'">
          <el-input placeholder="rac配置" v-model="formData.racUrl" size="small" style="width: 320px" readonly></el-input>
          <el-button type="text" style="width: 40px" @click="handleEditRac">编辑</el-button>
        </div>
      </el-form-item>
      <el-form-item label="" prop="port" v-if="!isRac  || formData.type !== 'oracle'">
        <el-input v-model="formData.port" size="small" placeholder="端口" style="width: 60px"></el-input>
      </el-form-item>
      <el-form-item label="" prop="dbName" v-if="formData.type === 'oracle' && !isRac">
        <el-input v-model="formData.dbName" placeholder="数据库名" size="small" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item >
        <el-checkbox v-model="isRac" v-if="formData.type === 'oracle'" style="margin-left: 10px;" @change="handleOnRacChange">rac模式</el-checkbox>
      </el-form-item>
      <br/>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formData.userName" placeholder="root" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="密码" prop="password" :show-password="false" type="password">
        <el-input v-model="formData.password" size="small" placeholder="******" :show-password="false" style="width: 160px"  type="password"></el-input>
      </el-form-item>
    </el-form>
    <micro-rac-edit ref="RacEdit" :on-added="handleOnRacEdit"></micro-rac-edit>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small" type="text">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import MicroRacEdit from './MicroRacEdit';
export default {
  name: 'MicroExtDatabaseAdd',
  components: { MicroRacEdit },
  props: ['onAdded'],
  watch: {

  },
  data() {
    return {
      rules: {
        ip: [
          { required: true, message: '请输入数据库地址', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],
        port: [
          { required: true, message: '请输入数据库端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        dbName: [
          { required: true, message: '请输入数据库的名称', trigger: 'blur' },
        ],
        des: [
          { required: true, message: '请输入简要描述', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入数据库账户', trigger: 'blur' },
        ],
        // ssh密码
        password: [
          { required: true, message: '请输入数据库密码' },
        ],
        racUrl: [
          { required: true, message: '请输入rac信息', trigger: 'blur' },
        ],
      },
      formData: {
        type: 'oracle',
        des: '',
        ip: '',
        port: '',
        dbName: '',
        userName: '',
        password: '',
        racUrl: '',
        racData: '',
        schemeId: '',
      },
      isRac: false,
      showDialog: false,
      loading: false,
      isEdit: false,
    };
  },
  methods: {
    show(schemeId, data) {
      this.showDialog = true;
      this.loading = false;
      this.$nextTick(() => {
        this.$refs['formAddNode'] && this.$refs['formAddNode'].clearValidate();
      });
      if (data) {
        this.isEdit = true;
        Object.assign(this.formData, data);
      } else {
        this.isEdit = false;
        this.formData = {
          type: 'oracle',
          ip: '',
          des: '',
          port: '',
          dbName: '',
          userName: '',
          password: '',
          racUrl: '',
          racData: '',
          schemeId: schemeId,
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
    handleEditRac() {
      this.$refs.RacEdit.show(this.formData.racData);
    },
    handleOnRacEdit(racData, racUrl) {
      if (racData) {
        this.formData.racUrl = racUrl;
        this.formData.racData = racData;
      } else {
        if (!this.formData.racUrl) {
          this.isRac = false;
        }
      }
    },
    handleOnRacChange(val) {
      if (val) {
        if (!this.formData.racUrl) {
          // show rac edit dialog
          this.$refs.RacEdit.show();
        }
      }
    },
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.onAdded(api.updateExtDbConfig(this.formData)); // 将请求的promise返回给调用者
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
