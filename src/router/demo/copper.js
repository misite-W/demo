import copperPage from '@/views/demo/copperPage'

export default [
    {
        path: 'copperPage/:moduleName',
        name: 'copperPage',
        meta:{
            tabname: "图片剪辑"
        },
        component: copperPage
    }
]