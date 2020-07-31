<template>
    <div>
        <el-row :gutter="10" type="flex">
            <el-col :span="5">
                <el-input v-model="buy">
                    <template slot="prepend">买入价</template>
                </el-input>

            </el-col>
            <!--<el-col :span="1">-->
            <!--<div style="text-align: center;line-height: 40px">:</div>-->
            <!--</el-col>-->
            <el-col :span="5">
                <!--<el-form-item prop="dbPort">-->
                    <el-input v-model="cur">
                        <template slot="prepend">当前价</template>
                    </el-input>
            </el-col>
        </el-row>
        <div>
            <el-input v-model="real" style="margin-top: 20px; margin-right: 20px;">
                <template slot="prepend">结果</template>
            </el-input>
        </div>
        <div style="width: 300px; height: 300px; background-color: white" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <i class="el-icon-loading"></i>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Stock",
        data(){
            return{
                buy: 0,
                cur: 0,
                real: '',
            }
        },
        watch: {
            buy(){
                this.real = JSON.stringify(this.realCg(this.buy, this.cur));
            },
            cur() {
                this.real = JSON.stringify(this.realCg(this.buy, this.cur));
            },
        },
        methods: {
            // cal(base) {
            //     return function (increase, times = 1) {
            //         if (increase) {
            //             let newbase = base;
            //             while (--times >= 0) {
            //                 newbase = newbase * (1 + increase * 0.01);
            //             }
            //             return cal(newbase);
            //         }
            //         return base;
            //     };
            // },
            //
            // rev1(cur, change) {
            //     return (cur / (1 + change * 0.01) - cur) * 100 / cur;
            // },
            //
            // rev2(cur, by) {
            //     return (by - cur) * 100 / cur;
            // },

            realCg(by, cur) {
                return {r: -(by - cur) * 100 / cur, v: (cur - by) * 100 / by};
            },
        },
    }
</script>

<style scoped>
    /deep/ .el-icon-loading {
        font-size: 30px;
        line-height: 30px;

    }
</style>
