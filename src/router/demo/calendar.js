import calendar from '@/views/demo/Calendar'

export default [
    {
        path: 'calendar/:moduleName',
        name: 'calendar',
        meta:{
            tabname: "日历组件"
        },
        component: calendar
    }
]