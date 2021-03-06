import {reqCateList} from '../../util/request'
const state = {
    list:[],//商品分类列表的初始值
}
const mutations = {
    changeList(state,arr){
        state.list = arr;
    }
}
const actions = {
    requestCateList(context){
        reqCateList({istree:true}).then(res => {
            context.commit('changeList',res.data.list);
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}