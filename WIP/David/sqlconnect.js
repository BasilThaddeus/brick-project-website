// var TYPES = require("tedious").TYPES;
var TYPES = require("tedious");
var http = require("http");
var url = require("url");
var mysql = require("mysql");

/*var config = {
	userName: "root", 
	password: "", 
	server: "localhost", 
	options: {
		database: "Local DB", 
		encrypt: true, 
		port: "3306"
	}
};*/

var con = mysql.createConnection({
	host: "localhost", 
	user: "root", 
	password: "", 
	database: ""
});

http.createServer(function (req, res) {

    console.log("Starting connection...");
    con.connect(function(err) {
        //if (err) throw err;
    });

    var urlprs = url.parse(req.url, true);
    console.log(urlprs.pathname);
    console.log(urlprs.search);

    var query = urlprs.query;

    if(query.func=="signup") {
	   if (signup(query.user, query.pass) == true) {
            res.write("success");
       }
    } else if(query.func=="login") {
       if (login(query.user, query.pass) == true) {
            res.write("true");
       } else {
            res.write("false");
       }
    }

    res.end();
/////////SHOULD BE 8081
}).listen(8082);

function signup(u, p) {
    console.log("Querying...");
    con.query("INSERT INTO user_data (user, pass) VALUES ('" + u + "', '" + p + "');", function (err, result) {
        if (err) throw err;
        console.log("Success!");
    });
    return true;
}


//For this to work the usernames MUST BE UNIQUE
function login(u, p) {
    console.log("Querying...");
    var djent = false;
    con.query("SELECT pass FROM user_data WHERE user = '" + u + "'", function (err, result) {
        if (err) throw err;
        console.log("Results retrieved successfuly!");
        console.log("u                                      " + u);
        console.log("p                                      " + p);
        console.log("result                                 " + result);
        if (result[1] = p) {
            djent = true;
        } else if (result[1] != p) {
            djent = false;
        }
    });
    return djent;
}