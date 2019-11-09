<template>
    <div class="toolbar">
        <div :class="position" class="wrap">
            <el-button class="leftBtn"  v-if="isShowHBtn" icon="el-icon-arrow-left" @mousedown.native="leftBtnClick" @mouseup.native="clearTimer"></el-button>
            <el-button class="upBtn"  v-if="isShowVBtn" icon="el-icon-arrow-up" @mousedown.native="upBtnClick" @mouseup.native="clearTimer"></el-button>
                <template v-for="item of toolbarItem">
                    <el-button v-if="item.icon" :disabled="item.disabled" :type="item.type" :icon="display==='block' ? item.icon + ' el-block': item.icon" @click="click(item,$event)">{{item.title}}</el-button>
                    <el-button v-else   :disabled="item.disabled"  :type="item.type" @click="click(item,$event)">{{item.title}}</el-button>
                </template>
            <el-button class="rightBtn"  v-if="isShowHBtn" icon="el-icon-arrow-right" @mousedown.native="rightBtnClick" @mouseup.native="clearTimer"></el-button>
            <el-button class="downBtn"  v-if="isShowVBtn" icon="el-icon-arrow-down" @mousedown.native="downBtnClick" @mouseup.native="clearTimer"></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "toolbar",
        props:{
            position:{
                type: String,
                default:"top"
            },
            display:{
                type: String,
                default: "block"
            },
            toolbarItem:Array
        },
        data(){
            return {
                clientWidth: 0,
                clientHeight: 0,
                totalWidth:0,
                totalHeight:0,
                isShowHBtn:false,
                isShowVBtn:false,
                clientMarginLR:0,
                timer:0
            }
        },
        methods:{
            rightBtnClick: function(){
                let step = 10
                let _this = this;
                let dis = this.totalWidth - this.$el.offsetWidth + 120
                let $tt = $(this.$el.querySelector(".wrap"))

                this.timer = setInterval(function () {
                    let marginLeft = parseInt($tt.css("marginLeft"))
                    if(marginLeft > -dis){
                        if(marginLeft-step<= -dis){
                            $tt.css({marginLeft: -dis+"px"})
                        }else{
                            $tt.css({marginLeft: marginLeft-step+"px"})
                        }
                    }else{
                        $tt.css({marginLeft: -dis+"px"})
                        clearInterval(_this.timer);
                    }
                },100)
            },
            leftBtnClick: function(){
                let step = 10
                let _this = this
                let $tt = $(this.$el.querySelector(".wrap"))

                this.timer = setInterval(function () {
                    let marginLeft = parseInt($tt.css("margin-left"))
                    if(marginLeft < 0 ){
                        if(marginLeft+step>=0){
                            $tt.css({marginLeft: "0px"})
                        }else{
                            $tt.css({marginLeft: marginLeft+step+"px"})
                        }
                    }else{
                        clearInterval(_this.timer);
                        $tt.css({marginLeft: "0px"})
                    }
                },100)
            },
            downBtnClick: function(){
                let step = 10
                let _this = this;
                let dis = this.totalHeight - this.$el.offsetHeight + 110
                let $tt = $(this.$el.querySelector(".wrap"))

                this.timer = setInterval(function () {
                    let marginTop = parseInt($tt.css("margin-Top"))
                    if(marginTop > -dis){
                        if(marginTop-step<= -dis){
                            $tt.css({marginTop: -dis+"px"})
                        }else{
                            $tt.css({marginTop: marginTop-step+"px"})
                        }
                    }else{
                        $tt.css({marginTop: -dis+"px"})
                        clearInterval(_this.timer);
                    }
                },100)
            },
            upBtnClick: function(){
                let step = 10
                let _this = this
                let $tt = $(this.$el.querySelector(".wrap"))

                this.timer = setInterval(function () {
                    let marginTop = parseInt($tt.css("margin-Top"))
                    if(marginTop < 0 ){
                        if(marginTop+step>=0){
                            $tt.css({marginTop: "0px"})
                        }else{
                            $tt.css({marginTop: marginTop+step+"px"})
                        }
                    }else{
                        clearInterval(_this.timer);
                        $tt.css({marginTop: "0px"})
                    }
                },100)
            },
            clearTimer:function(){
                clearInterval(this.timer);
            },
            click:function(item,event){
                this.$emit("toolbarClick",item,event)
            },
            getTotalWidth:function(){
                let totalWidth = 0
                let items = this.$el.getElementsByTagName('button')
                for(let i=0;i<items.length;i++){
                    totalWidth += $(items[i]).outerWidth(true);
                }
                this.totalWidth = totalWidth;
            },
            getTotalHeight:function(){
                let totalHeight = 0
                let items = this.$el.getElementsByTagName('button')
                for(let i=0;i<items.length;i++){
                    totalHeight += $(items[i]).outerHeight(true);
                }
                this.totalHeight = totalHeight;
            },

            adjustFrame:function(){
                if(this.position=="top"){
                    this.totalWidth==0 && this.getTotalWidth()
                    if(this.totalWidth > this.clientWidth){
                        this.isShowHBtn = true
                        $(this.$el.getElementsByClassName('top')[0]).addClass('padding60')
                    }else{
                        this.isShowHBtn = false
                        var tt = this.$el.querySelector(".wrap")
                        var $tt = $(tt).css("marginLeft","0px");
                        $(this.$el.getElementsByClassName('top')[0]).removeClass('padding60')
                    }
                }else if(this.position=="right"){
                    this.totalHeight==0 && this.getTotalHeight()
                    if(this.totalHeight > this.clientHeight){
                        this.isShowVBtn = true
                        $(this.$el.getElementsByClassName('right')[0]).addClass('padding60_0')
                    }else{
                        this.isShowVBtn = false
                        $(this.$el.querySelector(".wrap")).css("marginTop","0px");
                        $(this.$el.getElementsByClassName('right')[0]).removeClass('padding60_0')
                    }
                }
            }
        },
        watch: {
            '$store.state.screenWidth'(newValue, oldValue) {
                this.clientWidth = this.$el.clientWidth
                this.adjustFrame()
            },
            '$store.state.contentHeight'(newValue, oldValue) {
                this.clientHeight = this.$store.state.contentHeight - this.clientMarginLR
                if(this.position == 'right') {
                    this.$el.style.height = this.clientHeight + 'px'
                }
                this.adjustFrame()
            }
        },
        created(){
            console.log("created")
        },
        mounted(){
            this.clientWidth = this.$el.clientWidth
            console.info(this.$store.state.contentHeight,"222")
            this.clientHeight = this.$store.state.contentHeight
            if(this.position == 'right'){
                this.clientMarginLR = parseInt(this.$el.style.marginTop) + parseInt(this.$el.style.marginBottom)
                this.$el.style.height = this.clientHeight-this.clientMarginLR+'px'
                this.$el.className += ' right'
            }
            this.adjustFrame()
        }
    }
