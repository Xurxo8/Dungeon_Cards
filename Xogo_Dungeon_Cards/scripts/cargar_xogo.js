// ==================================================================
// ========== CARGAR PANTALLA DE INICIO ==========
// ==================================================================
function cargarMenu() {
	document.body.innerHTML = `
		<div id="inicio">
			<div id="titulo">
				<img src="imaxes/Logo/Logo4.png" alt="logo">
				<img id="antorcha1" class="antorcha" src="https://i.gifer.com/5Mz4.gif" alt="gif">
				<img id="antorcha2" class="antorcha" src="https://i.gifer.com/5Mz4.gif" alt="gif">
			</div>
			<div id="menu">
				<ul>
					<li id="seleccionPersonaxe">Seleccionar personaxe</li>
					<li id="cargarClasificacion">Taboa clasificatoria</li>
					<li id="xogar" onclick="cargarMazmorra()">Comezar</li>
				</ul>
			</div>
		</div>
	`;
}

// ==================================================================
// ========== CARGAR MAZMORRA ==========
// ==================================================================
function cargarMazmorra() {
	document.body.innerHTML = `
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
		<div id="version">v0.0.0</div>
	`;

	// cargarCuadricula();
	renderGrid();
	// tutorial();
}

// ==================================================================
// ========== XERAR OS ITEMS DO TABOLEIRO ==========
// ==================================================================
// Crear o map() para gardar as posicions das celdas
// INFO Map y set JS -> https://es.javascript.info/map-set
let taboleiro = new Map();

const FILAS = 3;
const COLUMNAS = 3;

for (let f = 1; f <= FILAS; f++) {
	for (let c = 1; c <= COLUMNAS; c++) {
		taboleiro.set(`${f},${c}`, null); // Creamos o mapa valeiro
	}	
}

console.log(taboleiro);

// Array do que cargaremos os items ou inimigos
// let mazo = [cargarInimigos, cargarArmas, cargarObxectos];

// Colocamos o personaxe no centro do taboleiro
taboleiro.set('2,2', "👾");

console.log(taboleiro);


// Renderizar a grilla no DOM
function renderGrid(){
	$('#cuadricula').html(""); // Limpar taboleiro

	for (let f = 1; f <= FILAS; f++) {
		for(let c = 1; c <= COLUMNAS; c++){
			taboleiro.get(`${f},${c}`) || "🟨";
		}		
	}
}

console.log(taboleiro);

function cargarCuadricula() {
	const NUM_CELAS = 9;
	let centro = Math.trunc(NUM_CELAS / 2);
	const VIDA_MAXIMA = 10; // Puntos de saude maxima do personaxe
	let puntosVida = 10; // Vida do xogador
	let danoArma = 10;

	$.getJSON('./servidor/cargarInimigos.php')
	.done(function(inimigos){
		for (let i = 0; i < NUM_CELAS; i++) {
			if(i != centro){ // Na posición central da cuadricula poñemos ao xogador
				cuadricula.innerHTML += `
				<div id="cela${i}" class="cela">
					<div class="puntosVida">
						<label>${inimigos[i].vida}</label>
						<img src="./imaxes/corazon.png" alt="">
					</div>
					<img src="./imaxes/cartas/${inimigos[i].nome}.png" alt="">
					<p class="nomeItem">${inimigos[i].nome}</p>
					<div class="cantidade"></div>
				</div>
			`;
			}else{
				cuadricula.innerHTML += `
				<div class="cela" id="xogador">
					<div id="arma">
						<img src="./imaxes/cartas/espada.png" alt="">
					</div>
					<div class="puntosVida">
						<label>${puntosVida}/${VIDA_MAXIMA}</label>
						<img src="./imaxes/corazon.png" alt="">
					</div>
					<img src="./imaxes/personaxes/cabaleiro.png" alt="">
					<p class="nomeItem">Heroe</p>
					<div class="cantidade">${danoArma}</div>
				</div>
			`;
			}
		}
	})
	.fail(function(erro){
		alert('Erro ao entrar na mazmorra');
		console.log(erro);
	});
}


function tutorial(){
	alert(" Para mover o personaxe utiliza as frechas do teclado")
}

// ==================================================================
// ========== FUNCION PARA CARGAR INIMIGOS ==========
// ==================================================================
// function cargarInimigos(){
// 	$.getJSON('./servidor/cargarInimigos.php')
// 		.done(function(inimigos){
// 			console.log("Inimigos ben");
// 		})
// 		.fail(function(erro){
// 			alert("ERRO ao cargar inimigos");
// 		})
// }

// ==================================================================
// ========== FUNCION PARA CARGAR OBXETOS ==========
// ==================================================================
// function cargarObxectos(){
// 	$.getJSON('./servidor/cargarObxectos.php')
// 		.done(function(inimigos){
// 			console.log("Obxectos ben");
// 		})
// 		.fail(function(erro){
// 			alert("ERRO ao cargar obxetos");
// 		})
// }

// ==================================================================
// ========== FUNCION PARA CARGAR ARMA ==========
// ==================================================================
// function cargarArmas(){
// 	$.getJSON('./servidor/cargarArma.php')
// 		.done(function(inimigos){
// 			console.log("Armas ben");
// 		})
// 		.fail(function(erro){
// 			alert("ERRO ao cargar armamento");
// 		})
// }