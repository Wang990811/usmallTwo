<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机尾号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p v-show="form.password == ''">密码不能为空</p>
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
import { mapGetters, mapActions } from "vuex";
import { reqVipListOne, reqVipEdit } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
        goodsList:'vip/list'
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestVipList:'vip/requestVipList'
    }),
    // 清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //隐藏
    hide() {
      this.info.isShow = false;
    },
    // 添加
    add() {},
    // 查看一条数据
    look(uid) {
      reqVipListOne({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.uid = uid;
        this.form.password = "";
      });
    },
    // 修改
    update() {
      reqVipEdit(this.form).then(res => {
        this.requestVipList();
        this.hide();
      })
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
