<template>
    <div>
        <tableList ref="table"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   index
                   :pagination="pagination"
        >
            <el-table-column label="会议姓名" slot="name" :show-overflow-tooltip="true" >
                <template v-slot="scope">
                    <img src="https://www.baidu.com/img/bd_logo.png" width="15" height="15">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column label="操作" slot="opts">
                <template v-slot="scope">
                    <el-button size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>

<script>
    import tableList from '../../../components/grid/TableList.vue';
    export default {
        name: "TableBase",
        components: {
            tableList
        },
        data() {
            return {
                radio:1,
                dialogVisible: false,//弹层显示或不显示
                getCheckedData:[], //复选框选中的数据
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                getDataWay:{dataType:"url",type:'post',data:'',param:{}}, // 通过url方式
                // getDataWay:{dataType:"url",firstRequest:false,type:'get',data:'/mockData/list/data.json',param:{}}, // 通过url方式，默认第一次不加载
                // getDataWay:{dataType:"data",data:[]}, // 直接展示
                columns: [
                    {
                        label: '',
                        prop: 'radio',
                        width: '55',
                        template: true
                    },
                    {
                        label: '会议名称',
                        prop: 'name',
                        width: '30%',
                        template: true
                    },
                    {
                        label: '所属党组织',
                        width:'120',
                        prop: 'deptName',
                        sortable:true
                    },
                    {
                        label: '会议关键词',
                        prop: 'keys',
                        sortable:false
                    },
                    {
                        label: '会议类型',
                        prop: 'type',
                        sortable:'custom'
                    },
                    {
                        label: '会议时间',
                        prop: 'time',
                    },
                    {
                        label: '活动地点',
                        prop: 'address'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                    },
                    {
                        label: '操作',
                        prop: 'opts',
                        // formatter: this.testString, //对数据格式操作：方式一
                        // formatter: function(row, column, cellValue){ //对数据格式操作：方式二
                        //     return 'sss'
                        // },
                        template: true //添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)
                    }
                ]
            }
        },
        created() {
            // this.getDataWay.data= this.tableData
            this.getDataWay.data= this.$api.upload.reqUrl+'/gridTable/posts'
            this.getDataWay.param['id']=11111
        },
        methods: {
            addBtn:function(){

            },
            searchBtn:function(){},
            test:function(){
                this.$refs.table.loadData()
            },
            testString:function(){
                return 'sss'
            },
            handleEdit:function(obj){
                alert(obj+'编辑')
            },
            formatterData:function(obj){
                if(!!obj){
                    obj.forEach(item=>{
                        item.name='姓名是：'+item.name
                    })
                }
            },
            handleSelectionChange(val) {
                window.console.log(val)
            },
            rowClick:function () {

            },
            cellClick:function () {

            }
        }
    }
</script>

<style scoped>
    .move-right {
        float: right;
    }
</style>
