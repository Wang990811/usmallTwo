import { reqSpecList, reqSpecTotal } from '../../util/request'
const state = {
    list: [],//管理员列表页初始值
    total: 0,//请求回来的总数
    size: 3,//每页展示的条数
    page: 1,//当前的第几页
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    //获取总数
    changeCount(state, num) {
        state.total = num
    },
    // //修改当前页
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    requestSpecList(context, tag) {
        if (tag=="") {
            //tag为了标识，在商品管理的添加组件中用，商品规格的下拉框需要
            reqSpecList().then(res => {
                var arr = res.data.list
                // console.log(arr)
                arr.forEach(item => {
                    // console.log(JSON.parse(item.attrs))
                    if (item.attrs != '') {
                        item.attrs = JSON.parse(item.attrs)
                    }
                })
                context.commit('changeList', arr)
            })
        } else {
            reqSpecList({
                size: context.state.size,
                page: context.state.page
            }).then(res => {
                var arr = res.data.list
                // console.log(arr)
                arr.forEach(item => {
                    // console.log(JSON.parse(item.attrs))
                    if (item.attrs != '') {
                        item.attrs = JSON.parse(item.attrs)
                    }
                })
                context.commit('changeList', arr)
            })
        }
    },
    //获取总数请求
    requestSpecCount(context) {
        reqSpecTotal().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    //修改当前页码数
    changeCurrentPage(context, page) {
        context.commit('changePage', page)
        context.dispatch('requestSpecList')
    }
}
const getters = {
    list(state) {
        return state.list
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