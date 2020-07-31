<template>
    <div class="round center" style="width: 16rem; height: 20rem; background-color: rgba(45, 214, 255, 0.05)">
        <div class="header-title">
            <h1>赢时胜监控运维</h1>
            <p>Ysstech's WebSite</p>
        </div>
        <div style="padding: 10px 0">
            <p class="menu" v-for="item in menu" :key="item.key" @click="go(item)">
                {{item.text}}
            </p>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    // import * as api from '../api/test-api'
    export default {
        name: "Home",
        mounted() {
          window.bubbly();
        },
        destroyed() {
            // let c = window.document.getElementsByTagName('canvas')[0];
            // console.log(c);
            // let ctx = c.getContext("2d");
            // ctx.clearRect(0,0,c.width,c.height);
            window.document.getElementsByTagName('canvas')[0].remove();
        },
        data() {
          return {
            menu: [
                {
                    key: 'stk',
                    text: '应用部署',
                    path_name: 'Stok',
                },

                {
                    key: 'blog',
                    text: '监控分析',
                },

                {
                    key: 'other',
                    text: '场景大盘',
                },

                {
                    key: 'ui',
                    text: '前端UI',
                    path_name: 'ThirdUI',
                },
            ],
          };
        },

        methods: {
            clickChart() {
              this.$router.push({name: 'chart'});
            },
            go(item) {
                this.$router.push({name: item.path_name})
            }
        }
    }
</script>

<style scoped>
    .center {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
    }

    .round {
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 1%;
    }

    .header-title {
        display: block;
        text-align: center;
        margin: auto;
        color: white;
        padding-top: 10px;
    }

    .header-title h1,p{
        font-size: 1.3rem;
        color: #fefefe;
        float: none;
        margin: auto;
        padding-top: 0.4rem;
        font-weight: bolder;
        text-shadow: 0 1px 1px #333;
        font-family: Georgia, serif;
        letter-spacing: 0.1px;
    }
    .header-title p{
        font-size: 1rem;
        border-bottom: 1px solid rgba(251,251,251,0.5);
        margin: 0px 30px;
        padding-bottom: 5px;
    }
    .menu{
        font-size: 1rem;
        text-align: center;
        background-color: rgba(22, 22, 22, 0.2);
        color: rgba(255, 255, 255, 0.7);
        margin: 0.5rem 2rem;
        border-radius: 4px;
        height: 1.5rem;
        font-style: normal;
        font-weight: 400;
    }
    .menu:hover {
        background-color: rgba(22, 22, 22, 0.8);
        color: #e5e5e5;
    }
</style>
