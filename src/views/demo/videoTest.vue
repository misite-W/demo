<template>
    <div>
<!--        <video-player :sources="sources" :hasBarrageSwitch="hasBarrageSwitch"></video-player>-->
        <video-player :hasBarrageSwitch="true" :sources="sources" ref="videoPlayer" :barrages="barrages"></video-player>
<!--        <el-button @click="click"></el-button>-->
    </div>
</template>

<script>
    import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue"
    export default {
        name: "videoTest",
        components:{
            VideoPlayer
        },
        data(){
            return {
                hasBarrageSwitch: true,
                sources: [{
                    src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',  // 路径
                    type: 'video/mp4'  // 类型
                }],
                barrages: [],
                timer: null
            }
        },
        methods:{
            click(){
                this.$refs.videoPlayer.openBarrage()//打开字幕
                this.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
            }
        },
        created() {
            let _this = this
            for (let i = 0; i < 100; i++) {
                this.barrages.push({text: _this.$$util.uuid(),time: Math.floor(Math.random() * 100)})
            }
        }
    }
</script>

<style scoped>

</style>