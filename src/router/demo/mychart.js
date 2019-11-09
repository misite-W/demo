import mychart from '@/views/demo/mychart.vue'

export default [
    {
        path: 'mychart',//路由地址
        name: 'mychart',//路由名称，可在拦截器中用作判断的条件
        meta: {
            tabname:"chart图展示"
        },
        component: mychart
    }
]
