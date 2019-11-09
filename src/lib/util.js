import Vue from 'vue'
import BMF from "browser-md5-file";

/*
* 表格配置参数
* */
const tableConfig = {
  needLoading: true, //在表格加载数据时显示，默认不显示
  pagination: {
    currentPage: 1,
    pageSize: 10,
    position: 'right',
    layout: 'total,prev, pager, next, jumper'
  },  //分页：pagination值为空默认分页 ；pagination不为空自定义分页；不传，默认不分页
  tableColumnEmpty:'暂无数据'// 列为空时显示的提示语，默认为'暂无数据'
}

Vue.prototype.$$config = Object.assign({},{"tableConfig":tableConfig});
//定义变量
const bmf = new BMF();
var isOpen = false;

const $api = Vue.prototype.$api
const uploadUrl = {
  md5: $api.upload.md5CheckForFrontEnd,
  uploadDfs: $api.upload.uploadDfs,
  download:$api.upload.download,
  downloadPackage:$api.upload.downloadPackage,
  deleteUpLoad:$api.upload.deleteUpLoad,
  downloadByMd5Path: $api.upload.downloadByMd5Path
}
const upLoadParams = {
  userId: "222222",
  moduleName: "CheckForFrontEnd"
}

//生成字符串
function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}
//对象数组去重
function unique(arr) {
    var unique = {}
    arr.forEach(function(item) {
        unique[JSON.stringify(item)] = item //键名不会重复
    })
    arr = Object.keys(unique).map(function(u) {
        //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
        return JSON.parse(u)
    })
    return arr
}

//正则验证
const pattern = {
    phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ ,
    email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ ,
    idCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
}
//工具类
const util = {
    uuid : uuid,
    unique: unique,
    pattern: pattern
}
Vue.prototype.$$util = util
// this.$$request().then(function (res) {})
Vue.prototype.$$request = function(param){
  const _that = this
  const promise = new Promise((resolve,reject)=>{
    _that.$axios({
      method: param.method || "post",
      url: param.url || "",
      data: param.data || {},
      params: param.method=='get'?param.data:{},
      headers: param.headers || {},
      onUploadProgress:param.onUploadProgress || null
    }).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      reject(error)
    })
  })
  return promise
}


Vue.prototype.msgAlert = function(msg, callbackMethod) {
  var that = this;
  if (!isOpen) {
    isOpen = true;
    that.$alert(msg, '信息提示', {
      confirmButtonText: '确定',
      callback: function callback(action) {
        isOpen = false;
        if (!$.isEmpty(callbackMethod)) callbackMethod(action);
      }
    });
  }
};
Vue.prototype.msgError = function(msg, callbackMethod) {
  var that = this;
  if (!isOpen) {
    isOpen = true;
    that.$alert(msg, '错误提示', {
      confirmButtonText: '确定',
      callback: function callback(action) {
        isOpen = false;
        if (!$.isEmpty(callbackMethod)) callbackMethod(action);
      }
    });
  }
};
Vue.prototype.selectOneWarn = function() {
  this.$message({ type: 'warning', message: '请先选择一个操作项' });
};
Vue.prototype.getItems = function(key, obj) {
  if ($.isEmpty(key)) key = 'id';
  var ids = [];
  var obj = obj ? obj : this.selectItems;
  obj.forEach(function(item) {
    ids.push(item[key]);
  });
  return ids;
};
Vue.prototype.deleteConfirm = function(url, data, result, msg) {
  if (this.selectItems.length === 0) {
    this.selectOneWarn();
  } else {
    this.msgConfirm(url, data, result, msg);
  }
};
Vue.prototype.showConfirm = function(msg, result, catchCallBack) {
  var _this = this;
  this.$confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(function() {
      result();
    })
    .catch(function() {
      if ($.isEmpty(catchCallBack)) {
        _this.$message({
          type: 'info',
          message: '已取消'
        });
      } else {
        catchCallBack();
      }
    });
};
Vue.prototype.msgConfirm = function(url, data, result, msg = '此操作将永久删除该信息, 是否继续?') {
  var _this = this;
  this.showConfirm(msg, function() {
    _this.simplePost(url, data, function(obj) {
      if ($.isNotEmpty(result)) {
        result(obj);
      } else {
        _this.search();
      }
      if (obj.code !== 0) return;
      _this.$message({
        type: 'info',
        message: '操作成功'
      });
    });
  });
};
Vue.prototype.getCurrentDateStr = function(fmt){
    var date = new Date();
    fmt = fmt || "yyyy-MM-dd hh:mm:ss";
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = '-';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};


Vue.prototype.postConfirm = function(url, data, result, msg) {
  if ($.isEmpty(msg)) msg = '确定此操作?';
  var _this = this;
  this.showConfirm(msg, function() {
    _this.httpPost(url, data, function(obj) {
      if ($.isNotEmpty(result)) {
        result(obj);
      } else {
        _this.search();
      }
      _this.$message({
        type: 'info',
        message: '操作成功'
      });
    });
  });
};

