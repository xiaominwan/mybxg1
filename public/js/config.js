/**
 * Created by Administrator on 2017/8/28 0028.
 */
require.config({
    baseUrl:"/public/assets",
    paths:{
        jquery:"jquery/jquery",
        cookie:"jquery-cookie/jquery.cookie",
        template:"artTemplate/template-web",
        bootstrap:"bootstrap/js/bootstrap.min",
        common:"../js/common",
        login:"../js/login",
        index:"../js/index",
        util:"../js/util",
        teacherlist:"../js/teacher-list",

    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
    }
});