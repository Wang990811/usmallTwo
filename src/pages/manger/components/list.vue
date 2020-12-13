<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
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
import { reqMangerDel } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "manger/list",
      total:"manger/total",
      page: "manger/page",
      size: "manger/size"
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
      requestMangerList: "manger/requestMangerList",
      requestMangerCount:'manger/requestMangerCount',
      changeCurrentPage:'manger/changeCurrentPage'
    }),
    // 获取当前页的变化
    ChangeCurrentPage(e) {
      // 获取当前页的变化
      this.changeCurrentPage(e)
    },
    // 删除
    del(uid) {
        reqMangerDel({uid: uid}).then(res =>{
            alert("删除成功");
            this.requestMangerList();
            //重新获取总数
            this.requestMangerCount();
            //强制回到第一页，否则等当前页数据没有时，不会自动返回到第一页，只会显示暂无数据
            this.changeCurrentPage(1);
        })
    }
  },
  mounted() {
    //管理员列表请求
    this.requestMangerList();
    //总数请求
    this.requestMangerCount();
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