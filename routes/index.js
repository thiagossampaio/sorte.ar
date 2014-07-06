var express = require('express');
var router = express.Router();
var url = require("url");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  		title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
  		path: url.parse(req.url).path,
  		layout: 'someSpecificLayout'
  });
});

module.exports = router;
