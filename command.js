var exec = require('child_process').exec;
var http = require("http");

http.createServer(function(request, response){
	response.writeHead(200,{"Content-Type" : "text/plain"});
	var res;
	exec('ls -la', function(error, stdout, stderr){
		console.log(stdout);
	});
	response.write("Olá");
	response.end();
}).listen(8800);

console.log("Usando Child Process...");

