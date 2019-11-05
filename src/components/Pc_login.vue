<template name="component-name">
  <div id="login">
    <div class="login-box">
      <div class="login-header">
        <ul>
          <li><router-link to="/Pc_login/Pc_student_Login">学生</router-link></li>
          <li> <router-link to="/Pc_login/Pc_Teacher_Login">教师</router-link></li>
          <li> <router-link to="/Pc_login/Pc_Tutor_Login">辅导员</router-link></li>
        </ul>
      </div>
        <router-view></router-view>
    </div>
    <img src="../assets/images/pc_login_bg.jpg" alt="pc_login_bg" />
  </div>
</template>
<style lang="less">
@import url("../assets/less/base.less");
@import url("../assets/less/pc_login.less");
</style>