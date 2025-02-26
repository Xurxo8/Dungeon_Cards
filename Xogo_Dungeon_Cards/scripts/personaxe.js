$(document).ready(function(){
  // Lista codigo teclas javascript -> https://www.freecodecamp.org/espanol/news/lista-de-codigos-de-teclas-en-javascript/
  window.addEventListener("keydown", evento => {
    switch (evento.key) {
      case "ArrowUp":
        moverPersonaxe('arriba');
        break;
    
      case "ArrowDown":
        moverPersonaxe('abaixo');
        break;
    
      case "ArrowLeft":
        moverPersonaxe('esquerda');
        break;
    
      case "ArrowRight":
        moverPersonaxe('dereita');
        break;
    
      default:
        // alert("Para mover o personaxe usa as frechas do teclado")
        break;
    }
  });

  let posActual = "";
  function moverPersonaxe(direccion){
	  // =============== GARDAR POSICIÓN ACTUAL DO PERSONAXE ==============
    
    let novaPos = "";
    let xogador = $('#xogador').html();
    let xogadorCompleto = $('#xogador').prop('outerHTML');

		for (let [key, value] of taboleiro) {
      // Eliminamos epsacios e tabulacions dos string -> .trim().replace(/\n\s+/g, '\n')
			if(value.trim().replace(/\n\s+/g, '\n') === xogador.trim().replace(/\n\s+/g, '\n')){
        posActual = key;
        break;
      }
		} 

    // Gardamos as coordenadas da posicion actual en variables distintas pa filas e columas
    let [fila, col] = posActual.split(',').map(Number); // .map(Number) -> convierte cada elemento nun número

    // ==================================================================
    // =============== MOVEMENTO DO PERSONAXE ===============
    // ==================================================================    
    switch (direccion) {
      case "dereita":
        if(col < 3){ // filas e columnas empezan en 1
          novaPos = `${fila},${col + 1}`;
          taboleiro.set(posActual, elementoAleatorio()); // Xerar elemento na celda anterior
          taboleiro.set(novaPos, xogadorCompleto); // Mover personaje
          posActual = novaPos; // Actualiza a posición actual do personaxe
        }
        break;

      case "esquerda":
        if(col > 1){
          novaPos = `${fila},${col - 1}`;
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;

      case "arriba":
        if(fila > 1){
          novaPos = `${fila - 1},${col}`;
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;

      case "abaixo":
        if(fila < 3){
          novaPos = `${fila + 1},${col}`;
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;
    }

    console.log('Post swich -> ' + posActual);


    // Cargar a cuadricula coas novas posicions do map
    cargarCuadricula();
	}

	// Interactuar cos inimigos
});


