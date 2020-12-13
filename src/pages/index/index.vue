<template>
  <div>
    <!-- 首页容器 -->
    <el-container>
      <!-- 侧边栏导航菜单 -->
      <el-aside width="160px">
        <el-menu
          default-active="/index/home"
          class="el-menu-vertical-demo"
          router
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in list.menus" :key="item.id">
            <el-submenu :index="item.title" v-if="item.children">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="'/index'+i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
                <!-- <el-menu-item index="/index/role">角色管理</el-menu-item>
                <el-menu-item index="/index/manger">管理员管理</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="'/index' + item.url" v-else>{{item.title}}</el-menu-item>
          </div>
          
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify">商品分类</el-menu-item>
              <el-menu-item index="/index/spec">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="text-align: right; font-size: 12px">
          <span>{{ list.username }}</span>
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item
                ><el-button type="danger" @click="quit">退出</el-button></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 内容区 -->
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <div class="rout"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "user/list",
    }),
  },
  components: {},
  data() {
    return {
      // list:JSON.parse(sessionStorage.getItem('list')),
    };
  },
  methods: {
    ...mapActions({
      requestUserList: "user/requestUserList",
    }),
    quit() {
      this.requestUserList({});
      this.$router.replace("/login");

      // sessionStorage.setItem('list','')
      // sessionStorage.setItem('isLogin','');
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  height: 100vh;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 0;
}
.el-menu[data-v-1badc801] {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
  border: none;
}
.rout {
  margin-top: 15px;
}
</style>
