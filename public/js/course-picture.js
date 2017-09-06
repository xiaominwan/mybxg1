/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util","uploadify","jcrop","validate","form"],function($,template,util){
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
                data=JSON.parse(data);
                $(".preview img").attr("src",data.result.path)

            }
    });
            //处理图片裁切
            var img=$(".preview img");
            //图片裁切功能封装方法
            function cropImage(){
                img.Jcrop({
                    aspectRatio:2,
                    boxWidth:400
                },function(){
                    //设置预览效果
                    this.initComponent("Thumbnailer",{
                        width:240,
                        height:120,
                        mypos:".thumb",
                    });
                    //动态创建选取
                    //选区坐标
                    var width=this.ui.stage.width;
                    var height=this.ui.stage.height;
                    var x=0;
                    var y=(height-width/2)/2;
                    var w=width;
                    var h=width/2;
                    //创建选区
                    this.newSelection();
                    this.setSelect([x,y,w,h]);
                    //设置预览区的位置
                    $(".jcrop-thumb").css({
                        top:0,
                        left:0
                    });
                    var inputs=$("#cropForm").find("input");
                    inputs.eq(0).val(x);
                    inputs.eq(1).val(y);
                    inputs.eq(2).val(w);
                    inputs.eq(3).val(h);
                    //处eq()数据
                    img.closest("div").on("cropstart cropmove cropend",function(a,b,c){
                        var inputs=$("#cropForm").find("input");
                        inputs.eq(0).val(c.x);
                        inputs.eq(1).val(c.y);
                        inputs.eq(2).val(c.w);
                        inputs.eq(3).val(c.h);


                    });

                });
            }
            //处理按钮的点击状态
            $("#cropbtn").click(function(){
                var flag=$(this).attr("data-flag");
                if(flag){

                  //再点击，把裁切好的尺寸信息提交到后台
              $("#cropForm").ajaxSubmit({
                      type:"post",
                      url:"/api/course/update/picture",
                      data:{cs_id:csid},
                      dataType:"json",
                      success:function(data){
                          if(data.code==200){
                              location.href="/course/lesson?cs_id="+data.result.cs_id;                          }
                     }
                  });          }else{
                    $(this).html("保存图片");
                    $(this).attr("data-flag",1);
                    //进行图
                    cropImage();





                 }
            });

        },

    })

})