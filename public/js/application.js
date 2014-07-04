var clientId = 'be36280ed5804eaba6c54e5369bc3519';
var clientSecret = '3e2a019830bc4ccc92b5e3ed2f53dddf';
var d = 0;
var contextPath = 'http://localhost:3000/sorte.ar';

jQuery(document).ready(function(){

	jQuery('#logout').on('click',function(){
		logout();
	});
	
});

function logout(){
	jQuery('body').append('<div style="display:none"><iframe src="https://instagram.com/accounts/logout/" width="0" height="0"></iframe></div>');
	 setTimeout(function(){ 
		 //window.location.href = window.location.href.substr(0, window.location.href.indexOf('#'));
		 window.location.href = contextPath;
	 }, 2000);
}