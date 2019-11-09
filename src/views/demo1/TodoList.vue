<template>
    <div id="root">
        <input type="text" v-model="msg" id="input">
        <button v-on:click="add" id="btn">add</button>
        <ul>
            <li v-for="item of list">{{item}}</li>
        </ul>
    </div>
</template>

<script>
    export default {

        name: "TodoList",
        data:function () {
            return{
                msg:"hello world",
                list:[]
            }
        },
        mounted() {

        },
        methods:{
            add:function () {
                this.list.push(this.msg)
            }
        }
    }
</script>

<style scoped>

</style>