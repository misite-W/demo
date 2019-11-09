import MainPage from "../../views/demo/MainPage"
import NewPage from "../../views/demo/NewPage"

export default [
    {
        name: "mainPage",
        path: "mainPage",
        component: MainPage,
        meta: {
            tabname: "工作台"
        }
    },
    {
        name: "NewPage",
        path: "NewPage/:moduleName",
        component: NewPage,
        meta: {
            tabname: "新页面"
        }
    }
]