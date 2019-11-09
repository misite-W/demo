<template xmlns="http://www.w3.org/1999/html">
    <el-container><!--条件渲染：v-if v-show (v-if vs v-show) (v-if与v-for一起使用) (v-for使用对象和数组，维护状态，数组&对象更新检测) -->
        <el-header height="100px">
            <div class="describe"> 条件渲染</div>
            <div>数据：<br>{{this.$data}}</div>
            <el-divider></el-divider>
        </el-header>
        <el-main>

            <template v-if="true">
                <div>v-if指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 true 值的时候被渲染。
                    <br>通过和v-if-else/v-else配套使用
                </div>
                <h1 v-if="isBig === 'h1'">H1</h1>
                <h2 v-else-if="isBig==='h2'">H2</h2>
                <h3 v-else="isBig==='h3'">H3</h3>

                <div class="alert"> 将v-if用在template上，实现切换多个元素</div>
                <template v-if="false">
                    <h1>Title</h1>
                    <p>Paragraph 1</p>
                    <p>Paragraph 2</p>
                </template>

                <div>用 <span class="alert">key </span>管理可复用的元素,可高效地渲染元素，
                    <br>通常会复用已有元素而不是从头开始渲染
                </div>

                <template v-if="loginType === 'username'">
                    <label>Username</label>
<!--                    <input placeholder="Enter your username">-->
                        <input placeholder="Enter your username" key="username-input">
                </template>
                <template v-else>
                    <label>Email</label>
<!--                    <input placeholder="Enter your email address">-->
                        <input placeholder="Enter your email address" key="email-input">
                </template>

                <div>那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<br>
                    input框不会被替换掉,仅仅是替换了它的 placeholder。
                </div>
            </template>

            <template v-if="true">
                <div>v-show指令, 元素始终会被渲染并保留在 DOM 中。
                    <br>v-show 只是简单地切换元素的 CSS 属性 display
                </div>
                <h1 v-show="false">Hello!</h1>
                <div class="alert">比拼：v-if vs v-show</div>
                <div>
                    v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
                    <br>
                    v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
                    <br>
                    相比之下，v-show 就简单得多——不管初始条件是什么，<span class="alert">元素总是会被渲染，并且只是简单地基于 CSS 进行切换</span>
                    <br>
                    一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；
                    <br>
                    如果在运行时条件很少改变，则使用 v-if 较好。
                </div>
                <div class="alert">注：v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级</div>
            </template>

            <template v-if="true">
                <div>v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 或 item of items形式的特殊语法，
                    <br>其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名
                    <br>对于数组 v-for 第一个为值，可选的第二个参数是当前项的索引
                    <br>对于对象 v-for val,key,index
                    <br>:key属性，主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes，
                    <br>如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
                    <br>使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
                    <br><span class="alert">建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。</span>
                </div>
                <ul>
                    <li v-if="index%2==0" v-for="(val,index) in dataList">{{val}}</li>
                </ul>
                <ul>
                    <li v-for="(val,key,index) in dataObj">{{index + ":" +key+ "-- "+ val}}</li>
                </ul>

            </template>

            <template v-if="true">
                <div>数组更新检测--变异方法，Vue对被侦听的数组的变异方法进行了包裹，会改变调用了这些方法的原始数组，所以它们也将会触发视图更新
                    push()、pop()、shift()、unshift()、splice()、sort()、reverse()
                    <br>
                </div>
                <div>--非变异方法如：filter()、concat() 和 slice() 。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，若想更新视图，可以用新数组替换旧数组</div>
                <el-button @click="doSomething">dosomething</el-button>
                <div><!-- v-for接受整数。在这种情况下，它会把模板重复对应次数 -->
                    <span v-for="n in 10">{{ n }} </span>
                </div>
                <template v-for="n in 10"><!-- v-for用在template上 -->
                    <span>{{ n }}</span>
                </template>
            </template>


        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Drawing",
        data(){
            return{
                isBig: 'h1',
                loginType:'username',
                dataList:[
                    1,2,3,4,5,6,7,8,9
                ],
                dataObj:{
                    name:'zhangsan',
                    age:"20"
                }
            }
        },
        computed:{

            now: function () {
                console.info("now");
                return Date.now()
            }
        },
        methods:{
            doSomething(){
                // this.fullName = "我的  你猜";
                // this.dataList[0]=10; // 不是响应性的
                // this.$set(this.dataList,0,10);//vm.$set 实例方法
                // this.dataList.splice(0,1,10);

                // var temp = this.dataList;
                // this.dataList = temp;
                // this.dataList.length = this.dataList.length-1; // 不是响应性的

                //this.$set(this.dataObj,'address','beijing');//为已有对象添加新属性
                Object.assign(this.dataObj, {
                    age: 27,
                    favoriteColor: 'Vue Green'
                })
                // this.dataObj = Object.assign({}, this.dataObj, {
                //     age: 27,
                //     favoriteColor: 'Vue Green'
                // })
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
    ul li{
        display: inline-block;
        margin-right: 10px;
    }
</style>
