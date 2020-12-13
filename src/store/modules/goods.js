import { reqGoodsList, reqGoodsTotal } from '../../util/request'
const state = {
    list: [],//商品管理的列表初始值
    total: 0,//请求回来的总数
    page: 1,//每页显示的页数
    size: 3,//每页显示的条数

}
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    //获取总数
    changeTotal(state, num) {
        state.total = num;
    },
    // 获取当前页数
    changePage(state, page) {
        state.page = page;
    }
}
const actions = {
    requestGoodsList(context, str) {
        if (str == '') {
            reqGoodsList().then(res => {
                context.commit('changeList', res.data.list);
            })
        } else {
            reqGoodsList({
                size: context.state.size,
                page: context.state.page
            }).then(res => {
                context.commit('changeList', res.data.list);
            })
        }
    },
    // 获取请求的总数
    requestGoodsTotal(context) {
        reqGoodsTotal().then(res => {
            context.commit('changeTotal', res.data.list[0].total);
        })
    },
    // 获取当前页数
    requestGoodsPage(context, page) {
        context.commit('changePage', page);
        context.dispatch('requestGoodsList');
    }

}
const getters = {
    list(state) {
        return state.list;
    },
    total(state) {
        return state.total
    },
    page(state) {
        return state.page
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}