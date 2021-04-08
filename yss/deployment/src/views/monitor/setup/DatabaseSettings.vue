<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="90px" label-position="left" ref="configForm">
      <el-row :gutter="10">
        <el-col :span="20" v-if="!isAdvancedCfg">
          <el-row>
            <el-col :span="12">
              <el-form-item label="链接地址" prop="dbIp">
                <el-input placeholder="ip地址" v-model="formData.dbIp" :title="formData.dbIp">
                </el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="1">-->
            <!--<div style="text-align: center;line-height: 40px">:</div>-->
            <!--</el-col>-->
            <el-col :span="6">
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

        <el-col :span="20" v-if="isAdvancedCfg">
          <el-form-item label="链接地址" prop="advanceDbUrl">
            <el-input :rows="2" placeholder="高级配置" type="textarea" v-model="formData.advanceDbUrl" :title="formData.advanceDbUrl"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-checkbox :checked="checkAdvancedCfg" v-model="checkAdvancedCfg" @change="changeAdvancedCfg" style="padding-top:10px">高级配置</el-checkbox>
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
import * as api from '../api/node_deploy_api';

export default {
  name: 'DatabaseSettings',
  data () {
    return {
      configInfoLoading: true, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      isAdvancedCfg: false,
      checkAdvancedCfg: false,
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
    this.initForm();
  },
  mounted () {
    this.initEdit();
  },
  methods: {
    // 初始化表单
    async initForm () {
      let { tomcatSelected } = this.$parent.$data;
      const isEmptyData = Object.keys(this.formData).some((key) => this.formData[key] === '');
      // 需要判断是否初始化 ,如为空则重新请求
      if (isEmptyData) {
        this.configInfoLoading = true;
        this.editState = false;
        api.getDBConfig([tomcatSelected.id])
          .then(res => {
            this.configInfoLoading = false;
            this.editState = true;
            this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
            // 将tomcat 配置列表更新到每个Tomcat card界面
            this.$parent.initForm(res.data[0]);
            if (res.data[0] && res.data[0].advanceDbUrl !== null && res.data[0].advanceDbUrl !== '') {
              this.$nextTick(() => {
                this.isAdvancedCfg = true;
                this.checkAdvancedCfg = true;
              });
            }
          })
          .catch(reason => {
            // do nothings
            this.configInfoLoading = false;
            this.editState = true;
            this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
          });
      } else {
        this.configInfoLoading = false;
        this.editState = true;
        // 高级配置不为空，则显示高级配置
        if (this.formData.advanceDbUrl !== null && this.formData.advanceDbUrl !== '') {
          this.isAdvancedCfg = true;
          this.checkAdvancedCfg = true;
        }
      }
      this.$emit('editState', this.editState, this.configInfoLoading); // 禁用或启用父组件按钮
    },
    changeAdvancedCfg (isAdvancedCfg) {
      this.isAdvancedCfg = isAdvancedCfg;
    },
    // 子组件校验
    async validateForm () {
      const ret = await new Promise((resolve, reject) => {
        this.$refs['configForm'].validate((valid) => {
          resolve(valid);
        });
      });
      return ret;
    },
    // 保存
    async saveForm () {
      let data = {};
      for (let attr in this.formData) {
        if (attr !== 'isValid') {
          if (!this.isAdvancedCfg) {
            // 如果没有高级配置，不取advanceDbUrl
            if (attr !== 'advanceDbUrl') {
              data[attr] = this.formData[attr];
            }
          } else {
            // 否则不取dbIp,dbPort,dbName
            if (attr !== 'dbIp' && attr !== 'dbPort' && attr !== 'dbName') {
              data[attr] = this.formData[attr];
            }
          }
        }
      }
      const res = await api.saveDBConfig([data]);
      return res;
    },
    initEdit () {
      let form = document.querySelector('#configForm');
      let element = form.elements;
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('change', () => {
          this.$parent.setEdit(true);
        });
      }
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
