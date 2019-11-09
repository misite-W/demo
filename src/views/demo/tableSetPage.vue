<template>
    <div>
        <toolbar ref="div1" position="right" style="margin: 10px ;" :toolbarItem="toolbarItem" @toolbarClick="toolbarClick"></toolbar>
        <div style="margin-right: 100px">
            <tableList ref="table"
                       style="border-top: none;"
                       :getDataWay="getDataWay"
                       :columns="columns"
                       :tableSize="tableSet.set.tableSize"
                       selection
                       @columnChange= 'columnChange'
                       :caption="tableSet.set.caption"
                       :tableScale="tableSet.set.tableScale"
                       :spanMethod="objectSpanMethod"

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
        <div ref="div2" style="height:200px;border:1px solid #ccc;padding: 10px;"></div>
        <tableSet v-if="setVisible" :setVisible.sync="setVisible" :tableSet="tableSet" @modifySet="modifySet"></tableSet>
    </div>
</template>

<script>
    import toolbar from "@/components/toolbar/toolbar"
    import tableList from '@/components/grid/TableList.vue';
    import tableSet from '@/components/grid/TableSet.vue';


    export default {
        name: "toolbarPage",
        components: {
            toolbar,
            tableList,
            tableSet
        },
        data: () => {
            return {
                setVisible:false,
                tableSet:{set:{ "tableSize": "大",
                        "caption": "测试",
                        "tableScale": 100,}},
                dialogVisible: false,
                toolbarItem:[
                    {
                        type:"primary",
                        title:"刷新",
                        icon:"el-icon-refresh",
                        disabled:false,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"编辑",
                        icon:"el-icon-edit-outline",
                        disabled:true,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"列表设置",
                        icon:"el-icon-s-grid",
                        disabled:false,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新",
                        icon:"el-icon-arrow-left",
                        disabled:true,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新列表",
                        icon:"el-icon-arrow-left",
                        disabled:true,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新",
                        icon:"el-icon-arrow-left",
                        disabled:true,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新列表",
                        icon:"el-icon-arrow-left",
                        disabled:false,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新",
                        icon:"el-icon-arrow-left",
                        disabled:false,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新列表",
                        icon:"el-icon-arrow-left",
                        disabled:false,
                        click:"refresh"
                    },
                    {
                        type:"primary",
                        title:"刷新",
                        icon:"el-icon-arrow-left",
                        disabled:false,
                        click:"refresh"
                    }
                ],
                getDataWay:{dataType:"url",firstRequest:false, type:"get",data:'/mockData/threeMeetingsOneClass/data.json',param:{}}, // 通过url方式
                columns: [
                    // {
                    //     label: '会议名称',
                    //     prop: 'name',
                    //     width: '180',
                    //     showOverflowTooltip:true,
                    //     template: true
                    // }
                ],

                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    pageSizes:[10,50,100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },

                tableScale:100,
                columnsData:[], // 显示需要设置的表格列
            }
        },
        created(){
            let param={}
            let _this=this
            this.$axios({
                method: 'get',
                url: _this.getDataWay.data,
                data: param
            }).then(function (data) {
                if (data && data.list) {
                    //初始化数据格式
                    // this.dealWithData(setJson)
                    _this.$refs.table.tableData = data.list

                    _this.columns =  _this.filterColumnByShow(data.columnsData)
                    _this.pagination.pageSize = data.tableSet.pageSize
                    data.tableSet.pageSizes = _this.pagination.pageSizes
                    _this.tableSet = {columnsData:data.columnsData,set:data.tableSet}
                    _this.loading=false
                } else {
                    //console.info(data.msg)
                }
            }).then(()=>{
                _this.selectData()
            }).catch(function (error) {
            });
        },
        mounted() {
            // this.columns = JSON.parse(localStorage.getItem("customColumn"))
            // this.$refs.table.tableData=[]
            //this.getTableData()
            //this.$refs.table.setTableHeight(600) //传给表格高度
        },
        methods: {
            filterColumnByShow(list = []){
                let showList = []
                list.forEach(item=>{
                    if(item.show.toString() === 'true'){
                        showList.push(item)
                    }
                })
                return showList
            },
            modifySet(obj){
                console.log(obj);
                this.columns =  this.filterColumnByShow(obj.columnsData)
                this.tableSet = obj
            },
            getTableData:function(){ // 发送请求获取表格所有数据包括：列展示与不展示和表格配置信息

            },
            columnChange(obj){
                // localStorage.setItem('customColumn',JSON.stringify(obj))
            },
            showDialog() {
                this.dialogVisible = true
                this.handleSelectionChange(this.columnsData)
            },
            toolbarClick(item,event){
                if(item.title=='列表设置'){
                    //this.dialogVisible = true

                    this.setVisible = true
                }
            },
            handleSelectionChange(val) { // 获取选中的列
                let temp = [];
                this.columnsData.forEach((item)=>{
                    if(JSON.stringify(val).indexOf(JSON.stringify(item))>0){
                        temp.push(item)
                    }
                })
                this.multipleSelection = temp;
            },
            setBtn:function(){ // 表格设置项
                this.dialogVisible = false
                let setJson={}//需要的json串
                if(!!this.multipleSelection&&this.multipleSelection.length>0){
                    setJson.columns=this.multipleSelection //显示列
                }
                setJson.fontSize=this.fontSize //表格字体大小设置
                setJson.size= this.pSize //默认每页显示多少条
                setJson.tableName= this.tableName
                setJson.tableWidthScale= this.tableWidthScale
                this.dealWithData(setJson)
            },
            // 处理数据
            dealWithData:function(obj){
                if(!!obj.columns&&obj.columns.length>0) {
                    this.columns = obj.columns
                }
                this.chooseSize=obj.fontSize
                this.pagination.pageSize= obj.size
                this.caption=obj.tableName
                this.tableScale= parseInt(obj.tableWidthScale)
            },
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
            }
        },
        watch: {
            '$store.state.screenWidth'(newValue, oldValue) {
                this.clientWidth = this.$el.clientWidth
                //this.$refs.table
            },
            '$store.state.screenHeight'(newValue, oldValue) {
                //let div1H = this.$refs.div1.offsetHeight
                let div2H = parseInt(this.$refs.div2.offsetHeight)
                let clientHeight = this.$store.state.contentHeight
                console.info(div2H,clientHeight,clientHeight - div2H)
                this.$refs.table.setTableHeight(clientHeight - div2H)

            }
        },
    }
</script>

<style scoped>
    .form-style,.el-dialog__body {
        float: left;
    }
    .padd20{
        padding: 20px 0;
    }
</style>