import Vue from 'vue'
import 'babel-polyfill'

import $ from 'jquery'

import '@/lib/common.js'
import '@/api/allApi.js'
import '@/lib/util.js'
import '../public/mockData/mock'

// 引入路由拦截器和请求拦截器
import router from './router/router'
import "./router/filter"
import "./axios/filter"
import store from "./store/store"

// import Mock from "../public/mockData/mock"


import App from './App.vue'
import ElementUI from 'element-ui'
//样式
import '@/assets/common/css/index.css'
import '@/assets/common/css/reset.css'
import "@/assets/fonts/iconfont.css"; //字体图标

import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

import ScreenFilter from "./components/grid/ScreenFilter"
import VueQuillEditor from 'vue-quill-editor'
// use全局注册一个组件或者插件的方法。
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false;


Vue.component('screenFilter', ScreenFilter)

//全局混入组件内路由守卫，实现onPageActive()
const mixins = {
    beforeRouteEnter(to, from, next) {
        next(vm => {
                    if(vm.orgId){
                if(vm.orgId != vm.$store.state.orgId){
                    vm.orgId = vm.$store.state.orgId
                }
            }
            if(vm.onPageActive){
                vm.onPageActive()
            }
        })
    }
}
Vue.mixin(mixins)



//基础
//import LiftCycle from "./views/demo1/vueBase/LiftCycle"
//  import CS from "./views/demo1/vueBase/ClassStyle"
//  import TG from "./views/demo1/vueBase/TemplateGrammer"
// import CW from "./views/demo1/vueBase/ComputedWatch"
// import Drawing from "./views/demo1/vueBase/Drawing"
//  import Handle from "./views/demo1/vueBase/Handle"
//  import FormInput from "./views/demo1/vueBase/FormInput"
//  import FormInstance from "./views/demo1/vueBase/FormInstance"
//组件
import VComponent from "./views/demo1/vueComponent/VComponent"
//props: 组件传参，slot插槽  自定义事件：父子组件的通信方式
import ToList from "./views/demo1/TodoList"
// //动画
 import VAnimation from "./views/demo1/vueAnimation/VAnimation"
// import VAnimationJs from "./views/demo1/vueAnimation/VAnimationJs"
// import VAnimationMuliCom from "./views/demo1/vueAnimation/VAnimationMuliCom"


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
