var http = require("http");
var url = require("url");


//http://188.166.172.236/?n=1


global.ticketNum = 0;

http.createServer(function (req, res) {

	console.log("");

	if(req.url === "/favicon.ico") {
		res.end("n");
		return;
	}

    var urlprs = url.parse(req.url, true);
    var query = urlprs.query;
    var numToAdd = urlprs.pathname.replace("/","");

    ticketNum += parseInt(numToAdd);

    console.log(ticketNum);
    
    res.end(String(ticketNum));
}).listen(8085);