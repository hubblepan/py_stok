<template>
    <div class="app-switch">
      <div  class="switchButton" v-bind:class="{switchButtonSelected: !switched}" style="border-top-left-radius: 3px; border-bottom-left-radius: 3px;" @click="handleSwitch(false)">
        <slot name="left">
          <i class="iconfont iconkapianmoshi"></i>
        </slot>
      </div>
      <div class="switchButton" v-bind:class="{switchButtonSelected: switched}" style="border-top-right-radius: 3px; border-bottom-right-radius: 3px;" @click="handleSwitch(true)">
        <slot name="right">
          <i class="iconfont iconliebiao"></i>
        </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppSwitch',
  model: {
    prop: 'switched',
    event: 'change',
  },
  props: {
    switched: {
      type: Boolean,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active: 'left',
    };
  },
  methods: {
    handleSwitch(s) {
      if (this.enabled) {
        this.$emit('change', s);
      }
    },
  },
};
</script>

<style scoped>
.app-switch {
  background: white;
  width: 82px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}
.switchButton {
  width: 40px;
  height: 24px;
  line-height: 24px;
  background: white;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.4);
}
.switchButtonSelected{
  border: 1px solid #3366ff;
  background: #3366ff;
  color: white;
}
</style>
