<template>
    <div class="header">
        <div class="back">
            <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="goBack">返回</el-button>
        </div>

        <div class="title">
            <span >{{title}}</span>
        </div>


        <div class="right">
            <slot>
                <el-button type="primary" size="mini" style="visibility: hidden">按钮</el-button>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppHeader",
        props: ['title'],
        // data() {
        //     return {
        //         title: '测试',
        //     };
        // },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 2.5rem;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(28, 134, 238, 0.8);
        line-height: 2.5rem;
        text-align: left;
        width: 100%;
    }
    .back {
        display: inline-block;
        float: left;
    }

    .header .title{
        font-size: 1rem;
        font-weight: 400;
        margin: 0 auto;
        width: 8rem;
        text-align: center;
    }

    .header .right{
        height: 2.5rem;
        margin-right: 1rem;
        float: right;
        line-height: 2.5rem;
    }
</style>
