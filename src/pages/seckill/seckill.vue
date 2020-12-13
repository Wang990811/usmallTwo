<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加组件 -->
    <v-add :info='info' ref="one"></v-add>
    <!-- 列表组件 -->
    <v-list @edit='edit'></v-list>
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
            isShow:false,
            title:'活动添加',
            isAdd:true
        }
    };
  },
  methods: {
    //   添加
    add(){
        this.info.isShow = !this.info.isShow;
        this.info.title = "活动添加";
        this.info.isAdd = true;
        this.$refs.one.empty();
    },
    // 编辑，出弹框
    edit(e){
        // console.log(e);
        this.info = {
            isShow:true,
            title:'活动修改',
            isAdd:false
        }
        this.$refs.one.look(e);
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>