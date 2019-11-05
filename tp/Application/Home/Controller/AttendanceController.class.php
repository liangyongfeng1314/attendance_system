<?php
namespace Home\Controller;
use Think\Controller;
class AttendanceController extends Controller {
    public function index(){
        header("Content-Type:text/html;charset=utf-8");
        $week = I("post.week"); // 周次
        $currentWhat = I("post.currentWhat"); // 节次
        $weekly = I("post.weekly"); // 星期
        $course_plan_fk = I("post.course_plan_fk"); // 课程计划外键
        $student_id = I("post.student_id"); // 学号
        $node_status = I("post.node_status"); // 考勤情况
        // 学号 得到 学生表外键
        $student_fk = M('student')->where('student_id="%s"',$student_id)->getField('id');
        // 周次、节次、星期、课程计划外键 得到 上课时间表外键   
        $time_fk = M("time")->where('week_number= "%s" and week = "%s" and what = "%s"   and course_plan_fk = "%s"',$week,$weekly,$currentWhat,$course_plan_fk)->getField('id');
         $addData = array( // 需要添加的数据
            'student_fk'=> $student_fk,
            'time_fk' => $time_fk,
            'status' => $node_status
        );
        // 判断是否有本次签到是否已经签到
        $isHave = M('attendance')->where('student_fk = "%s" and time_fk = "%s"',$student_fk,$time_fk)->getField('id');

        if($isHave == false){ // 没签到就签到
            $result = M('attendance')->add($addData);
            if($result == true){
                $reportStatus = array(
                    "reportStatus"=> "签到成功"
                );
            }else{
                $reportStatus = array(
                    "reportStatus"=> "签到失败"
                );
            }
        }else{
              $reportStatus = array(
                "reportStatus"=> "本次已签到，请勿重复签到"
            );
        }
        $this->ajaxReturn($reportStatus);
    }
    
}