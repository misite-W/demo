<template>
    <div>
        <el-button @click="getMockData">获取mock数据</el-button>
        <tableList ref="table"
                   :getDataWay="getDataWay"
                   :columns="columns"
        >
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
        name: "show",
        components: {
            tableList
        },
        data(){
            return {
                // getData:[],
                getDataWay:{dataType:"data",data:[]}, // 直接展示
                columns: [
                    {
                        label: '会议名称',
                        prop: 'name'
                    },
                    {
                        label: '所属党组织',
                        prop: 'deptName'
                    },
                    {
                        label: '会议关键词',
                        prop: 'keys'
                    },
                    {
                        label: '会议时间',
                        prop: 'time',
                    },{
                        label: '操作',
                        prop: 'opts',
                        template: true //添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)
                    }]
            }
        },
        created:function(){
            // this.getMockData()
        },
        methods:{
            getMockData:function () {
                var that=this
                this.$$request({
                    url:"http://mockjs.com/api/posts",
                    data:{type:'top',key:'123456'}
                }).then(function (res) {
                    // that.getData=res.info.list
                    that.getDataWay.data=res.info.list
                    that.$refs.table.loadData()
                })
            },
            handleDelete:function (obj) {
                let that=this
                let id = obj.id;
                this.$$request({
                    url:"http://mockjs.com/api/deletes",
                    data: {
                        id: id
                    }
                }).then(function(res) {
                    that.getDataWay.data = res.info.list;
                    this.$refs.table.loadData()
                    alert('删除成功');
                }.bind(this))
                .catch(function(error) {
                    console.log(error)
                });
            }
        }
    }
</script>

<style scoped>

</style>