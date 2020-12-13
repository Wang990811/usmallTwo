import axios from 'axios'
import qs from 'qs'

// 响应拦截
axios.interceptors.response.use(res => {
    console.log(`------------请求的地址：${res.config.url}-------------`);
    console.log(res);
    return res
})

const baseUrl = '/api'
//--------------------------------------菜单管理--------------------------------------//
// 菜单添加
export const reqMenuAdd = (data) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: data
    })
}
// 菜单列表
export const reqMenuList = (params) => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: params
    })
}
// 菜单获取一条数据
export const reqMenuListOne = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
// 菜单修改
export const reqMenuEdit = (data) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: data
    })
}
// 菜单删除
export const reqMenuDel = (data) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: data
    })
}
//--------------------------------------角色管理--------------------------------------//
// 角色添加
export const reqRoleAdd = (data) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: data
    })
}
// 角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get',
    })
}
// 获取角色列表一条数据
export const reqRoleListOne = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: id
    })
}
// 角色修改
export const reqRoleEdit = (data) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: data
    })
}
// 角色删除
export const reqRoleDel = (data) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: data
    })
}
//--------------------------------------管理员管理--------------------------------------//
// 管理员添加
export const reqMangerAdd = (data) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: data
    })
}
// 管理员总数（用于计算分页）
export const reqMangerTotal = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get',
    })
}
// 管理员列表（分页）
export const reqMangerList = (params) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: params
    })
}
//管理员获取（一条）数据
export const reqMangerOne = (params) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        method: 'get',
        params: params
    })
}
//管理员修改
export const reqMangerEdit = (data) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: data
    })
}
//管理员删除
export const reqMangerDel = (data) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: data
    })
}
//管理员登录
export const reqMangerLogin = (data) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: data
    })
}
//--------------------------------------商品分类管理--------------------------------------//
//商品分类添加
export const reqCateAdd = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for (var key in data) {
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: form
    })
}
//商品分类列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params: params
    })
}
//商品分类查看一条数据
export const reqCateOne = (params) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: params
    })
}
//商品分类修改
export const reqCateEdit = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for (var key in data) {
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: form
    })
}
//商品分类删除
export const reqCateDel = (data) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: data
    })
}
//--------------------------------------商品规格管理--------------------------------------//
// 商品规格添加
export const reqSpecAdd = (data) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: data
    })
}
// 商品规格总数（用于计算分页）
export const reqSpecTotal = () => {
    return axios({
        url: baseUrl + '/api/specscount',
        method: 'get',
    })
}
// 商品规格列表（分页）
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params: params
    })
}
//商品规格获取（一条）数据
export const reqSpecOne = (params) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params: params
    })
}
//商品规格修改
export const reqSpecEdit = (data) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: data
    })
}
//商品规格删除
export const reqSpecDel = (data) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: data
    })
}
//--------------------------------------商品管理--------------------------------------//
//商品添加
export const reqGoodsAdd = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for(var key in data){
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: form
    })
}
//商品总数（用于计算分页）
export const reqGoodsTotal = () => {
    return axios({
        url:baseUrl + '/api/goodscount',
        method: 'get'
    })
}
//商品列表（分页）
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        method: 'get',
        params: params
    })
}
//商品查看一条数据
export const reqGoodsOne = (params) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        method: 'get',
        params: params
    })
}
//商品修改
export const reqGoodsEdit = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for(var key in data){
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data: form
    })
}
//商品删除
export const reqGoodsDel = (data) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data: data
    })
}

//--------------------------------------会员管理--------------------------------------//
// 会员列表
export const reqVipList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get',
    })
}
// 会员获取一条数据
export const reqVipListOne = (params) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: params
    })
}
// 会员修改
export const reqVipEdit = (data) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: data
    })
}
//--------------------------------------轮播图管理--------------------------------------//
//轮播图添加
export const reqBannerAdd = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for (var key in data) {
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: form
    })
}
//轮播图列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + '/api/bannerlist',
        method: 'get',
    })
}
//轮播图查看一条数据
export const reqBannerOne = (params) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        method: 'get',
        params: params
    })
}
//轮播图修改
export const reqBannerEdit = (data) => {
    //处理有文件的格式，eg(file,img)
    var form = new FormData();
    for (var key in data) {
        form.append(key, data[key])
    }
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: form
    })
}
//轮播图删除
export const reqBannerDel = (data) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: data
    })
}
//--------------------------------------限时秒杀管理--------------------------------------//
//限时秒杀添加
export const reqSeckillAdd = (data) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: data
    })
}
//限时秒杀列表
export const reqSeckillList = () => {
    return axios({
        url: baseUrl + '/api/secklist',
        method: 'get',
    })
}
//限时秒杀查看一条数据
export const reqSeckillOne = (params) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        method: 'get',
        params: params
    })
}
//限时秒杀修改
export const reqSeckillEdit = (data) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: data
    })
}
//限时秒杀删除
export const reqSeckillDel = (data) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: data
    })
}