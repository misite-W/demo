/**
*  富文本编辑器
*  @params
***
*  需要安装依赖 "vue-quill-editor": "^3.0.6"   "quill-image-drop-module": "^1.0.3" "quill-image-resize-module": "^3.0.0"
*  :setContent 初始化数据，用于数据回显
*  @onEditorChange 内容改变事件,参数{ quill, html, text }
*  @onEditorReady 加载完成事件，参数quill
*  @onEditorFocus 获得焦点事件，参数quill
*  注意富文本内容回显的时候，父级加ql-editor样式，例如：<!-- <div class="ql-editor">-->
**/
<template>
    <div>
        <quill-editor v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
        <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')"><!--style="display: none"-->
    </div>
</template>

<script>
    import BMF from "browser-md5-file";
    import axios from 'axios'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import VueQuillEditor, { Quill } from 'vue-quill-editor'
    import { ImageDrop } from 'quill-image-drop-module'// 图片可拖拽上传。
    import ImageResize from 'quill-image-resize-module'// 调整图片大小。
    import { addQuillTitle } from '@/lib/quill-title.js'
    Quill.register('modules/imageDrop', ImageDrop)
    Quill.register('modules/imageResize', ImageResize)
    const bmf = new BMF();
    export default {
        name: "richTextEditor",
        props: {
            setContent:{String},
            editorOption: {
                default: {
                    modules: {
                        placeholder: "请输入...",
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                            ['blockquote', 'code-block'], // 引用  代码块
                            [{ 'header': 1 }, { 'header': 2 }], // 1、2 级标题
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序、无序列表
                            [{ 'script': 'sub' }, { 'script': 'super' }], // 上标/下标
                            [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
                            [{ 'direction': 'rtl' }], // 文本方向
                            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 标题
                            [{ 'font': [] }], // 字体种类
                            [{ 'color': [] }, { 'background': [] }], // 字体颜色、字体背景颜色
                            [{ 'align': [] }],
                            ['clean'], // 字体种类
                            ['link', 'image', 'video'] // 链接、图片、视频
                        ],
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        }
                    }
                },
                type: Object
            },
            uploadUrl:{
                default:'',
                type:String
            }
        },
        data () {
            return {
                content: '',
                uniqueId:'editUpload',
                upLoadParams: {
                    type: Object,
                    default: {
                        //上传需要的其他参数
                        userId: "222222",
                        moduleName: "CheckForFrontEnd"
                    }
                },
                md5CheckParams: {
                    type: Object,
                    default: {
                        //md5校验需要的参数
                        userId: "222222",
                        moduleName: "CheckForFrontEnd"
                    }
                }
            }
        },
        watch:{
            setContent(val){
                this.content = val;
                let startIndex = this.content.indexOf('access_token=')
                if(startIndex != -1){
                    let endIndex = this.content.indexOf('">')
                    let token = this.content.substr(startIndex+13,endIndex-startIndex-13)
                    this.content = this.content.replace(new RegExp(token,'g'),localStorage.getItem("access_token")); 
                }
            }
        },
        mounted(){
            this.content=this.setContent
            let startIndex = this.content.indexOf('access_token=')
            if(startIndex != -1){
                let endIndex = this.content.indexOf('">')
                let token = this.content.substr(startIndex+13,endIndex-startIndex-13)
                this.content = this.content.replace(new RegExp(token,'g'),localStorage.getItem("access_token")); 
            }
            var _this =this
            var imgHandler = async function(image) {
                this.addImgRange = _this.$refs.myQuillEditor.quill.getSelection()
                if (image) {
                    document.getElementById(_this.uniqueId).click() //隐藏的file文本ID
                }
            }
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image",imgHandler)
            addQuillTitle(); 
        },
        methods: {
            // @blur="onEditorBlur($event)"
            onEditorBlur(quill) {
                console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
                this.$emit("onEditorFocus",quill)
            },
            onEditorReady(quill) {
                this.$emit("onEditorReady",quill)
            },
            onEditorChange({ quill, html, text }) {
                this.$emit("onEditorChange",{ quill, html, text })
            },
            uploadImg:function(){
                let _this = this
                let fileInput = document.getElementById(this.uniqueId) //隐藏的file文本ID
                if (fileInput.files != null && fileInput.files[0] != null) {
                    let file = fileInput.files[0]
                    bmf.md5(file, (err, md5) => {
                        if (err) {
                            _this.$message.warning("图片增加失败")
                        } else if (md5) {
                            this.$axios({
                                method: "post",
                                //url: '/fastdfs-center/file/md5CheckForFrontEnd',
                                url: _this.$api.upload.md5CheckForFrontEnd,
                                data: {
                                        fileSrcName: file.name,
                                        md5: md5,
                                        fileSize: file.size,
                                        userId: "222222",
                                        moduleName: "CheckForFrontEnd"
                                    }
                            }).then(function(response) {
                                return response
                            }).then(data => {
                                if (data.msg === "正常上传") {
                                    //校验通过，附件上传
                                    let formData = new FormData();
                                    if (_this.upLoadParams.userId) {
                                        formData.append("userId", this.upLoadParams.userId);
                                    }
                                    formData.append("md5", md5);
                                    if (_this.upLoadParams.moduleName) {
                                        formData.append("moduleName", this.upLoadParams.moduleName);
                                    }
                                    formData.append("file", file);
                                    // console.log(formData.get('md5'))
                                    let config = {
                                        headers: {
                                            "Content-type": "multipart/form-data"
                                        },
                                        onUploadProgress: progressEvent => {
                                            let percent =((progressEvent.loaded / progressEvent.total) * 100) | 0;

                                            console.info(percent)
                                        }
                                    };
                                    //"/fastdfs-center/file/uploadDfs"
                                    axios.post(_this.$api.upload.uploadDfs, formData, config).then(function(response) {
                                        let url = _this.$api.upload.reqUrl+ _this.$api.upload.downloadByMd5Path+"?md5Path="+response.info.md5Path+ "&access_token="+localStorage.getItem("access_token")
                                        _this.addImgRange = _this.$refs.myQuillEditor.quill.getSelection()
                                        url = url.indexOf('http') != -1 ? url : 'http:' + url
                                        _this.$refs.myQuillEditor.quill.insertEmbed(_this.addImgRange != null?_this.addImgRange.index:0, 'image', url, Quill.sources.USER)
                                    }).catch(function(error) {
                                        _this.$message.warning("图片增加失败")
                                    })
                                }if (data.msg === "已上传"){
                                    let url = _this.$api.upload.reqUrl+ _this.$api.upload.downloadByMd5Path+"?md5Path="+data.info.md5Path+ "&access_token="+localStorage.getItem("access_token")
                                    //let url = "http://10.2.57.123:9110/file/downloadByMd5Path?md5Path=076e3caed758a1c18c91a0e9cae3368f@879394&access_token="+localStorage.getItem("access_token")
                                    _this.addImgRange = _this.$refs.myQuillEditor.quill.getSelection()
                                    url = url.indexOf('http') != -1 ? url : 'http:' + url
                                    _this.$refs.myQuillEditor.quill.insertEmbed(_this.addImgRange != null?_this.addImgRange.index:0, 'image', url, Quill.sources.USER)
                                }
                            }).catch(function(error) {
                                _this.$message.warning("图片增加失败")
                            })
                        }
                    })
                }
                fileInput.value = ""
            }
        }
    }
</script>

<style>
    .editor {
        line-height: normal !important;
        height: 500px;
    }
    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before{
        content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
        content: '衬线字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
        content: '等宽字体';
    }
</style>