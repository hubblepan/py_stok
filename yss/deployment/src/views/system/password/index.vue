<template>
  <modal name="as-modal" height="auto" :scrollable="true">
    <div
      style="background:#f8f8f9; height:30px;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:24px; color:#35495E">
      修改密码
    </div>
    <div class="page-login--form">
      <el-card shadow="never">
        <el-form ref="userForm" :rules="rules" :model="userData" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userData.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="newPassword">
            <el-input type="password" v-model="userData.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="userData.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="secondPassword">
            <el-input type="password" v-model="userData.secondPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="update">更新</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userData: {
        username: 'admin',
        password: '',
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入老密码',
            trigger: 'blur',
          },
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
          },
        ],
        secondPassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions('d2admin/account', [
      'updateUserPassword',
    ]),
    update() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.updateUserPassword(this.userData).then(() => {
          });
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查');
        }
      });
    },
    onCancel() {
      this.userData = { username: 'admin' };
      this.$modal.hide('as-modal');
    },
  },
};
</script>
