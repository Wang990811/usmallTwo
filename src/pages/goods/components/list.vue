<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="110">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="110">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="110">
      </el-table-column>
      <el-table-column label="图片" width="150">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" class="aImg" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="130">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
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
    <!-- 分页部分 -->
    <div class="paging">
      <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="size" :total="total" @current-change="changeCurrentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total:'goods/total',
      page: "goods/page",
      size: "goods/size"
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestGoodsList: "goods/requestGoodsList",
      requestGoodsTotal:'goods/requestGoodsTotal',
      requestGoodsPage:'goods/requestGoodsPage',
    }),
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      reqGoodsDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestGoodsList();
        this.requestGoodsTotal();
        this.requestGoodsPage(1);
      });
    },
    // 获取当前页
    changeCurrentPage(e){
        // console.log(e)
        this.requestGoodsPage(e)
    }
  },
  mounted() {
    this.requestGoodsList();
    this.requestGoodsTotal();
  },
};
</script>
<style scoped>
.list {
  margin-top: 15px;
}
.aImg {
  width: 100px;
  height: 100px;
}
.list .paging {
  float: right;
  margin-top: 10px;
}
</style>