import Vue from "vue"
import Vuex from "vuex"
import worktab from "./worktab"
import codeTable from "./codeTable"
import organizationLife from './organizationLife'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        screenWidth: document.documentElement.clientWidth, //屏幕宽度
        screenHeight: document.documentElement.clientHeight, //屏幕高度
        contentHeight:0,
        currentMenu: "", //当前功能名称
        leftFold: false, //左侧组织树是否折叠
        leftHide: true,  //左侧组织树是否隐藏
        orgId: "", //当前组织机构代码
        tableState: {}, //表状态
        routeMap: {}
    },
    mutations: {
        contentHeight(state,height){
            state.contentHeight = height
        },
        toggleLeft(state) {
            state.leftFold = !state.leftFold
        },
        routePage(state, to) {
            if (!state.routeMap[to.name]) {
                state.routeMap[to.name] = to
            } else if (to.params) {
                if (!state.routeMap[to.name].params) {
                    state.routeMap[to.name].params = {}
                }
                if (to.params.showTree && !state.routeMap[to.name].params.showTree) {
                    state.routeMap[to.name].params.showTree = to.params.showTree

                }
                if (to.params.moduleName && !state.routeMap[to.name].params.moduleName) {
                    state.routeMap[to.name].params.moduleName = to.params.moduleName
                }
            }
        },
        closePage(state, name) {
            delete state.routeMap[name]
        }
    },
    actions: {
        contentHeight({commit,height}){
            commit("contentHeight",height)
        },
        toggleLeft({commit}) {
            commit("toggleLeft")
        },
        routePage({commit}, to) {
            commit("routePage", to)
        },
        closePage({commit}, name) {
            commit("closePage", name)
        }
    },
    modules: {
        worktab,
        organizationLife,
        codeTable
    }
})