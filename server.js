var express = require("express");
var app     = express();
var path    = require("path");


app.get('/controller.js', function(req,res){
	res.sendfile(path.join(__dirname+'/controller.js'));
});
app.get('/', function(req,res){
	res.sendfile(path.join(__dirname+'/index.html'));
});

app.listen(3000);