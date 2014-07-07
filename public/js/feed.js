jQuery(document).ready(function(){

	jQuery('#instagram-feed').pongstgrm({
	    accessId: jQuery('#dados').data('client-id'),
	    accessToken: jQuery('#dados').data('usuario-logado').access_token,
	    column: 'col-xs-12 col-md-4 col-sm-3 col-lg-2',  // you use customized columns
	    count: 20,                      // set the number of media to display
	    show: 'feed'
	});
	
});
