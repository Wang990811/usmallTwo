<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机尾号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //   点击编辑，通知父元素出弹框
    edit(uid) {
      this.$emit("edit", uid);
    },
    ...mapActions({
      requestVipList: "vip/requestVipList",
    }),
  },
  mounted() {
    //管理员列表请求
    this.requestVipList();
  },
};
</script>
<style scoped>
.list {
  margin-top: 15px;
}
</style>