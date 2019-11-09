<template>
    <div class="loginWrap">
        <div class="wrapper">
            <div class="header">
                <img src="../assets/login_logo.png" class="header__logo" alt="">
                <img src="../assets/gddjy.png" class="header__title" alt="">
            </div>
            <div class="login-box-wrap">
                <div class="login-box">
                    <!-- 表单提交备用 -->
                    <form method="post" id="loginForm">
                        <input type="hidden" name="userName" v-model="name"/>
                        <input type="hidden" name="password" v-model="password"/>
                    </form>

                    <div class="login-box__title">账号登录</div>

                    <div class="login-box__left">
                        <div class="box__userName">
                            <el-input id="userName" v-model.trim="name" placeholder="请输入帐号" :autofocus="true"
                                      @keyup.enter.native="sumitForm" class="box__userName_input"></el-input>
                            <img src="../assets/username.png" class="box__userName_img" alt="">
                            <div class="login-box__tip">{{userNameError}}</div>
                        </div>

                        <div class="box__password">
                            <el-input id="password" v-model.trim="password" type="password" placeholder="请输入密码"
                                      @keyup.enter.native="alert()" class="box__password_input"></el-input>
                            <img src="../assets/password.png" class="box__password_img" alt="">
                            <div class="login-box__tip">{{passwordError}}</div>
                        </div>

                        <el-button id="loginEle" class="login-box_button" type="primary" @click="login">登录</el-button>
                    </div>

                    <div class="login-box__middle"></div>

                    <div class="login-box__right">
                        <div class="login-box__right__title">扫码进入广东党建云小程序</div>
                        <img src="../assets/login_xcx.jpg" width="160" alt="">
                    </div>
                </div>
            </div>

            <div class="link">
                <div class="link__container">
                    <dl class="link__container__dl">
                        <dt class="link__container__dt">资料库</dt>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">中国共产党章程</a>
                        </dd>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">党内法规制度</a>
                        </dd>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">关于中国共产党党费收缴</a></dd>
                        <dd class="link__container__dd"><a href="javascript:;" class="link__container__dd_title">中国共产党发展党员工作细则</a>
                        </dd>
                    </dl>

                    <dl class="link__container__dl">
                        <dt class="link__container__dt">友情链接</dt>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">党委友情链接</a>
                        </dd>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">党委友情链接</a>
                        </dd>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">党委友情链接</a>
                        </dd>
                    </dl>

                    <dl class="link__container__dl">
                        <dt class="link__container__dt">联系我们</dt>
                        <dd class="link__container__dd"><a href="javascript:;"
                                                           class="link__container__dd_title">020-1234567</a></dd>
                    </dl>

                    <dl class="link__container__dl">
                        <dt class="link__container__dt">广东党建云小程序</dt>
                        <dd class="link__container__dd"><img src="../assets/login_xcx.jpg" alt=""
                                                             class="link__container__dd_logo"></dd>
                    </dl>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'login',
        data() {
            return {
                userName: 'xudd1',
                userPassword: 'css@1234',
                name: 'xudd1',
                password: 'css@1234',
                userNameError: "",
                passwordError: ""
            }
        },
        methods: {
            sumitForm: function () {
                this.login();
            },
            login: function () {
                localStorage.setItem('access_token','ssssss');
                localStorage.setItem("Authorization", "res.info.accessToken");
                if (this.$route.query.redirect) {
                    this.$router.replace(this.$route.query.redirect);
                } else {
                    this.$router.replace('/');
                }
                return
                let self = this;
                self.showLoginBtnLoading = true; // 隐藏登录icon
                let userName = self.userName;
                let password = self.userPassword;
                if (userName === '') {
                    self.userNameError = '账号不能为空';
                    return false;
                } else {
                    self.userNameError = '';
                }
                if (password === '') {
                    self.passwordError = '密码不能为空';
                    return false;
                } else {
                    self.passwordError = '';
                }
                // 登录请求测试
                this.$axios({
                    method: 'post',
                    url: "/qxgl-center/Mh001LoginCtrl/handleLogins",
                    data: {
                        userName: this.userName,
                        userPwd: this.userPassword
                    }
                }).then(function (res) {
                    if(!res.info){
                        self.$message.error(res.exceptionMes);
                    }
                    self.showLoginBtnLoading = false; // 隐藏登录icon
                    if(res.info.state === '4'){ // 密码错误
                        self.$message.error('密码错误')
                    }
                    if(res.info.state === '2'){ // 账号错误
                        self.$message.error('账号错误')
                    }
                    if(res.info.state === '3'){ // 账号短时间内连续登录错误次数超过5次，账号锁定2分钟，请稍后再试
                        self.$message.error('账号短时间内连续登录错误次数超过5次，账号锁定2分钟，请稍后再试')
                    }
                    if(res.info.state === '1'){ // 账号状态异常
                        self.$message.error('账号状态异常')
                    }
                    if(res.info.recode === 'SUCCESS'){
                        axios.defaults.headers.common['Authorization'] = res.info.accessToken;//请求token信息配置
                        localStorage.setItem("Authorization", res.info.accessToken);
                        const token = res.info.accessToken.substring(7);
                        const refreshToken = res.info.refreshToken;
                        localStorage.setItem('access_token',token);
                        localStorage.setItem('refreshToken',refreshToken);
                        self.$axios({
                            method: 'post',
                            url: "/qxgl-center/Mh001LoginCtrl/getLoginUserInfo",
                            data: {}
                        }).then(function (res) {
                            let userName = res.info.userName;//用户名
                            let userId = res.info.userId;//用户id
                            let orgName = res.info.orgName;// 所在支部名称
                            let orgId = res.info.orgId;//所在支部组织id
                            let orgCjm = res.info.orgCjm;//所在支部层级码
                            let currentRoleName = res.info.currentUserRole.roleName;//默认角色
                            let currentRoleOrgCjm = res.info.currentRoleOrgCjm;//默认角色层级码
                            let currentRoleOrgId = res.info.currentRoleOrgId;//默认角色组织id
                            let currentRoleOrgName = res.info.currentRoleOrgName;//默认角色组织名称
                            let userRolelist = res.info.userRolelist;//用户角色列表
                            let md5Path = res.info.md5Path; //用户头像
                            self.$store.state.orgId = res.info.currentRoleOrgId;
                            localStorage.setItem("orgName", orgName);
                            localStorage.setItem("userName", userName);
                            localStorage.setItem("userId", userId);
                            localStorage.setItem("orgId", orgId);
                            localStorage.setItem("orgCjm", orgCjm);
                            localStorage.setItem("currentRoleName", currentRoleName);
                            localStorage.setItem("currentRoleOrgCjm", currentRoleOrgCjm);
                            localStorage.setItem("currentRoleOrgId", currentRoleOrgId);
                            localStorage.setItem("currentRoleOrgName", currentRoleOrgName);
                            localStorage.setItem("userRolelist",JSON.stringify(userRolelist));
                            localStorage.setItem("md5Path",md5Path);
                            if (self.$route.query.redirect) {
                                self.$router.replace(self.$route.query.redirect);
                            } else {
                                self.$router.replace('/');
                            }
                        }).catch(function (error) {
                            window.console.log(error);
                        });
                    }else{
                        console.log(res.info.msg)
                    }
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        }, created() {
            window.scroll(0, 0);
        }
    }
</script>

<style scoped lang="less">
    .loginWrap {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        min-width: max-content;
        min-width: -moz-max-content;
    }

    .el-button--primary:focus, .el-button--primary:hover {
        background-color: #b81c24;
        border-color: #b81c24;
        color: #fff;
    }

    .header {
        padding: 20px 75px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .header__logo {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 16px;
        vertical-align: middle;
    }

    .header__title {
        display: inline-block;
        vertical-align: middle;
    }

    .header_next {
        height: 100px;
        vertical-align: middle;
        background: url('../assets/login_topPic.png') repeat-x 50%;
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .login-box {
        width: 580px;
        box-sizing: border-box;
        padding: 20px 30px 50px 30px;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        overflow: hidden;
    }

    .login-box-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: calc(100vh - 380px);
        min-height: 360px;
    }

    .login-box__left {
        float: left;
        width: 280px;
    }

    .login-box__title {
        margin: 0 0 30px 0;
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
    }

    .box__userName {
        position: relative;
    }

    .login-box__tip {
        height: 24px;
        line-height: 24px;
        color: #B81C24;
        font-size: 12px;
    }

    .box__userName_img {
        position: absolute;
        display: block;
        top: 12px;
        left: 12px;
        width: 16px;
        height: 16px;
    }

    .box__password_img {
        &:extend(.box__userName_img);
    }

    .box__password {
        position: relative;
        margin: 0 0 50px 0;
    }

    .login-box_button {
        width: 100%;
        height: 40px;
    }

    /deep/ .box__userName_input .el-input__inner {
        padding: 0 15px 0 36px;
        height: 40px;
        line-height: 40px;
    }

    /deep/ .box__password_input .el-input__inner {
        padding: 0 15px 0 36px;
        height: 40px;
        line-height: 40px;
    }

    .login-box__middle {
        float: left;
        margin: 30px 22px 0 45px;
        width: 1px;
        height: 120px;
        background: rgba(0, 0, 0, 0.09);
    }

    .login-box__right {
        float: left;
    }

    .login-box__right__title {
        width: 168px;
        margin: 0 0 20px 0;
        font-size: 14px;
        color: #B81C24;
    }

    .link {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 210px;
        background: linear-gradient(180deg, rgba(221, 60, 74, 1) 0%, rgba(184, 28, 36, 1) 100%);
    }

    .link__container {
        display: flex;
        box-sizing: border-box;
        padding: 32px 0 0 120px;
        margin: 0 auto;
    }

    .link__container__dl {
        width: 25%;
        padding-left: 30px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.15);

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            border-right: none
        }
    }

    .link__container__dt {
        color: #ffffff;
        margin: 0 0 12px 0;
    }

    .link__container__dd {
        margin: 0 0 10px 0;
    }

    .link__container__dd_title {
        color: #ffffff;
        opacity: .7;
        font-size: 14px;
        text-decoration: none;
    }

    .link__container__dd_logo {
        width: 104px;
        height: 104px;
        box-sizing: border-box;
        border: 6px solid rgba(255, 255, 255, .2);
        border-radius: 50%;
    }
</style>
