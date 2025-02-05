$(document).ready(function(){
	// ========== CARGAR PERSONAXES ==========
	$.getJSON('./servidor/cargarPersonaxe.php')
		.done(function(heroes){
			$(document).on('click', '#seleccionPersonaxe', function(){
				document.body.innerHTML = `
					Buscando personaxes...
				`;
				console.log(heroes);
			});
		})
		.fail(function(erro){
			alert('Problemas para encontrar heroes');
		});
});