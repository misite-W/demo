<template>
    <div>
        <Eltree :treeData="treeData1" ref="tree1" class="g-p-50"></Eltree>
        <Eltree :treeData="treeData2" ref="tree2"></Eltree>
        <el-button type="primary" @click="setData()">设置data</el-button>
        <el-button type="primary" @click="getData()">获取data</el-button>
    </div>
</template>

<script>
    import Eltree from '@/components/Eltree/Eltree'

    export default {
        name: "treeSelectDemo",
        components: {
            Eltree,
        },
        data() {
            return {
                orgId: this.$store.state.orgId,
                treeData1: {
                    multiple: true, //展示多选框
                    lazy: true,    //开启懒加载
                    /*url请求需配置----start*/
                    // dataType: "URL",
                    // url: "/WingsTreeCtrl/returnTree",
                    // quarm:{//请求参数
                    //     a:1
                    // },
                    /*url请求需配置----end*/
                    value: [
                        {
                            id: 1,
                            label: '一级 1',
                            children: [
                                {
                                    id: 11,
                                    label: '二级 1-1',
                                    children: [{
                                        id: 111,
                                        label: '三级 1-1-1',
                                        leaf: true
                                    }, {
                                        id: 112,
                                        label: '三级 1-1-2',
                                        leaf: true
                                    }, {
                                        id: 113,
                                        label: '三级 1-1-3',
                                        leaf: true
                                    }, {
                                        id: 114,
                                        label: '三级 1-1-4',
                                        leaf: true
                                    }]
                                },
                                {
                                    id: 12,
                                    label: '二级 1-2',
                                    children: [{
                                        id: 121,
                                        label: '三级 1-2-1',
                                        leaf: true
                                    }, {
                                        id: 122,
                                        label: '三级 1-2-2',
                                        leaf: true
                                    }, {
                                        id: 123,
                                        label: '三级 1-2-3',
                                        leaf: true
                                    }, {
                                        id: 124,
                                        label: '三级 1-2-4',
                                        leaf: true
                                    }]
                                }],
                        },
                        {
                            id: 2,
                            label: '一级 2',
                            children: [
                                {
                                    id: 21,
                                    label: '二级 2-1',
                                    leaf: true
                                }, {
                                    id: 22,
                                    label: '二级 2-2',
                                    leaf: true
                                }
                            ]
                        }
                    ],
                },
                treeData2: {
                    multiple: false, //展示多选框
                    lazy: false,    //开启懒加载
                    /*url请求需配置----start*/
                    // dataType: "URL",
                    // url: "/WingsTreeCtrl/returnTree",
                    // quarm:{//请求参数
                    //     a:1
                    // },
                    /*url请求需配置----end*/
                    value: [
                        {
                            id: 10,
                            label: '一级 1',
                            children: [
                                {
                                    id: 101,
                                    label: '二级 1-1',
                                    leaf: true
                                },
                                {
                                    id: 102,
                                    label: '二级 1-2',
                                    children: [{
                                        id: 1021,
                                        label: '三级 1-2-1',
                                        leaf: true
                                    }, {
                                        id: 1022,
                                        label: '三级 1-2-2',
                                        leaf: true
                                    }, {
                                        id: 1023,
                                        label: '三级 1-2-3',
                                        leaf: true
                                    }]
                                }],
                        },
                        {
                            id: 20,
                            label: '一级 2',
                            children: [
                                {
                                    id: 201,
                                    label: '二级 2-1',
                                    leaf: true
                                }, {
                                    id: 202,
                                    label: '二级 2-2',
                                    leaf: true
                                }
                            ]
                        }
                    ],
                }
            }
        },
        watch:{
            orgId(val){
                this.onOrgChange(val)
            }
        },
        methods: {
            onPageActive(){
                window.console.log("treeSelectDemo页面激活"+this.orgId)
            },
            onOrgChange(orgId){
                window.console.log("treeSelectDemo" + "组织变更为："+orgId+"，刷新当前页数据")
                this.msgAlert("treeSelectDemo" + "组织变更为："+orgId+"，刷新当前页数据")
            },
            getData() {
                console.log(this.$refs.tree1.$refs.tree.getCheckedKeys());
                console.log(this.$refs.tree1.getData());
                console.log(this.$refs.tree2.getData());
            },
            setData() {
                this.$refs.tree1.setData([1, 2]);
                this.$refs.tree2.setData(10);
            }
        }
    }
</script>

<style scoped>
    .g-p-50 {
        width: 50%;
    }

</style>
