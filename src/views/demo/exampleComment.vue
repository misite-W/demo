<template>
    <make-comment :principalId="principalId"></make-comment>
</template>

<script>
    import makeComment from '../../components/makeComment/makeComment'
    export default {
        name: "exampleComment",
        components:{makeComment},
        data:function () {
            return {
                principalId:'',//（如果是对某个会议评论，则表示会议主键id）

            }
        }
    }
</script>

<style scoped>

</style>