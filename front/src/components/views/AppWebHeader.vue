<template>
    <div>
        <el-row>
            <el-col :lg='{span:10, offset:7 }' :md='{span:12, offset:6 }' :sm='{span:20, offset:2 }'>
                <div class="title">
                    {{title}}
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "AppWebHeader",
        props: ['title'],
    }
</script>

<style scoped>
.title {
    font-family: Georgia,serif;
    font-size: 1rem;
    color: rgb(85, 102, 119);
    margin-top: 1.5rem;
    padding-bottom: 0.5rem;
    margin-left: 1rem;
    border-bottom: 1px solid rgb(85, 102, 119);
    word-spacing: 2px;
    text-align: left;
}
</style>
