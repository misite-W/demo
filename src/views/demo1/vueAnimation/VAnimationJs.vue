<template>
    <div id="root">
<!--  js动画钩子 与velocity合用 -->
        <transition
                name="fade"
                @before-enter="handleBeforeEnter"
                @enter="handleEnter"
                @after-enter="handleAfterEnter"

                @before-leave="handleBeforeLeave"
                @leave="handleleave"
                @after-leave="handleAfterleave"

        >
            <div v-if="show">hello world</div>
        </transition>

        <button @click="handleClick">切换</button>
    </div>
</template>

<script>
    export default {
        name: "VAnimationJs",
        data(){
            return {
                show: true
            }
        },
        methods:{
            handleClick: function () {
                this.show = !this.show
            },
            handleBeforeEnter: function (el) {
                console.info("handleBeforeEnter")
                el.style.color = "red";
                //el.style.opacity = 0;
            },
            handleEnter: function (el,done) {
                console.info("handleEnter")
                setTimeout(()=>{
                    el.style.color = "green";
                    done();
                },2000)
                // Velocity(el,{
                //     opacity:1
                // },{
                //     duration: 1000,
                //     complete: done
                // })
            },
            handleAfterEnter: function (el) {
                console.info("handleAfterEnter")
            },
            handleBeforeLeave: function (el) {
                console.info("handleBeforeLeave")
            },
            handleleave: function (el) {
                console.info("handleleave")
            },
            handleAfterleave: function (el) {
                console.info("handleAfterleave")
            },

        }
    }
</script>

<style scoped>

</style>