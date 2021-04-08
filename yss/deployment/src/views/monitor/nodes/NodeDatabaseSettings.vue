<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="90px" label-position="left" ref="configForm">
      <el-row :gutter="10">
        <el-col :span="20" v-if="!formData.isAdvance">
          <el-row>
            <el-col :span="10">
              <el-form-item label="链接地址" prop="dbIp">
                <el-input placeholder="ip地址" v-model="formData.dbIp" :title="formData.dbIp">
                </el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="1">-->
            <!--<div style="text-align: center;line-height: 40px">:</div>-->
            <!--</el-col>-->
            <el-col :span="8">
              <el-form-item label-width="0px" prop="dbPort">
                <el-input :max="65535" :min="0" placeholder="端口号" type="number" v-model="formData.dbPort" :title="formData.dbPort">
                  <template slot="prepend">:</template>
                  <template slot="append">/</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="1">-->
            <!--<div style="text-align: center;line-height: 40px">/</div>-->
            <!--</el-col>-->
            <el-col :span="6">
              <el-form-item label-width="0px" prop="dbName">
                <el-input placeholder="实例名称" v-model="formData.dbName" :title="formData.dbName">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="20" v-if="formData.isAdvance">
          <el-form-item label="链接地址" prop="advanceDbUrl">
            <el-input :rows="1" placeholder="高级配置" v-model="formData.advanceDbUrl" :title="formData.advanceDbUrl"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-checkbox :checked="formData.isAdvance" v-model="formData.isAdvance" @change="changeAdvancedCfg" style="padding-top:10px">高级配置</el-checkbox>
        </el-col>
      </el-row>

      <el-form-item label="用户名" prop="userName" style="width: 84%;">
        <el-input auto-complete="new-userName" placeholder="请输入用户名" v-model="formData.userName" :title="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" style="width: 84%;">
        <el-input
          auto-complete="new-password"
          placeholder="请输入用户密码"
          type="password"
          v-model="formData.password"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';

export default {
  name: 'NodeDatabaseSettings',
  data () {
    return {
      configInfoLoading: false, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      rules: {
        // IP地址
        dbIp: [
          { required: true, message: '请输入IP地址', trigger: 'blur' },
          {
            pattern: validate.ipExp().exp,
            message: validate.ipExp().msg,
            trigger: 'blur',
          },
        ],
        // 端口
        dbPort: [
          { required: true, message: '请输入端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        // 实例名称
        dbName: [{ required: true, message: '请输入实例名称', trigger: 'blur' }],
        // 用户名
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        // 用户密码
        password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
        // 用户密码
        advanceDbUrl: [{ required: true, message: '请输入高级配置', trigger: 'blur' }],
      },
    };
  },
  props: {
    formData: {
      type: Object,
      require: true,
    },
  },
  created () {
  },
  mounted () {
  },
  methods: {
    changeAdvancedCfg (isAdvancedCfg) {
      this.formData.isAdvance = isAdvancedCfg;
      // if (isAdvancedCfg) {
      //   this.formData.dbIp = ''
      //   this.formData.dbPort = ''
      //   this.formData.dbName = ''
      // } else {
      //   this.formData.advanceDbUrl = ''
      // }
    },
    // 子组件校验
    async validateForm (callback, force = false) {
      if (force) {
        this.$refs['configForm'].validate(callback);
        return;
      }
      if (this.formData.userName && this.formData.password) {
        this.$refs['configForm'].validate(callback);
      } else {
        callback(false);
      }
    },

    getFormData() {
      if (!this.formData.isAdvance) {
        this.formData.advanceDbUrl = undefined;
      } else {
        this.formData.dbIp = undefined;
        this.formData.dbPort = undefined;
      }
      return this.formData;
    },
  },
};
</script>

<style scoped>
  .el-form-item--default{
    margin-left: -5px;
    margin-right: -5px;
    margin-top: 2px;
  }

  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
