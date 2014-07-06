jQuery(document).ready(function(){

	//login();
	
	jQuery('#instagram-feed').pongstgrm({
	    accessId: jQuery('body').data('client-id'),
	    accessToken: jQuery('body').data('usuario-logado').access_token,
	    column: 'col-xs-12 col-md-4 col-sm-3 col-lg-2',  // you use customized columns
	    count: 15,                      // set the number of media to display
	    user_id: jQuery('body').data('usuario-logado').user.id,
	    show: 'recentes'
	});	

	jQuery('#instagram-profile').pongstgrm({
	    accessId: jQuery('body').data('client-id'),
	    accessToken: jQuery('body').data('usuario-logado').access_token,
	    user_id: jQuery('body').data('usuario-logado').user.id,
        picture_size: '64', // sets profile picture to 64x64 pixels, no need to add px
        //profile_bg_img: "../img/1novo.jpg",
    	//profile_bg_color: '#d9534f',
	    show: 'profile'
	});

});
