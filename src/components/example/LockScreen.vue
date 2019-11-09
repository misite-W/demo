<template>
    <div class="lockscreen-wrapper">
        <div class="lockscreen-box">
            <p class="lockscreen-box-msg">{{userName}}</p>
            <div class="lockscreen-item">
                <div class="lockscreen-image">
                    <div class="img">su</div>
                </div>
                <form class="lockscreen-credentials">
                    <el-input placeholder="password" v-model="password">
                        <template slot="append"><i class="el-icon-right" @click="login"></i></template>
                    </el-input>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LockScreen",
        data() {
            return {
                userName: "hammer",
                password:""
            }
        },
        methods: {
            login(){
                if (this.password == ""){
                    this.$message.warning('密码不能为空!')
                    return
                }
                this.$router.push({"path":"/"})
            }
        },
        mounted() {
            $('body').addClass("lockscreen")
        },
        beforeDestroy() {
            $('body').removeClass("lockscreen")
        }
    }
</script>

<style scoped>
    .lockscreen-wrapper{
        width: 360px;
        margin: 10% auto;
    }
    .lockscreen-box{
        padding: 20px;
        border-top: 0;
        color: #666;
    }
    .lockscreen-box-msg{
        font-weight: 600;
        text-align: center;
        font-size: 35px;
        color: #fff;
    }
    .lockscreen-item {
        border-radius: 4px;
        padding: 0;
        background: #fff;
        position: relative;
        margin: 10px auto 30px auto;
        width: 290px;
    }
    .lockscreen-image .img{
        border-radius: 50%;
        width: 70px;
        line-height: 70px;
        height: 70px;
        font-size: 30px;
        text-align: center;
    }
    .lockscreen-image {
        border-radius: 50%;
        position: absolute;
        left: -10px;
        top: -20px;
        background: #fff;
        padding: 5px;
        z-index: 10;
    }
    .lockscreen-credentials {
        margin-left: 70px;
    }
    .lockscreen-credentials >>> .el-input .el-input__inner{
        border: 0px;
    }
    .lockscreen-credentials >>> .el-input .el-input-group__append{
        border: 0px;
        background-color: #fff;
        padding: 0 10px;
        font-size: 20px;
        cursor: pointer;
    }
</style>