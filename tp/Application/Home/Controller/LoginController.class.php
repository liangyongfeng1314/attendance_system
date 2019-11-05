<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function index(){
        header("Content-Type:text/html;charset=utf-8");
        
        $student_id = I('post.student_id');
        $student_name = I('post.student_name');
        $model = M('student');
        $data = $model->where('student_id = "%s" and student_name = "%s"',$student_id,$student_name)->find();
        if($data){
            $res = array(
                "isLogin"=> true,
                "student_id"=> $student_id
            );
        }else{
             $res = array(
                "isLogin"=> false
            );
        }
         $this->ajaxReturn($res);
    }
}
?>