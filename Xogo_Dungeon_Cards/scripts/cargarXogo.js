$(document).ready(function(){
  cargarMenu();
});
// ==================================================================
// ========== CARGAR PANTALLA DE INICIO ==========
// ==================================================================
function cargarMenu() {
  $('body').html(`<div id="inicio">
      <div id="titulo">
        <img src="imaxes/Logo/Logo4.png" alt="logo">
        <img id="antorcha1" class="antorcha" src="./imaxes/antorcha.gif" alt="gif">
        <img id="antorcha2" class="antorcha" src="./imaxes/antorcha.gif" alt="gif">
      </div>
      <div id="menu">
        <ul>
          <li id="xogar" onclick="cargarMazmorra()">xogar</li>
          <li id="seleccionPersonaxe">Seleccionar personaxe</li>
          <li id="cargarClasificacion">Clasificación</li>
        </ul>
      </div>
    </div>
  `);
}

// ==================================================================
// ========== CARGAR MAZMORRA ==========
// ==================================================================
function cargarMazmorra() {
  $('body').html(`
    <div id="taboleiro">
      <div id="puntuacion">
        <div id="puntos">0</div>
        <img src="./imaxes/cartas/moeda_bordo_recortado.png" alt="moeda_bordo_recortado">
      </div>

      <div id="cuadricula"></div>

      <div id="menuInferior">
        <div id="sair">
          <p onclick="cargarMenu()"><img src="./imaxes/atras_icono.png" alt="atras_icono"></p>
        </div>
        <div id="itemActual">
          <img src="./imaxes/cartas/espada.png" alt="espada.png">
          <img id="frecha" src="./imaxes/frecha.png" alt="frecha.png">
          <img src="./imaxes/cartas/moeda.png" alt="moeda.png">
        </div>
      </div>
    </div>
  `);

  // ========== GARDAR CONTIDO NO MAP ==========
  for (let f = 1; f <= FILAS; f++) {
    for(let c = 1; c <= COLUMNAS; c++){
      taboleiro.set(`${f},${c}`, elementoAleatorio());
    }		
  }

  // ========== COLOCAR O PERSONAXE NO CENTRO ==========
  taboleiro.set('2,2', `
      <div id="arma">
        <img src="./imaxes/cartas/espada.png" alt="">
      </div>
      <div class="puntosVida">
        <label>10</label>
        <img src="./imaxes/corazon.png" alt="">
      </div>
      <img src="./imaxes/personaxes/cabaleiro.png" alt="">
      <p class="nomeItem">Heroe</p>
      <div class="cantidade">10</div>
  `);

  // tutorial();
  cargarCuadricula();

  // Engadimoslle un id a cela do xogador
  $('.cela').eq(4).attr('id', 'xogador');
}

// ==================================================================
// ========== XERAR OS ITEMS DO TABOLEIRO ==========
// ==================================================================
// Crear o map() para gardar as posicions das celdas
// INFO Map y set JS -> https://es.javascript.info/map-set
let taboleiro = new Map();

const FILAS = 3;
const COLUMNAS = 3;

// ==================================================================
// =============== CARGAR E ALMACENAR INIMIGOS ===============
// ==================================================================
let almacenInimigos = [];
$.getJSON('./servidor/cargarInimigos.php')
  .done(function(inimigos) {
    for(let i = 0; i < inimigos.length; i++){
      almacenInimigos[i] = inimigos[i];
    }
  })
  .fail(function(erro) {
    alert("ERRO ao cargar inimigos");
  });

// ==================================================================
// =============== CARGAR E ALMACENAR OBEXECTOS ===============
// ==================================================================
let almacenObxectos = [];
$.getJSON('./servidor/cargarObxectos.php')
  .done(function(obxectos) {    
    for (let i = 0; i < obxectos.length; i++) {
      almacenObxectos[i] = obxectos[i];          
    }
  })
  .fail(function(erro) {
    alert("ERRO ao cargar obexectos");
  });

