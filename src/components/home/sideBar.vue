<template>
      <el-menu class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">组织管理</span>
            </template>
            <el-submenu index="1-1">
              <span slot="title">组织关系转接</span>
              <el-menu-item index="1-1-1">转入党组织</el-menu-item>
              <el-submenu index="1-1-2">
                <span slot="title">互动交流</span>
                <el-menu-item index="1-1-2-1">统计工作</el-menu-item>
                <router-link :to="{name:'TablePage', params:{userId:'12345', moduleName:'worktab_1'}}">
                  <el-menu-item index="1-1-2-2">图表展示</el-menu-item>
                </router-link>
                <router-link :to="{name:'mychart', params:{moduleName:'worktab_1'}}">
                  <el-menu-item index="1-1-2-3">chart图展示</el-menu-item>
                </router-link>
                <router-link :to="{name:'treeSelect', params:{moduleName:'worktab_1'}}">
                   <el-menu-item index="1-1-2-4">下拉树Demo</el-menu-item>
                </router-link>
                  <router-link :to="{name:'djmap', params:{moduleName:'worktab_1'}}">
                      <el-menu-item index="1-1-2-5">地图定位Demo</el-menu-item>
                  </router-link>
                  <router-link :to="{name:'participants', params:{moduleName:'worktab_1',meetingId:'123'}}">
                   <el-menu-item >会议人员</el-menu-item>
                </router-link>
              </el-submenu>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>党员管理</template>
              <router-link :to="{path:'/index/flowOutParty'}">
                  <el-menu-item index="2-1">流动党员</el-menu-item>
              </router-link>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">教育平台</span>
          </el-menu-item>
          <el-submenu index="4">
              <template slot="title"><i class="el-icon-menu"></i>组织生活会</template>
              <router-link :to="{path:'/index/organizedLifeList'}">
                  <el-menu-item index="4-1">组织生活会管理列表</el-menu-item>
              </router-link>
          </el-submenu>
          <el-submenu index="5">
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">教育培训</span>
              </template>
              <router-link :to="{name:'questionBank', params:{moduleName:'worktab_1'}}">
                  <el-menu-item index="5-1">题库管理</el-menu-item>
              </router-link>
          </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    name: "side-bar",
    data() {
      return {
//        show: false,
//        active: false, //是否展开
//        menu: [],
//        cuttentMenu: [],
//        flag: true // 自动定位到当前菜单
      }
    },
    methods: {

    },
    computed:{

    },
    watch:{

    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>

</style>