</script>

<style scoped>
    .toolbar{
        overflow: hidden;
        border-radius: 4px;
        margin-left: 0px;
        position: relative;
    }
    .toolbar.right{
        position: fixed;
        right: 10px;
        width: 50px;
    }
    .toolbar>.top{
        width: 100%;
        height: 50px;
        white-space: nowrap;
    }
    .toolbar>.top.padding60{
        padding: 0px 50px;
    }
    .toolbar>.right.padding60_0{
        padding: 50px 0px;
    }
    .toolbar>.top >>> .el-button.leftBtn{
        position: absolute;
        left: 0;
        font-size: 2em;
    }
    .toolbar>.top >>> .el-button.rightBtn{
        position: absolute;
        right: 0;
        font-size: 2em;
    }

    .toolbar>.right >>> .el-button.upBtn{
        position: absolute;
        top: 0;
        margin-top: 0px;
        font-size: 2em;
    }
    .toolbar>.right >>> .el-button.downBtn{
        position: absolute;
        bottom: 0;
        font-size: 2em;
    }

    .toolbar .top >>> .el-button {
        width: 50px;
        height: 50px;
        padding: 0px;
        vertical-align: top;
        font-size: 10px;
    }
    .toolbar .top >>> .el-button [class*=el-icon-]+span {
        margin-left: 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
    }
    .toolbar >>> i.el-block{
        display: block;
        font-size: 1.5em;
        margin-bottom: 5px;
    }
    .toolbar>.right{
        display: block;
    }
    .toolbar .right >>> .el-button {
        width: 50px;
        height: 50px;
        padding: 0px;
        margin-top: 10px;
        display: block;
        font-size: 10px;
    }
    .toolbar>.right >>> .el-button+.el-button {
        margin-left: 0px;
    }
    .toolbar .right >>> .el-button [class*=el-icon-]+span {
        margin-left: 0px;
    }
</style>