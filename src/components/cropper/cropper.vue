<!--
npm install vue-cropper
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

uploadList:Array 已选择的图片列表，其中modelSrc存放图片内容
type:base64/blob
aspectRatio:宽高比 [3,2]
outputType：输出图片格式，默认png
limit: 上传数量
initList: 初始化数组
-->
<template>
    <div class="cropper-wrap">
        <!-- element 上传图片按钮 -->
        <div class="upload">
            <el-upload :file-list="fileList" multiple class="upload-demo" action="" drag  list-type="picture"
                       :auto-upload="false" :show-file-list="false"
                       :on-change='changeUpload' accept="image/png, image/jpeg, image/gif, image/jpg">
<!--                <i class="el-icon-upload"></i>-->
                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
<!--                <div class="el-upload__text">选择图片</div>-->
<!--                <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>-->
            </el-upload>

        </div>
        <div class="preview">
            <div class="imgWrap" v-for="(item,index) in tempList" :key="item.uid"  @mouseenter="imgMouseOver(index)" @mouseleave="imgMouseLeave(index)">
                <img v-if="item.url" :src="item.url" />
                <img v-else :src="item.modelSrc" />
            </div>
        </div>
        <!-- vueCropper 剪裁图片实现-->
        <el-dialog title="图片剪裁" :visible.sync="dialogVisible">
            <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                    <vueCropper
                        ref="cropper"
                        :img="defaultOptions.img"
                        :outputSize="defaultOptions.size"
                        :outputType="defaultOptions.outputType"
                        :info="true"
                        :full="defaultOptions.full"
                        :canMove="defaultOptions.canMove"
                        :canMoveBox="defaultOptions.canMoveBox"
                        :original="defaultOptions.original"
                        :autoCrop="defaultOptions.autoCrop"
                        :fixed="defaultOptions.fixed"
                        :fixedNumber="defaultOptions.fixedNumber"
                        :centerBox="defaultOptions.centerBox"
                        :infoTrue="defaultOptions.infoTrue"
                        :fixedBox="defaultOptions.fixedBox"
                    ></vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog title="图片预览" :visible.sync="previewVisible">
            <div class="previewImg">
                <img :src="previewUrl">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueCropper from 'vue-cropper'
    Vue.use(VueCropper)
    export default {
        name: "cropper",
        props:{
            initList:{
                type: Array,
                default: []
            },
            type:{
                type:String,
                default:"base64"
            },
            outputType:{
                type:String,
                default:"png"
            },
            aspectRatio:{
                default: function () {
                    return [1,1]
                },
                type: Array
            },
            limit:{
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                previewVisible: false,
                imageUrl: '',
                previewUrl:"",
                // 裁剪组件的基础配置option
                defaultOptions: {
                    url:'',
                    img: '', // 裁剪图片的地址
                    info: true, // 裁剪框的大小信息
                    outputSize: 0.8, // 裁剪生成图片的质量
                    outputType: 'png', // 裁剪生成图片的格式
                    canScale: false, // 图片是否允许滚轮缩放
                    autoCrop: true, // 是否默认生成截图框
                    // autoCropWidth: 300, // 默认生成截图框宽度
                    // autoCropHeight: 200, // 默认生成截图框高度
                    fixedBox: false, // 固定截图框大小 不允许改变
                    fixed: true, // 是否开启截图框宽高固定比例
                    fixedNumber: [1, 1], // 截图框的宽高比例
                    full: true, // 是否输出原图比例的截图
                    canMove: true,
                    canMoveBox: true, // 截图框能否拖动
                    original: false, // 上传图片按照原始比例渲染
                    centerBox: false, // 截图框是否被限制在图片里面
                    infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                },
                fileList:[],
                tempList:[],
                currentFile:{},
                currentFileName:"",
                $preview:"",
                // 防止重复提交
                loading: false,
                dialogVisible:false
            }
        },
        created(){
            let _that = this
            this.defaultOptions.fixedNumber = this.aspectRatio
            this.defaultOptions.outputType = this.outputType
            this.tempList = this.initList || []
            this.initList.forEach((item,index)=>{
                item.url = _that.$api.upload.reqUrl+ _that.$api.upload.downloadByMd5Path+"?md5Path="+item.md5Path+ "&access_token="+localStorage.getItem("access_token")
            })
        },
        mounted(){
            this.$preview = $(this.$el.querySelector('.preview'))
        },
        watch:{
            'tempList'(){
                this.$emit("uploadList",this.tempList);
            }
        },
        methods: {
            // 上传按钮   限制图片大小
            changeUpload(file, fileList) {
                if(this.tempList.length>=this.limit){
                    return;
                }
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB!')
                    return false
                }
                this.imageUrl = file.url
                this.currentFile = file;
                this.currentFileName=file.name
                this.defaultOptions.img = file.url
                this.dialogVisible = true
            },
            // 点击裁剪，这一步是可以拿到处理后的地址
            finish() {
                const _that = this;
                if (this.type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        let file = _that.$$blobToFile(data,_that.currentFileName)
                        let modelSrc = window.URL.createObjectURL(data);
                        _that.uploadFile(file,modelSrc)
                    })
                } else {//base64
                    this.$refs.cropper.getCropData((data) => {
                        let file = _that.$$blobToFile(_that.$$base64toBlob(data),_that.currentFileName)
                        let modelSrc = data
                        _that.uploadFile(file,modelSrc)
                    })
                }
            },

            uploadFile(file,modelSrc){
                const _that = this;
                _that.loading = true
                _that.$$md5ByFile({file:file}).then((res)=>{
                    _that.$$md5CheckByFile({md5:res.md5,file:file}).then((checkRes)=>{
                        if(checkRes && checkRes.msg === "正常上传"){
                            _that.$$uploadFile({md5:res.md5,file:file}).then(function(response){
                                let url = _that.$api.upload.reqUrl+ _that.$api.upload.downloadByMd5Path+"?md5Path="+response.info.md5Path+ "&access_token="+localStorage.getItem("access_token")
                                _that.currentFile.modelSrc = modelSrc
                                _that.currentFile.url = url
                                _that.currentFile.md5Path = response.info.md5Path
                                _that.currentFile.raw = file
                                _that.tempList.push(_that.currentFile)

                                _that.loading = false
                                _that.dialogVisible = false
                            }).catch(()=>{
                                _that.loading = false
                                _that.dialogVisible = false
                            })
                        }else if (checkRes && checkRes.msg === "已上传"){
                            let md5Path = checkRes.info.md5Path
                            let url = _that.$api.upload.reqUrl+ _that.$api.upload.downloadByMd5Path+"?md5Path="+md5Path+ "&access_token="+localStorage.getItem("access_token")
                            _that.currentFile.modelSrc = modelSrc
                            _that.currentFile.md5Path = md5Path
                            _that.currentFile.url = url
                            _that.currentFile.raw = file
                            _that.tempList.push(_that.currentFile)
                            _that.loading = false
                            _that.dialogVisible = false

                        }else{
                            _that.loading = false
                            _that.dialogVisible = false
                        }
                    }).catch(function (error) {
                        _that.loading = false
                        _that.dialogVisible = false
                    })
                }).catch(function (error) {
                    _that.loading = false
                    _that.dialogVisible = false
                })
            },
            imgMouseOver(index){
                const _that = this;
                var $div = $("<div class='hoverImg'></div>");
                this.$preview.find('.imgWrap').eq(index).append($div)
                $div.append("<span class='imgzoomin'><i class=\"el-icon-zoom-in\"></i></span><span class='imgdownload'><i class=\"el-icon-download\"></i></span><span class='imgdelete'><i class=\"el-icon-delete\"></i></span>")
                $div.find('.imgdownload').on('click',function () {
                    var src = $(this).closest(".imgWrap").find('img').attr("src")
                    _that.downLoad(src)
                })
                $div.find('.imgzoomin').on('click',function () {
                    _that.previewUrl = _that.tempList[index].url || _that.tempList[index].modelSrc
                    _that.previewVisible=true

                })
                $div.find('.imgdelete').on('click',function () {
                    _that.tempList.splice(index,1)
                })
            },
            imgMouseLeave(index){
                this.$preview.find('.imgWrap').eq(index).find('.hoverImg').remove()
            },
            downLoad(src){
                console.info(src)
                var aLink = document.createElement('a')
                aLink.download = 'demo'
                aLink.href=src
                aLink.click()

                // if (this.type === 'blob') {
                //     this.$refs.cropper.getCropBlob((data) => {
                //         aLink.href = window.URL.createObjectURL(data)
                //         aLink.click()
                //     })
                // } else {
                //     this.$refs.cropper.getCropData((data) => {
                //         aLink.href = data
                //         aLink.click()
                //     })
                // }
            }
        }
    }
</script>

<style lang="less">
    .cropper-wrap{
        .upload{
            display: inline-block;
        }

        .upload-demo .el-upload-dragger {
            width: auto;
            height: auto;
        }

        .cropper-content .cropper {
            width: auto;
            height: 300px;
        }

        .previewImg {
            width: 50%;
            margin: 0 auto;
            text-align: center;
        }

        .previewImg img {
            width: 100%;
        }

        .preview {
            display: inline-block;
        }

        .preview .imgWrap {
            width: 150px;
            height: 180px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            position: relative;
            margin-left: 10px;
            display: inline-block;
        }

        .imgWrap img {
            width: 100%;
        }

        .imgWrap .hoverImg {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            padding-top: 20%;
            cursor: default;
            text-align: center;
            color: #fff;
            /*opacity: 0.5;*/
            font-size: 20px;
            background-color: rgba(0, 0, 0, .5);
            transition: opacity .3s;
        }

        .imgzoomin, .imgdownload, .imgdelete {
            cursor: pointer;
        }

        .imgdownload, .imgdelete {
            margin-left: 5px;
        }
    }
</style>