import Axios from "axios";
import storage from "../../model/storage.js";
import vueEvent from "../../model/vueEvent.js";
import _isMoblile from "../../model/_isMobile.js";
let student_login = {
  data() {
    return {
      student_id: "",
      student_name: "",
      buttomLogin: "",
      apis: {
        loginApi: "/attendance_system/tp/Index.php/Home/Login/index"
      }
    };
  },
  methods: {
    login() {
      if (this.student_id.length != 0 && this.student_name.length != 0) {
        let params = new URLSearchParams();
        // 去除输入的空格
        params.append("student_id", this.student_id.replace(/\s*/g, ""));
        params.append("student_name", this.student_name.replace(/\s*/g, ""));
        Axios.post(this.apis.loginApi, params).then(response => {
          if (response.data.isLogin == true) {
            // 首先删除前面用户登录的记录, 如果有
            if (storage.get("currentUser")) {
              storage.clear();
            }
            // 用于第一种情况，没有刷新的时候一直登录
            // 如果请求成功 存入local Storage
            storage.set(response.data.student_id, response.data.isLogin);
            // 用于第二种情况，刷新，保存当前的用户
            storage.set("currentUser", {
              student_id: response.data.student_id,
              isLogin: response.data.isLogin
            });
            storage.set("student_id", response.data.student_id); // 把学号单独存入localStorage
            // 把登录的id传给router.js的导航守卫那里
            vueEvent.$emit("send_studentId", {
              student_id: this.student_id.replace(/\s*/g, "")
            });
            if (_isMoblile.flag()) {
              // 哪个端的就跳哪个端
              this.$router.push({ path: "/M_GoInClass" });
            } else {
              this.$router.push({ path: "/Pc_GoInClass" });
            }
          } else {
            alert("学号或用户名错误!");
          }
        });
      }
    }
  },
  mounted() {
    this.buttomLogin = document.querySelector(".login-items > button");
    // 监视如果学号和姓名都有输入改变按钮的颜色
    setInterval(() => {
      if (this.student_id.length != 0 && this.student_name != 0) {
        this.buttomLogin.style.opacity = 1.0;
      } else {
        this.buttomLogin.style.opacity = 0.5;
      }
    }, 1000);
  }
};
export default student_login;
