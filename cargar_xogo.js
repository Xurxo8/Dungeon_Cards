// Cargar pantalla de inicio
function cargarMenu() {
	document.body.innerHTML = `
		<div id="inicio">
		<div id="titulo"><img src="imaxes/DungeonCardsPressImages/Logo/Logo3.png" alt="logo"></div>
		<div id="menu">
			<!-- <div id="seleccionPersonaxe"><img src="imaxes/DungeonCardsPressImages/Characters/Knight.png" alt="personaxe seleccionado"></div>
			<div id="xogar">
				<p onclick="cargarMazmorra()"><img src="imaxes/logos/boton_xogar.svg" alt="boton xogar"></p>
			</div> -->

			<ul>
				<li id="seleccionPersonaxe">Seleccionar personaxe</li>
				<li id="cargarClasificacion">Taboa clasificatoria</li>
				<li id="xogar" onclick="cargarMazmorra()">Comezar</li>
			</ul>
		</div>
	</div>
	`;
}

// Cargar a mazmorra
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
					<p onclick="cargarMenu()"><img src="./imaxes/atras_logo.png" alt="atras_logo"></p>
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

	cargarCuadricula();
	tutorial();
}

// Xerar os items e personaxes do taboleiro
function cargarCuadricula() {
	const NUM_CELAS = 9;
	const VIDA_MAXIMA = 10; // Puntos de saude maxima do personaxe
	let puntosVida = 10; // Vida do xogador
	let danoArma = 10;

	$.getJSON('./servidor/cargarCartas.php')
	.done(function(cartas){
		console.log(cartas);
		for (let i = 0; i < NUM_CELAS; i++) {
			if(i != 4){ // Na posición central da cuadricula poñemos ao xogador
				cuadricula.innerHTML += `
				<div class="cela">
					<div class="puntosVida">
						<label>${cartas[i].vida}</label>
						<img src="./imaxes/corazon.png" alt="">
					</div>
					<img src="./imaxes/cartas/morcego.png" alt="">
					<p class="nomeItem">Morcego</p>
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
	.fail(function(){
		alert('Erro ao cargar as cartas');
	})
}

function tutorial(){
	alert(" Para mover o personaxe utiliza as frechas do teclado")
}


