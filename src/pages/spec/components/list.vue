<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性"> 
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :current-page="page"
        :total="total"
        @current-change="ChangeCurrentPage($event)"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { reqSpecDel } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total:"spec/total",
      page: "spec/page",
      size: "spec/size"
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //   点击编辑，通知父元素出弹框
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      requestSpecList: "spec/requestSpecList",
      requestSpecCount:'spec/requestSpecCount',
      changeCurrentPage:'spec/changeCurrentPage'
    }),
    // 获取当前页的变化
    ChangeCurrentPage(e) {
      // 获取当前页的变化
      this.changeCurrentPage(e)
    },
    // 删除
    del(id) {
        reqSpecDel({id: id}).then(res =>{
            alert("删除成功");
            this.requestSpecList();
            //重新获取总数
            this.requestSpecCount();
            //强制回到第一页，否则等当前页数据没有时，不会自动返回到第一页，只会显示暂无数据
            this.changeCurrentPage(1);
        })
    }
  },
  mounted() {
    //管理员列表请求
    this.requestSpecList();
    //总数请求
    this.requestSpecCount();
  },
};
</script>
<style scoped>
.list {
  margin-top: 15px;
}
.list .paging {
  float: right;
  margin-top: 10px;
}
</style>