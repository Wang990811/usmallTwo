<template>
  <div>
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