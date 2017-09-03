/**
 * Created by Administrator on 2017/9/3 0003.
 */
define(["jquery"],function($){
$(document).ajaxStart(function(){
    //控制遮罩显示
    $(".overlay").show();
});
    $(document).ajaxStop(function(){
        //控制隐藏
        setTimeout(function(){
            $(".overlay").hide()
        },500)


    })
});