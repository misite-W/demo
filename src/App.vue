<template>
    <div id="app" class="box">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                timer: null,
                dataList:[{type:0},{type:0},{type:0},{type:0}]
            };
        },
        created() {
            window.scroll(0, 0);
        },
        mounted() {
            window.onresize = () => {
                var aa="123"
                var aa = "444"
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$store.state.screenWidth = document.documentElement.clientWidth; //窗口宽度
                    this.$store.state.screenHeight = document.documentElement.clientHeight; //窗口高度
                }, 100)
            }
        }
    }
</script>
<style lang="less" scoped>
    #app {
        width: 100%;
        font-family: Microsoft YaHei,PingFangSC-Regular,'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #282828;
    }
</style>
