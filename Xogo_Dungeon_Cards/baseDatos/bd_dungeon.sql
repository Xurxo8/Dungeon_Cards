SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `dungeonCards`
--

CREATE DATABASE IF NOT EXISTS `dungeonCards`;
USE `dungeonCards`;

-- --------------------------------------------------------

--
-- Estrutura da táboa `arma`
--

CREATE TABLE IF NOT EXISTS `arma` (
	`codigo` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(30) NOT NULL,
	`dano` INT NOT NULL,
	PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Insertar os datos na táboa `arma`
--

INSERT INTO `arma` (`nome`, `dano`) VALUES
	('espada', 10),
	('espada2', 12),
	('maza', 20);

-- --------------------------------------------------------

--
-- Estrutura da táboa `personaxe`
--

CREATE TABLE IF NOT EXISTS `personaxe`(
	`codigo` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(20) NOT NULL,
	`vida` INT NOT NULL,
	`cod_arma` tinyint NOT NULL,
	PRIMARY KEY (`codigo`),
	FOREIGN KEY (`cod_arma`) REFERENCES `arma` (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

-- 
-- Insertar os datos na taboa `personaxes`
-- 

INSERT INTO `personaxe` (`nome`, `vida`, `cod_arma`) VALUES
	('alquimista', 10, 1),
	('asasina', 8, 2),
	('cabaleiro', 12, 3),
	('cabaleiro2', 12, 1),
	('cactus', 8, 1),
	('ferreiro', 10, 1),
	('granadeiro', 10, 3),
	('ladron', 10, 2),
	('mago', 8, 1),
	('vampiro', 8, 2),
	('vikingo', 8, 3);

-- --------------------------------------------------------

-- 
-- Estrutura da táboa `inimigo`
-- 

CREATE TABLE IF NOT EXISTS `inimigo`(
	`codigo` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(20) NOT NULL,
	`vida` INT NOT NULL,
	`dificultade` varchar(15) NOT NULL,
	PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

-- 
-- Inserir os datos na taboa `inimigo`
-- 

INSERT INTO `inimigo` (`nome`, `vida`, `dificultade`) VALUES
	('esqueleto', 5, 'facil'),
	('magoAzul', 8, 'normal'),
	('magoVermello', 9, 'normal'),
	('monstro1', 3, 'facil'),
	('monstro2', 4, 'facil'),
	('monstro3', 10, 'dificil'),
	('monstroAzul', 12, 'dificil'),
	('morcego', 3, 'facil'),
	('necromancer', 15, 'dificil'),
	('zombie', 7, 'normal');

-- 
-- Estrutura táboa `obxecto`
-- 

CREATE TABLE IF NOT EXISTS `obxecto`(
	`codigo` tinyint NOT NULL AUTO_INCREMENT,
	`nome` varchar(20) NOT NULL,
	`puntos_vida` varchar(20) NOT NULL,
	`puntos_partida` varchar(20) NOT NULL,
	PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;


-- 
-- Inserir os datos na táboa `obxecto`
-- 

INSERT INTO `obxecto` (`nome`, `puntos_vida`, `puntos_partida`) VALUES
	('cofre', 0, 0),
	('pocion_veleno', -5, 0),
	('pocion_vida', 5, 0),
	('moeda', 0, 1); -- O valor variará cun multiplicador según avance a partida

-- --------------------------------------------------------

-- 
-- Estrutura da táboa `clasificación`
-- 

CREATE TABLE IF NOT EXISTS `clasificacion` (
	`codigo` tinyint NOT NULL AUTO_INCREMENT,
	`nome_xogador` varchar(30) NOT NULL,
	`puntuacion` INT NOT NULL,
	PRIMARY KEY (`codigo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

-- Os datos inseriranse ao rematar a partida
