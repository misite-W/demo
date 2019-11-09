<!--"@fullcalendar/core": "^4.3.1",提供核心功能，包括Calendar类
    "@fullcalendar/daygrid": "^4.3.0",在Month视图或DayGrid视图上显示事件
    "@fullcalendar/interaction": "^4.3.0",提供事件拖放，调整大小，日期点击和可选操作的功能
    "@fullcalendar/list": "^4.3.0",将您的活动视为项目符号列表
    "@fullcalendar/timegrid": "^4.3.0",在时间网格上显示您的事件
    header:设置日历头部信息。
        如果设置为false，则不显示头部信息。包括left，center,right左中右三个位置，每个位置都可以对应以下不同的配置：
        title: 显示当前月份/周/日信息
        prev: 用于切换到上一月/周/日视图的按钮
        next: 用于切换到下一月/周/日视图的按钮
        prevYear：用于切换到上一年视图的按钮
        nextYear：用于切换到下一年视图的按钮
    theme	是否允许使用jquery的ui主题，如果设置为true，则需要加载jquery ui相关css和js文件。 查看演示	false
    buttonIcons	设置header中使用的prev, next等变量对应按钮的样式，只有当theme为true时才有效，如果你调用了jQuery ui样式但又不想使用它的图标样式，可以将此属性设置为false	{ prev: 'circle-triangle-w', next: 'circle-triangle-e' }
    firstDay	设置一周中显示的第一天是哪天，周日是0，周一是1，类推。	0
    isRTL	设置为ture时则日历从右往左显示，貌似是针对阿拉伯人设计的。	false
    weekends	是否显示周末，设为false则不显示周六和周日。	true
    hiddenDays	隐藏一周中的某一天或某几天，数组形式，如隐藏周二和周五：[2,5]，默认不隐藏，除非weekends设置为false。	[]
    weekMode	在月视图里显示周的模式，因为每月周数可能不同，所以月视图高度不一定。
    fixed：固定显示6周高，日历高度保持不变
    liquid：不固定周数，高度随周数变化
    variable：不固定周数，但高度固定	'fixed'
    weekNumbers	是否在日历中显示周次(一年中的第几周)，如果设置为true，则会在月视图的左侧、周视图和日视图的左上角显示周数。	false
    weekNumberCalculation	周次的显示格式。	"iso"
    height	设置日历的高度，包括header日历头部，默认未设置，高度根据aspectRatio值自适应。
    contentHeight	设置日历主体内容的高度，不包括header部分，默认未设置，高度根据aspectRatio值自适应。
    aspectRatio	设置日历单元格宽度与高度的比例。	1.35
    handleWindowResize	是否随浏览器窗口大小变化而自动变化。	true
    windowResize	callback，当浏览器窗口变化时触发function，使用：
    $('#calendar').fullCalendar({
    windowResize: function(view) {
    alert('The calendar has adjusted to a window resize');
    }
    });

    render	method，绑定日历到id上。
    $('#id').fullCalendar('render');
    destroy	method，销毁id日历，把日历回复到初始化前状态。
    $('#id').fullCalendar('destroy');
    -->
