<template>
    <el-row>
        <el-col :span="24" class="bottom-page">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="pagination.pageSizes"
                    :page-size="pagination.pageSize"
                    :layout="pagination.layout"
                    :total="pagination.totalSize">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "page",
        props:{
            pagination:Object
        },
        methods: {

            handleCurrentChange:function(val){
               return this.$emit('currentChange',val);
            },
            handleSizeChange:function(val){
                this.$emit('sizeChange',val);
            }
        }
    }
</script>

<style scoped>
    .bottom-page{
        margin: 10px 0;
    }
    .bottom-page /deep/.el-pagination__sizes {
        float: left;
    }
    .bottom-page /deep/.el-pagination {
        padding: 2px 0;
    }
    .bottom-page /deep/.el-pagination .el-select .el-input {
        margin: 0;
    }
    .bottom-page /deep/.el-pagination.is-background .btn-next{
        margin-right: 0;
    }
</style>
