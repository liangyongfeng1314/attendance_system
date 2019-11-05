<template>
  <div id="m_login">
    <header>
      <span>考勤系统</span>
      <span>
        <v-touch v-on:tap="ejectLogin">更多角色</v-touch>
      </span>
    </header>
    <!-- 登录窗口 -->
    <router-view></router-view>
    <!--多角色登陆窗口-->
    <div class="cover">
      <v-touch class="surplusArea" @tap="cancel()"></v-touch> <!--窗口上面点击也可以隐藏-->
      <div class="login_entry">
        <div class="student_entry" @click="cancel()">
          <router-link to="/M_Login/M_Student_login">学生</router-link>
        </div>
        <div class="teacher_entry" @click="cancel()">
         <router-link to="/M_Login/M_Teacher_login">教师</router-link> 
        </div>
        <div class="tutor_entry" @click="cancel()">
          <router-link to="/M_Login/M_Tutor_login">辅导员</router-link> 
        </div>
        <div class="cancle">
          <v-touch @tap="cancel()">取消</v-touch> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cover: "",
      login_entry: "",
      surplusArea: "",
      routerLinks: ""

    };
  },
  methods: {
    ejectLogin() {
      let cover = document.querySelector(".cover"); // 覆盖层
      let login_entry = document.querySelector(".login_entry"); // 登录窗口
    //   console.log(login_entry);
      if (cover.className.indexOf("bg000") === -1) {
        // 没有这个样式
        // 没有添加这个颜色
        cover.classList.add("bg000");
        login_entry.style.display = "block";
        cover.style.zIndex = 1314;
      } else {
        cover.classList.remove("bg000");
        login_entry.style.display = "none";
        cover.style.zIndex = 0;
      }
      // console.log(cover);
    },
    cancel(){
      if (this.cover.className.indexOf("bg000") != -1) { // 如果已经覆盖，就移除它的样式
        this.cover.classList.remove("bg000");
        this.login_entry.style.display = "none";
        this.cover.style.zIndex = 0;
      }
    }
  },
  mounted() {
    this.cover = document.querySelector(".cover");
    this.login_entry = document.querySelector(".login_entry");
    this.surplusArea = document.querySelector(".surplusArea");
    this.routerLinks = document.querySelectorAll('.login_entry > div');
  }
};
</script>
<style lang="less">
@import url("../assets/less/base.less");
@import url("../assets/less/m_login.less");
</style>
<style lang="less" scoped>
  a{
    color: #000;
  }
</style>