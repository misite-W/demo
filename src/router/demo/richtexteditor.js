import richTextEditorPage from '@/views/demo/editor'

export default [
    {
        path: 'richTextEditor/:moduleName',
        name: 'richTextEditor',
        meta:{
            tabname: "富文本编辑器"
        },
        component: richTextEditorPage
    }
]