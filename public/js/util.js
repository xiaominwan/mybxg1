/**
 * Created by Administrator on 2017/8/31 0031.
 */
define(["jquery"],function($){
    //工具函数
    return {
        setMenu:function(path){
            //设置导航菜单选中
            $('.navs a[href="'+path+'"]').addClass("active");

        },
        qs:function(key){
            //获取url中的值
            var result=null;
            var param=location.search.substring(1);
         if(param){
             var kvs=param.split("&");
             $.each(kvs,function(i,item){
                 var kv=item.split("=");
                 if(key==kv[0]){
                     result=kv[1];
                     return false;
                 }
             })
         }
return result;

        },
    }
})