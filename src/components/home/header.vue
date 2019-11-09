<template>
    <el-header height="70px" class="clearfix">
        <div class="header-logo" @click="jumpMainPage">
            <img src="../../assets/djyPic.png"/>
        </div>
        <menu-wrapper id="menuWrapper" worktabId="worktab_1"></menu-wrapper>
        <div class="header-right">
            <el-dropdown class="select-role">
          <span class="el-dropdown-link">
            <span>{{role}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in roleList" :key="index">{{item.roleName}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="line"></span>
            <div class="operate_btn">
                <i class="el-icon-message"></i>
                <i class="el-icon-setting"></i>
                <i class="el-icon-remove" @click="logout"></i>
            </div>
        </div>
    </el-header>
</template>

<script>
    import MenuWrapper from "./MenuWrapper"

    export default {
        name: "header-bar",
        data() {
            return {
                role: "党委书记",
                name: "张丽莉",
                org: "中共安徽党委中共安徽党委中共安徽党委",
                tabName1: "党员个人中心",
                tabName2: "统一工作台",
                search: "",

                roleList: [{
                    value: '1',
                    roleName: '党委书记'
                }, {
                    value: '2',
                    roleName: '省委书记'
                }, {
                    value: '3',
                    roleName: '党委秘书'
                }, {
                    value: '4',
                    roleName: '行政管理员'
                }],
            }
        },
        methods: {
            logout: function () {
                let _this = this;
                this.showConfirm("您确定退出登录吗？", function () {
                    sessionStorage.removeItem("userName");
                    _this.$router.push({name:"login",params:{a:"123"}});
                }, null)
            },
            jumpMainPage(){
                this.$router.push("/mainPage1")
            }
        },
        computed: {},
        watch: {},
        mounted() {

        },
        components: {
            MenuWrapper
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        width: 100%;
        background: #CD0000;

        .header-logo {
            float: left;
            padding: 9px 0;
            width: 200px;
            overflow: hidden;
        }

        .header-right {
            float: right;
            line-height: 70px;

            .select-role {
                font-size: 16px;
                color: #ffffff;
            }

            .line {
                border-right: 2px solid #fff;
                margin: 0 20px;
            }

            .operate_btn {
                float: right;
                color: #fff;
                font-size: 20px;

                i {
                    padding: 0 10px;
                }
            }
        }
    }
</style>
