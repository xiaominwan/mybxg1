define(["jquery","template","cookie"],function($,template){
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//退出功能
	$("#logoutbtn").click(function(){
		$.ajax({
			type:"post",
			url:"/api/logout",
			dataType:"json",
			success:function(data){
				if(data.code==200){
					location.href="/main/login"
				}

			}

		})
		return false;
	})
	//验证是否登录
	var sessionID= $.cookie("PHPSESSID");
	if(!sessionID && location.pathname !="/main/login"){
		location.href="/main/login";
	}

	//获取登录信息

	var loginInfo= $.cookie("loginInfo");

	var info=JSON.parse(loginInfo);
	var tplstr='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
	var html=template.render(tplstr,info);
	$(".aside .profile").html(html);

	//$(".profile img").attr("src",info.tc_avatar);
	//$(".profile h4").html(info.tc_name);
});
	//NProgress.start();
    //
	//NProgress.done();


