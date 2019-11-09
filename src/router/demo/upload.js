import uploadDemo from '@/views/demo/uploadDemo'
export default [
    {
        path: "/upload/:moduleName",
        name: "upload",
        meta: {
            tabname: "upload样例"
        },
        component: uploadDemo
    }

]