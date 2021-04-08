<template>
  <!-- 新增节点 -->
  <el-dialog title="修改Tomcat名称" :visible.sync="showDialog" width="340px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="120px" :model="formData" :inline="true" style="height: 60px;" :rules="rules" ref="Form">
      <el-form-item label="Tomcat名称" prop="tomcatName">
        <el-input v-model="formData.tomcatName" placeholder="Tomcat名称" style="width: 160px;" size="small" ref="InputName" v-on:keyup.enter.native="onEnterName"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="mini" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/monit_api';
export default {
  name: 'TomcatModify',
  props: ['onSave'],
  data() {
    return {
      rules: {
        tomcatName: [
          { required: true, message: '请输入Tomcat名称', trigger: 'blur' },
          { validator: validate.isNotEmpty, trigger: 'blur' },
        ],
      },
      showDialog: false,
      loading: false,
      tomcatInfo: null,
      formData: {
        tomcatName: '',
      },
    };
  },
  methods: {
    show(tomcatInfo) {
      this.showDialog = true;
      this.tomcatInfo = tomcatInfo;
      this.formData = {
        tomcatName: '',
      };
      this.loading = false;
      this.$nextTick(() => {
        this.$refs.InputName.focus();
        this.$refs['Form'].clearValidate();
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
      this.execAdd();
    },
    execAdd() {
      this.$refs['Form'].validate((valid) => {
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
    margin-left: 140px;
    float: left;
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
