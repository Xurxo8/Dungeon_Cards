$(document).ready(function(){
	$.getJSON('./servidor/cargarCartas.php')
		.done(function(erro){
			
		})
		.fail(function(erro){
			alert('Problemas ao cargar as cartas');
		});
});