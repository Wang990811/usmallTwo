<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changeCate"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择分类">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqSeckillAdd, reqSeckillOne, reqSeckillEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      secondCate: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      formLabelWidth: "120px",
    };
  },
  methods: {
    // 获取二级分类
    changeCate() {
      this.secondCate = this.cateList.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
      // console.log(this.secondCate)
    },
    //清空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value=[];
    },
    //   隐藏
    hide() {
      this.info.isShow = false;
    },
    // 添加
    add() {
      const firstTime = new Date(this.value[0]).getTime();
      const secondTime = new Date(this.value[1]).getTime();
      this.form.begintime = firstTime;
      this.form.endtime = secondTime;
      reqSeckillAdd(this.form).then((res) => {
        this.hide();
        this.requestSeckillList();
      });
    },
    // 查看一条数据
    look(id) {
      reqSeckillOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.value = []
        if (this.value.length == 0) {
          this.value.push(new Date(parseInt(res.data.list.begintime)));
          this.value.push(new Date(parseInt(res.data.list.endtime)));
          console.log(new Date(parseInt(res.data.list.begintime)),new Date(parseInt(res.data.list.endtime)))
        }
        this.form.id = id;
      });
    },
    // 修改
    update() {
      const firstTime = new Date(this.value[0]).getTime();
      const secondTime = new Date(this.value[1]).getTime();
      this.form.begintime = firstTime;
      this.form.endtime = secondTime;
      reqSeckillEdit(this.form).then((res) => {
        this.hide();
        this.requestSeckillList();
      });
    },
    ...mapActions({
      requestCateList: "cate/requestCateList",
      requestGoodsList: "goods/requestGoodsList",
      requestSeckillList: "seckill/requestSeckillList",
    }),
  },
  mounted() {
    this.requestCateList();
    this.requestGoodsList("");
  },
};
</script>
<style scope></style>