// ==================================================================
// =============== CARGAR E ALMACENAR ARMAS ===============
// ==================================================================
let almacenArmas = [];
$.getJSON('./servidor/cargarArmas.php')
  .done(function(armas) {
    for (let i = 0; i < armas.length; i++) {
      almacenArmas[i] = armas[i];
    }
  })
  .fail(function(erro) {
    alert("ERRO ao cargar o armamento");
  });

// Array do que cargaremos os items ou inimigos
let mazo = ['almacenInimigos', 'almacenArmas', 'almacenObxectos'];

// ==================================================================
// =============== CARGAR ELEMENTOS ALEATORIAMENTE ===============
// ==================================================================
// Ruleta ponderada
function elementoAleatorio() {
  const PESOS = [0.45, 0.1, 0.45]; // Probabilidades para INIMIGOS, ARMAS e OBXECTOS
  let random = Math.random();
  let sum = 0;

  for (let i = 0; i < PESOS.length; i++) {
    sum += PESOS[i];
    if (random <= sum) {
      // Seleecionamos un obxecto do mazo e gardamolo no map
      switch(mazo[i]){
        case 'almacenInimigos':
          let codInimigo = numerosAleatorios(0, almacenInimigos.length - 1);
          let inimigo = almacenInimigos[codInimigo];
          return `
            <div class="inimigo">
              <div class="puntosVida">
                <label>${inimigo.vida}</label>
                <img src="./imaxes/corazon.png" alt="">
              </div>
              <img src="./imaxes/cartas/${inimigo.nome}.png" alt="">
              <p class="nomeCarta">${inimigo.nome}</p>
            </div>
          `;

        case 'almacenArmas':
          let codArma = numerosAleatorios(0, almacenArmas.length - 1);
          let arma = almacenArmas[codArma];
          return `
            <div class="arma"> 
              <img src="./imaxes/cartas/${arma.nome}.png" alt="">
              <p class="nomeCarta">${arma.nome}</p>
              <div class="cantidade">${arma.dano}</div>
            </div> 
          `;

        case 'almacenObxectos':
          let codObxecto = numerosAleatorios(0, almacenObxectos.length - 1);
          let obxecto = almacenObxectos[codObxecto];
          
          switch(obxecto.nome){
            case 'pocion_vida':
              return `
                <img class="${obxecto.nome}" src="./imaxes/cartas/${obxecto.nome}.png" alt="">
                <p class="nomeCarta">${obxecto.nome}</p>
                <div class="puntosVida">${obxecto.puntos_vida}</div>
              `;

            case 'pocion_veleno':
              return `
                <img class="${obxecto.nome}" src="./imaxes/cartas/${obxecto.nome}.png" alt="">
                <p class="nomeCarta">${obxecto.nome}</p>
                <div class="puntosVida">${obxecto.puntos_vida}</div>
              `;

            case 'moeda':
              return `
                <img class="${obxecto.nome}" src="./imaxes/cartas/${obxecto.nome}.png" alt="">
                <p class="nomeCarta">${obxecto.nome}</p>
                <div class="cantidade">${obxecto.puntos_partida}</div>
              `;

            case 'cofre':
              return `
                <img class="${obxecto.nome}" src="./imaxes/cartas/${obxecto.nome}.png" alt="">
                <p class="nomeCarta">${obxecto.nome}</p>
              `;
          }
      }
    }
  }
}

// ==================================================================
// =============== CARGAR CUADRICULA ===============
// ==================================================================
function cargarCuadricula(){
  $('#cuadricula').html(""); // Limpar taboleiro

  let idCela = 1;
  let cela = "";
  for (let f = 1; f <= FILAS; f++) {
    for(let c = 1; c <= COLUMNAS; c++){
      cela = $(`<div id="cela${idCela}" class="cela"></div>`);
      cela.append(taboleiro.get(`${f},${c}`))// Engadimoslle o contido do map() a cela
      $('#cuadricula').append(cela);// Metemos a cela na cuadricula
      idCela++;
    }
  }
}

// ==================================================================
// =============== TUTORIAL ===============
// ==================================================================
function tutorial(){
  alert(" Para mover o personaxe utiliza as frechas do teclado")
}

// ==================================================================
// =============== CARGAR A SELECCION DE PERSONAXES ===============
// ==================================================================