const reqUrl = 'http://10.2.57.123:9101'//开发环境使用 （经过网关）
// const reqUrl = 'http://10.2.57.123:9110'//开发环境使用 (不经过网关，所以不需要加前缀)

const uploadCenterUrl = "/fastdfs-center"
const uploadDfs = uploadCenterUrl+'/file/uploadDfs'//上传地址url
const download = uploadCenterUrl+'/file/download'//下载地址url
const downloadByMd5Path = uploadCenterUrl + '/file/downloadByMd5Path'//下载地址url
const md5CheckForFrontEnd = uploadCenterUrl+'/file/md5CheckForFrontEnd'//md5校验
const preview = uploadCenterUrl+'/file/preview'//预览url
const getPdfPath = uploadCenterUrl+'/file/getPdfPath'//pdfurl
const downloadPackage = uploadCenterUrl+'/file/downloadPackage'//打包下载url
const deleteUpLoad = uploadCenterUrl+'/file/delete'//删除url

export default {
    reqUrl,
    uploadDfs,
    download,
    downloadByMd5Path,
    md5CheckForFrontEnd,
    preview,
    getPdfPath,
    downloadPackage,
    deleteUpLoad

}

