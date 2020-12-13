<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option  label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="设置" value="el-icon-s-promotion">
              <i class="el-icon-s-tools"></i>
            </el-option>
            <el-option label="用户" value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="云朵" value="el-icon-upload">
              <i class="el-icon-upload"></i>
            </el-option>
            <el-option label="相机" value="el-icon-video-camera-solid">
              <i class="el-icon-video-camera-solid"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in twoRouter"
              :key="item.path"
              :label="'/' + item.path"
              :value="'/' + item.path"
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { twoRouter } from "../../../router/index";
import { reqMenuAdd, reqMenuListOne ,reqMenuEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        type: 1,
        icon: "",
        url: "",
        pid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      twoRouter,
    };
  },
  methods: {
    // 重置
    empty() {
      this.form = {
        title: "",
        type: 0,
        icon: "",
        url: "",
        pid: "",
        status: 1,
      };
    },
    //点击添加后弹框隐藏
    hide() {
      this.info.isShow = false;
    },
    // 添加请求
    add() {
      reqMenuAdd(this.form).then((res) => {});
      this.hide();
      this.requestMenuList();
    },
    // 改变pid,将菜单类型的状态改变
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 查看一条数据
    look(id) {
      reqMenuListOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 自动更新
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    // 修改
    update() {
      reqMenuEdit(this.form).then(res => {
        this.requestMenuList();
        this.hide();
      })
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>