import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import cate from './modules/cate'
import user from './modules/user'
import spec from './modules/spec'
import goods from './modules/goods'
import vip from './modules/vip'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        cate,
        user,
        spec,
        goods,
        vip,
        banner,
        seckill,
    }
})