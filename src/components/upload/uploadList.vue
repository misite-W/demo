<template>
    <div class="upload-list">
        <tableList ref="uploadTable"
            :getDataWay="getDataWay"
            :columns="listColumns"
            index
            >
            <el-table-column label="操作"
                             align="center"
                             header-align="center" slot="opts">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-tooltip class="item" :hide-after="300" effect="dark" content="预览" placement="top">
                            <el-button size="mini" icon="el-icon-view" plain
                                       @click="handlePreview(scope.$index, scope.row)" class="edit"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" :hide-after="300" effect="dark" content="下载" placement="top">
                            <el-button size="mini" icon="el-icon-download" plain
                                       @click="handleDownload(scope.$index, scope.row)" class="download"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" :hide-after="300" effect="dark" content="下移" placement="top">
                            <el-button size="mini" icon="el-icon-d-arrow-right tras-icon" plain
                                       @click="handleDown(scope.$index, scope.row)" class="down"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" :hide-after="300" effect="dark" content="上移" placement="top">
                            <el-button size="mini" icon="el-icon-d-arrow-left tras-icon" plain
                                       @click="handleUp(scope.$index, scope.row)" class="up"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" :hide-after="300" effect="dark" content="删除" placement="top">
                            <el-button size="mini" icon="el-icon-delete-solid" plain
                                       @click="handleDelete(scope.$index, scope.row)" class="del"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </template>
            </el-table-column>
        </tableList>
    </div>

</template>

<script>
    import TableList from "../grid/TableList";
    export default {
        name: "uploadList",
        components:{
            tableList:TableList,
        },
        props:{
            listColumns:{
                type:Array,
                required:true
            },
            listData:{
                type:Array,
                required:true
            }
        },
        data(){
            return{
                getDataWay:{
                    dataType:'data',
                    data:this.listData
                }
            }
        },
        methods: {
            handlePreview(index, row){
                console.log(row);
                if (row.md5Path) {
                    let fileExt = row.fileSrcName.split('.')[1];
                    let that = this;
                    console.log(fileExt)
                    let url = that.$api.upload.reqUrl + that.$api.upload.preview + '?md5Path='
                    if (fileExt === 'pdf') {
                        let param = row.md5Path + '&waterMark=1&forceRefresh=1&access_token='+localStorage.getItem('access_token')
                        window.open(url +param , '_blank')
                    } else {//非pdf文件预览还在解决
                        that.$message({
                            type: 'info',
                            message: '预览失败，目前仅支持pdf类型文件预览！'
                        })
                    }
                } else {
                    this.$message({
                        type: 'info',
                        message: '预览失败，请检查文件路径！'
                    })
                }
            },
            handleDownload(index, row) {//上传文件可下载
                console.log(index);
                console.log(row);
                let that = this;
                this.$$download(row).then(()=>{
                    that.$message({
                        type: 'success',
                        message: '下载成功！'
                    })
                }).catch((err)=>{
                    that.$message({
                        type: 'info',
                        message: '下载失败！'
                    })
                })
            },
            handleDown(index, row) {//下移
                console.log(index);
                console.log(row);
                if(index===this.getDataWay.data.length-1){
                    this.$message({
                        type:"warning",
                        duration:1000,
                        message:"已经到底了"
                    })
                    return false
                }else {
                    let item = this.getDataWay.data[index];
                    this.$set(this.getDataWay.data,index,this.getDataWay.data[index+1])
                    this.$set(this.getDataWay.data,index+1,item)
                }
                console.log(this.getDataWay.data);
            },
            handleUp(index, row) {//上移
                console.log(index);
                console.log(row);
                if(index===0){
                    this.$message({
                        type:"warning",
                        duration:1000,
                        message:"已经到顶了"
                    })
                    return false
                }else {
                    let item = this.getDataWay.data[index];
                    this.$set(this.getDataWay.data,index,this.getDataWay.data[index-1])
                    this.$set(this.getDataWay.data,index-1,item)
                }
                console.log(this.getDataWay.data);
            },
            handleDelete(index, row) {//删除
                console.log(index);
                console.log(row);
                let that = this;
                this.$confirm(`确定移除该文件？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('------',row);
                    that.$$deleteUpLoad({md5Path:row.md5Path}).then((res)=>{
                        that.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        that.getDataWay.data.splice(index, 1);
                    }).catch((err)=>{
                        that.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    })
                    /*that.$axios({
                        method: 'post',
                        url: this.$api.wjglApi.Zh001deleteFile,
                        data: {
                            id: row.id,
                        }
                    }).then(function (response) {
                        console.log(response,'//////');
                        that.$message({
                            type: 'warning',
                            message: '删除成功'
                        });
                        that.tableData.splice(index, 1);
                        if(!!row.filePath){
                            that.$emit('delFile',row)
                        }
                    }).catch(function (error) {
                        console.log('>>>>>>>');
                        that.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    })*/
                }).catch(() => {
                    that.$message({
                        type: 'warning',
                        message: '删除失败'
                    })
                })
            },
        },
    }
</script>

<style scoped>

</style>
