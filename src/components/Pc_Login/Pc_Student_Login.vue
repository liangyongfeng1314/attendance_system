<template name="component-name">
  <div class="login-items">
    <div class="title">学生</div>
    <label>
      <span>学号</span>:
      <input type="text" v-model="student_id" placeholder="学号" autocomplete />
    </label>
    <label>
      <span>姓名</span>:
      <input type="text" v-model="student_name" placeholder="姓名" />
    </label>
    <button v-on:click="login()">登录</button>
  </div>
</template>
<script src="../../assets/js/pc_student_login.js"></script>

