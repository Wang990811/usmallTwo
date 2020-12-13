<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleAdd, reqRoleListOne, reqRoleEdit } from "../../../util/request";
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
        rolename: "",
        menus: [],
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    // 清空
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      // 问题：使用element-ui 的tree插件，表格数据点"Edit"给tree回填数据的时候,第一次报 TypeError: Cannot read property setCheckedKeys' of undefined，但是第二次就不报了。 
      //方法：将那一句放到这个回调函数中Vue.nextTick()
      this.$nextTick(() => {
        this.form.menus = this.$refs.tree.setCheckedKeys([]);
      });
    },
    //   隐藏
    hide() {
      this.info.isShow = false;
    },
    // 点击添加，添加数据
    add() {
      // 因为menus是数组，而后台需要的是字符串数组，所以在获取到值后转为字符串
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {});
      this.hide();
      //   自动刷新
      this.requestRoleList();
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    // 查看一条数据
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        //因为拿到的数据是字符串，而页面渲染需要的是数组，所以使用JSON.parse来转
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form = res.data.list;
        this.form.id = id;
        // console.log(this.form.menus);
        //   console.log(res.data.list.menus,JSON.parse(res.data.list.menus),this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus)))
      });
    },
    // 修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        //   自动刷新
        this.requestRoleList();
      });
      this.hide();
    },
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>
<style scoped>
</style>