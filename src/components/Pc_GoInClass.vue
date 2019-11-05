<template>
  <div id="goInClass">
    <!-- 待删除------------------------------- -->
    <!-- 进入课室界面 -->
    <!-- <br /> -->
    <!-- <hr /> -->
    <!-- 今天是:第{{week}}周, {{weekly}}。 -->
    <!-- <br /> -->
    <!-- <hr /> -->
    <!-- <button v-on:click="haveClass()">进入课室</button> -->
    <!-- <br /> -->
    <!-- <button @click="test()">测试</button> -->
    <!-- 报道的年级是:{{grade}}
    <br />
    报道的学期是:{{term}}-->
    <!-- ----------------------------------------------------------------- -->
    <div class="first-floor floor">
      <div class="second-floor floor">
        <div class="third-floor floor">
          <div class="fourth-floor floor">
            <button v-on:click="haveClass()">进入课室</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../assets/js/pc_goInClass.js"></script>                        
<style lang="less" scoped>
@import url("../assets/less/base.less");
@import url("../assets/less/pc_goInClass.less");
</style>