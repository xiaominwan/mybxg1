/**
 * Created by Administrator on 2017/8/31 0031.
 */
define(["jquery"],function($){
    //工具函数
    return {
        setMenu:function(path){
            $('.navs a[href="'+path+'"]').addClass("active");

        }
    }
})