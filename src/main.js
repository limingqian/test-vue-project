import Vue from "vue";
import VueI18n from "vue-i18n";
import Antd, { Layout, Icon } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
import Authority from "./components/Authority";
import Auth from "./direct/auth";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";
import cascaderMulti from "cascader-multi"; // iview 级联选择
import Element from "element-ui";
// import JsonEditor from 'vue-json-edit'

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(Antd); // 全局注册所有组件
Vue.use(Layout);
Vue.use(Icon);
// Vue.use(elCascader);

Vue.component("Authorized", Authority);
Vue.use(Auth);
Vue.use(VueI18n);
Vue.use(cascaderMulti);
// Vue.use(JsonEditor);

// Vue.prototype.$jsoneditor = jsoneditor;

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: {
      message: zhCN
    },
    enUS: {
      message: enUS
    }
  }
});

const testIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1964392_ukhmrj8i15h.js" // 在 iconfont.cn 上生成
});

Vue.component("testIcon", testIcon);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
