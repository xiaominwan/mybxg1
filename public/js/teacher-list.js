/**
 * Created by Administrator on 2017/8/30 0030.
 */
define(["jquery","template","util","bootstrap"],function($,template,util){
    var ret=util.qs("key");

    //调用后台接口获取列表数据
    //console.log(location.pathname);
    //设置导航菜单高亮显示
util.setMenu(location.pathname);
    $.ajax({
        type:"get",
        url:"/api/teacher",
        dataType:"json",
        success:function(data) {
            var html = template("teacherTpl", {list: data.result});
            $("#teacherInfo").html(html);
            //预览单机事件
            $(".preview").click(function () {
                var td = $(this).closest("td");
                var tcId = td.attr("data-tcId");
                //根据id查询数据
                $.ajax({
                    type: "get",
                    url: "/api/teacher/view",
                    data:{tc_id:tcId},
                    dataType: "json",
                    success: function (data) {

                        //解析数据渲染页面
                        var html = template("modalTpl", data.result);
                        $("#modalInfo").html(html);
                        //显示弹窗
                        $("#teacherModal").modal();
                    },


                });
                //控制启用和注销

            })
            $(".eod").click(function(){

                var td=$(this).closest("td");
                var tcId=td.attr("data-tcId");
                var tcStatus=td.attr("data-status");
                //调用接口
                var that=this;
                $.ajax({
                    type:"post",
                    url:"/api/teacher/handle",
                    data:{tc_id:tcId,tc_status:tcStatus},
                    success:function(data){
                       if(data.code==200){

                           //修改当前的转态
                           td.attr("data-status",data.result.tc_status);
                           //修改文字信息
if(data.result.tc_status==0){
    $(that).html("注销")
}else{
    $(that).html("启用")
}
                       }
                    }
                })
            })

        }

    })

})