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

Date.prototype.format = function(format){
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}