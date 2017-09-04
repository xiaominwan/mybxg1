/**
 * Created by Administrator on 2017/9/4 0004.
 */
define(["jquery","template","util"],function($,template,util){
   //设置导航栏菜单选中
    util.setMenu("/course/add");
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

            })
        }
    })

})