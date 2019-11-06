<template>
  <div id="Report">
    <!-- <hr /> -->
    <!-- <br /> -->
    <!-- <button v-on:click="report()">点我。。。。报道。。。</button>
    <br />
    <hr />
    <br />
    时间为: {{report_time}}
    <br />
    考勤情况: {{node_status}}
    <br />
    您报道的节数为: {{what}}
    <br />
    {{term}}
    <br />
    {{getSeatTotal()}}
    <button @click="getSeatTotal()">获取座位总数</button>-->
    <!-- <ul>
      <li :key="key" v-for="(item,key) in this.seats">{{item}}</li>
    </ul> -->
    <ul>
      <v-touch :key="key" v-for="(item,key) in this.seats">
          <li>{{item}}</li>
     </v-touch> 
    </ul>
    <!-- <div class="certify"> 
        ---------------------------------------------------------------------------------
        使用到的事件句柄 choseSeatLater(用户选择完需要做的事情的事件)
        使用到的变量: choseSeat(用户选择的座位) report_result（报道结果显示区域）
        --------------------------------------------------------------------------------------
      <button @click="choseSeatLater()">确认签到</button>
    </div>
    <div class="showArea"> -->
      <!-- 用户操作之后的展示区-->
      <!-- <p>您选择的座位为: {{choseSeat}}</p> -->
      <!-- 报道结果展示区 -->
      <!-- <div class="report_result">
        <div class="result">
          <p>您的报道结果是:</p>
          <div class="seat_reuslt">
            <p>{{report_result}}</p>
          </div>
        </div>
      </div> -->
    <!-- </div> -->
  </div>
</template>
<script src="../assets/js/pc_report.js"></script>
<style lang="less" scoped>
@import url("../assets/less/base.less");
@import url("../assets/less/m_report.less");
</style>