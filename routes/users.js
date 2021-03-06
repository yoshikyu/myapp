const express = require('express');
const app = express();
const router = express.Router();
const connection = require('../mysqlconnect.js');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
	let user_id = req.params.userId;
	let sql = `select name, age from users where id = ${user_id}`;
	connection.query(sql, function(err, rows){
		if(err){
			res.json({"Error":true, "Message": err});
		}else{
			res.json({"Error":false, "Message": "Success",  "Users": rows});
		}
	});
});

router.get('/:userId/texts', function(req, res, next){
	let user_id = req.params.userId;
	let sql = `select text from texts where user_id = ${user_id}`;
	let realtime_flg = req.query.realtime;
	if(realtime_flg=="true"){
		sql += ` AND created_at > CURRENT_TIMESTAMP() + interval -30 minute`;
	}
	connection.query(sql, function(err, rows){
		if(err){
			res.json({"Error":true, "Message": err});
		}else{
			res.json({"Error":false, "Message": "Success", "Texts": rows});
		}
	});
});


module.exports = router;
