<template>
  <!-- 新增节点 -->
  <el-dialog title="添加查询参数" :visible.sync="addQuery.showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-form label-position="right" label-width="90px" :model="addQuery.formData" :inline="true" ref="formAddQuery">
      <el-form-item label="参数别名" required>
        <el-input v-model="addQuery.formData.name" placeholder="查询参数别名" style="width: 160px;" size="small"></el-input>
      </el-form-item>

      <el-form-item label="参数名称" required>
        <el-input v-model="addQuery.formData.key" style="width: 160px" placeholder="参数名称" size="small"></el-input>
      </el-form-item>

      <el-form-item label="参数类型" required>
        <el-select v-model="addQuery.formData.type" placeholder="请选择参数类型" size="small" style="width: 160px">
          <el-option label="日期时间" value="datetime"></el-option>
          <el-option label="单选组" value="ratio"></el-option>
          <el-option label="数字" value="number"></el-option>
          <el-option label="文本" value="text"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="默认值" prop="default">
        <el-input v-model="addQuery.formData.default" :placeholder="addQuery.formData.type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : ''" size="small" style="width: 160px"></el-input>
      </el-form-item>

      <el-form-item label="是否必传" prop="required">
        <el-checkbox v-model="addQuery.formData.required"></el-checkbox>
<!--        <el-input v-model="" size="small" placeholder="22" style="width: 80px"></el-input>-->
      </el-form-item>
      <br/>
      <div v-if="addQuery.formData.type === 'ratio'">
        <el-form-item
          v-for="(option, index) in addQuery.formData.group"
          :label="'选项' + index"
          :key="option.value"
          required>
          <el-input v-model="option.title" placeholder="选项名称" style="width: 120px;" size="small"></el-input>
          <el-input v-model="option.value" placeholder="选项值" style="width: 120px; margin-left: 20px;" size="small"></el-input>
          <el-button style="margin-left: 20px;" @click.prevent="removeOption(option)" icon="el-icon-delete" circle v-if="index > 1" size="mini"></el-button>
          <el-button style="margin-left: 20px;" @click.prevent="addOption" icon="el-icon-plus" circle v-if="index === (addQuery.formData.group.length - 1)" size="mini"></el-button>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="addQuery.showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="addQuery.loading">{{addQuery.loading ? '安装中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'SceneQueryAdd',
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
      addQuery: {
        showDialog: false,
        loading: false,
        formData: {
          name: '',
          type: '',
          key: '',
          default: '',
          required: false,
          group: [
            {
              title: '',
              value: '1',
            },
            {
              title: '',
              value: '2',
            },
          ],
        },
      },
    };
  },
  methods: {
    show() {
      this.addQuery.showDialog = true;
    },
    close() {
      this.addQuery.showDialog = false;
    },
    closeLoading() {
      this.addQuery.loading = false;
    },
    showLoading() {
      this.addQuery.loading = true;
    },
    removeOption(item) {
      let index = this.addQuery.formData.group.indexOf(item);
      if (index !== -1) {
        this.addQuery.formData.group.splice(index, 1);
      }
    },
    addOption() {
      this.addQuery.formData.group.push({
        title: '',
        value: '',
      });
    },
    execAdd() {
      this.$refs['formAddQuery'].validate((valid) => {
        if (valid) {
          this.addQuery.loading = true;
          this.onAdded(api.createNode(this.addQuery.formData)); // 将请求的promise返回给调用者
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
