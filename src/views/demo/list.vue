<template>
    <div>
<!--        <screenFilter :searchParams="searchParams">-->
<!--            <template slot="slot_one">-->
<!--                <el-button type="primary" size="small" @click="addBtn"><i class="el-icon-plus"></i> 添加</el-button>-->
<!--                <el-button type="primary" size="small" @click="test"><i class="el-icon-delete"></i> 删除</el-button>-->
<!--                <el-button type="primary" size="small">取消发布</el-button>-->
<!--                <span class="move-right"> 查看范围：-->
<!--                    <el-select size="small" placeholder="请选择" >-->
<!--                        <el-option-->
<!--                                label="本组织"-->
<!--                                value="1">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </span>-->
<!--            </template>-->
<!--            <template slot="slot_two">-->
<!--                <el-input class="search-name" size="small" v-model="searchParams.name" placeholder="请输入标题名称" prefix-icon="el-icon-search" @input="searchBtn">-->
<!--                </el-input>-->
<!--            </template>-->
<!--            <template slot="slot_search">-->
<!--                <el-form-item label="日期">-->
<!--                    <el-date-picker-->
<!--                        prefix-icon="el-icon-date"-->
<!--                        v-model="searchParams.startDate"-->
<!--                        type="date"-->
<!--                        :clearable="false"-->
<!--                        class="date-picker-155"-->
<!--                        placeholder="选择起始日期"-->
<!--                        value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                    <span class="range">至</span>-->
<!--                    <el-date-picker-->
<!--                        prefix-icon="el-icon-date"-->
<!--                        v-model="searchParams.endDate"-->
<!--                        type="date"-->
<!--                        :clearable="false"-->
<!--                        class="date-picker-155"-->
<!--                        placeholder="选择结束日期"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        :picker-options="controlTime1">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="名称">-->
<!--                    <el-input v-model="searchParams.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="地址">-->
<!--                    <el-input v-model="searchParams.address"></el-input>-->
<!--                </el-form-item>-->
<!--            </template>-->
<!--        </screenFilter>-->
        <tableList ref="table"
            :getDataWay="getDataWay"
            :columns="columns"
            selection
            index
            :getCheckedData.sync= 'getCheckedData'
            @handleSelectionChange="handleSelectionChange"
            @rowClick="rowClick"
            :pagination="pagination"
        >
<!--            <el-table-column label="" slot="radio">-->
<!--                <template v-slot="scope">-->
<!--                <input type="radio" name="radio" value="" />-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="姓名" slot="name" :show-overflow-tooltip="true">
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
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <tableList ref="dialogTable"
                       :getDataWay="getDataWay"
                       :columns="columns"
                       selection
                       :getCheckedData.sync= 'getCheckedData'
                       @handleSelectionChange="handleSelectionChange"
                       @formatterData="formatterData"
                       :pagination="pagination"
            >
            </tableList>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from '../../components/grid/TableList.vue';
    export default {
        name: "list",
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
                searchParams:{
                    name:'',
                    deptName:'',
                    keys:'',
                    startDate:'',
                    endDate:''
                },
                controlTime1: { // 结束时间大于开始时间
                    disabledDate: time => {
                        if (this.searchParams.startDate !== '') {
                            return time.getTime() < new Date(this.searchParams.startDate).getTime() - 8.64e7;
                        }
                    }
                },
                getDataWay:{dataType:"url",type:'get',data:'/mockData/list/data.json',param:{}}, // 通过url方式
                // getDataWay:{dataType:"url",firstRequest:false,type:'get',data:'/mockData/list/data.json',param:{}}, // 通过url方式
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
                ],
                // tableData: [
                //     {
                //         date: '2016-05-02',
                //         name: '王小虎',
                //         address: '上海市普陀区金沙江路 1518 弄'
                //     }, {
                //         date: '2016-05-04',
                //         name: '王小虎',
                //         address: '上海市普陀区金沙江路 1517 弄'
                //     }, {
                //         date: '2016-05-01',
                //         name: '王小虎',
                //         address: '上海市普陀区金沙江路 1519 弄'
                //     }, {
                //         date: '2016-05-03',
                //         name: '王小虎',
                //         address: '上海市普陀区金沙江路 1516 弄'
                //     }
                // ],
            }
        },
        created() {
            // this.getDataWay.data= this.tableData
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
