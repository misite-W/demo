<template>
    <el-container><!-- 生命周期 -->
        <el-main>
           {{ message}}
        </el-main>

    </el-container>
</template>

<script>
    export default {
        name: "LiftCycle",
        data(){
            return{
                message:'hello world'
            }
        },
        beforeCreate:function(){
            window.console.log("beforeCreate");
            window.console.log(this.msg);
        },
        created: function () {
            // `this` 指向 vm 实例
            window.console.log("created");

            console.log('a is: ' + this.message)
        },
        beforeMount:function(){
            window.console.log("beforeMount");
        },
        mounted:function(){
            window.console.log("mounted");
        },
        beforeUpdate:function(){
            window.console.log("beforeUpdate");
        },
        updated:function(){
            window.console.log("updated");
        },
        beforeDestroy() {
            window.console.log("beforeDestroy");
        },
        destroyed() {
            window.console.log("destroyed");
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
