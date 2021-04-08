<template>
  <d2-container>
    <el-input v-model="inputValue"></el-input>
    <p>这个页面测试 数据持久化， 需要注意的是， 浏览器的刷新操作对于vue</p>
  </d2-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { frameInRoutes } from '@/router/routes';
import layoutHeaderAside from '@/layout/header-aside';

export default {
  watch: {
    inputValue(val) {
      this.saveToStorage();
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  mounted() {
    console.log('mounted');
    this.loadFromStorage();
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    console.log(arguments);
    this.saveToStorage();
  },

  methods: {
    async saveToStorage() {
      const db = await this.$store.dispatch('d2admin/db/database');
      db
        .set('keyName', this.inputValue)
        .write();
    },

    async loadFromStorage() {
      const db = await this.$store.dispatch('d2admin/db/database');
      this.inputValue = db.get('keyName').value();
    },
  },
};
</script>
