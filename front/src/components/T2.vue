<template>
    <div>
        <div>{{msg}}</div>
        <div>module T2 store test: {{this.$store.state.count}}</div>
        <button v-on:click="addOne">Add 1</button>
        <div v-loading="loading"> </div>
    </div>
</template>

<script>
    export default {
        name: "T2",
        data: function () {
            return {
                msg: 'this is component t2',
                loading: true
            }
        },
        methods: {
            addOne(){
              this.$store.commit('increment', {amount: 10})
            },
        }
    }
</script>

<style scoped>

</style>
