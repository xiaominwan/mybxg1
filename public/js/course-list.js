/**
 * Created by Administrator on 2017/9/3 0003.
 */
define(["jquery","template","util"],function($,template,util){
    //设置导航菜单选中
    util.setMenu(location.pathname);
    //获取课程列表
    $.ajax({
        type:"get",
        url:"/api/course",
        success:function(data){
            console.log(data);
//解析数据渲染页面
            var html=template("courseTpl",{list:data.result});
            $("#courseInfo").html(html);


        }

    })


});