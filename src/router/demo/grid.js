import listPage from '@/views/demo/list'
import TableBasePage from '@/views/demo/gridTable/TableBase'
import TableCheckboxPage from '@/views/demo/gridTable/TableCheckbox'

export default [
    {
        path: 'list/:moduleName',
        name: 'list',
        meta:{
            tabname: "表格"
        },
        component: listPage
    },
    {
        path: 'TableBase/:moduleName',
        name: 'TableBase',
        meta:{
            tabname: "基础表格"
        },
        component: TableBasePage
    },
    {
        path: 'TableCheckbox/:moduleName',
        name: 'TableCheckbox',
        meta:{
            tabname: "带选择框的表格"
        },
        component: TableCheckboxPage
    }
]