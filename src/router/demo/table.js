import TablePage from '@/views/demo/Table'

export default [
    {
        path: 'TablePage/:userId?',//路由地址
        name: 'TablePage',//路由名称，可在拦截器中用作判断的条件
        params:{
            moduleName: "worktab_1"
        },
        meta:{
            tabname: "图表展示"
        },
        component: TablePage,
        props: true
    }
]