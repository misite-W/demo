/**
*  评论组件
*  @params
***
*  :limited 评论文字限制
*  :plztId （如果是对某个会议评论，则表示会议主键id）
*  :plztlx 评论类型（1代表会议评论，当前只设计会议评论）
**/
<template>
    <div>
        <el-input
                type="textarea"
                placeholder="请输入评论"
                v-model="commentContent"
                :maxlength="limited"
                show-word-limit
        >
        </el-input>
        <el-button type="primary" size="small" class="mar-top-24" @click="sendCommentBtn($event,'')">发表评论</el-button>
        <ul class="make-comment">
            <li v-for="item in commentFirstData" :key="item.plId">
                <div class="photo-bar">
                    <img src="item.yhtx" :onerror="defaultImg">
                </div>
                <div class="content-bar">
                    <p class="people-info"><span class="name">{{item.yhxm||'佚名'}}</span><span class="time">{{item.plsj | filterTime}}</span></p>
                    <p class="people-comments" @click="openBtn($event,item.plId)">{{item.plnr}}</p>
                    <p class="people-do">
<!--                        {{dzcount}}-->
                        <span class="icon iconfont iconzan1" @click="zanBtn(item.plId)">123</span>
                        <span class="icon iconfont iconpinglun" @click="openPinglun($event,item.plId)">{{item.count||0}}</span>
                        <span class="icon iconfont iconlajixiang" @click="deletePinglun(item.plId)"></span>
                    </p>
                    <!-- 二级评论-->
                    <ul class="sencond-ul">
                            <template v-if="commentSecondData[item.plId]&&commentSecondData[item.plId].list.length>0">
                                <li v-for="secondList in commentSecondData[item.plId].list" :key="secondList.plId">
                                    <div class="photo-bar">
                                        <img src="item.yhtx" :onerror="defaultImg">
                                    </div>
                                    <div class="content-bar">
                                        <p class="people-info"><span class="name">{{secondList.yhxm||'佚名'}}</span><span class="time">{{secondList.plsj | filterTime}}</span></p>
                                        <p class="people-comments"><span class="grey">回复 刘佳妮：</span>{{secondList.plnr}}</p>
    <!--                                    <p class="people-do">-->
    <!--                                        <span class="icon iconfont iconpinglun" @click="openPinglun($event,secondList.plId)">{{secondList.count||0}}</span>-->
    <!--                                    </p>-->
                                    </div>
                                </li>
                            </template>
                            <template v-else>
                                暂无评论
                            </template>
                            <p class="toggele-comment"><span @click="openSecondData(item.plId,'more')" v-if="commentSecondData[item.plId] && commentSecondData[item.plId].loadMore">加载更多</span>&nbsp;&nbsp;<span @click="closeBtn($event)">收起回复</span></p>
                    </ul>
<!--                    <div class="comment-text">-->
<!--                        <el-input-->
<!--                                type="textarea"-->
<!--                                placeholder="请输入评论"-->
<!--                                v-model="commentSecondContent"-->
<!--                                maxlength="30"-->
<!--                                show-word-limit-->
<!--                        >-->
<!--                        </el-input>-->
<!--                        <el-button type="primary" size="small" class="mar-top-24" @click="sendCommentBtn($event,item.plId)">发表评论</el-button>-->
<!--                    </div>-->
                </div>
            </li>
            <p class="toggele-comment" @click="loadCommentData('more')" v-if="loadMore">加载更多</p>
        </ul>
        <el-dialog
                title="发表评论"
                :visible.sync="dialogVisible"
                width="30%">
            <div class="comment-text">
                <el-input
                        type="textarea"
                        placeholder="请输入评论"
                        v-model="commentSecondContent"
                        :maxlength="limited"
                        show-word-limit
                >
                </el-input>
