 /**
*  upload公共组件
*  @params
***
*  :defaultFileList  默认文件列表(必须传递name值)
*  :showFileList  上传后是否展示上传列表
*  :multiple  是否可以多选文件（true：是 false：否）
*  :autoUpload  是否在选择完文件后自动上传（true：是 false：否,图片编辑器上传方式只能自动上传）
                手动上传：   文件上传：方法中调用  this.$refs.组件的ref.submitFileUpload();
                            图片上传：方法中调用  this.$refs.组件的ref.submitImageUpload();
*  :limit  多选时的最多个数
*  :showAfter  上传后点击文件列表中的文件是否展示后续操作弹窗（true：显示 false：不显示）
*  :showImg 图片上传组件上传后是否展示上传图片（true：展示 false：不展示）
*  :md5CheckParams: {   md5校验需要的参数
        userId:""     用户id
        moduleName: "CheckForFrontEnd"   模块名称（固定传值"CheckForFrontEnd"）
    },
*  :upLoadParams: {     上传需要的其他参数
        userId:""     用户id
        moduleName: "CheckForFrontEnd"   模块名称（固定传值"CheckForFrontEnd"）
    },
*  :downLoadOneParams: {  下载需要的参数（固定传值1）
        isPreview: 1,
        forceDocx: 1,
        webOffice: 1,
        wordWaterMark: 1,
        isWpsSecure: 1,
        caToken: 1,
        waterMark: 1
    },
*  :downLoadAllParams: {  打包下载需要的参数（固定传值1）
        waterMark: 1,
        zipName: ""  压缩包名称
    },
*  :getPdfPathParams: {   获取文件pdf地址（固定传值1）
        isPreview: 1,
        forceRefresh: 1,
        xdocPdf: 1
    }
**********
    :on-up-change  更改上传文件事件
    :on-up-success  上传成功事件
    :on-up-progress  上传中事件
    :on-up-error  上传错误事件
    :on-up-remove  上传后文件列表移出文件事件
*/
<template>
    <div class="myupload">
        <!-- 上传文件 -->

        <!-- 上传图片 -->
        <el-upload
            class="avatar-uploader"
            ref="imageupload"
            action="#"
            :multiple="multiple"
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
            :auto-upload="autoUpload"
            :show-file-list="showFileList"
            accept="image/png, image/jpeg, image/gif, image/jpg">
            <slot name="openFile"></slot>
            <img v-if="showImg && imageUrl" :src="imageUrl" class="avatar">
            <div slot="tip" class="mytip"><slot name="mytip"></slot></div>
        </el-upload>

        <el-dialog v-if="showAfter"
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
    import BMF from 'browser-md5-file'
    import axios from 'axios'

    // const reqUrl = 'http://10.2.52.23:9110'//开发环境使用
    // window.location.host 测试或生产环境使用

    const bmf = new BMF()

    function noop() {
    }

    export default {
        name: 'upload',
        components: {},
        props: {
            value: {
                type: Array,
                default: () => []
            },
            autoUpload: {
                type: Boolean,
                default: true
            },
            defaultFileList: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 1
            },
            showAfter: {
                type: Boolean,
                default: false
            },
            showFileList: {
                type: Boolean,
                default: true
            },
            showImg: {
                type: Boolean,
                default: true
            },
            md5CheckParams: {
                type: Object,
                default: {//md5校验需要的参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                }
            },
            upLoadParams: {
                type: Object,
                default: {//上传需要的其他参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                }
            },
            downLoadOneParams: {
                type: Object,
                default: {//下载需要的参数
                    isPreview: 1,
                    forceDocx: 1,
                    webOffice: 1,
                    wordWaterMark: 1,
                    isWpsSecure: 1,
                    caToken: 1,
                    waterMark: 1,
                }
            },
            downLoadAllParams: {
                type: Object,
                default: {//下载需要的参数
                    waterMark: 1,
                    zipName: 'zipDownload',
                }
            },
            getPdfPathParams: {
                type: Object,
                default: {
                    isPreview: 1,
                    forceRefresh: 1,
                    xdocPdf: 1,
                }
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
        data() {
            return {
                dialogVisible: false,
                currentFileData: {},
                fileList: this.defaultFileList,
                imageUrl: ''
            }
        },
        mounted() {
            // this.$refs.paramsUpload.submit;
        },
        methods: {
            submitFileUpload() {
                this.$refs.upload.submit()
            },
            submitImageUpload() {
                this.$refs.imageupload.submit()
            },
            beforeUpload(file) {
                // console.log(file);
            },
            toUpload(params) {
                // console.log(params)
                var that = this;
                let file = params.file;
                // 通过 FormData 对象上传文件
                bmf.md5(file, (err, md5) => {
                    if (err) {
                        // console.log('err:', err)
                    } else if (md5) {
                        this.$axios({//校验md5
                            method: 'post',
                            url: this.$api.upload.md5CheckForFrontEnd,
                            data: Object.assign({
                                fileSrcName: file.name,
                                md5: md5,
                                fileSize: file.size,
                            },this.md5CheckParams)
                        }).then(function (response) {
                            // console.log(response)
                            return response;
                        }).then((data) => {
                            if (data.msg === '正常上传') {//校验通过，附件上传
                                let formData = new FormData()
                                if(this.upLoadParams.userId){
                                    formData.append('userId', this.upLoadParams.userId)
                                }
                                formData.append('md5', md5);
                                if(this.upLoadParams.moduleName){
                                    formData.append('moduleName', this.upLoadParams.moduleName)
                                }
                                formData.append('file', file)
                                // console.log(formData.get('md5'))
                                let config = {
                                    headers: {
                                        'Content-type': 'multipart/form-data'
                                    },
                                    onUploadProgress: progressEvent => {
                                        let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
                                        //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                                        params.onProgress({percent: percent})
                                    }
                                }
                                axios.post(this.$api.upload.uploadDfs, formData, config).then(function (response) {
                                    // console.log(response)
                                    //上传成功 调用onSuccess方法，否则没有完成图标
                                    //处理自己的逻辑
                                    params.onSuccess(response.info)
                                }).catch(function (error) {
                                    // console.log(error)
                                    //上传失败 调用onError方法
                                    //处理自己的逻辑
                                    params.onError(error)
                                })
                            } else {
                                // console.log(data)
                               let obj = {
                                    name: file.name,
                                    wjmc: file.name,
                                    wjkzm: file.name.split('.')[1],
                                    wjMd5Path: data.info.md5Path,
                                    response: data.info,
                                }
                                that.fileList.splice(that.fileList.length, 0, obj);
                                that.$emit('input',that.fileList);
                            }
                        }).catch(function (error) {
                            // console.log(error)
                        })
                    }
                })
            },
            toUploadSuccess(response, file, fileList) {
                this.fileList = fileList;
                this.imageUrl = URL.createObjectURL(file.raw);
                file.wjMd5Path = response.md5Path;
                file.wjmc = response.fileSrcName;
                file.wjkzm = response.fileExt;
                this.$emit('input',fileList);
                this.onUpSuccess(response, file, fileList);
            },
            toUploadError(err, file, fileList) {
                this.$emit('input',fileList);
                this.onUpError(err, file, fileList);
            },
            toUploadProgress(event, file, fileList) {
                this.$emit('input',fileList);
                this.onUpProgress(event, file, fileList)
            },
            handleChange(file, fileList) {
                this.$emit('input',fileList);
                this.onUpChange(file, fileList)
            },
            beforeRemove(file, fileList) {
                if (!!this.onUpRemove && this.onUpRemove.name != "noop") {
                    // this.fileList.splice(i, 1);
                    this.fileList.remove(file);
                    this.$emit('input',fileList);
                    this.onUpRemove(file, this.fileList)
                } else {
                    let that = this;
                    this.$alert(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (file.status === 'success') {//上传到文件服务器的
                            this.$axios({
                                method: 'post',
                                url: this.$api.upload.deleteUpLoad,
                                data: {
                                    md5Path: file.response.md5Path,
                                }
                            }).then(function (response) {
                                // console.log(response);
                                if (response.msg) {
                                    that.handleRemove(file, fileList)
                                }
                            }).catch(function (error) {
                                that.$message({
                                    type: 'warning',
                                    message: '删除失败'
                                })
                            })
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    })
                }
                return false
            },
            handleRemove(file, fileList) {
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].response.md5Path === file.response.md5Path) {
                        this.fileList.splice(i, 1);
                        break;
                    }
                }
            },

            handlePreview(file) {
                // console.log(file)
                if (file.hasOwnProperty('status') && file.status === 'success') {
                    this.currentFileData = file
                    this.dialogVisible = true
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先上传，再对文件进行预览或下载'
                    })
                }
            },
            preViewFile() {//文件预览

                if (this.currentFileData.hasOwnProperty('response') && !!this.currentFileData.response.md5Path) {
                    let name = this.currentFileData.name.split('.')[1];
                    let that = this;
                    // console.log(name)
                    let url = that.$api.upload.reqUrl + that.$api.upload.preview + '?md5Path='
                    if (name === 'pdf') {
                        window.open(url + this.currentFileData.response.md5Path + '&waterMark=1&forceRefresh=1', '_blank')
                    } else {//非pdf文件获取pdf地址
                        this.$axios({
                            method: 'post',
                            url: that.$api.upload.getPdfPath,
                            data: Object.assign({
                                md5Path: this.currentFileData.response.md5Path,
                                isPreview: 1,
                                forceRefresh: 1,
                                xdocPdf: 1,
                            },this.getPdfPathParams)
                        }).then(function (res) {
                            // console.log(res)
                            if (res.msg.indexOf('@') !== -1) {
                                window.open(url + res.msg + '&waterMark=1&forceRefresh=1'+ 
                                "?access_token="+localStorage.getItem("Authorization").split(" ")[1], '_blank')
                            } else {
                                that.$message({
                                    type: 'info',
                                    message: '预览失败，请检查文件路径！'
                                })
                            }
                        }).catch(function (error) {
                            // console.log(error)
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
            downloadFile() {//form表单文件下载
                if (!!this.onUpDownloadOne && this.onUpDownloadOne.name != "noop") {
                    this.onUpDownloadOne(this.currentFileData);
                } else {
                    if (this.currentFileData.hasOwnProperty('response')) {
                        // console.log(this.currentFileData)
                        let downloadOneParams = Object.assign({// 参数
                            md5Path: this.currentFileData.response.md5Path,
                        },this.downLoadOneParams);
                        this.handeldownloadFile(downloadOneParams);
                    } else {
                        this.$message({
                            type: 'info',
                            message: '下载失败，请检查文件路径！'
                        })
                    }
                }
            },

            handeldownloadFile(Params) {
                var that = this;
                var fileDownload = require("js-file-download");
                this.$axios({
                    method: 'post',
                    url: that.$api.upload.download,
                    data: {
                        md5Path: that.currentFileData.response.md5Path,
                        access_token: localStorage.getItem("Authorization").split(" ")[1]
                    }
                }).then(function (res) {
                    fileDownload(res, that.currentFileData.name);
                }).catch(function (error) {
                    // console.log(error)
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

            downloadAll() {
                if (!!this.onUpDownloadMany && this.onUpDownloadMany.name != "noop") {
                    this.onUpDownloadMany(this.fileList);
                } else {
                    let md5Path = [];
                    for (let fList of this.fileList) {
                        if (fList.status === 'success') {
                            md5Path.push(fList.response.md5Path)
                        }
                    }
                    // console.log(md5Path);
                    let downloadAllParams =Object.assign({
                        md5Paths: md5Path.join(','),
                    },this.downLoadAllParams);
                    this.handeldownloadAll(downloadAllParams)
                }
            },

            handeldownloadAll(Params) {//form打包下载文件
                let actoinURL = this.$api.upload.reqUrl + this.$api.upload.downloadPackage
                let form = $('<form>')
                $('div.myupload').append(form)
                form.attr('style', 'display:none')
                form.attr('method', 'post')
                form.attr('enctype', 'application/json')
                form.attr('action', actoinURL)//下载文件的请求路径
                for (let param in Params) {
                    let input = $('<input>')
                    input.attr('type', 'hidden')
                    input.attr('name', param)
                    input.attr('value', Params[param])
                    form.append(input)
                }
                form.submit()
                form.remove()
            },
            // downloadFileBlob () {}   blob文件下载，axios
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
    .mytip{
        font-size: 12px;
        color: #909399;
        margin: 3px;
    }

</style>
