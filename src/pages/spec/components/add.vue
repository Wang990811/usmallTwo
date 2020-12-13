<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, index) in arrAttr"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="addAttr" v-if="index == 0"
                >新增规格属性</el-button
              >
              <el-button type="danger" @click="delAttr(index)" v-else
                >删除</el-button
              >
            </el-col>
          </el-row>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecAdd, reqSpecOne, reqSpecEdit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      arrAttr: [{ value: "" }],
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestSpecList: "spec/requestSpecList",
      requestSpecCount: "spec/requestSpecCount",
    }),
    // 清空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [{ value: "" }];
    },
    //隐藏
    hide() {
      this.info.isShow = false;
    },
    //新增规格属性
    addAttr() {
      this.arrAttr.push({ value: "" });
    },
    // 删除规格属性
    delAttr(index) {
      this.arrAttr.splice(index, 1);
    },
    // 添加
    add() {
      this.form.attrs = JSON.stringify(
        this.arrAttr.map((item) => {
          return item.value;
        })
      );
      //console.log(this.arrAttr.map(item =>{return item.value}),JSON.stringify(this.arrAttr.map(item =>{return item.value})));第一个是数组，而后台要字符串数组，所以通过JSON.stringify转换
      reqSpecAdd(this.form).then((res) => {
        this.hide();
        this.requestSpecCount();
        this.requestSpecList();
      });
    },
    // 查看一条数据
    look(id) {
      reqSpecOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.arrAttr = JSON.parse(res.data.list[0].attrs).map((item) => {
          return { value: item };
        });
        // console.log(JSON.parse(res.data.list[0].attrs))
        // console.log(JSON.parse(res.data.list[0].attrs).map(item =>{return {value:item}}));
        this.form.id = id;
      });
    },
    // 修改
    update() {
      this.form.attrs = JSON.stringify(
        this.arrAttr.map((item) => {
          return item.value;
        })
      );
      reqSpecEdit(this.form).then((res) => {
        this.hide();
        this.requestSpecList();
      });
    },
  },
  mounted() {
    this.requestSpecList();
  },
};
</script>
<style scoped>
</style>