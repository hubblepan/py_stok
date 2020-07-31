<template>
    <app-flow-container ref="AppFlowContainer">
        <template v-slot:header>
            <div class="header">

            </div>
        </template>
        <div class="content">
            <el-button type="primary" @click="doClick">test</el-button>
            <div class="content" style="padding-left: 0.5rem">
                <el-table
                        :data="tableData"
                        style="width: 98%">
                    <el-table-column
                            prop="name"
                            fixed
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="类型"
                    >
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.type" placeholder="监控类型" size="mini" style="width: 6rem">
                                <el-option label="日期时间" value="datetime"></el-option>
                                <el-option label="单选组" value="ratio"></el-option>
                                <el-option label="数字" value="number"></el-option>
                                <el-option label="文本" value="text"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="value"
                            label="值">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </app-flow-container>
</template>

<script>
    import AppFlowContainer from "../views/AppFlowContainer";
    import * as api from '../api/test-api';
    export default {
        name: "StokMonitor",
        components: {AppFlowContainer},
        mounted() {
            api.proxyTest()
                .then(res => {
                   console.log(res);
                    this.$alert('success', {type: 'success'});
                });
            api.funcTest()
                .then(res1 => {
                   console.log(res1);
                });
                // .catch(reason => {
                //
                // });
        },
        data() {
            return {
                tableData: [
                    {
                        name: 'name',
                        type: 'type',
                        value: 'value',
                        status: 'status',
                    },

                    {

                    },
                ],

            };
        },
        methods: {
            doClick() {
                api.proxyTest()
                    .then(res => {
                        console.log(res);
                    });

                api.funcTest()
                    .then(res1 => {
                        console.log(res1);
                    });
            },
        }
    }
</script>

<style scoped>

</style>
