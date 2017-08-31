/**
 * Created by Administrator on 2017/8/31 0031.
 */
define(["jquery","template","util"],function($,template,util){
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
                console.log(data.result);
                $("#teacherInfo").html(html);

            }
        })

    }else{
        //添加操作
        var html=template("teacherTpl",{operate:"添加讲师",tc_gender:1});
        $("#teacherInfo").html(html);


    }
})