/**
*  npm install vue-video-player -S
*  // 1.全局引用
*     import VueVideoPlayer from 'vue-video-player'
*     import 'video.js/dist/video-js.css'
*     Vue.use(VideoPlayer)
*  // 2.组件内引用
*     import { videoPlayer } from 'vue-video-player'
*     import 'video.js/dist/video-js.css'
*     export default {
*         components: {
*         videoPlayer
*         }
*      }
*/
<template>
    <div ref="wrapper" class="video-wrapper">
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"
                       @ready="playerReadied"
                       @statechanged="playerStateChanged($event)"
        ></video-player>
    </div>
</template>

<script>

    import { videoPlayer } from 'vue-video-player'
    import 'video.js/dist/video-js.css'
    import Barrage from './Barrage'

    export default {
        name: "VideoPlayer",
        components:{
            videoPlayer
        },
        props:{
            sources:{
                type: Array,
                default:[{
                    src: '',  // 路径
                    type: 'video/mp4'  // 类型
                }]
            },
            barrages:{
                type: Array,
                default: []
            },
            hasBarrageSwitch:{//是否打开字幕
                type: Boolean,
                default: false
            },
            poster:{
                type: String,
                default: ""
            }
        },
        data(){
            return {
                switchBarrage: false,
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: true,
                        fullscreenToggle: true  //全屏按钮
                    }
                },

                barragesMap: null,
                barrage: null,
                barrageDom: null
            }
        },
        created() {
            this.playerOptions.sources = this.sources
            this.playerOptions.poster = this.poster
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        watch:{
            'sources':function(newValue, oldValue){
                this.playerOptions.sources[0].src = newValue[0].src
                this.playerOptions.sources[0].type = newValue[0].type
                this.playerOptions.autoplay = true
            },
            'barrages':function () {
                this.initBarragesMap()
            }
        },
        mounted() {
            if(this.hasBarrageSwitch){
                this.initSwicth()
            }
        },
        methods:{
            initBarrageDom(){
                if(this.switchBarrage){
                    let dom = document.createElement('div')
                    dom.className = "barrage"
                    this.barrageDom = this.$refs['wrapper'].querySelector(".video-player .video-js").appendChild(dom)

                    this.initBarrageWrapper()
                    this.initBarragesMap()
                }
                document.addEventListener("fullscreenchange", this.fullscreenchange)
            },
            initSwicth(){
                let _this = this
                let bgSwitch = document.createElement('div')
                bgSwitch.className = "bg-switch bg-close"

                let optSwitch = document.createElement('div')
                optSwitch.className = "opt-switch opt-close"

                bgSwitch.appendChild(optSwitch)
                this.$refs['wrapper'].querySelector(".video-player .video-js").appendChild(bgSwitch)

                bgSwitch.onclick = function(){
                    if(bgSwitch.className.indexOf("bg-close") != -1){
                        bgSwitch.className = "bg-switch bg-open"
                        optSwitch.className = "opt-switch opt-open"
                        _this.openSwitch()
                    }else{
                        bgSwitch.className = "bg-switch bg-close"
                        optSwitch.className = "opt-switch opt-close"
                        _this.closeSwitch()
                    }
                }
            },
            openSwitch(){
                this.openBarrage()
            },
            closeSwitch(){
                this.closeBarrage()
            },
            openBarrage(){
                this.switchBarrage = true
                this.initBarrageDom()
            },
            closeBarrage(){
                this.switchBarrage = false
                this.barrage.clearTimer()
                this.barrage = null
                this.barrageDom.remove()
                this.barrageDom = null
            },

            fullscreenchange(){
                let _this = this
                if (_this.switchBarrage) {
                    _this.closeBarrage()
                    setTimeout(function () {
                        _this.openBarrage()
                    },50)
                }
            },
            addToList () {
                this.barrageList.push({
                    id: ++this.currentId,
                    avatar: "",
                    msg: this.msg,
                    time: id,
                    type: MESSAGE_TYPE.NORMAL
                })
            },
            onPlayerPlay(player){
                //console.log('player play!', player)
            },
            onPlayerPause(player) {
                //console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                //console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                //console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                //console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
               // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                if(this.switchBarrage) {
                    this.watchTime(Math.floor(player.currentTime()))
                }
                //console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                //console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                    //console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                //console.log('player current update state', playerCurrentState)
            },

            playerReadied(player) {
                // seek to 10s
                //console.log('example player 1 readied', player)
                //player.currentTime(10)
                // console.log('example 01: the player is readied', player)
            },

            //弹幕
            // 初始化wrapper
            initBarrageWrapper() {
                this.barrage = new Barrage({
                    wrapper: this.barrageDom,
                    sameSpeed: true
                })
            },
            // 初始化map
            initBarragesMap() {
                let map = new Map()
                for (let item of this.barrages) {
                    if (!map.get(item.time)) {
                        map.set(item.time, [item])
                    } else {
                        let arr = map.get(item.time)
                        arr.push(item)
                        map.set(item.time, arr)
                    }
                }
                this.barragesMap = map
            },
            // 视频每隔一秒，就看这一秒有没有新的弹幕
            watchTime(time) {
                if (time === this.player.duration()) {
                    this.barrage.clearTimer()
                    return
                }
                let currentTimeBarrages = this.barragesMap.get(Number(time))
                if (currentTimeBarrages && currentTimeBarrages.length > 0) {
                    this.barrage.insertBarrages(currentTimeBarrages)
                }
            }
        },
        beforeDestroy() {
            let _this = this
            if (this.switchBarrage) {
                this.barrage.clearTimer()
                this.barrage = null
                this.barrageDom.remove()
                this.barrageDom = null
            }
            document.removeEventListener("fullscreenchange",this.fullscreenchange)
        }
    }
</script>

<style scoped>
    .video-wrapper{
        position: relative;
    }
    .video-player >>> .barrage{
        pointer-events: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .video-player >>> .barrage div{
        padding: 5px;
        border-radius: 6px;
        background-color: rgba(0,0,0,.4);
    }
    .video-player >>> .bg-switch{
        width: 60px;
        height: 30px;
        border-radius: 15px;
        position: absolute;
        top: 10px;
        right: 20px;
    }
    .video-player >>> .bg-switch::before{
        position: absolute;
        content: "关闭";
        color: white;
        top: 10px;
        left: 5px;
    }
    .video-player >>> .bg-switch::after{
        position: absolute;
        content: "打开";
        color: rgb(0,184,0);
        top: 10px;
        right: 5px;
    }

    .video-player >>> .opt-switch{
        width: 28px;
        height: 28px;
        border-radius: 14px;
        position: absolute;
        background: white;
        z-index: 1;
    }
    .video-player >>>  .bg-close {
        background: #dcdfe6;;
    }
    .video-player >>> .opt-close {
        left: 1px;
        top: 1px;
    }
    .video-player >>>  .bg-open {
        background: rgba(0,184,0,0.8);
    }
    .video-player >>>  .opt-open{
        top: 1px;
        right: 1px;
    }

</style>