<template>
  <div id="app">
      <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'App',
  beforeCreate() {
        console.log('app before create');
    },
    created() {
        console.log('app create');

    },
    beforeMount() {
        console.log('app before mount');
    },
    mounted() {
        console.log('app mounted');
        console.log(this.$router);
        this.$nextTick(() => {
          this.$router.push({name: 'home'});
        });

    },
    beforeUpdate() {
        console.log('app before update');
    },
    update() {
        console.log('app update');
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
