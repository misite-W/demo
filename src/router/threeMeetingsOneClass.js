import listPage from '@/views/threeMeetingsOneClass/list'
import addMeetingPage from '@/views/threeMeetingsOneClass/addMeeting'
export default [
    {
        path: 'threeMeetingsOneClass/:moduleName/:meetingId/participants',
        name: 'participants',
        meta:{
            tabname: "会议人员"
        },
        component: () => import("@/views/threeMeetingsOneClass/participants")

    },
    {
        path: 'threeMeetingsOneClass/:moduleName/:meetingId/meetingLeaveList',
        name: 'meetingLeaveList',
        meta:{
            tabname: "会议请假审批"
        },
        component: () => import("@/views/threeMeetingsOneClass/meetingLeaveList")

    },
    {
        path: 'threeMeetingsOneClass/threeMeetingsOneClassList/:meetingId?',
        name: 'threeMeetingsOneClassList',
        meta:{
            tabname: "三会一课管理"
        },
        component: listPage

    },
    {
        path: 'threeMeetingsOneClass/:moduleName/:meetingId/AddMeeting',
        name: 'AddMeeting',
        meta:{
            tabname: "新增会议"
        },
        component: addMeetingPage

    },
/*    {
        path: 'threeMeetingsOneClass/:moduleName/:meetingId/MeetingInfo',
        name: 'MeetingInfo',
        meta:{
            tabname: "会议详情"
        },
        component: ()=> import('@/views/threeMeetingsOneClass/meetingInfo')

    },*/
    {
        path: 'threeMeetingsOneClass/:moduleName/:meetingId/WriteMeetingMinutes',
        name: 'WriteMeetingMinutes',
        meta:{
            tabname: "撰写会议纪要"
        },
        component: ()=> import('@/views/threeMeetingsOneClass/writeMeetingMinutes')

    },
    {
        path: 'threeMeetingsOneClass/leaveManagement',
        name: 'threeMeetingsOneClassLeaveManagement',
        meta:{
            tabname: "三会一课请假管理"
        },
        component: resolve => require(['@/views/threeMeetingsOneClass/leaveManagement/LeaveManagement'], resolve)

    },
]
