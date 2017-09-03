/**
 * Created by Administrator on 2017/9/2 0002.
 */
define(["jquery","template","util","ckeditor","uploadify","datepicker","language","region","validate","form"],function($,template,util,CKEDITOR){
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
            //处理文件上传
              $("#upfile").uploadify({
                  width:120,
                  height:120,
                  buttonText:"",
                  swf:"/public/assets/uploadify/uploadify.swf",
                  uploader:"/api/uploader/avatar",
                  fileObjName:"tc_avatar",
                  onUploadSuccess:function(f,data){
                  var data=JSON.parse(data);
                      $(".preview img").attr("src",data.result.path)

                  }

              });
            //处理省市县
            $("#pcd").region({
                url:"/public/assets/jquery-region/region.json"
            });
            //处理富文本
           CKEDITOR.replace("ckeditor",{
               toolbarGroups : [
               { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
               { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ,"editing"] },
               { name: 'links',groups:["links"] }
               ]

           });
            //提交表单信息
        $("#settingsForm").validate({
            sendForm:false,
            valid:function(){
                for(var instance in CKEDITOR.instances){
                    CKEDITOR.instances[instance].updateElement();
                }
                var p=$("#p option:selected").text();
                var c=$("#c option:selected").text();
                var d=$("#d option:selected").text();
                var hometown=p+"|"+c+"|"+d;
                //所有验证都通过，提交表单
                $(this).ajaxSubmit({
                    type:"post",
                    url:"/api/teacher/modify",
                    data:{tc_hometown:hometown},
                    datatype:"json",
                    success:function(data){
                        if(data.code==200){
                    //刷新页面
                    location.reload();
                }

            }

        });
    },

});
        }

    })

})