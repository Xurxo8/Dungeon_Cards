<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Collemos as cartas
	$sql = "SELECT nome, tipoCarta, vida, dano, puntosPartida, puntosVida
					FROM cartas;";

	$saida = array();
	if ($datos = $conexion->query($sql)){   		
		while ($carta = $datos->fetch_object()){
			$saida[] = $carta;
		}
		$datos->close();
	}

	$conexion->close();
	echo json_encode($saida);
?>