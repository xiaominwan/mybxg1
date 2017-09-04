/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util","ckeditor","validate","form"],function($,template,util,CKEDITOR){
   //设置导航栏菜单选中
    util.setMenu("/course/add");
    //获取课程ID
    var csid=util.qs("cs_id");

    //湖区添加和编辑的标志位
    var flag=util.qs("flag");
    $.ajax({
        type:"get",
        url:"/api/course/basic",
        data:{cs_id:csid},
    dataType:"json",
        success:function(data){
            console.log(data);
            //解析数据然页面
            if(flag){
                data.result.operate="课程编辑"
            }else{
                data.result.operate="课程添加"
            }
            var html=template("basicTpl",data.result);

            $("#basicInfo").html(html);
            //处理二级分类的联动
            $("#firstType").change(function(){
             //获取当前以及分类的id
                var fid=$(this).val();
                $.ajax({
                    type:"get",
                    url:"/api/category/child",
                    data:{cg_id:fid},
                    dataType:"json",
                    success:function(data){
                    var tpl='<option value="">请选择二级分类...</option> {{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}'
                        var html=template.render(tpl,{list:data.result});
                        $("#secondType").html(html);


                }
                })

            });
            //处理富文本
            CKEDITOR.replace("ckeditor");
            //处理表单提交
            $("#basicForm").validate({
                sendForm:false,
                //处理富文本提交

            valid:function(){
                for(var instance in CKEDITOR.instances){
                    CKEDITOR.instances[instance].updateElement();

                }
                $(this).ajaxSubmit({
                    type:"post",
                    url:"/api/course/update/basic",
                    data:{cs_id:csid},
                    dataType:"json",
                    success:function(data){
                        console.log(data);
                        location.href="/course/picture?cs_id="+data.result.cs_id;
                    }
                })

            }
            })
        }
    })

})