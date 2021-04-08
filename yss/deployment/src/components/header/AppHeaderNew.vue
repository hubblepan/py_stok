<template>
  <div>
    <div style="float: right; margin-right: 20px; height: 48px; line-height: 48px;">
      <slot name="button-group">
        <el-button type="primary" size="mini" style="visibility: hidden">按钮</el-button>
      </slot>
    </div>
    <div>
      <slot name="title">
        <div class="title-container">
          <i class="el-icon-back" style="font-size: 20px; font-weight: 600; vertical-align: middle; margin-right: 10px;" @click="handleBack" v-if="showBack"></i>
          <span style="vertical-align: top;">{{title}}</span>
        </div>
      </slot>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeaderNew',
  props: ['title', 'showBack'],
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
  /deep/ .el-divider--horizontal {
    margin: 0px;
    padding: 0px;
  }
  .title-container {
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: rgba(0,0,0,0.8);
    line-height: 48px;
    margin-left: 24px;
  }
</style>
