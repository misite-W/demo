<template>
    <div>
        <code-table-select query-name="education" placeholder= "延长预备期时间"
                           :default-value="form.ycybqsjDm"
                           @change="form.ycybqsjDm = $event"></code-table-select>
<!--        <pgDemo></pgDemo>-->
        <s-identify @identifyCode="identifyCode"></s-identify>
    </div>
</template>

<script>
    import codeTableSelect from "@/components/codeTableSelect/CodeTableSelect"
    import pgDemo from "./pqDemo"
    import SIdentify from "@/components/identify/Identify.vue"
    export default {
        name: "NewPage",
        components:{
            codeTableSelect,
            pgDemo,
            SIdentify
        },
        data:() =>{
            return {
                form: {
                    ycybqsjDm: ''//延长预备期时间（月）
                },
                code:""
            }
        },
        methods:{
            identifyCode(code){
                this.code = code
                console.info(this.code)
            }
        },
        activated() {
            console.log("activated")
        },
        deactivated() {
            console.log("deactivated")
        },
        beforeCreate:function(){
            window.console.log("beforeCreate");
            window.console.log(this.msg);
        },
        created: function () {
            window.console.log("created");
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

</style>