import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import findLast from "lodash/findLast";
import "nprogress/nprogress.css";
import NotFound from "./../views/others/404"; // 非异步加载
import Forbidden from "./../views/others/403"; // 非异步加载
import { check, isLogin } from "./../utils/auth";
import { notification } from "ant-design-vue";
// import RenderRouterView from "./../components/RenderRouterView";

Vue.use(VueRouter);

const routes = [
  // 用户登录注册
  {
    path: "/user",
    hideInMenu: true,
    // component: RenderRouterView,
    // component: { render: h => h("router-view") },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./../layouts/BasicLayout"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */
                "./../views/Dashboard/Analysis"
              )
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */
                "./../views/Forms/BasicForm"
              )
          },
          {
            path: "/form/step-form",
            hideChildrenMenu: true,
            name: "stepform",
            meta: { title: "分步表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */
                "./../views/Forms/StepForm"
              ),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "./../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "./../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "./../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      },
      // test
      {
        path: "/test",
        name: "test",
        component: { render: h => h("router-view") },
        // meta: { icon: "info", title: "测试", authority: ["admin"] },
        meta: { icon: "info", title: "测试" },
        children: [
          {
            path: "/test/test1",
            name: "test",
            meta: { title: "测试" },
            component: () => import("./../views/Test/test1")
          },
          {
            path: "/test/test2",
            name: "test2",
            meta: { title: "测试2" },
            component: () => import("./../views/Test/test2")
          },
          {
            path: "/test/test3",
            name: "test3",
            meta: { title: "测试3" },
            component: () => import("./../views/Test/test3")
          }
        ]
      },
      // 物品管理
      {
        path: "/good",
        name: "good",
        component: { render: h => h("router-view") },
        meta: { icon: "menu", title: "物品", authority: ["admin"] },
        children: [
          {
            path: "/good/good",
            name: "type",
            meta: { title: "物品管理" },
            component: () => import("./../views/Good/good")
          }
        ]
      },
      // 分类管理
      {
        path: "/setting",
        name: "setting",
        component: { render: h => h("router-view") },
        meta: { icon: "menu", title: "系统设置", authority: ["admin"] },
        children: [
          {
            path: "/setting/type",
            name: "type",
            meta: { title: "分类管理" },
            component: () => import("./../views/Setting/type")
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    // 路由发生变化时,开始进度条
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  // 判断权限
  if (record && !check(record.meta.authority)) {
    console.log("++++++++++");
    console.log(isLogin());
    console.log("++++++++++");

    if (!isLogin() && to.path !== "/user/login") {
      // 必须调用next路由才能往下走
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "无权限"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }

  next();
});

router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});

export default router;
