define(["jquery","template","util","datepicker","language","validate"],function($,template,util){
    //z设置菜单选中
    util.setMenu("/teacher/list");
    var tcId=util.qs("tc_id");
    if(tcId){
        //编辑操作
        $.ajax({
            type:"get",
            url:"/api/teacher/edit",
            data:{tc_id:tcId},
            dataType:"json",
            success:function(data){

            //解析数据渲染页面
                data.result.operate="编辑讲师"
                var  html=template("teacherTpl",data.result);
                $("#teacherInfo").html(html);
                submitForm("/api/teacher/update")
            }
        })

    }else{
        //添加操作
        var html=template("teacherTpl",{operate:"添加讲师",tc_gender:1});
        $("#teacherInfo").html(html);

        submitForm("/api/teacher/add")

    }
    //提交公用表单
    function submitForm(url){
        $("#teacherForm").validate({
            sendForm:false,
            valid:function(){
                console.log("ok");
            },
            description:{
                tc_name:{
                    required:"请输入用户名",
                    valid:"用户名可以使用",
                },
                tc_pass:{
                    required:"输入密码",
                    pattern:"密码必须是六位数字",
                    valid:"密码有效",
                },
                tc_join_date:{
                    required:"请输入日期",
                    valid:"密码有效",
                }
            }
        });
    }
    //function submitForm(url){
    //    $("#teacherBtn").click(function(){
    //        $.ajax({
    //            type:"post",
    //            url:url,
    //            data:$("#teacherForm").serialize(),
    //            dataType:"json",
    //            success:function(data){
    //
    //                if(data.code==200){
    //                    location.href="/teacher/list"
    //                }
    //            }
    //        });
    //    });
    //
    //}
});