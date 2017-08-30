define(["jquery","cookie"],function($){
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
	console.log(loginInfo)
	var info=JSON.parse(loginInfo);
	$(".profile img").attr("src",info.tc_avatar);
	$(".profile h4").html(info.tc_name);
});
	//NProgress.start();
    //
	//NProgress.done();


