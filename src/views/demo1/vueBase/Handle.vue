<template xmlns="http://www.w3.org/1999/html">
    <el-container><!-- 事件的处理 -->
        <el-header height="100px">
            <div class="describe">事件处理</div>
            <div>数据：<br>{{this.$data}}</div>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <template v-if="true">
                <div id="example-1">
                    <button v-on:click="counter += 1">Add 1</button><!-- js表达式 -->
                    <button v-on:click="doSomething(100,$event)">Add 1</button><!-- 方法 $event原始的 DOM 事件 -->
                    <p>The button above has been clicked {{ counter }} times.</p>
                    <!-- 事件修饰符 -->
                    <!-- stop: event.stopPropagation() prevent:event.preventDefault()-->
                    <!-- capture: 添加事件监听器时使用事件捕获模式,即元素自身触发的事件先在此处理，然后才交由内部元素进行处理-->
                    <!-- self: 只当在 event.target 是当前元素自身时触发处理函数-->
                    <!-- once: 只会触发一次-->
                    <!-- passive: 该修饰符表示就是设置{passive:true}，表示处理事件函数中不会调用preventDefault函数，就会减少了额外的监听，
                    从而提高了性能；所以不能和.prevent修饰符一同使用，否则浏览器会报错。-->

                    <div>事件修饰符 .stop .prevent .capture .self .once .passive</div>


                    <div v-on:click.once="counter++" class="parent">父元素
                        <div v-on:click.stop="counter++" class="child">子元素</div>
                    </div>
                    <div>按键修饰符: 通过v-on 监听键盘事件时添加按键修饰符：</div>

                    <input v-on:keyup.enter="counter++" placeholder="keyup.enter">

                    <div>按键码</div>

                    <input v-on:keyup.13="counter++" placeholder="keyup.13">
                    <div>你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：https://cn.vuejs.org/v2/api/#keyCodes</div>
                    <div>系统修饰键:.ctrl .alt .shift .meta</div>
                    <!-- Alt + C -->
                    <input @keyup.alt.67="counter++" placeholder="keyup.alt.67">

                    <!-- Ctrl + Click -->
                    <div @click.ctrl="counter++">counter++</div>

                    <div>.exact修饰符--精确的系统修饰符组合才会触发的事件</div>

                    <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
                    <button @click.alt="counter++">alt+click</button>

                    <!-- 有且只有 Alt 被按下的时候才触发 -->
                    <button @click.alt.exact="counter++">Alt+click</button>

                    <!-- 没有任何系统修饰符被按下的时候才触发 -->
                    <button @click.exact="counter++">click</button>
                    <div>鼠标按钮修饰符 .left .middle .left</div>
                </div>


            </template>


        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Handle",
        data(){
            return{
                counter: 1,
                stopT:'"<a v-on:click.stop=\"doThis\"></a>"',
                preventT:'<form v-on:submit.prevent="onSubmit"></form>\n',


            }
        },
        computed:{

            now: function () {
                console.info("now");
                return Date.now()
            }
        },
        methods:{
            doSomething(param,event){
                //`event` 是原生 DOM 事件
                console.log(param);
                console.log(event);
                this.counter++;
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
    .parent{
        background-color: #8c939d;
        width: 200px;
        height: 50px;
    }
    .child{
        background-color: #ee9900;
        width: 100px;
        height: 20px;
        margin: 0 auto;
    }
</style>
