-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 21-Out-2017 às 21:46
-- Versão do servidor: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catalogo_hqs`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `quadrinhos`
--

CREATE TABLE IF NOT EXISTS `quadrinhos` (
  `id` int(11) NOT NULL,
  `titulo` text,
  `ano` year(4) DEFAULT NULL,
  `edicao` int(11) NOT NULL,
  `editora` mediumtext,
  `roteiro` varchar(30) DEFAULT NULL,
  `desenho` varchar(30) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `quadrinhos`
--

INSERT INTO `quadrinhos` (`id`, `titulo`, `ano`, `edicao`, `editora`, `roteiro`, `desenho`) VALUES
(1, 'Paper Girls', 2016, 1, 'Image', 'Brian K. Vaughan', 'Cliff Chiang'),
(2, 'Batman', 2016, 20, 'DC Comics', ' ', ' '),
(3, 'The Flash', 2016, 8, 'DC Comics', ' Joshua Williamson', 'Giandomenico'),
(4, 'Superman', 2016, 16, 'DC Comics', 'Peter J. Tomasi', 'Patrick Gleason'),
(5, 'Teen Titans', 2016, 4, 'DC Comics', ' Benjamin Percy', 'Jonboy Meyers'),
(6, 'Titans', 2016, 6, 'DC Comics', ' Dan Abnett', 'Brett Booth');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quadrinhos`
--
ALTER TABLE `quadrinhos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quadrinhos`
--
ALTER TABLE `quadrinhos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
