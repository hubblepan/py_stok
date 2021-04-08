<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="120px" ref="configForm" label-position="left">
      <!--<el-form-item label="注册中心端口" prop="port">-->
      <!--<el-input-number v-model="formData.port" :min="1" :max="65535" placeholder="请输入注册中心端口"></el-input-number>-->
      <!--</el-form-item>-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="注册中心端口" prop="port" style="width: 500px;">
            <el-input :max="65535" :min="1" placeholder="请输入注册中心端口" :title="formData.port" type="number" v-model="formData.port"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数据存放路径" prop="dataStoreDir">
        <el-input placeholder="请输入消数据存放路径" :title="formData.dataStoreDir" v-model="formData.dataStoreDir"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';

export default {
  name: 'NodeServiceSettingsDist',
  props: {
    formData: {
      type: Object,
      require: true,
    },
  },
  data () {
    return {
      configInfoLoading: false, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      rules: {
        // 注册中心端口
        port: [
          { required: true, message: '请输入注册中心端口', trigger: 'blur' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],

        // 数据存放路径
        dataStoreDir: [
          { required: true, message: '请输入数据存放路径', trigger: 'blur' },
          {
            pattern: validate.cateExp().exp,
            message: validate.cateExp().msg,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 子组件校验，传递到父组件
    async validateForm (callback) {
      this.$refs['configForm'].validate(callback);
    },
  },

};
</script>

<style scoped></style>
