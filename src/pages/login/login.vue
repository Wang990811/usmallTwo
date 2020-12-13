<template>
  <div class="login">
    <div class="loginWrap">
      <h3>登录</h3>
      <div>
        <input type="text" v-model="user.username" placeholder="请输入用户名" />
      </div>
      <div>
        <input type="password" v-model="user.password" placeholder="请输入密码" />
      </div>
      <div class="btn"><input type="submit" value="登录" @click="login" /></div>
    </div>
  </div>
</template>
<script>
import { reqMangerLogin } from "../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      requestUserList: "user/requestUserList",
    }),
    login() {
      reqMangerLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          this.requestUserList(res.data.list);
          // sessionStorage.setItem('list',JSON.stringify(res.data.list));
          // sessionStorage.setItem('isLogin',true)
          this.$router.push("/index/home");
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d5f);
}
.loginWrap {
  width: 500px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.loginWrap h3 {
  text-align: center;
  margin-top: 36px;
}
.loginWrap div {
  text-align: center;
}
.loginWrap input {
  width: 318px;
  height: 38px;
  outline: none;
  border: 1px solid #dcdfe6;
  margin-top: 23px;
}
.loginWrap .btn input {
  background: #409eff;
  color: #fff;
  border: 1px solid #409eff;
}
</style>