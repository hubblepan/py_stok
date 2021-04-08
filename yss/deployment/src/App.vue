<template>
  <div id="app" style="font-family: PingFangSC, PingFangSC-Regular">
    <router-view />
  </div>
</template>

<script>
import util from '@/libs/util';

export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle',
  },
  created () {
    this.i18nHandle(this.$i18n.locale);
    this.$store.dispatch('d2admin/page/closeAll');
    this.$router.push({'name': 'Home'});
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val);
      document.querySelector('html').setAttribute('lang', val);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
<style>
#app  .el-table__fixed::before {
    z-index: inherit !important;
  }

/*  element-ui table的去除右侧滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
}

</style>
