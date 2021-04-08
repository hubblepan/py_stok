<template>
  <!-- 新增节点 -->
  <el-dialog title="配置数据库账号密码" :visible.sync="showDialog" width="340px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="120px" :model="formData" :inline="true" style="height: 120px;" :rules="rules" ref="formDbSetting">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="formData.user" placeholder="用户名" style="width: 160px;" size="small" ref="InputName" v-on:keyup.enter.native="onEnterName"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" size="small" type="password" placeholder="******" :show-password="false" style="width: 160px" ref="InputPwd" v-on:keyup.enter.native="onEnterPwd"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/monit_api';
export default {
  name: 'MonitDbSetting',
  props: ['onSave'],
  data() {
    return {
      rules: {
        user: [
          { required: true, message: '请输入数据库账号', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
        // ssh密码
        password: [
          { required: true, message: '请输入数据库密码' },
          {
            pattern: validate.isNotEmpty.exp,
            message: validate.isNotEmpty.msg,
            trigger: 'blur',
          },
        ],
      },
      showDialog: false,
      loading: false,
      tomcatId: '',
      formData: {
        user: '',
        password: '',
      },
    };
  },
  methods: {
    show(tomcatId) {
      this.showDialog = true;
      this.tomcatId = tomcatId;
      this.formData = {
        user: '',
        password: '',
      };
      this.loading = false;
      this.execGetOracleConfig();
      this.$nextTick(() => {
        this.$refs.InputName.focus();
        this.$refs['formDbSetting'].clearValidate();
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
    onEnterName() {
      this.$refs.InputPwd.focus();
    },
    onEnterPwd() {
      this.execAdd();
    },
    execGetOracleConfig() {
      api.getOracleConfig(this.tomcatId)
        .then(res => {
          res.data && res.data.user && (this.formData = res.data);
        })
        .catch(reason => {
          // do nth
        });
    },
    execAdd() {
      this.$refs['formDbSetting'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.onSave(api.saveOracleConfig(this.tomcatId, this.formData.user, this.formData.password)); // 将请求的promise返回给调用者
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
    margin-right: 50px;
    float: right;
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
