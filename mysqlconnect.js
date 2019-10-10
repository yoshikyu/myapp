var express = require('express');
var app = express();
var config = require('./config.json')[app.get('env')];
var mysql = require('mysql');
var connection = mysql.createPool({
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASS,
	database: config.DB_NAME
})
module.exports = connection;