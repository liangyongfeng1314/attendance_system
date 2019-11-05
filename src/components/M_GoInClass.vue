<template>
  <div id="goInClass">
    <!-- 待删除------------------------------- -->
    <!-- 进入课室界面
    <br />
    <hr />
    今天是:第{{week}}周, {{weekly}}。
    <br />
    <hr />
    <button v-on:click="haveClass()">进入课室</button>
    <br />
    <button @click="test()">测试</button>-->
    <!-- 报道的年级是:{{grade}}
    <br />
    报道的学期是:{{term}}-->
    <!-- ----------------------------------------------------------------- -->
    <div id="doorBox" class="door-box">
      <div class="wall">
        <div class="door-border">
          <div class="door-frame">
            <!-- 门 -->
            <div id="door" class="door">
              <!-- 门后的光线 -->
              <div id="light" class="light" style="opacity: .8;" hidden></div>
              <!-- 门后 -->
              <div class="door-face-0"></div>
              <!-- 三个面 -->
              <div class="door-face-2"></div>
              <div class="door-face-1">
                <!-- 门上的挂牌 -->
                <div class="door-card">课室</div>
                <!-- 进入按钮 -->
                <div class="door-btn">
                  <button id="doorBtnIn" class="door-in">
                    <v-touch @tap="fnOpenDoorAnimation(),haveClass()">进入</v-touch>
                  </button>
                </div>
              </div>
              <div class="door-face-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../assets/js/m_goInClass.js"></script>    
<style lang="less">
@import url("../assets/less/base.less");
@import url("../assets/less/m_goInClass.less");
</style>