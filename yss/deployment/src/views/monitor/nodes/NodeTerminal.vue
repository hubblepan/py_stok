<template>
  <el-dialog title="终端" :visible.sync="showDialog" width="60%"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <div ref="container">
      <my-terminal :terminal="terminal" :ws="ws" v-if="showDialog" ref="Myterminal"></my-terminal>
    </div>
  </el-dialog>
</template>

<script>
import Console from '../terminal/Console';

export default {
  name: 'WebSSH',
  created() {
    // this.terminal.rows = Math.floor((this.getClientHeight() - 60 - 43 - 200) / 18);
    // this.terminal.cols = this.$refs.container.clientWidth / 40;
    // console.log(this.terminal.rows, this.terminal.cols);
  },
  mounted() {
    this.$nextTick(() => {
      this.terminal.rows = Math.floor((this.getClientHeight() - 60 - 43 - 200) / 18);
      this.terminal.cols = Math.floor(this.getClientWidth() * 0.6 / 10);
      console.log(this.terminal.rows, this.terminal.cols);
    });
  },
  data () {
    return {
      showDialog: false,
      terminal: {
        pid: 1,
        name: 'terminal',
        rows: 43,
        cols: 100,
      },
      ws: '',
    };
  },
  methods: {
    show(ws) {
      this.ws = ws;
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    },
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },

    getClientWidth() {
      let clientWidth = 0;
      if (document.body.clientWidth && document.documentElement.clientWidth) {
        clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
      } else {
        clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
      }
      return clientWidth;
    },
  },
  components: {
    'my-terminal': Console,
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

/deep/ .el-dialog__body{
  padding: 0;
}
</style>
