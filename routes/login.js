const express = require('express');
const router = express.Router();
const connection = require('../mysqlconnect.js');

router.get('/', function(req, res, next) {

  res.render('login');
});

router.post('/', function(req, res, next) {
  if(req.body.email) {
    let email = req.body.email;
    let pass = req.body.password;
    sql = `select id from viewers where email = "${email}" and password = "${pass}" limit 1`;
    connection.query(sql, function(err, rows){
      if(err){
        let err = '入力正しくありません。確認して再入力してください。';
        res.render('login', {error: err});
      }else{
      	let viewer_id = rows[0];
        req.session.viewer_id = {id: viewer_id};
        res.redirect('../');
      }
    })
  }else{
    let err = '入力が正しくありません。確認して再入力してください。';
    res.render('login', {error: err});
  }
});

module.exports = router;
