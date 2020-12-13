<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="one"></v-add>
    <v-list @edit="edit"></v-list>
    <!-- 管理员列表 -->
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
        title: "用户添加",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.isShow = !this.info.isShow;
      this.info.title = "用户添加";
      this.info.isAdd = true;
      this.$refs.one.empty();
    },
    // 编辑，出弹框
    edit(e) {
    //   console.log(e);
      this.info = {
        isShow: true,
        title: "用户修改",
        isAdd: false,
      };
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>