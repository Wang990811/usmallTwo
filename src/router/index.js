import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)
// 懒加载
const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const banner = () => import('../pages/banner/banner')
const classify = () => import('../pages/classify/classify')
const goods = () => import('../pages/goods/goods')
const home = () => import('../pages/home/home')
const manger = () => import('../pages/manger/manger')
const menu = () => import('../pages/menu/menu')
const role = () => import('../pages/role/role')
const seckill = () => import('../pages/seckill/seckill')
const spec = () => import('../pages/spec/spec')
const vip = () => import('../pages/vip/vip')

export const twoRouter = [
  {
    path: 'banner',
    component: banner,
    name: '轮播图列表'
  },
  {
    path: 'classify',
    component: classify,
    name: '商品分类列表'
  },
  {
    path: 'goods',
    component: goods,
    name: '商品列表'
  },
  {
    path: 'manger',
    component: manger,
    name: '管理员列表'
  },
  {
    path: 'menu',
    component: menu,
    name: '菜单列表'
  },
  {
    path: 'role',
    component: role,
    name: '角色列表'
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀列表'
  },
  {
    path: 'spec',
    component: spec,
    name: '规格列表'
  },
  {
    path: 'vip',
    component: vip,
    name: '会员列表'
  },
]


const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        ...twoRouter,
        {
          path: 'home',
          component: home,
          // beforeEnter: (to, from, next) => {
          //   if (from.path == '/login' || from.path == '/' || from.path == '/index/menu' && store.state.user.list) {
          //     next();
          //   } else {
          //     next('/login');
          //   }
          // }
        },
        {
          path: '',
          redirect: 'home'
        }
      ]
    },
    // {
    //   path: '/',
    //   component: login
    // },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})

//全局守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
  }

  if (store.state.user.list.menus) {
    next();
  }
  // console.log(store)

  //直接用sessionStorage
  // var isLogin = sessionStorage.getItem('isLogin');
  // if(isLogin){
  //   next();
  // }
})


export default router