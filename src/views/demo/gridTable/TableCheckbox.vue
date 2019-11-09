<template>
    <div class="main-wraper">
        <screenFilter :searchParams="searchParams">
            <template slot="slot_one">
                <el-button type="primary" size="small" @click="addMeeting"><i class="el-icon-plus"></i> 新增会议</el-button>
                <el-button type="danger" size="small" @click="delMeeting"><i class="el-icon-delete"></i> 删除</el-button>
                <span class="move-right"> 查看范围：
                    <el-select size="small" placeholder="请选择" v-model="searchParams.ranges" >
                        <el-option
                            v-for="(item, index) in rangeDictionary"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </template>
            <template slot="slot_two">
                <el-input class="search-name" size="small" v-model="searchParams.name" placeholder="请输入标题名称" prefix-icon="el-icon-search" @input="searchBtn">
                </el-input>
            </template>
            <template slot="slot_search">
                <el-form-item label="会议类型">
                    <el-select v-model="searchParams.type" placeholder="请选择">
                        <el-option value="0" label="支部委员大会"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会议关键词">
                    <el-input v-model="searchParams.motif"></el-input>
                </el-form-item>
                <el-form-item label="会议时间">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchParams.meetingTime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="会议状态">
                    <el-select v-model="searchParams.status" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in meetingState"
                            :key="index"
                            :label="meetingState[item]"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
        </screenFilter>
        <div class="conditionWrapper">
            <ul class="clearfix conditionBox">
                <li class="condition" :class="{'active': statusCode == '0'}" @click="tabChange('0')">全部会议</li>
                <li class="condition" :class="{'active': statusCode == '1'}" @click="tabChange('1')">我发布的会议</li>
                <li class="condition" :class="{'active': statusCode == '2'}" @click="tabChange('2')">我的草稿</li>
            </ul>
        </div>
        <tableList ref="table"
                   :checkedData="checkedData"
           style="border-top: none"
           :caption="caption"
           :tableScale="tableScale"
           :getDataWay="getDataWay"
           :columns="columns"
           :tableSize="chooseSize"
           selection
           :getCheckedData.sync= 'getCheckedData'
            :spanMethod="objectSpanMethod"
            :columnChange.sync= 'columnChange'
           @selectionChange="handleSelectionChange"
           @rowClick="rowClick"
           @sortChange="sortChange"
           :pagination="pagination"
        >
            <el-table-column label="会议名称" slot="name" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a href="#" class="a-link">
                    {{scope.row.name}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column label="操作" slot="opts" width="90">
                <template v-slot="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            操作
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span @click="look(scope.row)">查看</span></el-dropdown-item>
                            <el-dropdown-item>编辑</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                            <el-dropdown-item><router-link :to="{name:'participants', params:{moduleName:'worktab_1',meetingId:'123'}}">会议人员</router-link></el-dropdown-item>
                            <el-dropdown-item><span @click="write(scope.row)">撰写会议纪要</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>

<script>
    import tableList from '../../../components/grid/TableList.vue';
    export default {
        name: "TableCheckbox",
        components: {
            tableList
        },
        data() {
            return {
                checkedData:[
                    {
                        "date": "2016-05-02",
                        "name": "第十五届三中全会",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "纪律处分,谈心谈话,",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区员村一横路7号大院",
                        "status": "已关闭"
                    },
                    {
                        "date": "2016-05-04",
                        "name": "姓名是：某支部全体委员大会111",
                        "deptName": "中共桂花社区第一支部委员会",
                        "keys": "党内慰问",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区东湖北路30号",
                        "status": "已关闭"
                    }
                ],
                statusCode:'0',
                caption:'测试表格',//表格标题
                tableScale:100,
                getCheckedData:[], //复选框选中的数据
                columnChange:[], //列更变后的数据
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                chooseSize:'中', //表格字体大小设置
                fontSizes:['大','中','小'], //表格字体大小设置
                paginationSizes:[10,50,100],//默认每页显示多少条
                searchParams:{
                    name:'',
                    ranges:'',
                    motif:'111',
                    meetingTime:'',
                    type:'',
                    status:''
                },
                rangeDictionary:[{
                    id: '1',
                    name: '本组织'
                },{
                    id: '0',
                    name: '本组织及下级组织'
                }],
                meetingState: { // 学习资源类型
                    "1": '草稿',
                    '2': '未开始',
                    '3': '进行中',
                    '4': '已取消',
                    '5': '已结束',
                    '6': '已关闭'
                },
                getDataWay:{dataType:"url", type:"get",data:'/mockData/list/data.json',param:{}}, // 通过url方式
                // getDataWay:{dataType:"data",data:[]}, // 直接展示
                //会议名称 所属党组织 会议关键词 会议类型 会议时间 活动地点  状态
                columns: [
                    {
                        label: '会议名称',
                        prop: 'name',
                        width: '30%',
                        showOverflowTooltip:true,
                        template: true
                    },
                    {
                        label: '所属党组织',
                        // width:'120', //注意合并的时候不能设置width
                        showOverflowTooltip:true,
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
                        showOverflowTooltip:true
                    },
                    {
                        label: '活动地点',
                        showOverflowTooltip:true,
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
                tableData: [
                    {
                        "date": "2016-05-02",
                        "name": "20190529测试",
                        "deptName": "中共桂花社区第一支部委员会",
                        "keys": "两学一做,纪律处分",
                        "type": "支部党员大会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "某支部全体委员大会",
                        "deptName": "中共桂花社区第一支部委员会",
                        "keys": "民主评议党员,发展党员",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区东湖北路30号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "某支部全体委员大会",
                        "deptName": "中共桂花社区第一支部委员会",
                        "keys": "党内慰问",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区东湖北路30号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "第十五届三中全会",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "纪律处分,谈心谈话,",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区员村一横路7号大院",
                        "status": "已关闭"
                    },
                    {
                        "date": "2016-05-02",
                        "name": "会议",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "纪律处分,谈心谈话,",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区员村一横路7号大院",
                        "status": "草稿"
                    }, {
                        "date": "2016-05-02",
                        "name": "安吉会议",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "纪律处分,谈心谈话,",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区员村一横路7号大院",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "兰贵社区第二支部会议",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "两学一做",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区黄埔大道西120号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "第十五届三中全会",
                        "deptName": "中共兰贵社区第二支部委员会",
                        "keys": "党内表彰,纪律处分",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区黄埔大道西120号",
                        "status": "已关闭"
                    },
                    {
                        "date": "2016-05-02",
                        "name": "主题教育",
                        "deptName": "中共兰贵社区第六支部委员会",
                        "keys": "党内表彰,纪律处分",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区黄埔大道西120号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "普惠政策",
                        "deptName": "中共兰贵社区第六支部委员会",
                        "keys": "党内表彰,纪律处分",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区黄埔大道西120号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "【0724】支部党员大会会（未开始）中国特色社会主义是历史的结论、人民的选择",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "发展党员",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区环市西路181号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "安全测试",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "发展党员",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区环市西路181号",
                        "status": "已关闭"
                    },{
                        "date": "2016-05-02",
                        "name": "支部党员大会（已结束）中国特色社会主义是历史的结论、人民的选择",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "发展党员",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区环市西路181号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "海德堡的",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "换届,两学一做",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区环市西路181号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "支委会",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "换届,两学一做",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市越秀区环市西路181号",
                        "status": "已关闭"
                    }, {
                        "date": "2016-05-02",
                        "name": "何惧于心",
                        "deptName": "中共兰贵社区第一支部委员会",
                        "keys": "党内慰问,谈心谈话",
                        "type": "支部委员会",
                        "time": "2019-05-20 17:00-2019-05-20 21:00",
                        "address": "广东省广州市天河区黄埔大道西120号",
                        "status": "已关闭"
                    }
                ],
            }
        },
        created() {
            // this.getDataWay.data= this.tableData
            this.getDataWay.param={}
            this.getDataWay.param['id']=11111
        },
        beforeDestroy(){
            console.log("beforeDestroy");
        },
        updated: function(){
            // window.console.log( this.columnChange,'更改后的列！！' )
        },
        methods: {
            /**
             * 合并行或列
             * @param row, column, rowIndex, columnIndex
             */
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 2) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            look:function(){
                this.$router.push({
                    name: "MeetingInfo",
                    params: {
                        moduleName: "worktab_1",
                        meetingId:"meetingId"
                    }
                })
            },
            write:function(){
                this.$router.push({
                    name: "WriteMeetingMinutes",
                    params: {
                        moduleName: "worktab_1",
                        meetingId:"meetingId"
                    }
                })
            },
            addMeeting:function(){
                /*新增会议*/
                this.$router.push({
                    name: "AddMeeting",
                    params: {
                        moduleName: "worktab_1",
                        meetingId:"meetingId"
                    }
                });
            },
            delMeeting:function(){
                this.showConfirm(`确认删除这${this.getCheckedData.length}条数据吗？`,null,null)
            },
            tabChange:function(num){
                this.statusCode=num;
                this.$refs.table.loadData()
            },
            searchBtn:function(){},
            testString:function(){
                return 'sss'
            },
            handleEdit:function(obj){
                alert(obj+'编辑')
            },
            formatterData:function(obj){
                obj.forEach(item=>{
                    item.name='姓名是：'+item.name
                })
            },
            handleSelectionChange(val) {
                console.log(val,'******')
            },
            sortChange:function(column){
                console.log(column,'列排序')
            },
            rowClick:function (row,event,column) {
                //this.$bus.$emit('closeTab',this.$route.name)
                window.console.log(row)
            },
            cellClick:function () {

            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../../assets/common/css/theme.less";
</style>

