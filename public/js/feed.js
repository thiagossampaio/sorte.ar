jQuery(document).ready(function(){

	//login();
	
	jQuery('#instagram-feed').pongstgrm({
	    accessId: jQuery('body').data('client-id'),
	    accessToken: jQuery('body').data('usuario-logado').access_token,
	    column: 'col-xs-12 col-md-4 col-sm-3 col-lg-2',  // you use customized columns
	    count: 15,                      // set the number of media to display
	    show: 'feed'
	});
	
});