<!--                <el-button type="primary" size="small" class="mar-top-24" @click="sendCommentBtn($event,item.plId)">发表评论</el-button>-->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="sendCommentBtn($event,null)" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "makeComment",
        props:{
            limited:{
                default: 100,
                type: Number
            },
            plztId:{
                default:'1f193b4d063146a795682c7c75c27118',
                type: String
            },
            plztlx:{
                default:1
            },//评论类型（1代表会议评论，当前只设计会议评论）
        },
        filters: {
            filterTime(value) {
                if (!value) {
                    return '未知时间'
                }
                // if (Object.prototype.toString.call(value) === '[object String]') {
                //     return value
                // }
                if (value <= 0) {
                    return '未知时间'
                }
                // if (value < 10000000000) {
                //     value *= 1000
                // }
                // let time = new Date(value)
                // let tY = time.getFullYear()
                // let tM = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
                // let tD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
                // let th = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
                // let tm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
                // let ts = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
                // let now = new Date()
                // let nY = now.getFullYear()
                // let nM = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
                // let nD = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
                // let result = ''
                // if (tY !== nY) {
                //     result += tY + '年'
                // }
                // if (tM !== nM || tD !== nD) {
                //     result += tM + '月'
                //     result += tD + '日'
                // }
                // if (result === '') {
                //     result = th + ':' + tm + ':' + ts
                // }
                // return result

                let parTime = new Date(value)
                let diffDay = parseInt((new Date().getTime() - parTime.getTime()) / 86400000);// 天1000 * 60 * 60 * 24
                return (diffDay == 1 ? "昨天 " : diffDay == 0 ? "今天 " : "") +
                    ((parTime.getHours() / 12 > 1 ? "下午" : "上午") +
                        Array(2 - ('' + parTime.getHours()).length + 1).join(0) + parTime.getHours() + ":" +
                        Array(2 - ('' + parTime.getMinutes()).length + 1).join(0) + parTime.getMinutes());
            }
        },
        data:function () {
            return{
                // getCommentFirstUrl:'/mockData/makeComment/data.json', // 第一级评论数据地址 /Dzpl001PlxxCtrl/queryPlxxListByPrincipalId
                getCommentFirstUrl:'http://10.2.57.123:9101/comment-center/Dzpl001PlxxCtrl/queryPlxxListByPlztId',
                getCommentSecondurl:'http://10.2.57.123:9101/comment-center/Dzpl001PlxxCtrl/queryPlxxListByfjplId',
                addCommentUrl:'http://10.2.57.123:9101/comment-center/Dzpl001PlxxCtrl/saveDzzshDzplPlxx',
                deleteUrl:'http://10.2.57.123:9101/comment-center/Dzpl001PlxxCtrl/delZzshDzplPlxx',
                getZanUrl:'http://10.2.57.123:9101/comment-center/Dzpl002DzxxCtrl/queryPlxxListBydzztId',
                userInfo:{ // 当前用户信息
                    userId:'1212',
                    userName:'刘佳妮',
                    userPhoto:''
                },
                pagination: { //父级分页信息
                    currentPage: 1,
                    pageSize: 10
                },
                paginationChild:[],

                commentFirstData:[],//第一级评论
                commentSecondData:{},//第二级评论
                first:[],
                second:[],//接收二级评论中间变量
                loadMore:true,
                loading:false,
                commentContent:'',//一级评论内容
                commentSecondContent:'',//二级评论内容
                defaultImg:'this.src="' + require('../../assets/images/default_head.png') + '"',//默认头像
                dialogVisible: false, //评论弹层
                plId:'', //点击一级评论的时候保存评论id
            }
        },
        created:function(){
          this.loadCommentData()
        },
        methods:{
            loadCommentData: function (str) { // 获取列表数据
                this.loading=true
                let _this = this
                let param = {}
                param.plztId=_this.plztId
                if(str==='more'){
                    param.currentPage=this.pagination.currentPage+1
                }else {
                    param.currentPage=this.pagination.currentPage
                }
                param.pageSize=this.pagination.pageSize

                this.$axios({
                    method: 'post',
                    url: _this.getCommentFirstUrl,
                    data: param
                }).then(function (data) {
                    if (data) {
                        _this.first=_this.first.concat(data.info.list)
                        _this.commentFirstData=_this.first
                        _this.pagination.currentPage=data.info.pageNum // 下一页页码
                        _this.loadMore=data.info.hasNextPage
                        _this.loading=false
                    } else {
                    }
                }).catch(function (error) {
                });

            },
            openSecondData:function(fjplId,str){
                this.loading=true
                let _this = this
                let param = {}
                let obj = {} // 存放二级对象属性
                obj[fjplId]={}
                // obj[fjplId].loading=true
                param.fjplId=fjplId
                if(str==='more'){
                    param.currentPage=_this.paginationChild['pagination_'+fjplId]?_this.paginationChild['pagination_'+fjplId].currentPage+1:1
                } else {
                    param.currentPage=_this.paginationChild['pagination_'+fjplId]?_this.paginationChild['pagination_'+fjplId].currentPage:1
                }
                param.pageSize=_this.paginationChild['pagination_'+fjplId]?_this.paginationChild['pagination_'+fjplId].pageSize:10

                this.$axios({
                    method: 'post',
                    url: _this.getCommentSecondurl,
                    data: param
                }).then(function (data) {
                    if (data && data.result===1) {
                        if(str==='more') { //加载更多追加数据
                            _this.second = _this.second.concat(data.info.list)
                        }else{ //添加评论显示当页数据
                            _this.second = data.info.list
                        }
                        obj[fjplId].list =_this.second
                        // obj[fjplId].list = data.info.list
                        if(data.info.total<data.info.pageNum * data.info.pageSize||data.info.isLastPage){ //判断是否还可以加载更多依据
                            obj[fjplId].loadMore = false
                        }else{
                            obj[fjplId].loadMore = true
                        }
                        _this.paginationChild['pagination_'+fjplId]={
                            currentPage: data.info.pageNum,
                            pageSize: data.info.pageSize
                        }
                        // obj[fjplId].loading = false
                        _this.loading=false
                        _this.commentSecondData=Object.assign({},_this.commentSecondData,obj)
                        console.log(_this.commentSecondData)

                    } else {
                    }
                }).catch(function (error) {
                });
            },
            sendCommentBtn:function (e,fjplId) { // 评论
                let _this = this
                let param = {}
                if(fjplId!=''){ // fjplId父级评论id不为空,二级评论
                    param.fjplId=fjplId
                    param.plnr=_this.commentSecondContent //二级评论内容
                }else{
                    param.fjplId=null
                    param.plnr=_this.commentContent //一级评论内容
                }
                param.plztId=_this.plztId
                param.plztlx=_this.plztlx

                // param.userId=_this.userId
                this.$axios({
                    method: 'post',
                    url: _this.addCommentUrl,
                    data: param
                }).then(function (data) {
                    if (data.result===1) {
                        _this.loading=false
                        _this.dialogVisible=false
                        _this.$alert(data.msg, '提示', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: action => {
                                debugger
                                if(fjplId!=''){ //二级评论
                                    _this.openSecondData(fjplId)
                                } else { // 一级评论
                                    _this.loadCommentData()
                                }
                                // if(e.target.parentElement.parentElement.className==='comment-text'){
                                //     e.target.parentElement.parentElement.style.display="none"
                                //     e.target.parentElement.parentElement.parentElement.getElementsByClassName("sencond-ul")[0].style.display="block" // 展开
                                // }
                                _this.commentSecondContent='' //清空编辑评论内容
                                _this.commentContent=''    //清空编辑评论内容

                            }
                        });
                    }
                    else {
                        _this.$alert(data.msg, '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {
                            }
                        });
                    }
                }).catch(function (error) {
                });

            },
            closeBtn:function (e) { // 收起
                e.currentTarget.parentNode.parentElement.style.display="none"
            },
            openBtn:function (e,id) { // 展开
                if(e.currentTarget.parentNode.getElementsByClassName("sencond-ul")[0].style.display===''||
                    e.currentTarget.parentNode.getElementsByClassName("sencond-ul")[0].style.display==='none')
                {
                    this.openSecondData(id) // 展开同时加载二级回复
                    e.currentTarget.parentNode.getElementsByClassName("sencond-ul")[0].style.display="block" // 展开
                }
            },
            openPinglun:function (e,plId) {
                this.dialogVisible=true
                this.plId=plId
                // if(e.currentTarget.parentNode.parentNode.getElementsByClassName("comment-text")[0]){
                //     e.currentTarget.parentNode.parentNode.getElementsByClassName("comment-text")[0].style.display="block"
                // }else {
                //     e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("comment-text")[0].style.display="block"
                // }
            },
            deletePinglun:function (id) {
                let arr=[]
                arr.push(id)
                var _this=this
                this.$axios({
                    method: 'post',
                    url: _this.deleteUrl,
                    data: arr
                }).then(function (data) {
                    if (data) {
                        _this.$alert(data.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'success',
                            callback: action => {
                                _this.loadCommentData()
                                // this.$message({
                                //     type: 'success',
                                //     message: `action: ${ action }`
                                // });
                            }
                        });
                    } else {
                    }
                }).catch(function (error) {
                });
            },
            zanBtn:function (id) {
                let _this=this
                let param = {}
                param.dzztId=id
                param.dzztlx=1
                this.$axios({
                    method: 'post',
                    url: _this.getZanUrl,
                    data: param
                }).then(function (data) {
                    if (data && data.result===1) {
                        _this.loadCommentData()
                        _this.loading=false
                    } else {
                    }
                }).catch(function (error) {
                });
            }
        }
    }
