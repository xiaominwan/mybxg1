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
        datepicker:"bootstrap-datepicker/js/bootstrap-datepicker",
        language:"bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        validate:"validate/jquery-validate.min",
        common:"../js/common",
        login:"../js/login",
        index:"../js/index",
        util:"../js/util",
        teacherlist:"../js/teacher-list",
        teacheradd:"../js/teacher-add",
        form:"jquery-form/jquery.form"


    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        language:{
            deps:["jquery","datepicker"]
        },

        validate:{
            deps:["jquery"]
        }

    }
});