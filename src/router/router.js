import Vue from "vue"
import VueRouter from "vue-router"
import table from "./demo/table"
import mychart from "./demo/mychart"
import treeSelect from "./demo/treeSelect"
import djmap from "./demo/djmap"
import worktab from "./demo/worktab"
import grid from "./demo/grid"
import toolbar from "./demo/toolbar"
import copper from "./demo/copper"
import calendar from "./demo/calendar"
import richtexteditor from "./demo/richtexteditor"
import examplecomment from "./demo/examplecomment"
import mock from "./demo/mockexample"
// import upload from "./demo/upload"
import upload from "./demo/upload"
import video from "./demo/video"
import mainPage1 from '@/views/mainPage'
import page1 from "@/views/demo/page/page1"
import page2 from "@/views/demo/page/page2"
import page3 from "@/views/demo/page/page3"
import test from "@/views/test/test"
import test1 from "@/views/test/test1"
import test2 from "@/views/test/test2"

Vue.use(VueRouter)

const router = new VueRouter({
    base: "/basic-framework",
    //base: __dirname,
    mode:"history",
    routes: [
        {
            path: "/",
            name: "Index",
            component: () => import("../views/index"),
            meta:{
                tabname: "首页"
            },
            children: [
                {
                    path: "test/:moduleName",
                    name: "test",
                    component: test,
                    meta:{
                        tabname: "考试管理"
                    },

                },
                {
                    path:"/test1",
                    component:test1,

                },
                {
                    path:"/test2",
                    component:test2,
                }

            ].concat(table).concat(mychart).
                    concat(worktab).concat(treeSelect).concat(djmap).
                    concat(grid).concat(toolbar).
                    concat(richtexteditor).concat(examplecomment).concat(copper).concat(calendar).concat(mock).concat(upload).concat(video)
            //redirect: "/index/main",
        },{
            path: "/login",
            name: "login",
            component: () => import("@/components/example/Login")
            //component: () => import("@/views/login")
        },{
            path: "/mainPage1",
            name: "mainPage1",
            component: mainPage1,
            children: [
                {
                    name: "page1",
                    path: "page1",
                    component: page1,
                },
                {
                    name: "page2",
                    path: "page2",
                    component: page2,
                },
                {
                    name: "page3",
                    path: "page3",
                    component: page3,
                }
            ]
        }

    ]
})

export default router
