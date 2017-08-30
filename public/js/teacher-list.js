/**
 * Created by Administrator on 2017/8/30 0030.
 */
define(["jquery","template"],function($,template){
    //调用后台接口获取列表数据

    $.ajax({
        type:"get",
        url:"/api/teacher",
        dataType:"json",
        success:function(data){
        var html=template("teacherTpl",{list:data.result});
            $("#teacherInfo").html(html);
        }

    });
});