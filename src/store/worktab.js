const state = {
    cacheFirstPage: {}
}
const mutations = {
    cacheFirstPage(state, p) {
        state.cacheFirstPage[p.moduleName] = {
            from: p.from,
            to: p.to
        }
    },
    clearCacheFirstPage(state, p) {
        delete state.cacheFirstPage[p.moduleName]
    }
}
const actions = {
    cacheFirstPage({commit}, p) {
        commit("cacheFirstPage", p)
    },
    clearCacheFirstPage({commit}, p) {
        commit("clearCacheFirstPage", p)
    }
}
export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
}