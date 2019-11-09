<template>
    <div>
        <button @click="addTab">增加tab页</button>
    </div>
</template>

<script>
    import NewPage from "../../views/demo/NewPage.vue";

    export default {
        name: "AddTabButton",
        methods: {
            addTab() {
                let rand = Math.random()
                this.$$Push({component:NewPage,params:{abc:"123",rand:rand}})
            }
        }
    }
</script>

<style scoped>

</style>