Vue.prototype.copyObj = function(odlObj) {
  //复制对象
  var newobj = {};
  for (var attr in odlObj) {
    newobj[attr] = odlObj[attr];
  }
  return newobj;
};
Vue.prototype.copyArray = function(odlArray) {
  //复制数组
  var newArray = [];
  for (var i = 0; i < odlArray.length; i++) {
    var obj = odlArray[i];
    newArray.push(obj);
  }
  return newArray;
};
Vue.prototype.attributeCount = function(obj) {
  //获取对象属性数量
  var count = 0;
  for (var i in obj) {
    count++;
  }
  return count;
};



// 消息提示
Vue.prototype.showTips = function (params) {
  this.$message({
    type: params.type || 'success',
    message: params.message || '操作成功',
    showClose: params.showClose === false ? false : true,
    duration: (params.duration >= 0) ? params.duration : 3000
  });
};
// 获取md5
Vue.prototype.$$md5ByFile = function (param) {
  const promise = new Promise((resolve,reject)=>{
    bmf.md5(param.file, (err, md5) => {
      if (err) {
        reject(err)
      } else if (md5) {
        resolve({md5: md5})
      }
    })
  })
  return promise
}

//md5校验 param:{file,upLoadParams:{userId,moduleName}}
Vue.prototype.$$md5CheckByFile = function (param) {
  const promise = new Promise((resolve,reject)=>{
    this.$$request({
      method: "post",
      url: uploadUrl.md5,
      data: {
        fileSrcName: param.file.name,
        md5: param.md5,
        fileSize: param.file.size,
        userId: upLoadParams.userId,
        moduleName: upLoadParams.moduleName
      }
    }).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      reject(error)
    })
  })
  return promise
}

//上传 param:{md5:"",file,progress:func(percent){},success:func(){},error:func(){}}
Vue.prototype.$$uploadFile = function (param) {
  const _that = this
  const promise = new Promise((resolve,reject)=> {
    let formData = new FormData()
    formData.append("userId", upLoadParams.userId)
    formData.append("moduleName", upLoadParams.moduleName)
    formData.append("md5", param.md5)
    formData.append("file", param.file)
    _that.$axios({
      method: "post",
      url: uploadUrl.uploadDfs,
      data: formData,
      headers: {
        "Content-type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        let percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0
        param.progress && param.progress(percent)
      }
    }).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      reject(error)
    })
  })
  return promise
}
/*----白昱--封装上传下载---start*/
//下载
Vue.prototype.$$download=function(param) {
  const that = this
  let fileDownload = require("js-file-download");
  const promise = new Promise((resolve,reject)=> {
    if(!!param.md5Path){
      let fileName = param.fileSrcName?param.fileSrcName:param.md5Path.split("@")[0]+'.docx'
      that.$axios({
        method: 'post',
        url: uploadUrl.download,
        responseType:"blob",
        data: {
          md5Path: param.md5Path,
        }
      }).then(function (res) {
        fileDownload(res, fileName);
        resolve(res);
      }).catch(function (error) {
        reject(error)
      })
    }else {
      reject('md5path不存在')
    }
  })
  return promise;
}
//批量下载，打包下载
Vue.prototype.$$downloadPackage=function(params) {
  const that = this
  let fileDownload = require("js-file-download");
  const promise = new Promise((resolve,reject)=> {
    let zipName = params.zipName?params.zipName:'download.zip';
    that.$axios({
      method: 'post',
      responseType: 'blob',
      timeout: 600000,
      url: uploadUrl.downloadPackage,
      data: params
    }).then(function (res) {
      fileDownload(res, zipName);
      resolve()
    }).catch(function (error) {
      // console.log(error)
      reject(error)
    })
  })
  return promise;
}
//移除文件
Vue.prototype.$$deleteUpLoad=function(params) {
  const that = this
  const promise = new Promise((resolve,reject)=> {
    that.$axios({
      method: 'post',
      url: uploadUrl.deleteUpLoad,
      data:params
    }).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      reject(error)
    })
  })
  return promise;
}


/*----白昱--封装上传下载----end*/
//获取url param:{md5Path:"",success:func(){},error:func(){}}
Vue.prototype.$$getImgUrlByMd5path = function (param) {
  this.$axios({
    method: "post",
    url: uploadUrl.download,
    data: {
      md5Path: param.md5Path,
      access_token: localStorage.getItem("access_token")
    },
    responseType: "arraybuffer"
  }).then(function(res) {
    let imgUrl ="data:image/png;base64," +
        btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte),""));
    return imgUrl;
  }).catch(function(error) {
    console.log(error);
  });
}

//路由跳转新页面且互不影响 {component:"",tabName:"",params:{}}
Vue.prototype.$$Push = function (param) {
  let tabName = param.tabName || "vue"+Math.floor(Math.random() * 10000)
  let component = {
    extends: param.component,
    name: tabName
  }

  this.$router.addRoutes([{
    path: '/',
    name: 'index',
    //component:() => import("@/views/index"),
    children:[{
      path: '/' + tabName +'/:moduleName' ,
      name: tabName,
      meta: {
        tabname: tabName
      },
      component: component
    }]
  }])
  this.$router.push({
    name: tabName,
    params: param.params || {
      moduleName:"worktab_1",
    }
  })
}


//将base64转换为blob
Vue.prototype.$$base64toBlob=function(dataurl) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
},
//将blob转换为file
Vue.prototype.$$blobToFile = function(theBlob, fileName){
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
