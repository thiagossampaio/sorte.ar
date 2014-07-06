var fotoPrincipal = jQuery('#fotoPrincipal').html();
var comentarios = jQuery('#comentarios').html();
var itens, quantidadeItens, rouletter, option, sorteado;

jQuery(document).ready(function(){
    
    var accessToken = jQuery('#dados').data('usuario-logado').access_token;
    var media = jQuery('#dados').data('media');
    
    if (accessToken && media) {
	
	/**
	 * Carregando media principal
	 */
	jQuery.ajax({
	    url : 'https://api.instagram.com/v1/media/' + media + '?access_token=' + accessToken,
	    cache : true,
	    method : 'GET',
	    dataType : 'jsonp',
	    success : function(data){
		Mustache.parse(fotoPrincipal);
		var renderedFotoPrincipal = Mustache.render(fotoPrincipal, data.data);
		jQuery('#fotos-container').append(renderedFotoPrincipal);
	    }
	
	});
	
	/**
	 * Carregando os comentários
	 */
	try{
	    
	    jQuery.ajax({
		url : 'https://api.instagram.com/v1/media/' + media + '/comments?access_token=' + accessToken,
		cache : true,
		method : 'GET',
		dataType : 'jsonp',
		success : function(data){
		    
		    console.log('success');
		    Mustache.parse(comentarios);
		    
		    if (data) {

				jQuery(data.data).each(function(i){
				    
				    var c = data.data[i];
				    console.log();
				    var renderedComentarios = Mustache.render(comentarios, c);
				    jQuery('#roullete').append(renderedComentarios);
				    
				});
		    }
		},
		complete : function(j, s){
		    console.log('complete');
		    itens = jQuery('.item');
		    quantidadeItens = jQuery('.item').length;
		    gerarRoullet();
		}
	    }).done(function(){
		console.log('donw');
	    });
	    
	}catch(e){
	    alert(e);
	}
	
    } else {
		console.log('else');
    }
    
});

function gerarRoullet(){
    option = {
		speed : 5,
		duration : 5,
		stopImageNumber : sorteado,
		startCallback : function(){
		    sorteado = Math.floor(Math.random() * itens.length);
		    console.log(sorteado);
		    console.log('startCallback');
		    jQuery('.roulette_container').removeClass('well-sorteado');
		},
		slowDownCallback : function(){
		    console.log('slowDownCallback');
		},
		stopCallback : function($stopElm){
		    console.log('stopCallback', $stopElm);
		    jQuery('.roulette_container').addClass('well-sorteado');
		    jQuery('#sorteio_vencedor_nome').text($stopElm.data('full-name'));
		    jQuery('#sorteio_vencedor_usuario').text('@'+ $stopElm.data('username'));
		    jQuery('#sorteio_data').text(new Date().format("dd/MM/yyyy"));
		}
    }

    rouletter = $('div.roulette');
    rouletter.roulette(option);
    
    jQuery('.start').click(function(){
	rouletter.roulette('start');
	console.log('start');
    });
    
    jQuery('.stop').click(function(){
	rouletter.roulette('stop');
    });
    
    console.log('terminou');
}

Date.prototype.format = function(format){
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}
