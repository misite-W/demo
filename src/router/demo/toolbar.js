import toolbarPage from '@/views/demo/toolbarPage'

export default [
    {
        path: 'toolbar/:moduleName',
        name: 'toolbarPage',
        meta:{
            tabname: "工具栏"
        },
        component: toolbarPage
    }
]