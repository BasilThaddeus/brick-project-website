// var TYPES = require("tedious").TYPES;
var TYPES = require("tedious");
var http = require("http");
var url = require("url");
var msSqlConnecter = require("./mssqlconnecter");

var config = {
	userName: "", 
	password: "", 
	server: "", 
	options: {
		database: "Local DB", 
		encrypt: true
	}
};

http.createServer(function (req, res) {
    var urlprs = url.parse(req.url, true);
    console.log(urlprs.pathname);
    console.log(urlprs.search);

    var query = urlprs.query;

    res.write("User was:" + query.user);
    res.write("Pass was:" + query.pass);
    res.end();
}).listen(8081);

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
}