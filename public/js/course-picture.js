/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util"],function($,template,util){
    //设置导航栏中的地址
    util.setMenu("/course/add");

//获取课程id
    var csid=util.qs("cs_id");
//根据id查询课程的封面信息
    $.ajax({
        type:"get",
        url:"/api/course/picture",
        data:{cs_id:csid},
        dataType:"json",
        success:function(data){
            var html=template("pictureTpl",data.result);
            $("#pictureInfo").html(html);
        }
    })

})