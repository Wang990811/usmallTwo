<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="changeEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
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
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="--请选择--" @change="changeSpec">
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="--请选择--" multiple>
            <el-option
              v-for="item in secondSpec"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <!-- <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="form.description"
          ></textarea> -->
          <div id="div1" v-if="info.isShow"></div>
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
import { reqGoodsAdd, reqGoodsOne, reqGoodsEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      secondCate: [],
      secondSpec: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      imageUrl: "",
    };
  },
  methods: {
    changeImg(e) {
      console.log(e);
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    ...mapActions({
      requestCateList: "cate/requestCateList",
      requestSpecList: "spec/requestSpecList",
      requestGoodsList: "goods/requestGoodsList",
      requestGoodsTotal: "goods/requestGoodsTotal",
    }),
    //获取二级分类的数组
    changeCate() {
      this.secondCate = this.cateList.find((item) => {
        return this.form.first_cateid == item.id;
      }).children;
    },
    //获取规格属性的数组
    changeSpec() {
      this.form.specsattr = [];
      this.secondSpec = this.specList.find((item) => {
        return this.form.specsid == item.id;
      }).attrs;
    },
    //清空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
    },
    //隐藏
    hide() {
      this.info.isShow = false;
    },

    // 创建富文本编辑器
    changeEditor() {
      this.editor = new E("#div1");
      // 或者 const editor = new E( document.getElementById('div1') )
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //添加
    add() {
      this.form.description = this.editor.txt.html();
      reqGoodsAdd(this.form).then((res) => {
        this.hide();
        this.requestGoodsList();
        this.requestGoodsTotal();
      });
    },
    // 查看一条数据
    look(id) {
      reqGoodsOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.imageUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = res.data.list.specsattr.split(",");
        this.form.id = id;
      });
    },
    // 修改
    update() {
      this.form.description = this.editor.txt.html();
      reqGoodsEdit(this.form).then((res) => {
        this.hide();
        this.requestGoodsList();
      });
    },
  },
  mounted() {
    this.requestCateList();
    //商品规格需要获取商品规格列表中的全部数据
    this.requestSpecList("");
  },
};
</script>
<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
