<template>
    <div class="menuWrapper">
        <span v-for="item in menu"
              class="menuWrapper_item"
              :class="{'active' : item.isActive, 'cursor_pointer' : item.lv2Menu && item.lv2Menu.length>0 || item.route}"
              :key="item.id"
        >
            <span v-if="item.route" @click="onMenuClick(item);menuActive(item)">{{item.name}}</span>
            <el-popover v-else-if="item.lv2Menu && item.lv2Menu.length > 0" @show="onMenuPop(item)">
                <div class="popoverContent">
                    <dl v-for="lv2Item in item.lv2Menu" :key="lv2Item.id">
                        <dt class="lv2MenuItem"><i :class="['iconfont', lv2Item.icon?lv2Item.icon:'iconzuzhiguanli']"></i>{{lv2Item.name}}</dt>
                        <dd v-for="lv3Item in lv2Item.lv3Menu"
                            class="lv3MenuItem"
                            :class="{'cursor_pointer' : lv3Item.route, 'active' : lv3Item.route && lv3Item.route.name==currentMenu}"
                            :key="lv3Item.id"
                            @click="onMenuClick(lv3Item)"
                        >
                            {{lv3Item.name}}
                            <dl v-if="lv3Item.lv4Menu && lv3Item.lv4Menu.length > 0">
                                <dd v-for="lv4Item in lv3Item.lv4Menu"
                                    class="lv4MenuItem"
                                    :class="{'cursor_pointer' : lv4Item.route, 'active' : lv4Item.route && lv4Item.route.name==currentMenu}"
                                    :key="lv4Item.id"
                                    @click="onMenuClick(lv4Item)"
                                >
                                    {{lv4Item.name}}
                                </dd>
                            </dl>
                        </dd>
                    </dl>
                </div>
                <span slot="reference">{{item.name}}</span>
            </el-popover>
            <span v-else class="disabled">{{item.name}}</span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "MenuWrapper",
        data: () => {
            return {
                menu: [
                    {
                        id: "001",
                        name: "工作台",
                        isActive: true,
                        route: {
                            name: "mainPage",
                            params: {}
                        }
                    },
                    {
                        id: "002",
                        name: "管理服务",
                        isActive: false,
                        lv2Menu: [
                            {
                                id: "002001",
                                name: "Tab",
                                icon: "icondangyuanguanli",
                                lv3Menu: [
                                  {
                                      id:"002001001",
                                      name:"考试管理",
                                      showTree:false,
                                      route:{
                                          name:"test",
                                          params:{
                                              userId:12345
                                          }
                                      }
                                  }

                                ]
                            },
                            {
                                id: "002002",
                                name: "Demo",
                                lv3Menu: [
                                    {
                                        id: "002002001",
                                        name: "图表展示",
                                        showTree: false,
                                        //此处只需已配置路由的name和需要传的参数。
                                        route: {
                                            name: "TablePage",
                                            params: {
                                                userId: 12345
                                            }
                                        }
                                    },
                                    {
                                        id: "002002002",
                                        name: "chart图展示",
                                        showTree: true,
                                        route: {
                                            name: "mychart",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002002003",
                                        name: "下拉树Demo",
                                        showTree: true,
                                        route: {
                                            name: "treeSelectDemo",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002002004",
                                        name: "地图定位Demo",
                                        route: {
                                            name: "djmap",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002002005",
                                        name: "toolbar",
                                        route: {
                                            name: "toolbarPage",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002002006",
                                        name: "表格Grid",
                                        // route: {
                                        //     name: "list",
                                        //     params: {}
                                        // }
                                        lv4Menu:[
                                            {
                                                id: "002002006001",
                                                name: "基础表格",
                                                route: {
                                                    name: "TableBase",
                                                    params: {}
                                                }
                                            },
                                            {
                                                id: "002002006002",
                                                name: "带选择框的表格",
                                                route: {
                                                    name: "TableCheckbox",
                                                    params: {}
                                                }
                                            },

                                        ]
                                    },
                                    {
                                        id: "002002007",
                                        name: "富文本编辑器",
                                        route: {
                                            name: "richTextEditor",
                                            params: {}
                                        }
                                    },{
                                        id: "002002008",
                                        name: "评论组件",
                                        route: {
                                            name: "exampleComment",
                                            params: {}
                                        }
                                    },{
                                        id: "002002009",
                                        name: "图片剪辑",
                                        route: {
                                            name: "copperPage",
                                            params: {}
                                        }
                                    },{
                                        id: "002002010",
                                        name: "日历组件",
                                        route: {
                                            name: "calendar",
                                            params: {}
                                        }
                                    }
                                    ,{
                                        id: "002002011",
                                        name: "文件上传",
                                        route: {
                                            name: "upload",
                                            params: {}
                                        }
                                    }
                                ]
                            },
                            {
                                id: "002003",
                                name: "Tab",
                                icon: "icondangyuanguanli",
                                lv3Menu: [
                                    {
                                        id: "002003001",
                                        name: "Mock数据",
                                        showTree: false,
                                        //此处只需已配置路由的name和需要传的参数。
                                        route: {
                                            name: "show",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002003002",
                                        name: "码表select",
                                        showTree: false,
                                        //此处只需已配置路由的name和需要传的参数。
                                        route: {
                                            name: "NewPage",
                                            params: {}
                                        }
                                    },
                                    {
                                        id: "002003003",
                                        name: "视频播放",
                                        showTree: false,
                                        //此处只需已配置路由的name和需要传的参数。
                                        route: {
                                            name: "video",
                                            params: {}
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: "003",
                        name: "教育培训",
                        isActive: false,
                        lv2Menu: [
                            {
                                id: "003001",
                                name: "网上学堂",
                                icon: "iconzuzhiguanli",
                                lv3Menu: []
                            },
                            {
                                id: "003002",
                                name: "在线考试",
                                icon: "iconzuzhiguanli",
                                lv3Menu: [
                                    {
                                        id: "003002001",
                                        name: "题库管理",
                                        showTree: true,
                                        route: {
                                            name: "questionBank",
                                            params: {}
                                        }
                                    }
                                ]
                            },
                            {
                                id: "003003",
                                name: "教育资源库",
                                icon: "iconzuzhiguanli",
                                lv3Menu: [],
                            },
                        ],
                    },
                ]
            }
        },
        props: ["worktabId"],
        computed: {
            currentMenu() {
                if (this.$store.state.worktab[this.worktabId]) {
                    return this.$store.state.worktab[this.worktabId].current.name
                } else if (this.$store.state.worktab.cacheFirstPage[this.worktabId]) {
                    return this.$store.state.worktab.cacheFirstPage[this.worktabId].to.name
                } else {
                    return ""
                }
            }
        },
        methods: {
            menuActive(item) {
                this.menu.forEach((obj) => {
                    if (obj.id == item.id) {
                        obj.isActive = true
                    } else {

                        obj.isActive = false
                    }
                })
            },
            onMenuClick(item) {
                if (item.route) {
                    item.route.params["moduleName"] = this.worktabId
                    item.route.params["showTree"] = !!item.showTree
                    this.$router.push(item.route)
                    document.querySelector("#app").click()
                }
            },
            onMenuPop(item) {
                this.menuActive(item)
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    .menuWrapper {
        display: inline-block;
        margin-left: 20px;
        line-height: 70px;
    }

    .menuWrapper_item {
        margin-right: 40px;
        color: #fff;
        font-size: 14px;
        outline: none;
    }

    .cursor_pointer {
        cursor: pointer;
    }

    .menuWrapper_item.active {
        color: #fdce16;
    }

/*    .popoverContent {
        display: flex;
        width: 960px;
    }

    .popoverContent > dl {
        padding: 0 0 12px 24px;
    }*/

    .popoverContent {
        width: 960px;
        display: inline-block;
    }

    .popoverContent > dl {
        min-height: 175px;
        padding: 0 0 12px 24px;
        display: inline-block;
        vertical-align: top;
    }

    .popoverContent > dl > dt {
        box-sizing: border-box;
        padding: 15px 0 15px 0px;
        width: 210px;
        color: #282828;
        border-bottom: 1px solid #d9d9d9;
        font-size: 16px;
        line-height: 20px;
        font-weight: 700;
    }

    .popoverContent > dl > dt > i {
        color: @themeColor;
        margin-right: 10px;
        font-size: 20px;
    }

    .popoverContent > dl > dd {
        padding: 8px 0 0;
        margin-left: 40px;
        display: list-item;
        list-style-type: disc;
        font-weight: 700;
        color: #000;
    }

    .popoverContent > dl > dd > dl > dd {
        padding: 8px 0 0;
        color: #424242;
    }

    .popoverContent .cursor_pointer.active {
        color: @themeColor;
    }
    .lv4MenuItem{
        font-weight: 400!important;
    }


</style>
