import storage from "../../model/storage.js";
import _date from "../../model/_date.js";
import Axios from "axios";
let m_report = {
    data() {
        return {
          hours: "",
          minutes: "",
          secnods: "",
          report_time: "", // 获取报道的时间
          nodeList: [], // 学生要上课的具体节次[从数据库获取]
          classTotal: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], // 课程节次设置
          timeSchedule: {
            // 报道时间表 855 900
            0: ["7:30:00", "8:10:00", "8:55:00", "9:00:00"], // 第一节
            1: ["9:00:00", "9:5:00", "9:50:00", "10:00:00"], // 第二节
            2: ["10:00:00", "10:10:00", "10:55:00", "11:00:00"], // 第三节
            3: ["11:00:00", "11:5:00", "11:50:00", "14:00:00"], // 第四节
            4: ["14:00:00", "14:30:00", "15:15:00", "15:20:00"], // 第五节
            5: ["15:20:00", "15:25:00", "16:10:00", "16:15:00"], // 第六节
            6: ["16:15:00", "16:20:00", "17:5:00", "17:10:00"], // 第七节
            7: ["17:10:00", "17:15:00", "18:00:00", "19:00:00"], // 第八节
            8: ["19:00:00", "19:30:00", "20:15:00", "20:20:00"], // 第九节
            9: ["20:20:00", "20:25:00", "21:10:00", "24:00:00"] // 第十节
          },
          what: 0, // 当前可以报道的节次
          node_status: "", // 记录报道的情况，
          apis: {
            requestStatus: "/attendance_system/tp/Index.php/Home/Attendance/index", // 返回报道的情况
            requestSeatTotal:
              "/attendance_system/tp/Index.php/Home/Report/getSeatTotal", // 返回报道学生所在课室座位总数
            isSeat: "/attendance_system/tp/Index.php/Home/Report/isSeat", // 判断是否有座位并返回是否可坐
            sit: "/attendance_system/tp/Index.php/Home/Report/sit" // 获取本次报道课程节次座位是否已经有人就座
          },
          term: "",
          seats: [], // 座位
          choseSeat: 0, // 用户选择的座位
          report_result: "", // 报道结果内容
          isProducting: true // 是否可以遍历座位。遍历只是遍历一次
    
        };
      },
      computed: {
        report_times: {
          get: function() {
            return this.hours + ":" + this.minutes + ":" + this.secnods;
          }
        }
      },
      methods: {
        async report() {
          // 报道
    
          this.report_time = await this.getTime(); // 获取报道的时间
    
          let result = await this.aiWhat(); //获取上课的信息
    
          this.what = result.what; // 获取上课的节次
    
          storage.set("currentWhat", this.classTotal[this.what - 1]); // 把当要签到的节次存入localStorage
    
          this.node_status = await this.isState();
    
          storage.set("node_status", this.node_status); // 把当要签到的节次存入localStorage
    
          // 考勤的结果存入考勤表中
          let params = new URLSearchParams();
          params.append("week", storage.get("week")); // 把周次传给数据库
          params.append("currentWhat", storage.get("currentWhat")); // 把当前节次传给数据库
          params.append("weekly", storage.get("weekly")); // 把当前星期传给数据库
          params.append("course_plan_fk", storage.get("course_plan_fk")); // 把当前课程计划外键传给数据库
          params.append("student_id", storage.get("student_id")); // 把当前学生的学号传给数据库
          params.append("node_status", storage.get("node_status")); // 把当前学生的考勤情况传给数据库
          // params.append();
          Axios.post(this.apis.requestStatus, params).then(
            response => {
              // console.log(response.data);
              alert(response.data.reportStatus);
            },
            err => {
              throw new Error(err);
            }
          );
        },
        async isState() {
          // 确认考勤情况 所需参数 what节次和report_time报道的时间。
          return new Promise(resolve => {
            for (let i = 0; i < this.nodeList.length; i++) {
              for (let j = 0; j < this.classTotal.length; j++) {
                if (
                  this.classTotal[this.what - 1] == this.classTotal[j] && // this.what是从aiwhat异步函数;
                  _date.cd(this.report_time) >= _date.cd(this.timeSchedule[j][0]) &&
                  _date.cd(this.report_time) <= _date.cd(this.timeSchedule[j][1])
                ) {
                  // this.node_status = "准点";
                  resolve("准点");
                  return;
                } else if (
                  this.classTotal[this.what - 1] == this.classTotal[j] &&
                  _date.cd(this.report_time) >= _date.cd(this.timeSchedule[j][1]) &&
                  _date.cd(this.report_time) <= _date.cd(this.timeSchedule[j][2])
                ) {
                  // this.node_status = "迟到";
                  resolve("迟到");
                  return;
                } else if (
                  this.classTotal[this.what - 1] == this.classTotal[j] &&
                  _date.cd(this.report_time) >= _date.cd(this.timeSchedule[j][2]) &&
                  _date.cd(this.report_time) <= _date.cd(this.timeSchedule[j][3])
                ) {
                  // this.node_status = "旷课";
                  resolve("旷课");
                  return;
                }
              }
            }
          });
        },
        async aiWhat() {
          //智能识别当前可报道的节次是哪节 如果没有任何的可报道的可就返回未到签到时间
          return new Promise(resolve => {
            // 所需参数 report_time。 产出 waht节次和isReport是否可以签到。
            for (let i = 0; i < this.nodeList.length; i++) {
              for (let j = 0; j < this.classTotal.length; j++) {
                if (
                  this.nodeList[i] == this.classTotal[j] &&
                  _date.cd(this.report_time) >= _date.cd(this.timeSchedule[j][0]) &&
                  _date.cd(this.report_time) < _date.cd(this.timeSchedule[j][3])
                ) {
                  resolve({
                    what: j + 1, // 可签到节次
                    isReport: true // 是否可以签到
                  });
                  return;
                }
              }
            }
          });
        },
        async getTime() {
          // 获取时间
          return new Promise(resolve => {
            let date = new Date();
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.secnods = date.getSeconds();
            resolve(this.report_times); // 获取报道的时间
          });
        },
        async getSeatTotal() {
          // 获取座位数
          // 根据当前页面的时间每隔1s刷新，根据时间是否在上课的时间
          this.report_time = await this.getTime(); // 报道的时间
          console.log(this.report_time);
          let result = await this.aiWhat(); //获取上课的信息
          this.what = result.what; // 获取上课的节次
          switch (this.what) {
            case 1:
              this.what = "一";
              break;
            case 2:
              this.what = "二";
              break;
            case 3:
              this.what = "三";
              break;
            case 4:
              this.what = "四";
              break;
            case 5:
              this.what = "五";
              break;
            case 6:
              this.what = "六";
              break;
            case 7:
              this.what = "七";
              break;
            case 8:
              this.what = "八";
              break;
            case 9:
              this.what = "九";
              break;
            case 10:
              this.what = "十";
              break;
            default: {
              this.what = "查询无结果";
              break;
            }
          }
          return new Promise((resolve, reject) => {
            let params = new URLSearchParams();
            params.append("what", this.what); // 节次
            params.append("weekly", storage.get("weekly")); // 把当前星期传给数据库
            params.append("week", storage.get("week")); // 周次
            params.append("course_plan_fk", storage.get("course_plan_fk")); // 课程表外键
            Axios.post(this.apis.requestSeatTotal, params).then(
              res => {
                storage.set("time_id", res.data[0].id); // 得到的上课时间表外键存入浏览器
                resolve(
                  // 页面进来最近的时间判断是否有课，有的话告诉 班级座位
                  res.data[0].seat_total
                );
              },
              err => {
                reject(err);
              }
            );
          });
        },
        async updateSeat() {
          // 实时更新座位表
          setInterval(() => {
          this.getSeatTotal()
            .then(res => {
              console.log("当前教室座位数量是" + res);
              if(this.isProducting == true){
                for (let i = 1; i <= res; i++) {
                  // 遍历座位出来
                  this.seats.push(i);
                }
                this.isProducting = false;
              }
              
              return Promise.resolve(res); // 座位总数
            })
            .then(res => {
              let lis = document.querySelectorAll("ul > div > li"); // 获取页面的座位
              console.log(lis);
              // 如果座位有人坐了，会标记颜色
              let params = new URLSearchParams();
              params.append("time_id", storage.get("time_id")); // 上课时间表外键
              Axios.post(this.apis.sit, params).then(response => {
                // console.log(response.data.seatNumbers);
                // 如果有人就座了
                if (response.data.seatNumbers != 0) {
                  // response.data.seatNumbers.length
                  response.data.seatNumbers.forEach((element, key) => {
                    lis[element.seat - 1].style.background = "rgb(228, 32, 65)";
                    // lis[element.seats -1].onclick = undefined; // 位置有人坐了就点不了
                    lis[element.seat - 1].onclick = null;
                    lis[element.seat - 1].style.cursor = "auto";
                    // console.log(lis[element.seat-1]);
                  });
                }
              });
              lis.forEach((element, key) => {
                element.onclick = () => {
                  // 如果有样式首先清除
                  for(let i=0;i < lis.length;i++){
                    if(lis[i].className.indexOf('bg') > -1){
                      lis[i].classList.remove('bg');
                    }
                  }
                  // 用户选择的座位
                  this.choseSeat = key + 1;
                  element.classList.add('bg');
                  // console.log(this.choseSeat);
                };
              });
              console.log("第二个链式反应:" + res);
            })
            .catch(err => {
              new Error(err);
            });
          }, 1000);
        },
        choseSeatLater() {
          // 选择完座位之后要做的
          if (this.choseSeat != 0) {
            let params = new URLSearchParams();
            params.append("choseSeat", this.choseSeat); // 选择的座位
            params.append("time_id", storage.get("time_id")); // 上课时间表外键
            params.append("student_id", storage.get("student_id")); // 学号
            Axios.post(this.apis.isSeat, params).then(res => {
              console.log(res);
              this.report_result = res.data.res;
              if (res.data.res == "签到成功") {
                // 座位可以坐才可以签到
                this.report();
              }
            }),
              err => {
                // throw new Error(err);
              };
          } else {
            alert("请先选择座位");
          }
        }
      },
      mounted() {
        //获取上课具体的节次
        let whatLength = storage.get("what").length;
        for (let i = 0; i < whatLength; i++) {
          this.nodeList.push(storage.get("what")[i]["what"]);
        }
        this.updateSeat(); // 实时跟新座位分布图
      }
}
export default m_report;