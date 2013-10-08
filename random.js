/**
 * New node file
 */

var http = require("http");
var url = require("url");

http.createServer(function(request, response){
	response.writeHead(200,{"Content-Type" : "text/plain"});
	var params = url.parse(request.url, true).query;
	var imput = params.number;
	var numImput = new Number(imput);
	var numOutput = new Number(Math.random() * numImput).toFixed(0);
	response.write(numOutput);
	response.end();
}).listen(8090);

console.log("RAndom number Generator Running...");