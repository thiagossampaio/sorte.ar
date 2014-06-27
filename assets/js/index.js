jQuery(document).ready(function(){

	jQuery("#carregar").on('click',function(){
		
		jQuery('#grid-fotos').html('');
	    jQuery('.instagram').on('didLoadInstagram', didLoadInstagram);

	    jQuery('.instagram').instagram({
	      hash: 'love',
	      count: 25,
	      clientId: clientId
	    });	
	    jQuery('#grid-fotos').removeClass('hide');

	});
	
});

