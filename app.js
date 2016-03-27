//引入第三方模块
var express=require("express");
var mysql=require("mysql");
var session=require("express-session");
var bodyParser=require("body-parser");
var events=require("events");
var path=require("path");
var log4js=require("log4js");

//加载日志
log4js.configure("config/logs4js.json");
//全局变量
global.events=events;
global.mysql=mysql;
global.log=log4js.getLogger("logInfo");
global.rootPaht=__dirname;

//自定义中间件
var util=require("./util/util.js");
global.info=util.loadConfig("info");


//定义服务
var app=express();

//定义静态目录
app.use(express.static("./public"));

//配置post请求
app.use(bodyParser.urlencoded({
	extended:true
}));
//session中间件配置
app.use(bodyParser.json());
app.use(session({
	secret: "!@#$",
	resave: true,
	saveUninitialized: true,
	rolling: true,
	cookie: {
		"maxAge": 1000*5
	}
}));
//请求出错处理
app.use(function(req,res,next){
	res.status(404).redirect("/404.html");
	
});
//内部错误
app.use(function(err,req,res,next){
	res.status(500).redirect("/500.html");
	log.error(err.stack);
	
});
//安全处理
process.on("uncaughtException",function(err){
	console.error(err.stack);
	log.error(err.stack);
});

//创建监听程序
app.listen(3001,function(){
	console.log("服务器启动成功");

});