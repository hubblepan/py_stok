<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
<!--      <el-dropdown-item @click.native="updatePassword">-->
<!--        <d2-icon name="update-password" class="d2-mr-5"/>-->
<!--        修改密码-->
<!--      </el-dropdown-item>-->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('d2admin/user', [
      'info',
    ]),
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout',
    ]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        confirm: true,
      });
    },
    updatePassword() {
      this.$modal.show('as-modal');
    },
  },
};
</script>
