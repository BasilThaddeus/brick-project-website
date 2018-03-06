// var TYPES = require("tedious").TYPES;
var TYPES = require("tedious");
var http = require("http");
var url = require("url");
var msSqlConnecter = require("./mssqlconnecter");
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
	password: ""
});

http.createServer(function (req, res) {
    var urlprs = url.parse(req.url, true);
    console.log(urlprs.pathname);
    console.log(urlprs.search);

    var query = urlprs.query;

    if(query.func=="signup") {
	signup(query.user, query.pass);
    } else if(query.func=="login") {
	login(query.user, query.pass);
    }
}).listen(8081);




function signup(user, pass) {
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//var q = "INSERT INTO user_data (user, pass, signup_date) VALUES (" + user + ", " + pass + ", " + Date.now() / 1000 | 0 + ");";

		//var q = "USE basil_website_test_db; INSERT INTO user_data (`user`, pass) VALUES ('a', 'b');";

		var q = "USE basil_website_test_db; SELECT * FROM user_data";


		con.query(q, function (err, result) {
			//if (err) throw err;
con.on('error', function(err) {
  console.log("[mysql error]",err);
});
			console.log("Result: " + result);
		});
	});
}





/*

function signup(user, pass) {
	var con = new msSqlConnecter.msSqlConnecter(config);
    con.connect().then(function () {
        new con.Request("insert account data(@id,@user,@pass,@signup_date)")
            .addParam("user", TYPES.VarChar, user)
            .addParam("pass", TYPES.VarChar, pass)
            .addParam("signup_date", TYPES.date, Date.now() / 1000 | 0) //Check date code
            .onComplate(function (count) {
                if (callback)
                    callback(count);
            })
            .onError(function (err) {
                console.log(err);
            })
            .Run();
    }).catch(function (ex) {
        console.log(ex);
    });
}

function login(user1, pass) {
    var con = new msSqlConnecter.msSqlConnecter(config);
    con.connect().then(function () {
        new con.Request("select pass from user_data where user = user1;") 
            .onComplate(function (count, datas) {
                if (callback)
                    callback(datas);
            })
            .onError(function (err) {
                console.log(err);
            }).Run();
    }).catch(function (ex) {
        console.log(ex);
   		if(ex == pass) {
   			return true;
   		} else {
   			return false
   		}
    });
}*/
