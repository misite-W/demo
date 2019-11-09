import router from "./router"
import store from "../store/store"


const worktabFilter = (to, from, next) => {
    //保存路由中的特殊参数（moduleName, showTree），不需要在path中用:params的方式注册，直接添加到params中，单独保存和读取
    store.dispatch("routePage", to)
    let routeItem = store.state.routeMap[to.name]
    let moduleName = routeItem.params.moduleName
    //worktab组件处理
    if (moduleName) {
        if (store.state.worktab[moduleName]) {
            //组件已初始化则正常添加tab标签
            store.dispatch("worktab/" + moduleName + "/worktabRoute", {
                to: {
                    name: to.name ? to.name : "",
                    tabname: (to.meta && to.meta.tabname) ? to.meta.tabname : "",
                    path: to.path,
                    params: to.params
                },
                from: {
                    name: from.name ? from.name : "",
                    tabname: (from.meta && from.meta.tabname) ? from.meta.tabname : "",
                    path: from.path,
                    params: to.params
                }
            })
            //记录当前功能
            store.state.currentMenu = to.name
            //控制左侧树显示
            let showTree = false
            if (routeItem.params && routeItem.params.showTree) {
                showTree = true
            }
            store.state.leftHide = !showTree


            next()
        } else {
            //worktab组件初始化未完成时，先缓存页面信息，等初始化完成后再处理
            // store.dispatch("worktab/cacheFirstPage", {
            //     to: {
            //         name: to.name ? to.name : "",
            //         tabname: (to.meta && to.meta.tabname) ? to.meta.tabname : "",
            //         path: to.path,
            //         params: to.params
            //     },
            //     from: {
            //         name: from.name ? from.name : "",
            //         tabname: (from.meta && from.meta.tabname) ? from.meta.tabname : "",
            //         path: from.path,
            //         params: from.params
            //     },
            //     moduleName: moduleName
            // })
            next({
                path: "/",
                replace: true
            })
        }
    } else {
        next()
    }
}

router.beforeEach((to, from, next) => {
    window.console.log("-------路有拦截器:from -> to--------");
    window.console.log(from);
    window.console.log(to);
    if (to.name == 'login') {
        next()
    } else {
        // worktabFilter(to, from, next)
        if (localStorage.getItem("Authorization")) {
            worktabFilter(to, from, next)
        } else {
            next({
                path: '/login',
                replace: true,
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
})

