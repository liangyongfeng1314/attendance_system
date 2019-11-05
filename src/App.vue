<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import storage from './model/storage.js'
import _isMobile from './model/_isMobile.js'
export default {
  data() {
    return {};
  },
  mounted() {
    if (_isMobile.flag()) {
      // ture就是手机端的
      if(!storage.get('currentUser')){ // 用户没有登录，就跳转
        this.$router.push({ path: "/M_Login/M_Student_Login"});
      }else{
        // 不用跳转
      }
    } else {
      // 电脑端
      if(!storage.get('currentUser')){ // 用户没有登录，就跳转
        this.$router.push({ path: "/Pc_login/Pc_student_Login"});
      }else{
        // 不同跳转
      }
    }
  }
};
</script>

<style lang="less">
</style>>

