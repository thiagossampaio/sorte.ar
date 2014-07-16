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
		    
		    Mustache.parse(comentarios);
		    
		    if (data) {

				jQuery(data.data).each(function(i){
				    
				    var c = data.data[i];
				    var renderedComentarios = Mustache.render(comentarios, c);
				    jQuery('#roullete').append(renderedComentarios);
				    
				});
		    }
		},
		complete : function(j, s){
		    itens = jQuery('.item');
		    quantidadeItens = jQuery('.item').length;
		    gerarRoullet();
		}
	    }).done(function(){
	    });
	    
	}catch(e){
	    alert(e);
	}
	
    } else {
    }
    
});

function gerarRoullet(){
    option = {
		speed : 100,
		duration : 2,
		stopImageNumber : sorteado,
		startCallback : function(){
		    sorteado = Math.floor(Math.random() * itens.length);
		    jQuery('.roulette_container').removeClass('well-sorteado');
		    jQuery('#sorteio_vencedor_nome').text('');
		    jQuery('#sorteio_vencedor_usuario').text('');
		    jQuery('#sorteio_data').text('');
		},
		slowDownCallback : function(){
		},
		stopCallback : function($stopElm){
		    jQuery('.roulette_container').addClass('well-sorteado');
		    jQuery('#sorteio_vencedor_nome').text($stopElm.data('full-name'));
		    jQuery('#sorteio_vencedor_usuario').text('@'+ $stopElm.data('username'));
		}
    }

    rouletter = $('div.roulette');
    rouletter.roulette(option);
    
    jQuery('.start').click(function(){
	rouletter.roulette('start');
    });
    
    jQuery('.stop').click(function(){
	rouletter.roulette('stop');
    });
    
}

