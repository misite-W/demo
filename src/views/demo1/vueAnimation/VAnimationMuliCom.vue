<template>
    <div id="root">
<!--  多元素过渡 key-->
<!--        <transition name="fade">-->
<!--            <div v-if="show">hello world</div>-->
<!--            <div v-else>Bye world</div>-->
<!--        </transition>-->

<!--        in-out：新元素先进行过渡，完成之后当前元素过渡离开。
            out-in：当前元素先进行过渡，完成之后新元素过渡进入。
-->
        <!--  多个元素的过渡 -->
<!--        <transition name="fade" mode="in-out">-->
<!--            <div v-if="show" key="hello">hello world</div>-->
<!--            <div v-else key="bye">Bye world</div>-->
<!--        </transition>-->
<!--  多个组件的过渡 -->
<!--        <transition name="fade" mode="out-in">-->
<!--            <child v-if="show"></child>-->
<!--            <child-one v-else></child-one>-->
<!--        </transition>-->

<!--        动态组件  通过is来控制显示那个组件-->
<!--        <transition name="fade" mode="out-in">-->
<!--            <component :is="type"></component>-->
<!--        </transition>-->

<!--   列表过渡    transition-group相当于在每个div上加了transition -->
<!--        <transition-group name="fade">-->
<!--            <div v-for="(item,index) in list" :key="item.id">{{item.title}}</div>-->
<!--        </transition-group>-->
<!--        <button @click="add">Add</button>-->

<!--    动画封装-->
        <fade :show="show">
            <div>hello 世界</div>
        </fade>
        <button @click="handleClick">切换</button>
    </div>
</template>

<script>

    import Vue from 'vue'
    Vue.component('child',{
        template:"<div>child</div>"
    })
    Vue.component('child-one',{
        template:"<div>child-one</div>"
    })
    //动画封装
    Vue.component('fade',{
        props:['show'],
        template:`<transition name="fade"  @before-enter="handleBeforeEnter"  @enter="handleEnter"><slot v-if="show"></slot></transition>`,
        methods:{
            handleBeforeEnter: function (el) {
                console.info("handleBeforeEnter")
                el.style.color = "red";
            },
            handleEnter: function (el,done) {
                setTimeout(()=>{
                    el.style.color = "green";
                    done();
                },2000)
            }
        }
    })
    export default {
        name: "VAnimationMuliCom",
        data(){
            return {
                show: true,
                type:"child",
                list:[],
                count:0
            }
        },
        methods:{
            handleClick: function () {
                this.show = !this.show
                //this.type = this.type==='child' ? 'child-one' : "child";
            },
            add:function () {
                this.list.push({
                    id:this.count++,
                    title:"hello"
                })
            }

        }
    }
</script>

<style scoped>
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity 3s;
    }
</style>