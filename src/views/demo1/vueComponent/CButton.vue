<template>
    <div>
        <el-button @click="listen">{{title}}</el-button>
<!--        <el-button @click="$emit('aaa',1)">{{title}}</el-button>-->
<!--        <el-button @click="$emit('listen')">{{title}}</el-button>-->
        <ul>
            <li v-for="item of posts" :key="item.id">{{item.title}}</li>
        </ul>
        <span>年龄：{{age}}</span>
    </div>

</template>
<!-- 参数类型较验:String/Number/Boolean/Array/Object/Function/Promise  -->
<script>
    export default {
        name: "CButton",
        //props:['title','posts'],
        props:{
            title: String,
            //title: [Number,String],
            age:Number,
            // title:{
            //   type:String,
            //     required: false,
            //     default:"888888",
            //     validator: function (value) {
            //         return value.length>5
            //     }
            // },
        //     //posts: Object
             posts: Array
         },
        data: function () {
            return {
                newTitle :"sss",
                e6:`sss
                sss
                sss`,
            //    es6的多行字符串
            }
        },
        mounted() {
            //this.title="我要改写你"
            this.newTitle = this.title
            this.newTitle="我要改写你"
            window.console.log(this.newTitle)
        },
        methods:{
            listen:function () {
                //this.$emit('listen',"参数");
                this.$parent.age=20
            }
        }
    }
</script>

<style scoped>

</style>