<?php
    namespace Home\Controller;
    use Think\Controller;
    class ReportController extends Controller{
        public function getSeatTotal(){
            $what = I('post.what'); // 节次
            $weekly = I('post.weekly'); // 星期
            $week = I('post.week'); // 周次
            $course_plan_fk = I('post.course_plan_fk'); //  课程表外键
            $seatTotal = M('time')->
            alias('t')->
            field('t.id,s.seat_total')->
            join('kq_seat  as s on  t.seat_fk = s.id')->
            where('t.what="%s" and t.week = "%s" and t.week_number = "%s"  and t.course_plan_fk = "%s"',$what,$weekly,$week,$course_plan_fk)->
            select();
            $this->ajaxReturn($seatTotal);
        }
        public function isSeat(){
            $choseSeat = I('post.choseSeat'); // 座位号
            $time_fk = I('post.time_id'); // 上课时间表外键
            $student_id = I('post.student_id'); // 学号
            $student_fk = M('student')->where('student_id="%s"',$student_id)->getField('id'); // 学生表外键
            // 座位是否已经被被人坐了，就是查询有记录 根据当天上课的节次和座位号判断是否这个座位有人坐了
            $haveSeat = M('student_seat_status')->where('time_fk = "%s" and seat = "%s"',$time_fk,$choseSeat)->select();
            // 查询本次报道学生是否已经报道，已经有座位了
            $isInSeat = M('student_seat_status')->field('seat')->where('student_fk = "%s" and time_fk = "%s"',$student_fk,$time_fk)->select();
            
             $result = array(
                'student_fk'=> $student_fk,
                'time_fk' => $time_fk,
                'seat' => $choseSeat
            );
                if(!$isInSeat){ // 确定人有没有签到过
                    if(!$haveSeat){ // 没有记录把报道学生的座位信息（student_fk,time_fk,choseSeat）存入数据库
                        $result = M('student_seat_status')->add($result);
                        if($result){
                            $res = array(
                                'res'=> '签到成功'
                            );
                        }else{
                            $res = array(
                                'res'=> '签到失败'
                            );
                        }
                         
                    }else{
                        $res = array(
                            'res'=> '位置已经有人'
                        );
                    }
                }else{
                    $res = array(
                        'res'=> '本次已签到'
                    );
                }
         $this->ajaxReturn($res);
        }
        public function sit(){
            $time_id = I('post.time_id');
            $result = M('student_seat_status')->field('seat')->where('time_fk="%s"',$time_id)->select();
            if($result){
                $res = array(
                    'seatNumbers' => $result
                );
            }else{
                $res = array(
                    'seatNumbers' => 0
                );
            }
            

           $this->ajaxReturn($res);
        }
    }
?>