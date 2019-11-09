import video from '@/views/demo/videoTest'

export default [
    {
        path: 'video/:moduleName',
        name: 'video',
        meta:{
            tabname: "视频测试"
        },
        component: video
    }
]