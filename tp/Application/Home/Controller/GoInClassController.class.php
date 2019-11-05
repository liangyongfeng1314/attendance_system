<?php
namespace Home\Controller;
use Think\Controller;
class GoInClassController extends Controller {
    public function index(){
        header("Content-Type:text/html;charset=utf-8");
       
        // 前台获取 周期 、 星期几、学号,学期
        $week = I('post.week');
        $weekly = I('post.weekly');
        $student_id = I('post.student_id');
        $term = I('post.term');
        // 学号 得到 班级表外键
        $class_fk = M('student')->where('student_id="%s"',$student_id)->getField('class_fk');
        // 班级表外键  得到 专业计划外键
        $majoy_plan_fk = M('class')->where('id="%s"',$class_fk)->getField('majoy_plan_fk');
        // 专业计划表外键 得到 课程计划表外键
        $course_plac_fk = M('course_plan')->where('majoy_plan_fk="%s" and term = "%s"',$majoy_plan_fk,$term)->getField('id');
        // isClass 查看是否有课
        $isClass = M('time')->where('week_number="%s" and week = "%s" and course_plan_fk ="%s"',$week,$weekly,$course_plac_fk)->order('what asc')->select();
        if($isClass == true){
             $res = array(
                "isClass"=> true,
                'what'=>$isClass,
                'course_plan_fk'=> $course_plac_fk,
                'term'=> $term,
            );
        }else{
            $res = array(
                "isClass"=> false
            );
        }
        $this->ajaxReturn($res);
    }
    public function grade(){
        $student_id = I("post.student_id");
        $grade = M('student')->
        field('kq_majoy_plan.grade')->
        join('kq_class on kq_student.class_fk = kq_class.id')->
        join('kq_majoy_plan on kq_class.majoy_plan_fk = kq_majoy_plan.id')->
        where('kq_student.student_id = "%s"',$student_id)->
        select();
        $this->ajaxReturn($grade);
    }
}