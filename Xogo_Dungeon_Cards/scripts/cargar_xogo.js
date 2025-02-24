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

// ====================================================================================================================

// ==================================================================
// =============== CARGAR INIMIGOS ===============
// ==================================================================
function cargarInimigos() {
	// Retorna a promesa que devuelve $.getJSON
	return $.getJSON('./servidor/cargarInimigos.php')
		.then(function(inimigos) {
				let codInimigo = numerosAleatorios(0, inimigos.length);

				let inimigo = `
					<div class="puntosVida">
						<label>${inimigos[codInimigo].vida}</label>
						<img src="./imaxes/corazon.png" alt="">
					</div>
					<img src="./imaxes/cartas/${inimigos[codInimigo].nome}.png" alt="">
					<p class="nomeItem">${inimigos[codInimigo].nome}</p>
					<div class="cantidade"></div>
				`;

				return inimigo;
		})
		.catch(function(erro) {
				let alerta = alert("ERRO ao cargar inimigos");
				return alerta;
		});
}


// ==================================================================
// =============== CARGAR OBEXECTOS ===============
// ***** Máis adiante pasaremos a puntuación do usuario para incrementar a dificultade gradualmente *****
// ==================================================================
function cargarObxectos(){
	return $.getJSON('./servidor/cargarObxectos.php')
		.then(function(obxectos) {
				let codObxecto = numerosAleatorios(0, obxectos.length);
				let cantidade = "";

				switch (obxecto.nome) {
					case 'pocion_vida':
						cantidade = obxectos.puntos_vida;
						break;

					case 'pocion_veleno':
						cantidade = obxectos.puntos_vida;
						break;

					case 'moeda':
						cantidade = obxecto.puntos_partida;
						break;
				}

				let obxecto = `
					<div class="puntosVida">
						<label></label>
					</div>
					<img src="./imaxes/cartas/${obxectos[codObxecto].nome}.png" alt="">
					<p class="nomeItem">${obxectos[codObxecto].nome}</p>
					<div class="cantidade">${obxectos.puntosPartida}</div>
				`;

				return obxecto;
		})
		.catch(function(erro) {
				let alerta = alert("ERRO ao cargar obexectos");
				return alerta;
		});
}

// ==================================================================
// =============== CARGAR ARMAS ===============
// ==================================================================
function cargarArmas(){
	return $.getJSON('./servidor/cargarArmas.php')
		.then(function(armas) {
				let codArma = numerosAleatorios(0, armas.length);

				let arma = `
					<div class="puntosVida">
						<label>${armas[codArma].vida}</label>
						<img src="./imaxes/corazon.png" alt="">
					</div>
					<img src="./imaxes/cartas/${armas[codArma].nome}.png" alt="">
					<p class="nomeItem">${armas[codArma].nome}</p>
					<div class="cantidade"></div>
				`;

				return arma;
		})
		.catch(function(erro) {
				let alerta = alert("ERRO ao cargar o armamento");
				return alerta;
		});
}

// ====================================================================================================================

// Array do que cargaremos os items ou inimigos
let mazo = [cargarInimigos, cargarArmas, cargarObxectos];

// =============== RULETA PONDERADA ===============
function elementoAleatorio() {
	const PESOS = [0.45, 0.45, 0.1]; // Probabilidades para INIMIGOS, ARMAS e OBXECTOS
	let random = Math.random();
	let sum = 0;

	for (let i = 0; i < PESOS.length; i++) {
		sum += PESOS[i];
		if (random <= sum) {
			// Executamos a función seleccionada e devolvemos o resultado
			return mazo[i](); 
		}
	}
}

// ==================================================================
// =============== CREAR E ENCHER GRILLA NO DOM ===============
// ==================================================================
// Enchemos a grilla con items e inimigos
for (let f = 1; f <= FILAS; f++) {
	for (let c = 1; c <= COLUMNAS; c++) {
		taboleiro.set(`${f},${c}`, elementoAleatorio());// Executamos as funcions ao chamalas co doble parentesis
	}
}

// Colocamos o personaxe no centro do taboleiro
taboleiro.set('2,2', `
	<div id="arma">
		<img src="./imaxes/cartas/espada.png" alt="">
	</div>
	<div class="puntosVida">
		<label>10/10</label>
		<img src="./imaxes/corazon.png" alt="">
	</div>
	<img src="./imaxes/personaxes/cabaleiro.png" alt="">
	<p class="nomeItem">Heroe</p>
	<div class="cantidade">10</div>
`);

console.log(taboleiro);

// ==================================================================
// =============== RENDERIZAR O GRID ===============
// ==================================================================
async function renderGrid(){
	$('#cuadricula').html(""); // Limpar taboleiro

	for (let f = 1; f <= FILAS; f++) {
		for(let c = 1; c <= COLUMNAS; c++){
			let cela = "";
			if(f == 2 && c == 2){// No caso de ser a cela central do taboleiro
				cela = $('<div id="xogador" class="cela" ></div>');// cela para o xogador
			}else{
				cela = $('<div class="cela"></div>'); // cela para inimigos e obxectos
			}
			// cela.append(taboleiro.get(`${f},${c}`) || elementoAleatorio())// Engadimoslle contido do map() a cela
			// $('#cuadricula').append(cela);// Metemos a cela na cuadricula
			let elemento = await elementoAleatorio();
			cela.append(elemento);
			$('#cuadricula').append(cela);
		}		
	}
}

// ==================================================================
// =============== CARGAR CUADRICULA ===============
// ==================================================================
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
	});
}

function tutorial(){
	alert(" Para mover o personaxe utiliza as frechas do teclado")
}




