<template>
    <div class = "wrap">
        <el-button @click="getMap" type="info" round>点击这里打开地图定位弹窗</el-button>
        <el-dialog title="定位地址" :visible.sync="dialogFormVisible" width="760px">
            <div class = "searchbox">
                <!--<el-input placeholder="请输入地址" prefix-icon="el-icon-search"></el-input>-->
                <el-autocomplete
                        placeholder="请输入地址"
                        class="inline-input"
                        prefix-icon="el-icon-search"
                        v-model="search"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                ></el-autocomplete>
            </div>
            <div class = "content">
                <div class = "positionlist">
                    <ul>
                        <li @click="getPosition($event,index)" class="position" :key="index"  v-for="(item,index) in pnameList">
                            <i class="iconfont iconweizhi position-icon">
                                <span class="position-num">{{index+1}}</span>
                            </i>
                            <span class = "position-name">{{item.value}}</span>
                            <!--<i class="iconfont iconyuanquan position-circle" v-if="!item.checked"></i>-->
                            <i class="iconfont iconyuanquan position-circle" :class="selectedNum==index ? 'iconzhengque11 position-confirm' : ''"></i>
                            <!--<i class="iconfont iconzhengque11 position-confirm" v-else></i>-->
                        </li>
                    </ul>
                </div>
                <div id = "container"></div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    var maps = require('qqmap');
    maps.init('EA5BZ-OOB3V-YRFP5-UTJVK-PVBPF-6VB6Y');
    export default {
        name: "djmap",
        data() {
            return {
                selectedNum:-1,
                pnameList:[], //声明地点名称数组
                search: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
            };
        },
        methods:{
            querySearch(queryString, cb) {
                var pnameList = this.pnameList;
                var results = queryString ? pnameList.filter(this.createFilter(queryString)) : pnameList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (data) => {
                    return (data.value.indexOf(queryString) === 0);
                };
            },
            loadAll() {
                return [
                    {"value":"北京市故宫博物院"},
                    {"value":"北京清华大学",},
                    {"value":"北京市中央财经大学"},
                    {"value":"北京中国人民大学"},
                    {"value":"北京市中国石油大学"},
                    {"value":"北京市海淀区学院南路55号"},
                    {"value":"北京市颐和园"},

                ];
            },
            handleSelect(item) {
                this.selectedNum = this.pnameList.indexOf(item);
                this.changePosition(item.value);
            },

            //打开dialog弹窗后需要执行获取地图的方法
            getMap(){
                this.dialogFormVisible = true;
                //this.setMap("北京市故宫博物院");
                this.getLocation();
            },

            //根据ip地址定位获得当前位置信息
            getLocation:function(e){
                var geolocation = new qq.maps.Geolocation("EA5BZ-OOB3V-YRFP5-UTJVK-PVBPF-6VB6Y", "党建地图-党组织定位");
                geolocation.getLocation(show,defeat);
                var _that = this;
                function show(position){
                    //设置地图中心点
                    var mapCenter = new qq.maps.LatLng(position.lat,position.lng);
                    _that.setMap(mapCenter);
                };

                function defeat(){
                    alert("获取当前位置失败,点击重试");
                    _that.getLocation();
                }
            },

            //生成地图的公共方法
            setMap(mapCenter){
                //定义工厂模式函数
                var myOptions = {
                    zoom: 13,            //设置地图缩放级别
                    center: mapCenter,    //设置地图中心点
                    scaleControl: false,  //比例尺控件
                    zoomControl: false,  //缩放控件
                    panControl: false,  //平移控件
                    mapTypeId: qq.maps.MapTypeId.ROADMAP,  //设置地图样式详情参见MapType
                };

                // 获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("container"), myOptions);


                var latlngs = [
                    new qq.maps.LatLng(39.961475,116.317744),
                    new qq.maps.LatLng(39.95829,116.33476),
                    new qq.maps.LatLng(39.914124,116.37336),
                    new qq.maps.LatLng(39.910542,116.394302),
                    new qq.maps.LatLng(39.550086,116.232693),
                    new qq.maps.LatLng(39.91927,116.40357),
                    new qq.maps.LatLng(39.963908,116.3411),
                    new qq.maps.LatLng(39.965788,116.332836),
                    new qq.maps.LatLng(39.964765,116.313827),
                    new qq.maps.LatLng(39.956774,116.308905),
                    new qq.maps.LatLng(39.966659,116.296239),
                ];
                for(var i = 0;i < latlngs.length; i++) {
                    var marker = new qq.maps.Marker({
                        position: latlngs[i],
                        map: map
                    });
                    //marker.setIcon(icon);
                };
            },


            //在地图上展示位置信息
            changePosition(position) {
                //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                var geocoder = new qq.maps.Geocoder();
                geocoder.getLocation(position);
                var _that = this;
                geocoder.setComplete(function(result) {
                    //获取到的经纬度存储在result.detail.location对象中
                    var latitude = result.detail.location.lat;
                    var longitude = result.detail.location.lng;
                    //console.log(latitude,longitude);

                    //设置地图中心点
                    var mapCenter = new qq.maps.LatLng(latitude,longitude);
                    _that.setMap(mapCenter);

                    //给定位的位置添加文本标注
                    /*var marker = new qq.maps.Label({
                      position: myLatlng,
                      map: map,
                      content:'标注文本'
                    });*/
                });
                geocoder.setError(function(e) {
                    console.log(e)
                    //获取经纬度失败（可能是因为输入的地址不对）
                });
            },

            //与文字联动
            getPosition:function(e,index){
                //控制确认符号的显示隐藏方法
                //console.log(e);
                //console.log(index);
                this.selectedNum = index;
                //生成地图
                this.changePosition(e.currentTarget.firstElementChild.nextElementSibling.innerText);
            },
        },
        mounted() {
            this.pnameList = this.loadAll();
        },
    }
</script>

<style scoped>
    html,body,ul{
        margin: 0;
        height: 0;
    }

    ul{
        list-style: none;
    }

    .wrap{
        margin: 30px;
    }

    .searchbox{
        width: 300px;
    }

    .content{
        width: 720px;
        height: 310px;
        margin-top: 20px;
        border: 1px solid #DDD;
    }

    .positionlist{
        width: 330px;
        height: 280px;
        padding: 15px 10px;
        overflow: auto;
        float: left;
    }

    .positionlist ul li{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #DDD;
        cursor: pointer;
    }

    .positionlist ul li:last-child{
        border-bottom: 0;
    }

    .positionlist ul li .position-name{
        display: inline-block;
        width: 260px;
        vertical-align: middle;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .position .position-icon{
        color: #DB3947;
        font-size: 25px;
        vertical-align: middle;
    }

    .position .position-icon .position-num{
        color: #FFF;
        font-size: 12px;
        position: relative;
        top: -6px;
        left: -16px;
    }

    .positionlist ul li .position-circle{
        vertical-align: middle;
    }

    .positionlist ul li .position-confirm{
        color: #15C17C;
        vertical-align: middle;
    }

    #container {
        width:360px;
        height:310px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        float: right;
    }

</style>