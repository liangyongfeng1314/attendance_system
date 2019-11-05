import Vue from "vue";
import VueRouter from "vue-router";
import storage from "../model/storage.js";
import vueEvent from "../model/vueEvent.js";
import _isMobile from "../model/_isMobile.js";
Vue.use(VueRouter);

// 创建组件
// 引入Pc端登录入口组件
import Pc_login from "../components/Pc_login.vue";
// 引入Pc端-学生登录界面
import Pc_Student_Login from "../components/Pc_Login/Pc_Student_Login.vue";
// 引入手机端-登录入口文件
import M_Login from "../components/M_Login.vue";
// 引入手机端-学生登录界面
import M_student_Login from "../components/M_Login/M_Student_Login.vue";
// 配置路由规则
const routes = [
  {
    path: "/Pc_login",
    component: Pc_login,
    children: [
      {
        path: "Pc_Student_Login",
        component: Pc_Student_Login
      },
      {
        path: "Pc_Teacher_Login",
        component: () => import("../components/Pc_Login/Pc_Teacher_Login.vue")
      },
      {
        path: "Pc_Tutor_Login",
        component: () => import("../components/Pc_Login/Pc_Tutor_Login.vue")
      }
    ]
  },
  {
    path: "/Pc_GoInClass",
    component: () => import("../components/Pc_GoInClass.vue")
  },
  {
    path: "/M_GoInClass",
    component: () => import("../components/M_GoInClass.vue")
  },
  {
    path: "/Report",
    component: () => import("../components/Report.vue")
  },
  {
    path: "/M_Login",
    component: M_Login,
    children: [
      {
        path: "M_Student_Login",
        component: M_student_Login
      },
      {
        path: "M_Teacher_Login",
        component: () => import("../components/M_Login/M_Teacher_Login.vue")
      },
      {
        path: "M_Tutor_Login",
        component: () => import("../components/M_Login/M_Tutor_Login.vue")
      }
    ]
  }
];

// 创建vue-router实例
const router = new VueRouter({
  routes
});

// 创建登录变量
let login;

// 来个导航守卫
router.beforeEach((to, from, next) => {
  // 没有刷新的时候应用的情况
  vueEvent.$on("send_studentId", function(data) {
    if (data["student_id"]) {
      // 如果可以得到传过来，查询是否登录成功
      login = storage.get(data["student_id"]);
    }
  });
  // 刷新之后读取当前用户是否已经登录
  if (storage.get("currentUser")) {
    login = storage.get("currentUser")["isLogin"];
  }

  if (!login && to.path == "/Pc_GoInClass") {
    // 如果是电脑端进入Pc_GoInClass
    if (_isMobile.flag()) {
      next("/M_Login/M_Student_Login");
    } else {
      next("/Pc_login/Pc_Student_Login");
    }
  } else if (!login && to.path == "/M_GoInClass") {
    //  如果是手机端进入M_GoInClass
    if (_isMobile.flag()) {
      next("/M_Login/M_Student_Login");
    } else {
      next("/Pc_login/Pc_Student_Login");
    }
  } else if (to.path == "/Report" && !login) {
    if (_isMobile.flag()) {
      next("/M_login/M_Student_Login");
    } else {
      next("/Pc_login/Pc_Student_Login");
    }
  } else {
    next();
  }
});

// 把router暴露出去
export default router;
