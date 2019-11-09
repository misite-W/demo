import djmap from '@/views/demo/djmap.vue'

export default [
    {
        path: 'djmap/:moduleName',//路由地址
        name: 'djmap',//路由名称，可在拦截器中用作判断的条件
        meta: {
            tabname:"地图定位"
        },
        component: djmap
    }
]