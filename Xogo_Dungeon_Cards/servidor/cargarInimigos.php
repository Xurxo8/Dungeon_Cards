<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Collemos os datos dos inimigos
	$sql = "SELECT *
					FROM inimigo;";

	$saida = array();
	if ($datos = $conexion->query($sql)){   		
		while ($inimigo = $datos->fetch_object()){
			$saida[] = $inimigo;
		}
		$datos->close();
	}

	$conexion->close();
	echo json_encode($saida);
?>