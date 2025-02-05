<?php
	$servidor="localhost";
	$usuario="root";
	$contrasinal="";
	$baseDatos="dungeoncards";

	// Creamos a conexión
	$conexion = new mysqli($servidor, $usuario, $contrasinal, $baseDatos);
	$conexion->query("SET NAMES 'utf8'");
?>
