<template>
    <el-container>
        <el-header height="100px">
            <div class="describe"> 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。<br>在模板中放入太多的逻辑会让模板过重且难以维护,所以对于复杂的逻辑，应使用计算属性</div>
            <div>数据：<br>{{this.$data}}</div>
            <el-divider></el-divider>
        </el-header>
        <el-main>

            <template v-if="true">
                <div>计算属性是有依赖关系的，原数据：{{msg}}</div>
                <div>插值表达式：{{ msg.split('').reverse().join('') }}</div>
                <div>计算属性：{{reverseMsg}}</div>
                <div>计算属性：{{reverseMsg}}</div>
                <div class="alert">注意：计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值</div>
                <div>{{now}}</div>
                <div>{{now}}</div>

                <div v-on:click="doSomething">计算属性的 <span class="alert canclick">setter</span>/getter方法</div>
                <div>{{fullName}}</div>

                <div>侦听器watch</div>

            </template>


        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "ComputedWatch",
        data(){
            return{
                msg: "hello world",
                firstName: "hello ",
                lastName:" robit"
            }
        },
        computed:{
            reverseMsg:function () {
                console.info("reverseMsg");
                return this.msg.split('').reverse().join('')
            },
            // fullName:function(){
            //     return this.firstName + " " + this.lastName
            // },
            fullName:{
                get: function () {
                    return this.firstName + ' ok ' + this.lastName
                },
                // setter
                set: function (newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            },
            now: function () {
                console.info("now");
                return Date.now()
            }
        },
        watch:{
            firstName: function (newValue, oldValue) {
                console.log(newValue, oldValue)
            }
        },
        methods:{
            doSomething(){
                this.fullName = "我的  你猜"
            }
        }
    }
</script>

<style scoped>
    .box{
        margin-top: 20px;
    }
    .describe{
        background-color: #8c939d;
        color: #fff;
    }
    .alert{
        color: red;
    }
    .canclick{
        cursor: pointer;
    }
</style>
