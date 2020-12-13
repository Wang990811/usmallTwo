<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //   编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      reqSeckillDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestSeckillList();
      });
    },
    ...mapActions({
      requestSeckillList: "seckill/requestSeckillList",
    }),
  },
  mounted() {
    this.requestSeckillList();
  },
};
</script>
<style scoped>
.list {
  margin-top: 15px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>