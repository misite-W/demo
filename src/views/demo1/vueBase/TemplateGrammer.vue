<template>
    <el-container>
        <el-header height="100px">
            <div class="describe"> Vue.js 使用了基于 HTML 的模板语法,将模板编译成虚拟 DOM 渲染函数.结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少.</div>
            <div>数据：<br>{{this.$data}}</div>
            <el-divider></el-divider>
        </el-header>
        <el-main>

            <template v-if="true">
                <div class="box">1.插值</div>
                <div>{{msg}}</div>
                <div v-once>这个将不会改变: {{ msg }}</div>
                <div>原始 HTML: {{rawHtml}}</div>
                <div v-text="rawHtml"></div>
                <div>使用 JavaScript 表达式,不能使用语句</div>
                <div>{{ msg.split('').reverse().join('') }}</div>
<!--                <div>{{ var a = 1 }} {{ if (ok) { return message } }}</div>-->

            </template>

            <template v-if="true">
                <div class="box">2.指令</div>
                <div class="describe"> 指令 (Directives) 是带有<span class="alert"> v- </span>前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM</div>

                <div>2.1 指令参数，是指在指令名称之后以冒号表示,例如:</div>
                <a v-bind:href="'url'" v-text="vText"></a>

                <div v-on:click="doSomething" >sssssssss</div>

                <div>2.2 动态参数,用<span class="alert">方括号</span>括起来的 JavaScript 表达式作为一个指令的参数,例如:</div>
                <div v-text="thParam"></div>
                <div v-text="tonParam"></div>

                <div>注：动态参数预期会求出一个字符串，异常情况下值为 null，任何非字符串类型的值都将会触发一个警告</div>
                <div v-bind:[errorParam]="'error'">{{errorParam}}</div>

                <div>2.3 修饰符--是以半角句号 <span class="alert">.</span> 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定,如:.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()</div>
<!--                <a v-bind:href="'http://www.baidu.com'" v-on:click.prevent.stop="doSomething">我是链接</a>-->

                <div>缩写</div>
                <div>v-bind:href="url" 等价于  :href="url"</div>
                <div>v-on:click.prevent="doSomething" 等价于  @click="doSomething"</div>

            </template>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "TemplateGrammer",
        sss:"sss1",
        data(){
            return{
                msg: "hello world",
                rawHtml:'<span style="color: green">This should be green.</span>',
                vText:"<a v-bind:href='url'></a>",
                tOn: '<a v-on:click="doSomething"></a>',
                thParam:'<a v-bind:[attributeName]="url"> ... </a>',
                tonParam:'<a v-on:[eventName]="doSomething"> ... </a>',
                errorParam:'abc'
            }
        },
        methods:{
            doSomething(){
                $("#app").on('click',function (e) {
                    e.stopPropagation()
                    e.prevent()
                })
                alert("doSomething")
            }
        },
        computed:{

        },
        created() {
            console.log("create")
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
</style>
