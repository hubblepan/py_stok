<template>
  <div>
    <div style="float: right; margin-right: 20px; height: 60px; line-height: 60px;">
      <slot>
        <el-button type="primary" size="mini" style="visibility: hidden">按钮</el-button>
      </slot>
    </div>
    <div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">{{title}}</div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['title'],
};
</script>

<style scoped>
  /deep/ .el-divider--horizontal {
    margin: 0px;
    padding: 0px;
  }
</style>
