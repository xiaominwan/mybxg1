<?php
$dir="main";//默认目录名称
$filenme="index";//默认文件名称
//var_dump($_SERVER);
//判断数组中是否包含这个属性
if(array_key_exists('PATH_INFO',$_SERVER)){
$path=$_SERVER['PATH_INFO'];
//去掉路径中的第一个斜杠
$str=substr($path,1);

//分割路径和文件名称
$arr=explode('/',$str);


if(count($arr)==2){
$dir=$arr[0];//覆盖目录名称
$filenme=$arr[1];//覆盖文件名称
}else{
//如果不是两层就跳转到登录页面
$filenme="login";
}

}

//在当前页面嵌入一个子页面
include("./views/".$dir."/".$filenme.".html");
?>