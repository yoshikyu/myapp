var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../mysqlconnect.js');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
	var user_id = req.params.userId;
	var sql = `select name, age from users where id = ${user_id}`;
	connection.query(sql, function(err, rows){
		if(err){
			res.json({"Error":true, "Message": err});
		}else{
			res.json({"Error":false, "Message": "Success",  "Users": rows});
		};
	})
});

router.get('/:userId/texts', function(req, res, next){
	var user_id = req.params.userId;
	var sql = `select text from texts where user_id = ${user_id}`;
	var realtime_flg = req.query.realtime;
	if(realtime_flg=="true"){
		sql += ` AND created_at > CURRENT_TIMESTAMP() + interval -30 minute`;
	}
	connection.query(sql, function(err, rows){
		if(err){
			res.json({"Error":true, "Message": err});
		}else{
			res.json({"Error":false, "Message": "Success", "Texts": rows});
		}
	})
});


module.exports = router;
