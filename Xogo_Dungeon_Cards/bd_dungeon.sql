-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Xerado en: 8 de Ene de 2025 ás 14:26
-- Versión do servidor: 5.5.27
-- Versión do PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `dungeonCards`
--

CREATE DATABASE IF NOT EXISTS `dungeonCards`;
USE `dungeonCards`;

-- --------------------------------------------------------

--
-- Estrutura da táboa `cartas`
--

CREATE TABLE IF NOT EXISTS `cartas` (
	`idCarta` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(30) NOT NULL,
	`tipoCarta` ENUM('item', 'monstro') NOT NULL, 
	`vida` INT DEFAULT 0, /* só para os monstros */
	`dano` INT DEFAULT 0, /* só para as armas */
	`puntosPartida` INT DEFAULT 0, /* só para as moedas */
	`puntosVida` INT DEFAULT 0, /* só para as pocions */
	PRIMARY KEY (`idCarta`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Insertar os datos na táboa `cartas`
--

INSERT INTO `cartas` (`nome`,  `tipoCarta`, `vida`, `dano`, `puntosPartida`, `puntosVida`) VALUES
	('cofre', 'item', 0, 0, 0, 0),
	('espada', 'item', 0, 10, 0, 0),
	('espada2', 'item', 0, 15, 0, 0),
	('esqueleto', 'inimigo', 5, 0, 0, 0),
	('magoAzul', 'inimigo', 7, 0, 0, 0),
	('magoVermello', 'inimigo', 10, 0, 0, 0),
	('maza', 'item', 0, 15, 0, 0),
	('moeda', 'item', 0, 0, 1, 0),
	('monstro1', 'inimigo', 8, 0, 0, 0),
	('monstro2', 'inimigo', 5, 0, 0, 0),
	('monstro3', 'inimigo', 10, 0, 0, 0),
	('monstroAzul', 'inimigo', 12, 0, 0, 0),
	('morcego', 'inimigo', 1, 0, 0, 0),
	('necromancer', 'inimigo', 20, 0, 0, 0),
	('pocionVeleno', 'item', 0, 5, 0, 0),
	('pocionVida', 'item', 0, 0, 0, 5),
	('zombie', 'inimigo', 3, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da táboa `personaxes`
--

CREATE TABLE IF NOT EXISTS `personaxes`(
	`codPersonaxe` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(20) NOT NULL,
	`vida` INT NOT NULL,
	`armaInicial` varchar(20),
	PRIMARY KEY `codPersonaxe`
)ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

-- 
-- Insertar os datos na taboa `personaxes`
-- 

INSERT INTO `personaxes` (`nome`, `vida`, `armaInicial`) VALUES
	('alquimista', 10, `espada`),
	('asasina', 8, `espada`),
	('cabaleiro', 12, `espada`),
	('cabaleiro2', 12, `espada`),
	('cactus', 8, `espada`),
	('ferreiro', 10, `espada`),
	('granadeiro', 10, `espada`),
	('ladron', 10, `espada`),
	('mago', 8, `espada`),
	('vampiro', 8, `espada2`),
	('vikingo', 8, `maza`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
