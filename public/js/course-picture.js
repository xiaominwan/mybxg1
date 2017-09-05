/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util","uploadify"],function($,template,util){
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
            //渲染页面
            var html=template("pictureTpl",data.result);
            $("#pictureInfo").html(html);
        //处理封面上传
        $("#upfile").uploadify({
            width:60,

            buttonText:"选择图片",
            buttonClass:"btn btn-success btn-xs",
            swf:"/public/assets/uploadify/uploadify.swf",
            uploader:"/api/uploader/cover",
            itemTemplate:"<span></span>",
            fileObjName:"cs_cover_original",
            formData:{cs_id:csid},
            onUploadSuccess:function(f,data){
                console.log(data);
                data=JSON.parse(data);
                $(".preview img").attr("src",data.result.path)

            }
    })
        }

    })

})