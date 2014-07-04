var express = require('express'), engine = require('ejs-locals');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require("url");
var redirect_uri = "http://localhost:3000/instagram_redirect";
var usarioLogado;
var client_id = 'be36280ed5804eaba6c54e5369bc3519';
var client_secret =  '3e2a019830bc4ccc92b5e3ed2f53dddf';
/**
  Parametros de configuração da api do instagram
*/
var api = require('instagram-node').instagram();
api.use({
  client_id: client_id,
  client_secret: client_secret
});

/*Routes*/
var index = require('./routes/index');
//var feed = require('./routes/feed');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

/*
  Implementando a rota de autorização do usuario instagram
*/
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};
app.get('/login', exports.authorize_user);

/*
  Implementando a roda de redirecionamento do instagram
*/
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    console.log(err,result);
    if (err) {
      console.log(err);
      res.send("Didn't work");
    } else {
      usarioLogado = result;
      res.redirect('/feed');
    }
  });
};
app.get('/instagram_redirect', exports.handleauth);

app.use('/', index);
//app.use('/feed', feed);
app.get('/feed', function(req, res){
  console.log(url.parse(req.url));
  res.render('feed', { 
      title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
      path: url.parse(req.url).path,
      usarioLogado : usarioLogado,
      client_id: client_id,
      client_secret: client_secret
  });
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
