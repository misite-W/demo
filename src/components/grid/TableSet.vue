<template>
    <div>
        <el-dialog class="tableSet"
                   title="列表设置"
                   :visible="setVisible"
                   :before-close="beforeClose"
                   width="50%">
            <tableList ref="table"
                       :getDataWay="getDataWay"
                       :columns="columns"
                       :index="true"
                       :checkedData="checkedData"
                       selection
                       @handleSelectionChange="handleSelectionChange"
            >
                <el-table-column  label="默认排序" slot="sort">
                    <template v-slot="scope">
                        <el-radio v-model="set.defaultSort.prop" :label="scope.row.prop">{{scope.row.prop}}</el-radio>
                    </template>
                </el-table-column>
            </tableList>
            <el-form ref="form" label-width="120px" size="mini" class="form-style">
                <div class="el-dialog__title padd20">显示设置</div>
                <el-col :span="12">
                    <el-form-item label="表格标题">
                        <el-input v-model="set.caption"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="表格放大(%)">
                        <el-input v-model="set.tableScale"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="字体大小" :span="12">
                        <el-select v-model="set.tableSize" placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontSizes"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="默认显示条数">
                        <el-select v-model="set.pageSize" placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in set.pageSizes"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from '../../components/grid/TableList.vue';
    export default {
        name: "TableSet",
        components:{
            tableList
        },
        props:{
            tableSet:{
                type: Object,
                default: {}
            },
            setVisible:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                columnsData:[],
                checkedData:[],
                set:{},
                getDataWay:{dataType:"data",data:[]},
                columns :[{
                        "label": "列名",
                        "prop": "label",
                        "width": 200
                    },{
                        "label": "默认排序",
                        "prop": "sort",
                        "template":true
                    }
                ],
                fontSizes:['大','中','小'], //表格字体大小设置,

            }
        },
        created(){
            this.columnsData = this.tableSet.columnsData || []
            this.set = JSON.parse(JSON.stringify(this.tableSet.set))
            this.getDataWay.data = this.columnsData || []
            this.columnsData.forEach(item=>{
                if (item.show){
                    this.checkedData.push(item)
                }
            })
        },
        mounted() {

        },
        methods:{
            handleSelectionChange(val) { // 获取选中的列
                let temp = [];
                this.columnsData.forEach((item)=>{
                    if(JSON.stringify(val).indexOf(JSON.stringify(item))>0){
                        item.show = true
                        temp.push(item)
                    }else{
                        item.show = false
                    }
                })
                this.checkedData = temp;
            },
            beforeClose(done){
                this.$emit('update:setVisible', false);
                done()
            },
            confirm(){
                let result = {set:this.set,columnsData:this.columnsData}
                this.$emit("modifySet",result)
                this.$emit('update:setVisible', false);
            },
            cancel(){
                this.$emit('update:setVisible', false);
            }
        }
    }
</script>

<style scoped>
    .tableSet >>> .el-dialog{
        min-width: 500px;
    }
    .tableSet >>> .el-dialog .el-select{
        width: 100%;
    }
    /*.tableSet >>> .el-dialog .el-table__header .el-checkbox::after{*/
    /*    content: "显示";*/
    /*}*/
    .tableSet >>> .el-dialog .el-table-column--selection{
        text-align: center;
    }
</style>