<template>
    <div class="bg" v-if="showLoading">
      <div style="width: 100%; height: 100%; text-align: center">
        <!--  加载图      -->
        <div style="width: 32px; height: 32px; margin: 15% auto 5px auto; position: relative">
          <span class="loading-item1" style="position: absolute; top: 0; left: 0;"></span>
          <span class="loading-item2" style="position: absolute; top: 0; right: 0;"></span>
          <span class="loading-item3" style="position: absolute; bottom: 0; right: 0;"></span>
          <span class="loading-item4" style="position: absolute; bottom: 0; left: 0;"></span>
        </div>
        <span style="margin: 14px auto; font-size: 12px; color: rgba(0, 0, 0, 0.6)">{{message}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppLoading',
  data() {
    return {
      loading: false,
      showLoading: false,
      message: '加载中',
    };
  },
  methods: {
    show(message = '加载中') {
      this.showLoading = true;
      this.message = message;
    },
    dismiss() {
      this.showLoading = false;
    },
  }
};
</script>

<style scoped>
  @keyframes loading-animation {
    0%   {opacity: 1;}
    25%  {opacity: 0.2;}
    50%  {opacity: 0.4;}
    75%  {opacity: 0.7;}
    100% {opacity: 1;}
  }
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  .loading-item1{
    width: 13px;
    height: 13px;
    background: #3366ff;
    border-radius: 7px;
    opacity: 1;
    animation-name: loading-animation;
    animation-duration: 0.4s;
    animation-delay: 0s;
    animation-iteration-count: infinite;

    -webkit-animation-name: loading-animation;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-delay: 0s;
    -webkit-animation-iteration-count: infinite;
  }
  .loading-item2{
    width: 13px;
    height: 13px;
    opacity: 0.7;
    background: #3366ff;
    border-radius: 7px;

    animation-name: loading-animation;
    animation-duration: 0.4s;
    animation-delay: 0.1s;
    animation-iteration-count: infinite;

    -webkit-animation-name: loading-animation;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-delay: 0.1s;
    -webkit-animation-iteration-count: infinite;
  }
  .loading-item3{
    width: 13px;
    height: 13px;
    opacity: 0.4;
    background: #3366ff;
    border-radius: 7px;
    animation-name: loading-animation;
    animation-duration: 0.4s;
    animation-delay: 0.2s;
    animation-iteration-count: infinite;

    -webkit-animation-name: loading-animation;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-delay: 0.2s;
    -webkit-animation-iteration-count: infinite;
  }
  .loading-item4{
    width: 13px;
    height: 13px;
    opacity: 0.2;
    background: #3366ff;
    border-radius: 7px;
    animation-name: loading-animation;
    animation-duration: 0.4s;
    animation-delay: 0.3s;
    animation-iteration-count: infinite;

    -webkit-animation-name: loading-animation;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-delay: 0.3s;
    -webkit-animation-iteration-count: infinite;
  }

</style>
