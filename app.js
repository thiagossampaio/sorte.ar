var express = require('express'), engine = require('ejs-locals');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require("url");
var fs    = require('fs');
var nconf = require('nconf');
var expressLayouts = require('express-ejs-layouts');
var usarioLogado;
var client_id;
var client_secret;
var contextPath;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout_principal')
app.use(expressLayouts);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

// development  error handler
// will print stacktrace
nconf.argv().env();
console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
if (nconf.get('NODE_ENV') == 'production') {

  client_id = '209a14dbcc1046e29d2f918da8e35e61';
  client_secret =  '3dc5ce58724b4045b9eca63b161a3c86';  
  contextPath = 'http://sorte.herokuapp.com/';

}else{

  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
  client_id = 'be36280ed5804eaba6c54e5369bc3519';
  client_secret =  '3e2a019830bc4ccc92b5e3ed2f53dddf';  
  contextPath = 'http://localhost:3000/';

}
var redirect_uri = contextPath + 'instagram_redirect';

/**
  Parametros de configuração da api do instagram
*/
var api = require('instagram-node').instagram();
api.use({
  client_id: client_id,
  client_secret: client_secret
});

app.get('/', function(req, res){
    res.render('index', { 
        title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
        usarioLogado : usarioLogado,
        contextPath: contextPath,
        client_id: client_id,
        client_secret: client_secret,
        layout: 'layout_principal'
    }); 
});

/*
  Implementando a rota de autorização do usuario instagram
*/
app.get('/login', function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
});

/*
  Implementando a roda de redirecionamento do instagram
*/
app.get('/instagram_redirect', function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      usarioLogado = result;
      res.redirect('/recentes');
    }
  });
});

app.get('/feed', function(req, res){
  console.log(url.parse(req.url));
  if(usarioLogado){
    res.render('feed', { 
        title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
        path: url.parse(req.url).path,
        usarioLogado : usarioLogado,
        contextPath: contextPath,
        client_id: client_id,
        client_secret: client_secret,
        layout: 'layout_comun'
    });
  }else{
    res.redirect('/');
  }
});

app.get('/recentes', function(req, res){
  if(usarioLogado){
    res.render('recentes', { 
        title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
        path: url.parse(req.url).path,
        contextPath: contextPath,
        usarioLogado : usarioLogado,
        client_id: client_id,
        client_secret: client_secret,
        layout: 'layout_comun'
    });
  }else{
    res.redirect('/');
  }
});

app.get('/sortear/:usuario/media/:media', function(req, res){
  if(usarioLogado){
    res.render('sortear', { 
        title: 'Sorte.ar | Faça aqui o seus sorteios do Instagram',
        path: url.parse(req.url).path,
        usarioLogado : usarioLogado,
        contextPath: contextPath,
        client_id: client_id,
        client_secret: client_secret,
        usuario: req.param("usuario"),
        media: req.param("media"),
        layout: 'layout_comun'
    });
  }else{
    res.redirect('/');
  }
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

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
