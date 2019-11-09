<template>
    <div id="radio">
        <el-radio v-model="radio" label="1">{{radioword.item1}}</el-radio>
        <el-radio v-model="radio" label="2">{{radioword.item2}}</el-radio>
        <el-radio v-model="radio" label="3">选项三</el-radio>
        <button @click="setData">传递到父组件</button>
        <Eltree v-bind:treeData="treeData1" ref="tree1"></Eltree>
        <Eltree v-bind:treeData="treeData2" ref="tree2"></Eltree>
    </div>
</template>

<script>
    import Eltree from '@/components/Eltree/Eltree';
    export default {
        components:{
            Eltree
        },
        data() {
            return {
                radio: "1",
                msg: "传值给父组件",
                treeData1: {
                    // treeName:"tree",
                    multiple: true, //展示多选框
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
                            id: 1,
                            label: '一级 1',
                            children: [
                                {
                                    id: 11,
                                    label: '二级 1-1',
                                    children: [{
                                        id: 111,
                                        label: '三级 1-1-1',
                                        leaf:true
                                    }, {
                                        id: 112,
                                        label: '三级 1-1-2',
                                        leaf:true
                                    }, {
                                        id: 113,
                                        label: '三级 1-1-3',
                                        leaf:true
                                    }, {
                                        id: 114,
                                        label: '三级 1-1-4',
                                        leaf:true
                                    }]
                                },
                                {
                                    id: 12,
                                    label: '二级 1-2',
                                    children: [{
                                        id: 121,
                                        label: '三级 1-2-1',
                                        leaf:true
                                    }, {
                                        id: 122,
                                        label: '三级 1-2-2',
                                        leaf:true
                                    }, {
                                        id: 123,
                                        label: '三级 1-2-3',
                                        leaf:true
                                    }, {
                                        id: 124,
                                        label: '三级 1-2-4',
                                        leaf:true
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
                                    leaf:true
                                }, {
                                    id: 22,
                                    label: '二级 2-2',
                                    leaf:true
                                }
                            ]
                        }
                    ],
                },
                treeData2: {
                    // treeName:"tree",
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
                                    leaf:true
                                },
                                {
                                    id: 102,
                                    label: '二级 1-2',
                                    children: [{
                                        id: 1021,
                                        label: '三级 1-2-1',
                                        leaf:true
                                    }, {
                                        id: 1022,
                                        label: '三级 1-2-2',
                                        leaf:true
                                    }, {
                                        id: 1023,
                                        label: '三级 1-2-3',
                                        leaf:true
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
                                    leaf:true
                                }, {
                                    id: 202,
                                    label: '二级 2-2',
                                    leaf:true
                                }
                            ]
                        }
                    ],
                }
            }
        },
        name: "radioZJ",
        methods: {
            setData() {
                // this.$emit("getData", this.msg);
                window.console.log(this.$refs.tree1.$refs.tree.getCheckedKeys());
                window.console.log(this.$refs.tree1.getData());
                // console.log(this.$refs.tree2.$refs.tree.getCheckedKeys());
                window.console.log(this.$refs.tree2.getData());
            }
        },
        props: {
            radioword: Object
        },
        mounted(){
            window.console.log(this.$refs.tree1);
            window.console.log(this.$refs.tree2);
        }
    }
</script>

<style scoped>

</style>
