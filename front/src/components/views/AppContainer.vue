<template>
    <div class="app-body">
        <slot name="header">
            <app-web-header :title="title"></app-web-header>
        </slot>
        <el-scrollbar style="height: 90%; width: 100%">
            <el-row>
                <el-col :lg='{span:10, offset:7 }' :md='{span:12, offset:6 }' :sm='{span:20, offset:2 }' style="margin-top: 1rem;">
                    <div style="width: 98%">
                        <slot></slot>
                    </div>
                </el-col>

                <el-col :lg='{span:7}' :md='{span:6 }' :sm='{span:2}' style="margin-top: 1rem;">
                </el-col>
            </el-row>
        </el-scrollbar>


    </div>
</template>

<script>
    import AppWebHeader from "./AppWebHeader";
    export default {
        name: "AppContainer",
        props: ['title'],
        components: {AppWebHeader}
    }
</script>

<style scoped>
.app-body {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: white;
}

.el-scrollbar__bar /deep/  .is-horizontal{
    overflow-x: hidden;
    height: 0px;
}
</style>
