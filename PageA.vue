<template>
    <div>
        <h1>pageA{{msg}}</h1>
        <span>{{param}}</span>
        <span>{{query}}</span>
        <button @click="back">返回</button>
    </div>
</template>

<script>
    export default {
        name: "PageA",
       data(){
            return{
                msg:"2222",
                param: this.$route.params,
                query: this.$route.query
            }
       },
        beforeRouteEnter(to, from, next){
            console.log(this);
            next(vm=>{
                vm.msg="888";
            })
        },
        methods:{
            back:function () {
                //this.$router.replace({path:'/pageB',query:{abc:"123"}})
                this.$router.push({name:'pageB',params:{abc:"123"}})
            }
        }
    }
</script>

<style scoped>

</style>