$(document).ready(function(){
	$('.popup .close_window, .overlay').click(function (){
		$(this).parents('div.session').children('.popup').css({'opacity':'0', 'visibility':'hidden'});
		$(this).parents('div.session').children('.overlay').css({'opacity':'0', 'visibility':'hidden'});
	});
	$('.button_icon-look').click(function (e){
		console.log($(this).parents('div.session').children('.popup'));
		$(this).parents('div.session').children('.popup').css({'opacity':'1', 'visibility':'visible'});
		$(this).parents('div.session').children('.overlay').css({'opacity':'1', 'visibility':'visible'});
		e.preventDefault();
	});
});

