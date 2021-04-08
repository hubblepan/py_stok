<template>
  <!-- 新增服务器 -->
  <el-dialog :title="'编辑' + formData.serviceCode" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="100px" :model="formData" :inline="true" :rules="rules" ref="formAddNode">
      <el-form-item label="服务地址" prop="clusterUrl">
        <el-input v-model="formData.clusterUrl" placeholder="" size="small" style="width: 400px"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="redis密码" prop="extraParameter.redisPassword" :show-password="false" type="password" v-if="formData.serviceCode === 'redis'">
        <el-input v-model="formData.extraParameter.redisPassword" size="small" placeholder="******" :show-password="false" style="width: 160px"  type="password"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small" type="text">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroExtServiceAdd',
  props: ['onAdded'],
  watch: {

  },
  data() {
    return {
      rules: {
        clusterUrl: [
          { required: true, message: '请输入url地址', trigger: 'blur' },
        ],
        redisPassword: [
          { required: true, message: '请输入redis密码', trigger: 'blur' },
        ],
        extraParameter: {
          redisPassword: [{required: true, message: 'redis密码不能为空', trigger: 'blur'}],
        },
      },
      showDialog: false,
      loading: false,
      formData: {
        clusterAddr: '',
        clusterIps: '',
        clusterName: '',
        clusterUrl: '',
        id: '',
        schemeId: '',
        schemeName: '',
        serviceCode: '',
        type: '',
        used: true,
        extraParameter: {
          redisPassword: '',
        },
      },
    };
  },
  methods: {
    show(item) {
      this.showDialog = true;
      if (!item.extraParameter) {
        item.extraParameter = {};
      }
      if (item.serviceCode === 'redis') {
        if (!item.extraParameter.redisPassword) {
          item.extraParameter.redisPassword = '';
        }
      }
      Object.assign(this.formData, item);
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
    execAdd() {
      this.$refs['formAddNode'].validate((valid) => {
        if (valid) {
          this.loading = true;
          let data = Object.assign({}, this.formData);
          data.extraParameter = JSON.stringify(data.extraParameter);
          this.onAdded(api.saveExtService(data)); // 将请求的promise返回给调用者
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
