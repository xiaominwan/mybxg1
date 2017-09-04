/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util","validate","form"],function($,template,util){
    //选中导航菜单栏
    util.setMenu(location.pathname);
    //控制表单提交
    $("#courseForm").validate({
        sendForm:false,
        valid:function(){
            //验证通过之后提交表单
            $(this).ajaxSubmit({
                type:"post",
                url:"/api/course/create",
                dataType:"json",

                success:function(data){
                    if(data.code==200){
                        location.href="/course/basic?cs_id="+data.result.cs_id;
                    }

                }

            })
        }
    })

})