<template>
    <el-container class="box">
        <!--header部分-->
        <el-header height="70px">
            <header-bar></header-bar>
        </el-header>
        <el-container>
            <el-aside class="box_left" :class="{'fold' : leftFold, 'hide' : leftHide}">
                <organization-tree @toggleLeft="toggleLeft"></organization-tree>
            </el-aside>
            <!--content部分-->
            <el-main>
                <cp-worktab id="worktab_1" initPage="mainPage"></cp-worktab>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import headerBar from '../components/home/header.vue'
    import cpWorktab from "../components/workTab/Worktab.vue"
    import organizationTree from "../components/home/OrganizationTree.vue"

    export default {
        name: "index",
        components: {
            headerBar,
            cpWorktab,
            organizationTree
        },
        computed: {
            leftHide() {
                return this.$store.state.leftHide
            },
            leftFold() {
                return this.$store.state.leftFold
            }
        },
        methods: {
            toggleLeft() {
                this.$store.dispatch("toggleLeft")
            }
        }
    }
</script>

<style lang="less" scoped>
    .box {
        background-color: @bgGray;

        .el-header {
            padding: 0;
        }

        .el-main {
            padding: 0px;
        }

        .box_left {
            transition: margin-left 0.2s ease;
        }

        .box_left.fold {
            margin-left: -280px;
        }

        .box_left.hide {
            margin-left: -300px;
        }
    }
</style>
