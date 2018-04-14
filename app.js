// Sid Project

var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

var dbFunctions = require('./application/database/dbController');
var ERROR_CODES = require('./application/properties');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.use(express.static(__dirname + '/public/'));


app.get('/companiesList',function(req, res) {
	var query = "select distinct(company_name) as companyName from ratings";
	var final_response = {};
	dbFunctions.dataFromLocalDB(query, function(error){
		final_response['error_code'] = ERROR_CODES.DB_ERROR;

        res.end(JSON.stringify(final_response));
	}, function(data_rows){

		final_response["data"] = data_rows;
        final_response['error_code'] = ERROR_CODES.SUCCESS;
        res.end(JSON.stringify(final_response));
	});


});


app.get('/ratings/:companyName',function(req, res) {
	var final_response = {};
	var company_name = req.params.companyName;
	var query = "select company_name as companyName, rating, frequency as count from ratings where company_name = '" + company_name + "'";

	console.log(query);

	dbFunctions.dataFromLocalDB(query, function(error){
		final_response['error_code'] = ERROR_CODES.DB_ERROR;

        res.end(JSON.stringify(final_response));
	}, function(data_rows){

		var data = [];
		 
		for(var i = 0 ; i < data_rows.length; i++){
			var subData  = {};

			subData = {
				"key" : data_rows[i].rating,
				"value" : data_rows[i].count
			};

			data.push(subData);
		}

		final_response["data"] = data;
		final_response["companyName"] = company_name;
        final_response['error_code'] = ERROR_CODES.SUCCESS;
        res.end(JSON.stringify(final_response));
	});
	
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


var server = app.listen(8082, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});
