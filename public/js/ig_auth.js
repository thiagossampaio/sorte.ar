
function IG(clientId, clientSecret) {
  
  /**
   * The client ID of this API client.
   * @type {string}
   */
  this.clientId = clientId;
  /**
   * The client ID of this API client.
   * @type {string}
   */
  this.clientSecret = clientSecret;

  /**
    Código de retorno do passo 02 da autenticação do Instagram
  */
  this.codigo = getParameterByName('code') || null;

  /**
   * The access token to do API calls on the user's behalf. Will only be
   * available if the user is authenticated.
   * @type {?string}
   */
  this.accessToken = getParameterByName('access_token') || null;

}

/**
 * The URL to direct the browser to when authenticating.
 * @const
 */
IG.AUTH_URL = 'https://api.instagram.com/oauth/authorize/';

IG.ACCESS_TOKEN_URL = 'https://api.instagram.com/oauth/access_token';

/**
 * The base URL for all API calls.
 * @const
 */
IG.BASE_URL = 'https://api.instagram.com/v1';
/**
 * The base URL for all API calls.
 * @const
 */
IG.REDIRECT_URI = 'http://localhost:3000/sorte.ar/fotos.html';

IG.SCOPE = 'basic';

/**
 * Turns a query string (after ? or #) into a key/value object.
 * @param {string} queryString The query string.
 * @return {Object.<string, (string|boolean)>} A map of values in the query
 *     string.
 * @private
 */
IG.deQueryString_ = function (queryString) {
  var params = {};

  var parts = queryString.split('&');
  parts.forEach(function(part) {
    var keyValue = part.split('=');
    var key = unescape(keyValue[0]);
    // If there is no equals sign, the value will be boolean true instead.
    if (keyValue.length == 1) {
      params[key] = true;
    } else {
      params[key] = unescape(keyValue[1].replace(/\+/g, '%20'));
    }
  });

  return params;
};

/**
 * Turns a key/value object into a query string.
 * @param {Object} params A map of values to turn into a query string.
 * @return {string} The query string.
 * @private
 */
IG.queryString_ = function (params) {
  var parts = [];
  for (var key in params) {
    var value = params[key];
    if (!value) continue;
    // If the value is not a string, the equals sign and value will not be
    // included.
    if (typeof value == 'string') {
      parts.push(escape(key) + '=' + escape(value).replace(/%20/g, '+'));
    } else {
      parts.push(escape(key));
    }
  }
  return parts.join('&');
}

IG.prototype.authenticate = function (opt_scope) {

  if(this.accessToken) return true;

  // TODO(blixt):
  // This function should check/set cookies so that the browser doesn't always
  // have to be sent to IG.com.
  if (this.codigo){
    var codigo = this.codigo;
    var d = {
      client_id: 'be36280ed5804eaba6c54e5369bc3519',
      client_secret: '3e2a019830bc4ccc92b5e3ed2f53dddf',
      grant_type: 'authorization_code',
      //redirect_uri:  'asdadasdasdas',
      redirect_uri:  escape('http://localhost:8080/sorte.ar/fotos.html'),
      code: codigo
    };

    var data2 =       
      'client_id=be36280ed5804eaba6c54e5369bc3519&grant_type=authorization_code&' + 
      //'redirect_uri=' + escape('http://localhost:8080/sorte.ar/fotos.html&') +
      'redirect_uri=' + escape('http://localhost:8080/sorte.ar/fotos.html&') +
      'code=' + codigo;
    

/*
curl \-F 'client_id=CLIENT-ID' \
    -F 'client_secret=CLIENT-SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=YOUR-REDIRECT-URI' \
    -F 'code=CODE' \https://api.instagram.com/oauth/access_token
*/

    jQuery.ajax({
      url : 'https://api.instagram.com/oauth/access_token',
      type: 'POST',
      dataType: 'json',
      data: {
        client_id: 'be36280ed5804eaba6c54e5369bc3519',
        client_secret: '3e2a019830bc4ccc92b5e3ed2f53dddf',
        grant_type: 'authorization_code',
        //redirect_uri:  'asdadasdasdas',
        redirect_uri:  'http://localhost:3000/sorte.ar/fotos.html',
        code: codigo
      },
      success: function(d){
        console.log(d);
      },
      error: function(i,j){
        console.log(i,j);
      }
    });

  }else{

    location.href = IG.AUTH_URL + '?' + IG.queryString_({
      client_id: this.clientId,
      redirect_uri:  IG.REDIRECT_URI,
      response_type: 'code'
    });

  }

  return false;
};