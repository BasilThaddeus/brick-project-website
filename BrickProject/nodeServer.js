var http = require("http");
var url = require("url");


//http://188.166.172.236/?n=1


global.ticketNum = 0;

http.createServer(function (req, res) {

	console.log("");

    var urlprs = url.parse(req.url, true);
    //console.log("Pathname " + urlprs.pathname);
    //console.log("Search " + urlprs.search);

    var query = urlprs.query;

    var numToAdd = urlprs.pathname.replace("/","");

    console.log(numToAdd);
    
    ticketNum += parseInt(numToAdd);

    //ticketNum = ticketNum + parseInt(numToAdd);

    //console.log(parseInt(query.n));
    console.log(ticketNum);

    // if(query.n=="signup") {
	   // if (signup(query.user, query.pass) == true) {
    //         res.write("success");
    //    }
    // } else if(query.func=="login") {
    //    if (login(query.user, query.pass) == true) {
    //         res.write("true");
    //    } else {
    //         res.write("false");
    //    }
    // }

    res.end("success");
}).listen(8085);