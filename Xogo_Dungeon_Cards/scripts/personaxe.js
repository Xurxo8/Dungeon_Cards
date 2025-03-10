$(document).ready(function(){
  // Coordenadas coas que moveremos ao personaxe
  let posActual = "";
  let novaPos = "";

  // Lista codigo teclas javascript -> https://www.freecodecamp.org/espanol/news/lista-de-codigos-de-teclas-en-javascript/
  window.addEventListener("keydown", evento => {
    let [fila, col] = obterPosicionActual();

    switch (evento.key) {
      case "ArrowUp":
        novaPos = `${fila - 1},${col}`;
        
        // Se dentro da cela hay un inimigo, combatirá co personaxe antes de moverse
        if($(taboleiro.get(novaPos)).attr('class') == 'inimigo'){ 
          combate(posActual, novaPos);
          break;
        }

        recollerObxecto();
        moverPersonaxe('arriba');
        break;
    
      case "ArrowDown":
        novaPos = `${fila + 1},${col}`;

        if($(taboleiro.get(novaPos)).attr('class') == 'inimigo'){
          combate(posActual, novaPos);
          break;
        }

        recollerObxecto();
        moverPersonaxe('abaixo');
        break;
    
      case "ArrowLeft":
        novaPos = `${fila},${col - 1}`;

        if($(taboleiro.get(novaPos)).attr('class') == 'inimigo'){
          combate(posActual, novaPos);
          break;
        }

        recollerObxecto();
        moverPersonaxe('esquerda');
        break;
    
      case "ArrowRight":
        novaPos = `${fila},${col + 1}`;

        if($(taboleiro.get(novaPos)).attr('class') == 'inimigo'){
          combate(posActual, novaPos);
          break;
        }

        recollerObxecto();
        moverPersonaxe('dereita');
        break;
    
      default:
        // alert("Para mover o personaxe usa as frechas do teclado")
        break;
    }
  });

  // ========== OBTER COORDENADAS PARA MOVER O PERSONAXE
  function obterPosicionActual(){
    // =============== GARDAR POSICIÓN ACTUAL DO PERSONAXE ==============
    let xogador = $('#xogador').html();

		for (let [key, value] of taboleiro) {
      // Eliminamos epsacios e tabulacions dos string -> .trim().replace(/\n\s+/g, '\n')
			if(value.trim().replace(/\n\s+/g, '\n') === xogador.trim().replace(/\n\s+/g, '\n')){
        posActual = key;
        break;
      }
		} 

    // Gardamos as coordenadas da posicion actual en variables distintas pa filas e columas
    let [fila, col] = posActual.split(',').map(Number); // .map(Number) -> convierte cada elemento nun número

    return [fila, col];
  }

  // ==================================================================
  // =============== MOVEMENTO DO PERSONAXE ===============
  // ==================================================================  
  function moverPersonaxe(direccion){
	  let [fila, col] = obterPosicionActual();
    let xogadorCompleto = $('#xogador').prop('outerHTML');
      
    switch (direccion) {
      case "dereita":
        if(col < 3){ // filas e columnas empezan en 1
          taboleiro.set(posActual, elementoAleatorio()); // Xerar elemento na celda anterior
          taboleiro.set(novaPos, xogadorCompleto); // Mover personaje
          posActual = novaPos; // Actualiza a posición actual do personaxe
        }
        break;

      case "esquerda":
        if(col > 1){
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;

      case "arriba":
        if(fila > 1){
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;

      case "abaixo":
        if(fila < 3){
          taboleiro.set(posActual, elementoAleatorio());
          taboleiro.set(novaPos, xogadorCompleto);
          posActual = novaPos;
        }
        break;
    }

    // Cargar a cuadricula coas novas posicions do map
    cargarCuadricula();
	}
});

// ==================================================================
// ============== INTERACCIONS COS INIMIGOS E OBXECTOS ==============
// ==================================================================
// Comprobar que hai na cela a que se vai mover
function combate(posActual, novaPos){
  let seguinteCela = taboleiro.get(novaPos);// Contido da cela a que nos vamos mover
  let vidaInimigo = parseInt($(seguinteCela).find('.puntosVida').text().trim());
  let vidaPersonaxe = parseInt($('#xogador .puntosVida label').text().trim());
  let arma = $('#arma img');
  let puntosArma = parseInt($('#xogador .cantidade').text().trim()); // A espada perderá a cantidade correspondente a vida total do inimigo
  let desgaste = puntosArma - vidaInimigo;

  // Comprobar se o usuario está armado
  if(arma.length === 0){
    // O personaxe perderá a vida correspondente a vida total do inimigo
    let novaVida = vidaPersonaxe - vidaInimigo;

    // Se o personaxe se queda sen puntos de vida, remata a partida
    if(novaVida <= 0){
      finPartida();
    }else{
      // Se sobrevive actualizamos a cantidade de vida restante
      $('#xogador .puntosVida label').text(novaVida);
    }
  }else{
    // === Se o desgaste é negativo === 
    if(desgaste <= 0){
      // O inimigo sobrevive
      let vidaRestanteInimigo = desgaste * -1;

      // Perdemos a arma
      let xogadorDesarmado = `
        <div id="xogador" class="cela">
          <div id="arma"></div>
          <div class="puntosVida">
            <label>10</label>
            <img src="./imaxes/corazon.png" alt="">
          </div>
          <img src="./imaxes/personaxes/cabaleiro.png" alt="">
          <p class="nomeItem">Heroe</p>
          <div class="cantidade"></div>
        </div>
      `;

      // Gardar o HTML do xogador actualizado
      taboleiro.set(posActual, xogadorDesarmado);

      // Modifica o contenido dentro do label usando una expresión regular
      let novoHTML = seguinteCela.replace(/(<label[^>]*>)(.*?)(<\/label>)/, `$1${vidaRestanteInimigo}$3`);

      // Guardamos o HTML actualizado no map
      taboleiro.set(novaPos, novoHTML);

      // Cargamos a cuadricula cos novos datos
      cargarCuadricula();
    }else{
      $('#xogador .cantidade').text(desgaste);
    
      // O inimigo desaparece e aparece a recompensa (moedas)
      let recompensa = `
        <img class="moeda" src="./imaxes/cartas/moeda.png" alt="">
        <p class="nomeCarta">moeda</p>
        <div class="cantidade">${vidaInimigo}</div>
      `;

      // Actualizar estado da arma
      let estadoArma = `
        <div id="xogador" class="cela">
          <div id="arma">
            <img src="./imaxes/cartas/espada.png" alt="">
          </div>
          <div class="puntosVida">
            <label>10</label>
            <img src="./imaxes/corazon.png" alt="">
          </div>
          <img src="./imaxes/personaxes/cabaleiro.png" alt="">
          <p class="nomeItem">Heroe</p>
          <div class="cantidade">${desgaste}</div>
        </div>
      `;

      taboleiro.set(posActual, estadoArma);
      
      // Poñer a recompensa na cela correspondente
      taboleiro.set(novaPos, recompensa);

      // Cargamos a cuadricula cos novos datos
      cargarCuadricula();
    }
  }
}

function recollerObxecto(){}

// ==================================================================
// =============== FIN PARTIDA - Carga menú final ===============
// ==================================================================
function finPartida(){
  // Limpamos o body e creamos o formulario para garar os datos
  $('body').html(`
    <div id="datosPartida">
      <h1>Fin da partida</h1>
        <div id="puntuacion">
          <p><img src="./imaxes/cartas/moeda_bordo_recortado.png"></p>
          <p>${$('#puntos').text()}</p>
        </div>
        <div id="datosXogador">
          <p>Nome xogador:</p>
          <div><input id="nomeXogador" type="text"><img src="./imaxes/icono_gardar.svg" onclick="gardarDatos()" title="Gardar datos"></div>
        </div>
        <div id="novaPartida">
          <p>Nova partida?</p>
          <div>
            <button onclick="cargarMazmorra()">SI</button>
            <button onclick="cargarMenu()">NON</button>
          </div>
        </div>
    </div>
  `);
}

// ==================================================================
// =============== GARDAR DATOS NA BD ===============
// ==================================================================
function gardarDatos(){}