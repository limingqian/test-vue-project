import Vue from "vue";
import Antd, { Layout } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
import Authority from "./components/Authority";
import Auth from "./direct/auth";

Vue.config.productionTip = false;

Vue.use(Antd); // 全局注册所有组件
Vue.use(Layout);

Vue.component("Authorized", Authority);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
