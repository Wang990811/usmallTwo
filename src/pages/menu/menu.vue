<template>
  <div class="menu">
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
        title:'菜单添加',
        isAdd:true,
      },
    };
  },
  methods: {
    // 点击添加按钮，出现弹框
    add() {
      this.info.isShow = !this.info.isShow;
      // 修改后清空样式
      this.$refs.one.empty();
      this.info.title='菜单添加';
      this.info.isAdd = true;

    },
    // 点击编辑出弹框
    edit(e) {
      // console.log(e);
      this.info = {
        isShow: true,
        title:'菜单修改',
        isAdd:false,
      },
      // console.log(this.$refs);
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>