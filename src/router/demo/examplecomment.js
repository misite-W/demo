import exampleCommentPage from '@/views/demo/exampleComment'

export default [
    {
        path: 'exampleComment/:moduleName',
        name: 'exampleComment',
        meta:{
            tabname: "评论"
        },
        component: exampleCommentPage
    }
]