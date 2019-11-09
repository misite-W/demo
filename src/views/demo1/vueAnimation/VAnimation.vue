<template>
    <div id="root">
<!--    在某一时刻动态地向标签上添加样式实现动画    不写name，默认v开头   v-if / v-show 都可以 -->
        <transition>
            <div v-if="show">hello world</div>
        </transition>
<!--自定义class  入场动画-->
<!--        <transition name="fade" enter-active-class="active" leave-active-class="leave">-->
<!--            <div v-if="show">自定义class动画</div>-->
<!--        </transition>-->

<!--  animate:关键帧 appear:第⼀一次加载做动画 appear    appear-active-class动画类型 -->
<!--        <transition appear name="fade"-->
<!--                    enter-active-class="animated flip"-->
<!--                    leave-active-class="animated flash"-->
<!--                    appear-active-class="animated bounce"-->
<!--        >-->
<!--            <div v-if="show">animate css动画</div>-->
<!--        </transition>-->

<!--       同时使用动画与过渡  type="transition" type:定义动画的执行以谁的时间为主 自定义时长 duration="{enter:5000,leave:3000}"-->
<!--        <transition-->
<!--                :duration="50000"-->
<!--                appear name="fade"-->
<!--                    enter-active-class="animated swing fade-enter-active"-->
<!--                    leave-active-class="animated flash fade-leave-active"-->
<!--                    appear-active-class="animated bounce"-->
<!--        >-->
<!--            <div v-if="show">animate css动画</div>-->
<!--        </transition>-->
        <button @click="handleClick">切换</button>
    </div>
</template>

<script>
    export default {
        name: "VAnimation",
        data(){
            return {
                show: true
            }
        },
        methods:{
            handleClick: function () {
                this.show = !this.show
            }
        }
    }
</script>

<style scoped>
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity 10s;
    }

    /*关键帐动画*/
    @keyframes bounce-in {
        0%{
            transform: scale(0);
        }
        50%{
            transform: scale(1.5);
        }
        100%{
            transform: scale(1);
        }
    }

    .v-enter-active{
        transform-origin: left center;
        animation: bounce-in 1s;
    }
    .v-leave-active{
        transform-origin: left center;
        animation: bounce-in 1s reverse;
    }

    /*    自定义名字*/
    .active{
        transform-origin: left center;
        animation: bounce-in 1s;
    }
    .leave{
        transform-origin: left center;
        animation: bounce-in 1s reverse;
    }
</style>