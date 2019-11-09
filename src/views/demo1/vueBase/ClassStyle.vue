<template>
    <div class="box">
        <el-container>
            <el-aside width="200px">
                <div>{{this.$data}}</div>
            </el-aside>
            <el-container>
                <el-aside>
                    <div>对象语法</div>
                    <div v-bind:class="{ 'active': true }">akskdfsfsssss</div>
                    <div class="static" @click="changeClass"
                         v-bind:class="{ active: !isActive, 'text-danger': hasError }">{ active: !isActive, 'text-danger': hasError }</div>
                    <div v-bind:class="classObject">对象变量classObject</div>
                    <div v-bind:class="classObject2">计算属性classObject2</div>

                    <div>数组语法</div>
                    <div v-bind:class="[activeClass, errorClass]">[activeClass, errorClass]</div>
                    <div v-bind:class="[isActive ? activeClass : '', errorClass]">[isActive ? activeClass : '', errorClass]</div>
                    <div v-bind:class="[{ active: isActive }, errorClass]">[{ active: isActive }, errorClass]</div>

                    <div>用在组件上</div>
                    <class-btn class="test" :class="{active: true}"></class-btn>

                </el-aside>
                <el-main>
                    <div>内联样式</div>
                    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">v-bind:style对象语法</div>
                    <div v-bind:style="styleObject">样式对象styleObject</div>
                    <div v-bind:style="[baseStyles, overridingStyles]">数组对象</div>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import ClassBtn from "./ClassBtn"
    export default {
        name: "ClassStyle",
        data() {
            return {
                isActive: true,
                hasError: false,
                error: null,
                classObject: {
                    active: true,
                    'text-danger': false
                },
                activeClass: 'active',
                errorClass: 'text-danger',
                activeColor: 'red',
                fontSize: 30,
                styleObject: {
                    color: 'red',
                    fontSize: '13px'
                },
                baseStyles:{
                    backgroundColor: 'yellow',
                    color: 'red'
                },
                overridingStyles:{
                    fontSize: '18px',
                    color: 'black'
                }
            }
        },
        components:{ClassBtn},
        computed:{
            classObject2(){
                return {
                    active: this.isActive,
                    'text-danger': !this.hasError
                }
            }
        },
        methods:{
           /*
           * 注意，不应该使用箭头函数来定义 method 函数 。
           * 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.hasError 将是 undefined。
           * */
            changeClass(){
                this.hasError = ! this.hasError;
            },
            // changeClass:()=>{
            //     console.log(this)
            //     this.hasError = ! this.hasError;
            // }

        }
    }
</script>

<style scoped lang="less">
    .box{
        width: 1000px;
        height: 300px;
        margin: 0 auto;
        color: black;
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: space-around;*/
        div{
            /*background-color: gray;*/
            margin: 10px;
            padding: 10px;
        }
        div.active{
            background-color: black;
            color: white;
        }
        div.text-danger{
            color: green;
        }
        .el-main{
            padding:0px;
        }
    }
</style>