<template>

    <div>
        <div id='external-events'>
            <p>
                <strong>待添加事件</strong>
            </p>
            <div id="events">
            <div class='fc-event '>My Event 1</div>
            <div class='fc-event'>My Event 2</div>
            <div class='fc-event'>My Event 3</div>
            <div class='fc-event'>My Event 4</div>
            <div class='fc-event'>My Event 5</div>
            </div>
            <p>
                <input type='checkbox' id='drop-remove'/>
                <label for='drop-remove'>添加后删除</label>
            </p>
            <hr>
            <div class="box box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">添加事件</h3>
                </div>
                <div class="box-body">
                    <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                        <ul  id="color-chooser" >
                            <li> <el-button style="background-color: #67C23A" @click="changecolor('#67C23A')" circle></el-button></li>
                            <li> <el-button style="background-color: #E6A23C" @click="changecolor('#E6A23C')" circle></el-button></li>
                            <li> <el-button style="background-color: #F56C6C" @click="changecolor('#F56C6C')" circle></el-button></li>
                            <li> <el-button style="background-color: #909399" @click="changecolor('#909399')" circle></el-button></li>
                        </ul>
                    </div>
                    <!-- /btn-group -->
                    <div class="input-group">
                        <el-input v-model="input" placeholder="请输入标题"></el-input>
                        <el-date-picker
                                style="width: 150px"
                                v-model="form.startTime"
                                type="datetime"
                                placeholder="起始时间">
                        </el-date-picker>
                        <el-date-picker
                                style="width: 150px"
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="结束时间">
                        </el-date-picker>
                        <div class="input-group-btn">
                            <el-button id="addbtn" @click="addevent()" type="success">添加</el-button>
                        </div>
                        <!-- /btn-group -->
                    </div>
                    <!-- /input-group -->
                </div>
            </div>
        </div>

        <div id='calendar-container'>
            <div id="calendar">

            </div>
        </div>
        <div id="dialog">
            <el-dialog title="事件编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="事件名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择时间" :label-width="formLabelWidth">
                        <el-date-picker
                                style="width: 150px"
                                v-model="form.startTime"
                                type="datetime"
                                placeholder="起始时间">
                        </el-date-picker>
                        <el-date-picker
                                style="width: 150px"
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button @click="deletEvent()">删除</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import {FullCalendar} from 'vue-full-calendar';
    import 'fullcalendar/dist/fullcalendar.css';
    import {Calendar} from '@fullcalendar/core';
    import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import listPlugin from '@fullcalendar/list';
    import $ from 'jquery'


    export default {
        name: "calendar",
        components: {FullCalendar},
        props: {
            events:{
                default:'',
                type:Array,
            },
        },
            data() {
            return {
                color:'#67C23A',
                input: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                startTime: '',
                endTime: '',
                form: {
                    name: '',
                    startTime: '',
                    endTime: '',
                },
            }
        }, mounted() {
            //初始化日期组件
            this.init();
        },
        methods: {
            //日期组件加载方法
            init() {
                var _this=this;
                var containerEl = document.getElementById('external-events');
                var calendarEl = document.getElementById('calendar');
                var checkbox = document.getElementById('drop-remove');
                // initialize the external events
                // -----------------------------------------------------------------
                new Draggable(containerEl, {
                    itemSelector: '.fc-event',
                    eventData: function (eventEl) {

                        return {
                            title: eventEl.innerText,
                            color:eventEl.style.background,
                            start:_this.startTime,
                            end:_this.endTime,
                        };
                    }
                });
                var calendar =  new Calendar(calendarEl, {
                    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,listWeek,timeGridDay'
                    },
                    buttonText: {
                        prev: '上翻',
                        next: '下翻',
                        prevYear: '去年',
                        nextYear: '明年',
                        today: '今天',
                        month: '月',
                        week: '周',
                        day: '日'
                    },
                    defaultView: 'dayGridMonth',
                    events:this.events,
                    firstDay:1,
                    locale:'zh-cn',
                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar
                    selectable:true,
                    selectHelper:true,
                    minTime:'8:00',
                    maxTime:'20:00',
                    //拖动完成是触发事件
                    eventDrop: function(info) {

                    },
                    //events的点击事件
                    eventClick: function(info) {
                        // alert('Event: ' + info.event.title);
                        // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                        // alert('View: ' + info.view.type);
                        // change the border color just for fun
                        var eventObject=info.event;
                        _this.form.name=eventObject.title;
                        _this.form.startTime=eventObject.startTime;
                        _this.form.endTime=eventObject.endTime;
                        _this.dialogFormVisible = true;
                        console.log(_this.events);

                    },
                    //日期的点击事件
                    dayClick(info) {
                        console.log("update date");
                    },
                    drop: function(info) {
                        // is the "remove after drop" checkbox checked?
                        if (checkbox.checked) {
                            // if so, remove the element from the "Draggable Events" list
                            info.draggedEl.parentNode.removeChild(info.draggedEl);
                        }
                    }
                });
                calendar.render();
            },
            changecolor(val)
            {
                this.color=val;
                var addbtn=document.getElementById('addbtn');
                addbtn.style.background=val;
            },
            //新增事件
            addevent()
            {
                var event=document.createElement('div');
                event.classList.add("fc-event")
                event.style.marginTop='1em';
                event.style.cursor='move';
                event.style.background=this.color;
                event.innerText=this.input;
                var ul=document.getElementById('events');
                ul.prepend(event);
            },
            //删除方法
            deletEvent(eventObject){

            }
        }
    }


</script>

<style scoped>
    @import ' ~@fullcalendar/core/main.css ';
    @import ' ~@fullcalendar/daygrid/main.css ';
    @import ' ~@fullcalendar/timegrid/main.css ';

    html, body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }

    #external-events {
        position: fixed;
        z-index: 2;
        top: 123px;
        left: 20px;
        width: 150px;
        padding: 0 10px;
        border: 1px solid #ccc;
        background: #eee;
    }

    #external-events .fc-event {
        margin: 1em 0;
        cursor: move;
        position: relative;
        display: block;
        font-size: 0.85em;
        line-height: 1.4;
        border-radius: 3px;
        border: 1px solid white;
    }
    .eventfc {
        margin: 1em 0;
        cursor: move;
    }
    #calendar-container {
        position: relative;
        z-index: 1;
        margin-left: 200px;
    }

    #calendar {
        max-width: 900px;
        margin: 20px auto;
    }
    #color-chooser
    {
        list-style:none;
    }
    #color-chooser li{float:left;}


</style>