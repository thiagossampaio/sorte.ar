jQuery(document).ready(function(){

	login();
	
	jQuery('#instagram-feed').pongstgrm({
	    accessId: instagram.clientId,
	    accessToken: instagram.accessToken,
	    column: 'col-xs-12 col-md-4 col-sm-3 col-lg-2',  // you use customized columns
	    count: 15,                      // set the number of media to display
	    show: 'profile'
	});

/*	jQuery('#instagram-feed').pongstgrm({
		show: 'feed',
		picture_size: '64', // sets profile picture to 64x64 pixels, no need to add px
		//profile_bg_img: '/path/to/image.jpg', // image url
		profile_bg_color: '#d9534f' // background color
	});	*/	
	
});
