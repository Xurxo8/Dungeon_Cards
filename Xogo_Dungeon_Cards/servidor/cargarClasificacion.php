<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Collemos as cartas
	$sql = "SELECT nome, puntuacion
					FROM cartas
					ORDER BY puntuacion;";

	$saida = array();
	if ($datos = $conexion->query($sql)){   		
		while ($xogador = $datos->fetch_object()){
			$saida[] = $xogador;
		}
		$datos->close();
	}

	$conexion->close();
	echo json_encode($saida);
?>