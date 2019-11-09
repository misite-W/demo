<template>
    <div>
        <upload
                ref="upload"
                :auto-up="true"
                :down-and-preview="false"
                :downAll="true"
                :show-file-list="false"
                :default-file-list="uploadData.fileList"
                :columns="uploadData.columns"
                :md5-check-params="uploadData.md5CheckParams"
                :up-load-params="uploadData.upLoadParams"
                :down-load-one-params="uploadData.downLoadOneParams"
                :down-load-all-params="uploadData.downLoadAllParams"
                :get-pdf-path-params="uploadData.getPdfPathParams"
                :on-up-change="onChange"
                :on-up-success="onSuccess"
                :on-up-progress="onProgress"
                :on-up-error="onError"
        >
            <template v-slot:mytip>
                <h1><i class="el-icon-warning"></i>上传文件</h1>
            </template>
        </upload>
    </div>
</template>
<!--:on-up-download-one="onDownloadOne"-->    //自定义下载
<!--:on-up-download-many="onDownloadMany"-->  //自定义批量下载
<script>
    import upload from '../../components/upload/upload'

    export default {
        name: 'uploadDemo',
        components: {
            upload
        },
        data() {
            return {
                uploadData: {
                    fileList: [
                        {
                            fileSrcName: '测试附件上传12.txt',
                            deptName: '王小虎',
                            date: '2016-05-02',
                            md5Path: "730c149638db7831f4e5c46d5babb829@62",
                        },
                        {
                            fileSrcName: "文件管理服务接口清单(2).pdf",
                            md5Path: "3755ae2510b48b9cf20198723296d4e8@129530",
                            deptName: '王小虎',
                            date: '2016-05-04',
                        },
                    ],
                    columns: [
                        {
                            label: '文件名称',
                            prop: 'fileSrcName',
                            width: '30%',
                        },
                        {
                            label: '上传人',
                            width: '120',
                            prop: 'deptName',
                        },
                        {
                            label: '上传时间',
                            width: '200',
                            prop: 'date',

                        },
                        {
                            label: '操作',
                            prop: 'opts',
                            template: true //添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)
                        }
                    ],
                    md5CheckParams: {//md5校验需要的参数
                        userId: '222222',
                        moduleName: 'CheckForFrontEnd'
                    },
                    upLoadParams: {//上传需要的其他参数
                        userId: '222222',
                        moduleName: 'CheckForFrontEnd'
                    },
                    downLoadOneParams: {//下载需要的参数
                        isPreview: 1,
                        forceDocx: 1,
                        webOffice: 1,
                        wordWaterMark: 1,
                        isWpsSecure: 1,
                        caToken: 1,
                        waterMark: 1,
                    },
                    downLoadAllParams: {//下载需要的参数
                        zipName: "download.zip",
                    },
                    getPdfPathParams: {
                        isPreview: 1,
                        forceRefresh: 1,
                        xdocPdf: 1,
                    },
                },

            }
        },
        methods: {
            onSuccess(res, file, fileList) {
                console.log(res);
                console.log(file);
                console.log(fileList);
            },
            onProgress(event, file, fileList) {
                console.log(event);
                console.log(file);
                console.log(fileList);
            },
            onError(err, file, fileList) {
                console.log(err);
                console.log(file);
                console.log(fileList);
            },
            onChange(file, fileList) {
                console.log(file, fileList);
            },
            onRemove(file, fileList) {
                console.log(file);
                console.log(fileList);
            },
            onDownloadOne(file) {//自定义下载
                // console.log(file);
            },
            onDownloadMany(fileList) {//自定义批量下载
                // console.log(fileList);
            },

        }
    }

</script>

<style scoped>

</style>
