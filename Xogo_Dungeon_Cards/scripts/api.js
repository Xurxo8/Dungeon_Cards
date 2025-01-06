// LIMPAR
function limparPantalla(){
  exercicioActual.innerHTML = "";
	resultado.innerHTML = "";
	datos.innerHTML = "";
}

function limparSoResultado(){
  resultado.innerHTML = "";
}

// === FORMATEO DOS INPUTS ===
function cambiarComaPorPunto(elemento){
	elemento.value = elemento.value.replace(/,/g, ".");
}

// === XERAR NÚMEROS ALEATORIOS ===
function numerosAleatorios(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

function numerosAleatoriosDecimais(min, max, decimais){
	let precision = Math.pow(10, decimais);
	min *= precision;
	max *= precision;
	return Math.floor((Math.random() * (max - min)) + min) / precision;
}

// === ENCHER VECTOR ==
function encherVector(nomeArray, elementos){
	const CERO = 0;
	for (let i = CERO; i < elementos; i++) {
		nomeArray[i] = numerosAleatorios();
	}
}

// === ENCHER ARRAY BIDIMENSIONAL ===
function vectorBidimenisional(nomeArray, filas, columnas){
	for (let i = 0; i < filas; i++) {
		// Creamos un array dentro de cada posicion
		nomeArray[i] = [];
		for (let j = 0; j < columnas; j++) {
			nomeArray[i][j] = numerosAleatorios();
		}		
	}
}

// === CAMBIAR A COR DOS BOTONS ===
function cambiarCorBoton(botonClicado){
	const BOTONS = document.getElementsByClassName(botonClicado.classList[0]);// ter coidado coa cantidade e a posicion das clases 

	// Eliminar a clase aplicada anteriormente
	for (let i = 0; i < BOTONS.length; i++) {
		BOTONS[i].classList.remove('activo');		
	}

	// Engadir a clase ao boton clicado
	botonClicado.classList.add('activo');
}

// === DESORDENAR ARRAY === Algoritmo de Fisher-Yates
// Como barallar un array -> https://es.javascript.info/task/shuffle
function desordenarArray(array){
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));

		// Intercambiamos os elementos array[i] e array[j]
		// Usamos a sintaxe "asignación de desestructuración"
		// O mesmo pode ser escrito como: let t = array[i]; array[i] = array[j]; array[j] = t

		[array[i], array[j]] = [array[j], array[i]];		
	}
}

