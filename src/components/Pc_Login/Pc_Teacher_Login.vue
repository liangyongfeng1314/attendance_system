<template>
  <div class="login-items">
      <div class="title">教师</div>
    <label>
      <span>工号</span>:
      <input type="text" v-model="student_id" placeholder="工号" autocomplete />
    </label>
    <label>
      <span>姓名</span>:
      <input type="text" v-model="student_name" placeholder="姓名" />
    </label>
    <button v-on:click="login()">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less">

</style>