<template>
  <div id="app">
    <iframe
      style="border:none"
      v-bind:src="reportUrl"
    ></iframe>
  </div>
</template>
<script>
// import Vue from 'vue'
export default {
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 146;
      this.searchTableWidth = window.innerWidth - 280;
    },
  },
  data() {
    return {
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
    };
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight();// 自适应高宽度
    };
    this.$nextTick(function() {
      this.widthHeight();
    });
  },
  created() {
    this.reportUrl = this.$route.meta.url;
  },
  watch: {
    '$route': function() {
      // 监听路由变化
      this.reportUrl = this.$route.meta.url;
    },
  },
};
</script>
<style lang="scss">
#app iframe {
  width: 100%;
  height: 100%;
}
</style>
