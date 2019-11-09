<!---->
/**
*  附件上传组件
*  @params
***
*  autoUp 是否开启自动上传
*  downAll 是否可以批量下载
*  show-file-list 是否采用elementUi默认展示方式？为false采用表格回显展示
*  columns 采用表格展示，需要配置表头
*  defaultFileList 初始化filelist数据
*/
<template>
    <div class="myupload">
        <el-upload
                class="upload-demo"
                ref="upload"
                action="#"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :http-request="toUpload"
                :on-progress="toUploadProgress"
                :on-success="toUploadSuccess"
                :on-error="toUploadError"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="autoUp"
                :show-file-list="showFileList">
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-circle-plus">选取文件</el-button>
            <el-button v-if="!autoUp" style="margin-left: 10px;" size="small" type="success"
                       @click="submitUpload"
                       icon="el-icon-upload">
                上传文件
            </el-button>
            <el-button v-if="downAll" style="margin-left: 10px;" size="small" type="success" @click="downloadAll"
                       icon="el-icon-download">
                批量下载
            </el-button>
            <div slot="tip" class="mytip">
                <slot name="mytip"></slot>
            </div>
        </el-upload>
        <!--不使用默认展示方式，使用表格-->
        <upload-list v-if="(!showFileList)" :list-columns="columns" :list-data="fileList"></upload-list>
        <el-dialog v-if="downAndPreview"
                   title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :close="dialogClose">
            <span><i class="el-icon-warning el-dialog__body-myi"></i>对该文件进行预览或者下载？</span>
            <span slot="footer" class="dialog-footer">
         <el-button size='small' type="primary" @click="preViewFile">文件预览</el-button>
         <el-button size='small' type="primary" @click="downloadFile">文件下载</el-button>
         <el-button size='small' @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import uploadList from "./uploadList";

    function noop() {
    }

    export default {
        name: 'upload',
        props: {
            autoUp: {//自动上传
                type: Boolean,
                default: false,
            },
            downAll: {//下载全部
                type: Boolean,
                default: false,
            },
            showFileList: {//是否使用elementUi自带的展示方式
                type: Boolean,
                default: true,
            },
            downAndPreview: {//elementUi展示是否可以预览
                type: Boolean,
                default: false,
            },
            defaultFileList: {//初始化list数据
                type: Array,
                default: () => [],
                required: false
            },
            columns: {//表格展示表头
                type: Array
            },
            md5CheckParams: {
                type: Object,
                default: () => ({//md5校验需要的参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                })
            },
            upLoadParams: {
                type: Object,
                default: () => ({//上传需要的其他参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                })
            },
            downLoadOneParams: {
                type: Object,
                default: () => ({//下载需要的参数
                    isPreview: 1,
                    forceDocx: 1,
                    webOffice: 1,
                    wordWaterMark: 1,
                    isWpsSecure: 1,
                    caToken: 1,
                    waterMark: 1,
                })
            },
            downLoadAllParams: {
                type: Object,
                default: () => ({//下载需要的参数
                    zipName: 'zipDownload',
                })
            },
            getPdfPathParams: {
                type: Object,
                default: () => ({
                    isPreview: 1,
                    forceRefresh: 1,
                    xdocPdf: 1,
                })
            },
            onUpSuccess: {
                type: Function,
                default: noop
            },
            onUpError: {
                type: Function,
                default: noop
            },
            onUpProgress: {
                type: Function,
                default: noop
            },
            onUpChange: {
                type: Function,
                default: noop
            },
            onUpRemove: {
                type: Function,
                default: noop
            },
            onUpDownloadOne: {
                type: Function,
                default: noop
            },
            onUpDownloadMany: {
                type: Function,
                default: noop
            },
        },
        components: {
            uploadList,
        },
        data() {
            return {
                dialogVisible: false,
                fileList: this.defaultFileList,
                // listData: this.defaultFileList,
            }
        },
        created() {
            this.defaultFileList.forEach((item, index) => {
                console.log(item)
            })
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit()
            },
            beforeUpload(file) {
                // console.log(file)
            },
            toUpload(params) {
                let that = this;
                that.$$md5ByFile(params).then((res) => {
                    let defaultParam = {
                        file: params.file,
                        md5: res.md5
                    };
                    that.$$md5CheckByFile(Object.assign(defaultParam, that.md5CheckParams)).then((checkRes) => {
                        if (checkRes && checkRes.msg === "正常上传") {
                            that.$$uploadFile(Object.assign(defaultParam, that.upLoadParams)).then(function (response) {
                                console.log(response)
                                /*上传成功，加入表格*/
                                // that.fileList.push(response.info)
                                /*目前接口不是业务接口，只能采用假数据拼接*/
                                that.fileList.push(Object.assign(response.info, {
                                    deptName: "白昱",
                                    date: that.getCurrentDateStr()
                                }));
                                //上传成功 调用onSuccess方法，否则没有完成图标
                                //处理自己的逻辑
                                params.onSuccess(response.info)
                            }).catch(() => {
                                that.$message({
                                    type: 'error',
                                    message: "上传失败"
                                })
                                //上传失败 调用onError方法
                                //处理自己的逻辑
                                params.onError(error)
                            })
                        } else if (checkRes && checkRes.msg === "已上传") {
                            console.log(checkRes);
                            /*已上传，加入表格*/
                            console.log(params)
                            // this.fileList.push(checkRes.info);
                            /*目前接口不是业务接口，只能采用假数据拼接*/
                            let obj = {
                                fileSrcName: params.file.name,
                                deptName: "白昱",
                                date: that.getCurrentDateStr()
                            }
                            console.log(Object.assign(checkRes.info, obj))
                            that.fileList.push(Object.assign(checkRes.info, obj))
                            params.onSuccess(checkRes)
                        } else {
                            that.$message({
                                type: 'error',
                                message: "上传失败"
                            })
                        }
                    })
                })
            },
            // toUpload(params) {
            //     let this_ = this
            //     console.log(params)
            //     let file = params.file
            //     let formData = new FormData()
            //     if (this.upLoadParams.glbdId) {
            //         formData.append('glbdId', this.upLoadParams.glbdId)
            //     }
            //     if (this.upLoadParams.wlwjlxDm) {
            //         formData.append('wlwjlxDm', this.upLoadParams.wlwjlxDm)
            //     }
            //     formData.append('file', file)
            //     let config = {
            //         headers: {
            //             'Content-type': 'multipart/form-data',
            //         },
            //         onUploadProgress: progressEvent => {
            //             let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
            //             //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
            //             params.onProgress({percent: percent})
            //         }
            //     }
            //     axios.post(this.$api.wjglApi.Zh001saveFile, formData, config).then(function (response) {
            //         console.log(response)
            //         //上传成功 调用onSuccess方法，否则没有完成图标
            //         //处理自己的逻辑
            //         params.onSuccess(response.info)
            //     }).catch(function (error) {
            //         console.log(error)
            //         //上传失败 调用onError方法
            //         //处理自己的逻辑
            //         params.onError(error)
            //     })
            // },
            toUploadSuccess(response, file, fileList) {
                this.onUpSuccess(response, file, fileList);
            },
            toUploadError(err, file, fileList) {
                this.onUpError(err, file, fileList);
            },
            toUploadProgress(event, file, fileList) {
                this.onUpProgress(event, file, fileList)
            },
            handleChange(file, fileList) {
                this.onUpChange(file, fileList)
            },
            beforeRemove(file, fileList) {
                console.log(file);
                console.log(fileList)
                if (!!this.onUpRemove && this.onUpRemove.name != "noop") {
                    this.onUpRemove(file, fileList);
                } else {
                    let that = this;
                    this.$confirm(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (file.status === 'success') {
                            that.$axios({
                                method: 'post',
                                url: this.$api.wjglApi.Zh001deleteFile,
                                data: {
                                    id: file.response.id,
                                }
                            }).then(function (response) {
                                if (response.msg) {
                                    that.handleRemove(file, fileList)
                                }
                                that.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                            }).catch(function (error) {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败'
                                })
                            })
                        } else {
                            that.handleRemove(file, fileList)
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'error',
                            message: '删除失败'
                        })
                    })


                    /*let that = this;
                    this.$confirm(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (file.status === 'success') {//上传到文件服务器的
                            that.$axios({
                                method: 'post',
                                url: this.$api.upload.deleteUpLoad,
                                data: {
                                    md5Path: file.response.md5Path,
                                }
                            }).then(function (response) {
                                console.log(response);
                                if (response.msg) {
                                    that.handleRemove(file, fileList)
                                }
                            }).catch(function (error) {
                                that.$message({
                                    type: 'warning',
                                    message: '删除失败'
                                })
                            })
                        } else {
                            that.handleRemove(file, fileList)
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    })*/
                }
                return false
            },
            handleRemove(file, fileList) {
                if (file.status === "success") {
                    for (let i = 0; i < fileList.length; i++) {
                        if (fileList[i].response.id === file.response.id) {
                            fileList.splice(i, 1);
                            this.fileList = fileList
                            console.log(this.fileList)
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < fileList.length; i++) {
                        if (fileList[i].uid === file.uid) {
                            fileList.splice(i, 1);
                            break;
                        }
                    }
                }
            },

            handlePreview(file) {
                console.log(file)
                if (file.hasOwnProperty('status') && file.status === 'success') {
                    this.currentFileData = file.response?file.response:file;
                    this.dialogVisible = true
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先上传，再对文件进行预览或下载'
                    })
                }
            },
            preViewFile() {//文件预览
                if (this.currentFileData.md5Path) {
                    let name = this.currentFileData.name.split('.')[1];
                    let that = this;
                    console.log(name)
                    let url = that.$api.upload.reqUrl + that.$api.upload.preview + '?md5Path='
                    if (name === 'pdf') {
                        window.open(url + this.currentFileData.md5Path + '&waterMark=1&forceRefresh=1', '_blank')
                    } else {//非pdf文件获取pdf地址
                        that.$$getPdfPath.then(function (res) {
                            console.log(res)
                            if (res.msg.indexOf('@') !== -1) {
                                window.open(url + res.msg + '&waterMark=1&forceRefresh=1', '_blank')
                            } else {
                                that.$message({
                                    type: 'info',
                                    message: '预览失败，请检查文件路径！'
                                })
                            }
                        }).catch(function (error) {
                            console.log(error)
                            that.$message({
                                type: 'info',
                                message: '获取pdf路径失败！'
                            })
                        })
                    }
                    this.dialogVisible = false
                } else {
                    this.$message({
                        type: 'info',
                        message: '预览失败，请检查文件路径！'
                    })
                }
            },
            /*单文件下载*/
            downloadFile() {
                let that = this;
                this.$$download(this.currentFileData).then(()=>{
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
                this.dialogVisible = false
            },
            dialogClose() {
                this.currentFileData = {}
            },
            //批量下载
            downloadAll() {
                let that = this;
                let md5Path = [];
                this.fileList.forEach((item, index) => {
                    console.log(item)
                    md5Path.push(item.md5Path)
                });
                let Params = Object.assign({//拼接参数
                    md5Paths: md5Path,
                }, this.downLoadAllParams);
                this.$$downloadPackage(Params).then(()=>{
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
        }
    }
</script>

<style>
    .myupload .el-dialog__body {
        padding: 10px 20px;
        font-size: 16px;
    }

    .myupload .el-dialog__body-myi {
        color: #EED46F;
        margin-right: 20px;
    }

    .mytip {
        font-size: 12px;
        color: #909399;
        margin: 3px;
    }

</style>
