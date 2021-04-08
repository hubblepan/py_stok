<template>
  <div>
    <my-terminal :terminal="terminal" :ws="ws"></my-terminal>
  </div>
</template>

<script>
import Console from './Console';

export default {
  name: 'WebSSH',
  created() {
    this.ws = this.$route.params.ws;
    this.terminal.rows = Math.floor((this.getClientHeight() - 60 - 43) / 18);
    console.log(this.terminal.rows);
    console.log(this.ws);
  },
  data () {
    return {
      terminal: {
        pid: 1,
        name: 'terminal',
        cols: 400,
        rows: 43,
      },
      ws: '',
    };
  },
  methods: {
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
  },
  components: {
    'my-terminal': Console,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
