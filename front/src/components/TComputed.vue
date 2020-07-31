<template>
    <div>
        <p>Vue computed 属性 测试</p>
        <p>fullName: {{ fullName }}</p>

        <button v-on:click="changeName">change name</button>
    </div>
</template>

<script>
    export default {
        name: "TComputed",
        data: function () {
            return{
                firstName: 'Pan',
                lastName: 'haobo'
            }
        },

        /* vue 的 计算属性， 使用计算属性的优点是 其计算出来的值会被缓存起来， 只有当它的依赖值发生了改变才会被重新计算。  （减少重复运算，增加性能）*/
        computed: {
            fullName: function () {
                return this.firstName + this.lastName;
            }
        },

        /* vue 的 侦听属性*/
        watch: {
            fullName: function (newVal, oldVal) {
                console.log('fullname has changed:', newVal, oldVal)
            }
        },

        methods: {
            changeName: function() {
                this.lastName = this.fullName + 'aaa'
            }
        }
    }
</script>

<style scoped>

</style>
