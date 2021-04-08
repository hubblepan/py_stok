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
import axios from 'axios';

const http = axios.create({
  timeout: 5000, // 请求超时时间
});
export default {
  data() {
    return {
      loading: false,
      html: '',
    };
  },
  created() {
    // this.reportUrl = '/swagger'
    this.reportUrl = this.$route.meta.path;
    this.load(this.reportUrl);
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
    load(url) {
      if (url && url.length > 0) {
        // 加载中
        this.loading = true;
        let param = {
          accept: 'text/html, text/plain',
        };
        http.get(url, param).then((response) => {
          this.loading = false;
          // 处理HTML显示
          // alert(response.data)
          this.html = response.data;
        }).catch(() => {
          this.loading = false;
          this.html = '加载失败';
        });
      }
    },
  },
};
</script>
