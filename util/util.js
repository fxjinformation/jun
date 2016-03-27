var fs=require("fs");
exports.loadConfig=function(filename){
	var path=rootPaht+"/config/"+filename+".json";
	var data=fs.readFileSync(path);
	return JSON.parse(data);
}
