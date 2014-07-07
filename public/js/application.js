jQuery(document).ready(function(){

	jQuery('#logout').on('click',function(){
		logout();
	});
	
});

function logout(){
	jQuery('body').append('<div style="display:none"><iframe src="https://instagram.com/accounts/logout/" width="0" height="0"></iframe></div>');
	 setTimeout(function(){ 
		 window.location.href = jQuery('#dados').data('context-path');
	 }, 2000);
}