<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Collemos os datos dos personaxes
	$sql = "SELECT *
					FROM personaxe;";

	$saida = array();
	if ($datos = $conexion->query($sql)){   		
		while ($obxecto = $datos->fetch_object()){
			$saida[] = $obxecto;
		}
		$datos->close();
	}

	$conexion->close();
	echo json_encode($saida);
?>