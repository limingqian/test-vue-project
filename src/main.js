import Vue from "vue";
import Antd, { Layout } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;

Vue.use(Antd); // 全局注册所有组件
Vue.use(Layout);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
