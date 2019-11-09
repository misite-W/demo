<template>
    <div class="login-wrapper">
        <div class="login-box">
            <p class="login-box-msg">Sign in to start your session</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input clearable v-model="ruleForm.userName" placeholder="请输入用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input clearable type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="submit-box">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            validateName(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入用户名'))
                }
                callback()
            },
            validatePassword(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入密码'))
                }
                callback()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('access_token','ssssss');
                        localStorage.setItem("Authorization", "res.info.accessToken");
                        if (this.$route.query.redirect) {
                            this.$router.replace(this.$route.query.redirect);
                        } else {
                            this.$router.replace('/');
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            $('body').addClass("login-page")
        },
        beforeDestroy() {
            $('body').removeClass("login-page")
        }
    }
</script>

<style scoped>
    .login-wrapper{
        width: 360px;
        margin: 10% auto;
    }
    .login-box{
        background: #fff;
        padding: 20px;
        border-top: 0;
        color: #666;
    }
    .login-box-msg{
        margin: 0;
        text-align: center;
        padding: 0 20px 20px 20px;
    }
    .submit-box{
        text-align: center;
    }
</style>