</script>

<style scoped>
    .mar-top-24{
        margin-top: 24px;
    }
    .make-comment >li{
        padding: 24px 0;
        display: table;
        border-bottom:1px solid #E5E5E5;;
        width: 100%;
    }
    .make-comment .photo-bar img{
        display: inline-block;
        width: 48px;
        height: 48px;
        margin-right: 16px;
    }
    .make-comment .photo-bar,.make-comment .content-bar {
        display: table-cell;
        vertical-align: top;
        text-align: justify;
    }
    .make-comment .content-bar{
        position: relative;
        width: 100%;
    }
    .make-comment .people-do{
        position: absolute;
        right: 0;
        top: 0;
    }
    .make-comment .people-do span{
        margin-left: 9px;
        font-size: 14px;
        color: #8C8C8C;
        vertical-align: middle;
    }
    .make-comment .people-do>>> .icon:before {
        font-size: 24px;
        vertical-align: middle;
        margin-top: -2px;
        display: inline-block;
        margin-right: 6px;
    }
    .make-comment .people-do >>> .icon:hover:before{
        color: #DA3947;
    }
    .make-comment .people-info{
        margin-top: 16px;
    }
    .make-comment .people-info .name {
        font-size: 16px;
        color: #666;
        line-height: 16px;
        margin-right: 16px;
    }
    .make-comment .people-info .time {
        font-size: 14px;
        color: #8C8C8C;
        line-height: 16px;
    }
    .make-comment .people-comments {
        margin-top: 16px;
        font-size: 16px;
        color: #282828;
        line-height: 26px;
        cursor: pointer;
    }
    .make-comment .sencond-ul{
        margin-top: 24px;
        background: #F7F7F7;
        border-radius: 4px;
        padding: 24px;
        position: relative;
        display: none;
    }
    .make-comment .sencond-ul:before{
        display: inline-block;
        content: ' ';
        background-color: #F7F7F7;
        width: 22px;
        height: 22px;
        position: absolute;
        left: 30px;
        top: -11px;
        transform: rotate(45deg);
    }
    .make-comment .sencond-ul li{
        margin-bottom: 24px;
    }
    .make-comment .grey {
        color: #666;
    }
    .make-comment .toggele-comment {
        font-size: 16px;
        color: #DA3947;
        text-align: center;
        cursor: pointer;
    }
    /*.make-comment .comment-text {*/
    /*    display: none;*/
    /*}*/
    .make-comment .iconpinglun {
        cursor: pointer;
    }
</style>