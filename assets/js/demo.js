var itens, quantidadeItens, rouletter, option, sorteado;

function gerarRoullet() {
	option = {
		speed : 5,
		duration : 5,
		stopImageNumber : sorteado,
		startCallback : function() {
			sorteado = Math.floor(Math.random() * itens.length);
			console.log(sorteado);
			console.log('startCallback');
			jQuery('.roulette_container').removeClass('well-sorteado');
		},
		slowDownCallback : function() {
			console.log('slowDownCallback');
		},
		stopCallback : function($stopElm) {
			console.log('stopCallback', $stopElm);
			jQuery('.roulette_container').addClass('well-sorteado');
		}
	}

	rouletter = $('div.roulette');
	rouletter.roulette(option);

	jQuery('.start').click(function() {
		rouletter.roulette('start');
		console.log('start');
	});

	jQuery('.stop').click(function() {
		rouletter.roulette('stop');
	});

	console.log('terminou');
}

jQuery(document).ready(function() {
	itens = jQuery('.item');
	quantidadeItens = jQuery('.item').length;
	gerarRoullet();
});
