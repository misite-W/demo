<template>
    <div id="table2" style="width:100%;height:100%;">
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="date"
                    label="日期"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="province"
                    label="省份"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="市区"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="zip"
                    label="邮编"
                    width="120">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span>{{msg}}</span>

        <radio :radioword="myradio" @getData="getData"></radio>
        <div>userId: {{userId}}</div>

    </div>
</template>

<script>
    import radio from '@/views/demo/radio'

    export default {
        name: "TablePage",
        data() {
            return {
                msg: "展示文本",
                myradio: {"item1": "112233", "item2": "556677"},
                inputtext: 'test',
                radio1: '上海',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }],
            }
        },
        props:["userId"],
        methods: {
            handleClick(row) {
                // eslint-disable-next-line no-console
                console.log(row);
            }, getData(data) {
                this.msg = data;
            }

        },
         components:{
             radio
         },
        created: function () {
            window.console.log(this.$route.query.userId);
            //console.log('实例已经创建,msg变量还未渲染到模板')
        },
        mounted: function () {
            //console.log('已经挂载到模板上:msg变量渲染到模板')
        },
        updated: function () {
            window.console.log(this.msg);
        },
        destroyed: function () {
            //console.log('销毁啦')
        }
    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
