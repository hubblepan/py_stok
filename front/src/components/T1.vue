<template>
    <div>
        <div>{{msg}}</div>
        <div>module T1 store test: {{this.$store.state.count}}</div>

    </div>

</template>

<script>
    export default {
        name: "T1",
        data: function () {
            return {
                msg: 'this is component t1 count:' + this.$store.state.count,
            }
        },
    }
</script>

<style scoped>

</style>
