var fotoPrincipal = jQuery('#fotoPrincipal').html();
var comentarios = jQuery('#comentarios').html();
var itens, quantidadeItens, rouletter, option, sorteado;

jQuery(document).ready(function(){
    
    var accessToken = getParameterByName('accessToken');
    var media = getParameterByName('media');
    
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
	
    }
    
});

function gerarRoullet(){
    option = {
	speed : 2,
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
