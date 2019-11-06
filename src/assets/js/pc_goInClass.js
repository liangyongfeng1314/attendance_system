import Axios from "axios";
import _gfmt from "../../model/_gfmt";
import storage from "../../model/storage";

let pc_goInClass = {
    data() {
        return {
            year: "", // 年
            month: "", // 月
            day: "", // 日,
            minutes: "", // 分
            hours: "", // 时
            seconds: "", // 秒
            now: "", // 现在的时间
            pass: "", // 开学第一周
            days: "", // 一个星期具体是第几天
            weekly: "", // 获取星期
            grade: "", // 年级
            term: "", // 学期
            termTable: {
                // 学期表
                2017: {
                    grade: "2017",
                    0: ["2017-9-4 00:00:00", "2018-1-20 24:00:00"], // 第一学期
                    1: ["2018-9-3 00:00:00", "2019-1-19 24:00:00"], // 第二学期
                    2: ["2018-9-3 00:00:00", "2019-1-19 24:00:00"], // 第三学期
                    3: ["2019-2-25 00:00:00", "2019-7-13 24:00:00"], // 第四学期
                    4: ["2019-8-26 00:00:00", "2020-1-10 24:00:00"], // 第五学期
                    5: ["2020-2-24 00:00:00", "2020-7-10 24:00:00"] // 第六学期
                },
                2018: {
                    grade: "2018",
                    0: ["2018-9-3 00:00:00", "2019-1-19 24:00:00"], // 第一学期
                    1: ["2019-2-25 00:00:00", "2019-7-13 24:00:00"], // 第二学期
                    2: ["2019-8-26 00:00:00", "2020-1-10 24:00:00"], // 第三学期
                    3: ["2020-2-24 00:00:00", "2020-7-10 24:00:00"] // 第四学期
                },
                2019: {
                    grade: "2019",
                    0: ["2019-8-26 00:00:00", "2020-1-10 24:00:00"], // 第一学期
                    1: ["2020-2-24 00:00:00", "2020-7-10 24:00:00"] // 第二学期
                }
            },
            apis: {
                isClass: "/attendance_system/tp/Index.php/Home/GoInClass/index", // 返回是否有课
                requesGrade: "/attendance_system/tp/Index.php/Home/GoInClass/grade" // 返回年级
            }
        };
    },
    methods: {
        // 待删除-----------------------------------------------------------------
        async test() {
            this.grade = await this.getGrade();
            this.term = await this.getTerm(this.grade);
        },
        // -------------------------------------------------------------------------------------
        async haveClass() {
            if (storage.get("isClass") == true) {
                alert("请勿重复查询，本次查询结果为: 有课。");
                if (confirm("是否要进入课室")) {
                    this.$router.push({ path: "/Report" });
                }
            } else if (storage.get("isClass") == false) {
                alert("请勿重复查询，本次查询结果为: 不在上课时间。");
            } else if (!storage.get("isClass")) {
                this.grade = await this.getGrade(); // 得到本学生的报道年级
                this.term = await this.getTerm(this.grade); // 得到本学生的报道学期
                let params = new URLSearchParams(); // 新建URLSearchParams对象
                params.append("week", this.week); // 第几周传入后台
                params.append("weekly", this.weekly); // 星期几传入后台
                params.append("student_id", storage.get("currentUser")["student_id"]); // 学号传入后台
                params.append("term", this.term); // 学期传入后台
                // 请求过一次数据就存入localStorage就不用再次请求了
                Axios.post(this.apis.isClass, params).then(response => {
                    console.log(response);
                    // 请求成功
                    storage.set("week", this.week); // 把周次存入localStorage
                    // 获取后台是否有课并存入localStorage
                    storage.set("isClass", response.data.isClass);
                    if (response.data.isClass == true) {
                        // 把节次的情况存入localStorage
                        storage.set("what", response.data.what);
                        storage.set("course_plan_fk", response.data.course_plan_fk); // 外键存入localStorage
                        storage.set("term", response.data.term); // 把学期存入localStorage
                        this.$router.push({ path: "/Pc_Report" });
                        alert("有课");
                    } else {
                        alert("不在上课时间");
                    }
                });
            }
        },
        async getGrade() {
            // 获取年级
            return new Promise(resolve => {
                // 获取学期
                let params = new URLSearchParams();
                params.append("student_id", storage.get("student_id"));
                Axios.post(this.apis.requesGrade, params).then(
                    res => {
                        resolve(res.data[0].grade);
                    },
                    err => {
                        throw new Error(err);
                    }
                );
            });
        },
        async getTerm(grade) {
            // 本页一渲染进来的时间
            let time = `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`;
            //智能获取本次报道学生的报道学期
            return new Promise(resolve => {
                if (grade == this.termTable[2017].grade) {
                    // 如果是2017级从这里计算是第几学期
                    for (
                        let i = 0;
                        i < Object.keys(this.termTable[2017]).length - 1;
                        i++
                    ) {
                        if (
                            _gfmt.cd(time) >= _gfmt.cd(this.termTable[2017][i][0]) &&
                            _gfmt.cd(time) <= _gfmt.cd(this.termTable[2017][i][1])
                        ) {
                            resolve(i + 1);
                        }
                    }
                } else if (grade == this.termTable[2018].grade) {
                    // 如果是2018级计算是第学期
                    for (
                        let i = 0;
                        i < Object.keys(this.termTable[2018]).length - 1;
                        i++
                    ) {
                        if (
                            _gfmt.cd(time) >= _gfmt.cd(this.termTable[2018][i][0]) &&
                            _gfmt.cd(time) <= _gfmt.cd(this.termTable[2018][i][1])
                        ) {
                            resolve(i + 1);
                        }
                    }
                } else if (grade == this.termTable[2019].grade) {
                    // 如果是2019级计算是第学期
                    for (
                        let i = 0;
                        i < Object.keys(this.termTable[2019]).length - 1;
                        i++
                    ) {
                        if (
                            _gfmt.cd(time) >= _gfmt.cd(this.termTable[2019][i][0]) &&
                            _gfmt.cd(time) <= _gfmt.cd(this.termTable[2019][i][1])
                        ) {
                            resolve(i + 1);
                        }
                    }
                }
            });
        },
        as() {
            alert('s');
        }
    },
    computed: {
        week: {
            // 获取现在是第几周
            get: function () {
                return Math.ceil([(this.now - this.pass) / (24 * 60 * 60 * 1000)] / 7);
            }
        }
    },
    mounted() {
        // 渲染完毕给年月日分时秒赋值
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.minutes = date.getMinutes();
        this.hours = date.getHours();
        this.seconds = date.getSeconds();
        // 当前时间
        this.now = new Date(
            this.year.toString() +
            "-" +
            this.month.toString() +
            "-" +
            this.day.toString()
        );
        // 开学第一周
        this.pass = new Date("2019-08-26");
        // 获取天数(一个星期具体是第几天/星期几)
        this.days = date.getDay();
        switch (this.days) {
            case 1:
                this.weekly = "星期一";
                break;
            case 2:
                this.weekly = "星期二";
                break;
            case 3:
                this.weekly = "星期三";
                break;
            case 4:
                this.weekly = "星期四";
                break;
            case 5:
                this.weekly = "星期五";
                break;
            case 6:
                this.weekly = "星期六";
                break;
            case 0:
                this.weekly = "星期日";
                break;
        }
        storage.set("weekly", this.weekly); // 存入当日签到的星期
        // console.log(this.termTable[2017][0][1]);
        // console.log(_gfmt.cd('2017-12-11 00:33:01'));
        let floors = document.querySelectorAll("div[class~='floor']");
        // // 渐进式的动画
        setTimeout(function () {
            floors[0].style.backgroundColor = "#006064";
        }, 1000);
        setTimeout(function () {
            floors[1].style.backgroundColor = "#01939A";
        }, 1100);
        setTimeout(function () {
            floors[2].style.backgroundColor = "#34C6CD";
        }, 1200);
        setTimeout(function () {
            floors[3].style.backgroundColor = "#fff";
        }, 1300);
    }
};
export default pc_goInClass;
