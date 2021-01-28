<template>
  <div>
    <div class="input-group">
      <div class="label">欢迎使用lmq做的系统</div>
      <div class="input-item">
        <a-input v-model="username" placeholder="请输入用户名" />
      </div>
      <div class="input-item">
        <a-input v-model="pwd" placeholder="请输入密码" />
      </div>
      <div class="input-item button">
        <a-button type="primary" @click="login" block> 登录 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "./../../utils/storage";
import { login } from "../../api/user";
export default {
  data() {
    return {
      username: "",
      pwd: ""
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.pwd) {
        this.$notification.open({
          message: "请填写完整",
          description: "用户名和密码都要有"
        });
        return null;
      }

      // 请求后台
      const response = await login({ username: this.username, pwd: this.pwd });
      // let response = {
      //   data: "admin"
      // };
      // 返回权限列表
      let auth = response.data;
      if (auth === "error") {
        this.$notification.open({
          message: "用户名或密码错误",
          description: "再仔细想想"
        });
        this.username = "";
        this.pwd = "";
      } else {
        storage.set("auth", auth);
        this.$router.push("/dashboard/analysis");
      }
    }
  }
};
</script>
<style scoped>
.input-group {
  position: absolute;
  top: 26%;
  left: 62%;
  width: 30%;
  /* border: 1px solid #ebedf0; */
  padding: 40px 30px;
  color: rgba(0, 0, 0, 0.65);
}

.input-item {
  margin: 12px;
}

.button {
  margin-top: 20px;
  margin-bottom: 5px;
}

.label {
  text-align: center;
  color: white;
  font-size: 24px;
}
</style>
