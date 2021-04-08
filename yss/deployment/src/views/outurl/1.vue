<template>
  <d2-container>
    <div>
      <div v-html="html"></div>
    </div>
  </d2-container>
</template>
<style>

</style>
<script>
export default {
  data() {
    return {
      loading: false,
      html: '外部链接',
    };
  },
  created() {
    // this.reportUrl = '/swagger'
    this.reportUrl = this.$route.meta.url;
    // let p = window.location.protocol
    let a = document.createElement('a');
    a.setAttribute('href', this.reportUrl);
    a.setAttribute('target', '_blank');
    a.click();
    document.getElementsByTagName('body')[0].appendChild(a);
  },
  watch: {
    '$route': function() {
      // 监听路由变化
      this.reportUrl = this.$route.meta.path;
      this.load(this.reportUrl);
    },
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight();// 自适应高宽度
    };
    this.$nextTick(function() {
      this.widthHeight();
    });
    // this.load(this.url)
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 146;
      this.searchTableWidth = window.innerWidth - 280;
    },
  },
};
</script>
