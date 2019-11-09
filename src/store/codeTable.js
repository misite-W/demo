//码表
const state = {
    codeTable: {}
}
const mutations = {

}
const actions = {

}

const getters = {
    getCodeTableByKey: (state, getters)=>(param) => {
        const promise = new Promise((resolve,reject)=>{
            if(state.codeTable[param.key]){
                resolve(state.codeTable[param.key])
            }else{
                param._that.$$request({url:param.url,data:{tableName: param.key}}
                ).then((res)=>{
                    Object.assign(state.codeTable,res.info)
                    resolve(state.codeTable[param.key])
                }).catch((error)=>{
                    reject(error)
                })
            }
        })
        return promise
    }
}
export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}