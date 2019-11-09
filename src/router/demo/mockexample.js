import showMockData from '@/views/demo/mockExample/show'

export default [
    {
        path: 'show/:moduleName',
        name: 'show',
        meta:{
            tabname: "Mock数据"
        },
        component: showMockData
    }
]