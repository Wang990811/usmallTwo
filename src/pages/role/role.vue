<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>

    <!-- 添加 -->
    <v-add :info="info" ref="one"></v-add>

    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "角色添加",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.isShow = !this.info.isShow;
      this.info.title = "角色添加";
      this.info.isAdd = true;
      // 清空
      this.$refs.one.empty();
    },
    //   子组件点击编辑，父组件出弹框
    edit(e) {
      // console.log(e,this.$refs.one);
      this.info = {
        isShow: true,
        title: "角色修改",
        isAdd: false,
      };
      // 通过refs调用查看一条数据
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>