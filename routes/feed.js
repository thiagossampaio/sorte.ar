var express = require('express');
var router = express.Router();
var url = require("url");

/*
  Implementando a roda de redirecionamento do instagram
*/
router.get('/feed', function(req, res) {
var result_, path_;
  api.authorize_user(req.query.code, redirectUrl(req), function(err, result) {
    if (err) {
      console.log(err);
      res.send("Didn't work");
    }else{
      url_ = url.parse(req.url).path;
      result_ = result;
    }
  }); 
  res.render('feed', { 
  		title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
  		path: url_,
  		result : result_
  });
});

module.exports = router;
