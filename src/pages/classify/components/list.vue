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
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.pid==0?null:$preImg + scope.row.img"
            alt=""
            :class="scope.row.pid==0?'':'img'"
            v-if="scope.row.img"
          />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
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
import { reqCateDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
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
      reqCateDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestCateList();
      });
    },
    ...mapActions({
      requestCateList: "cate/requestCateList",
    }),
  },
  mounted() {
    this.requestCateList();
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