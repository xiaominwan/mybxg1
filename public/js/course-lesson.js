
define(["jquery","template","util","bootstrap","form"],function($,template,util){
//设置导航菜单选中
    util.setMenu("/course/list");
    //获取课程id
    var csid=util.qs("cs_id");
    //查询课时数据
    $.ajax({
        type:"get",
        url:"/api/course/lesson",
        data:{cs_id:csid},
        dataType:"json",
        success:function(data){
            //渲染数据
            var html=template("lessonTpl",data.result);
            $("#lessonInfo").html(html);
            //表单提交功能
            function submitForm(url,ctId){
                var param={ct_cs_id:csid};
                if(ctId){
                    param.ct_id=ctId;
                }
                $("#submitBtn").click(function(){
                    $("#modalForm").ajaxSubmit({
                        type:"post",
                        url:url,
                        data:param,
                        dataType:"json",
                        success:function(){
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                })
            }
        //处理添加功能
            $("#addBtn").click(function(){
                var html=template("modalTpl",{operate:"添加课时"})
            $("#modalInfo").html(html);
            $("#chapterModal").modal();
                //添加时提交表单
                submitForm("/api/course/chapter/add");
            });

            //处理编辑功能
            $(".editlesson").click(function(){
                var ctid=$(this).attr("data-ctId");
                //先查询数据
                $.ajax({
                    type:"get",
                    url:"/api/course/chapter/edit",
                    data:{ct_id:ctid},
                    dataType:"json",
                    success:function(data){
                        console.log(data);
                        var html=template("modalTpl",data.result);
                        $("#modalInfo").html(html);
                        //显示弹窗
                        $("#chapterModal").modal();
                        //编辑课时提交表单
                        submitForm("/api/course/chapter/modify",ctid);
                    }
                });
            })
        }
    })


})