import Vue from 'vue'
import upload from "./upload"
import getSelect from './getSelect' // 码表
const api = {
    upload,
    getSelect
}
export default api
Vue.prototype.$api = api




