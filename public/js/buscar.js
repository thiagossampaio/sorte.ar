var buscarContainer = jQuery('#buscar-container').html();

jQuery(document).ready(function(){

	jQuery("#buscar-query").on('keyup', function(){
		jQuery("#buscar-query").val(jQuery("#buscar-query").val().split("@").join(""));
	});

	jQuery('form:first').on('submit', function(e){
		buscar();
		e.preventDefault();
	});

	jQuery('#buscar').on('click',function(e){
		buscar();
		e.preventDefault();
	});
});

function buscar(){
	var query = jQuery("#buscar-query").val();
	if(query){
		query = query.split("@").join("");
		console.log(query);
		jQuery('p.buscar-msg').removeClass('in');
		jQuery.post('/buscar', {username: query}, function(data){

			if(data){

				Mustache.parse(buscarContainer);
				var renderedBuscarContainer = Mustache.render(buscarContainer, {});
				jQuery('#instagram-container').html(renderedBuscarContainer);  

				jQuery('#instagram-buscar').pongstgrm({
				    accessId: jQuery('#dados').data('client-id'),
				    accessToken: jQuery('#dados').data('usuario-logado').access_token,
				    column: 'col-xs-12 col-md-4 col-sm-3 col-lg-2',  // you use customized columns
				    count: 20,                      // set the number of media to display
				    user_id: data[0].id,
				    show: 'recentes'
				});					
			}

		}).fail(function(err) {
			jQuery('p.buscar-msg').text(err.responseText);
			jQuery('p.buscar-msg').addClass('in');
		});	
	}	
}
