/**
 * Created by Administrator on 2017/9/2 0002.
 */
define(["jquery","template","util"],function($,template,util){
    //设置导航栏选中的菜单
    util.setMenu("/main/index");
    //调用后台接口填充表单
    $.ajax({
        type:"get",
        url:"/api/teacher/profile",
        dataType:"json",
        success:function(data){
           //解析数据传染页面
            var html=template("settingsTpl",data.result);
            $("#settingsInfo").html(html);
        }

    })

})