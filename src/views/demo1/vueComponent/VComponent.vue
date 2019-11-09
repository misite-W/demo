<!--props: 组件传参，slot插槽  自定义事件：父子组件的通信方式-->
<template>
    <div>
        <button-counter></button-counter>
        <button-counter></button-counter>
        <button-counter></button-counter>
        <el-divider></el-divider>
        <c-button :age="20" class="text" :title="'asd'" :posts="posts"></c-button>
        <cButton  :age="age" class="text" v-bind:likes="42" v-bind:is-published="false"  :posts="posts"  title="333333" v-on:click.native="selfClick" @listen="doSomething">
        </cButton>
        <demo></demo>

<!--        <c-button></c-button>-->
<!--        <c-button></c-button>-->

<!--        slot-->
        <VSlot>
        <h1 slot="header">header</h1>
        <h1>main</h1>
        <h1 slot="footer">footer</h1>
        </VSlot>
    </div>
</template>
<!-- 单个根元素-->
<!-- 全局注册和局部注册-->
<!-- data 必须是一个函数  ,每个实例可以维护一份被返回对象的独立的拷贝-->
<!-- 组件名大小写 -->
<!--1 prop特性   v-bind 动态赋值  单向数据流:不应该在一个子组件内部改变，不显示在子组件标签上
    2.非prop:父传子，但子没有接受，子不能使用， 将这个特性添加到子组件最外面的html标签上，如class="text"
    class 和 style 将父子组件的值会被合并起来-->
<!-- 参数类型较验:String/Number/Boolean/Array/Object/Function/Promise/Date /...
自定义事件：<my-component v-on:事件名="doSomething"></my-component>
原生事件：v-on:click.native="selfClick"

插槽使用场景： 抽象设计组件以得到动态改变组件
失活的组件将会被缓存，<keep-alive> 要求被切换到的组件都有自己的名字
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
-->

<script>
    import cButton from "./CButton"
    import VSlot from "./VSlot"
    //局部
    var demo = {
        template: "<div class='demo'>{{content}}" +
            "<ul>" +
            "<li>demo</li>"+
            "</ul>" +
            "</div>",
        props:['content']
    }
    import Vue from 'vue'
    //全局
    Vue.component('button-counter', {
        data: function () {
            return {
                count: 0
            }
        },
        // data: {
        //     count:0
        // },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })



    export default {
        name: "VComponent",
        data: function () {
            return {
                posts: [
                    { id: 1, title: 'My journey with Vue' },
                    { id: 2, title: 'Blogging with Vue' },
                    { id: 3, title: 'Why Vue is so fun' }
                ],
                content:"hello World11111",
                age: 18
            }
        },
        components:{
            cButton,
            demo,
            VSlot
            //"c-button":cButton
        },
        methods:{
            doSomething:function (e) {
                alert("父组件事件:"+e)
                this.age++
            },
            selfClick:function(){
                alert("父组件自己的事件")
            }
        }
    }
</script>

<style scoped>
    .text{
        color: red;
    }
</style>