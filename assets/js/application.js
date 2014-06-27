var clientId = 'be36280ed5804eaba6c54e5369bc3519';
var clientSecret = '3e2a019830bc4ccc92b5e3ed2f53dddf';

var instagram = new Instagram(clientId);
var d = 0;
var contextPath = 'http://192.168.1.107:8080/sorte.ar';

jQuery(document).ready(function(){

	jQuery('#logout').on('click',function(){
		logout();
	});
	
	jQuery('#logout').on('click',function(){
		logout();
	});

	jQuery('#login').on('click',function(){
		login();
	});	
	
});

function logout(){
	jQuery('body').append('<div style="display:none"><iframe src="https://instagram.com/accounts/logout/" width="0" height="0"></iframe></div>');
	 setTimeout(function(){ 
		 //window.location.href = window.location.href.substr(0, window.location.href.indexOf('#'));
		 window.location.href = contextPath;
	 }, 2000);
}

function login(){
	console.log('entrou');
	instagram.authenticate(2);
}

function carregarFeed(){
	
	if (instagram.authenticate(2)) {
		 
		jQuery('#instagram-feed').pongstgrm({
		    accessId: instagram.clientId,
		    accessToken: instagram.accessToken,
		    column: 'col-lg-5 col-md-4 col-sm-3 col-xs-12',  // you use customized columns
		    count: 20,                      // set the number of media to display
		    show: 'feed'
		});	
		
		jQuery('#instagram-profile').pongstgrm({
		    accessId: instagram.clientId,
		    accessToken: instagram.accessToken,				
		    show: 'profile',
		    picture_size: '64', // sets profile picture to 64x64 pixels, no need to add px
		    //profile_bg_img: '/path/to/image.jpg', // image url
		    profile_bg_color: '#d9534f' // background color
	    });

		jQuery('#login').hide();
		jQuery('#logout').show();
		
	}else{
		
		jQuery('#login').show();
		jQuery('#logout').hide();
	}
	
}


function didLoadInstagram(event, response) {
	console.log('didLoadInstagram');
    var that = this;    
    jQuery.each(response.data, function(i, photo) {
      jQuery(that).append(createPhotoElement(photo));
    });
}

function createPhotoElement(photo) {
	var templateFoto = jQuery('#templateFoto').html();
	Mustache.parse(templateFoto);

	var rendered = Mustache.render(templateFoto, photo);
	jQuery('#grid-fotos').append(rendered);

	var foto = jQuery('.'+photo.id);	
    foto.delay(d).fadeIn(2000);
    d += 100;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
