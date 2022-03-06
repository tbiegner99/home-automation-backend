CREATE DATABASE  IF NOT EXISTS `tv` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tv`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tv
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `broadcasts`
--

DROP TABLE IF EXISTS `broadcasts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `broadcasts` (
  `broadcast_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `episode_name` varchar(100) NOT NULL,
  `plot` text NOT NULL,
  `plot_outline` text NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `runtime` int(11) NOT NULL,
  `genre` json NOT NULL,
  `first_aired` date NOT NULL,
  `parental_rating` varchar(45) NOT NULL,
  `thumbnail` varchar(45) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `original_title` varchar(100) NOT NULL,
  `cast` text NOT NULL,
  `director` varchar(100) NOT NULL,
  `writer` varchar(100) NOT NULL,
  `year` int(1) NOT NULL,
  `imdb_number` varchar(45) NOT NULL,
  `is_series` int(1) NOT NULL,
  `recording` int(1) NOT NULL,
  `has_recording` int(1) NOT NULL,
  PRIMARY KEY (`broadcast_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `channel_favorites`
--

DROP TABLE IF EXISTS `channel_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel_favorites` (
  `channel_id` int(11) NOT NULL,
  PRIMARY KEY (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `channel_guide`
--

DROP TABLE IF EXISTS `channel_guide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel_guide` (
  `guide_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `broadcast_id` int(11) NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`guide_id`),
  UNIQUE KEY `UNIQUE` (`channel_id`,`start_date`,`broadcast_id`),
  KEY `channel` (`channel_id`),
  KEY `end_date` (`end_date`),
  KEY `broadcast` (`broadcast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2990884 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `channel_info`
--

DROP TABLE IF EXISTS `channel_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel_info` (
  `number` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `is_high_definition` int(1) DEFAULT NULL,
  `icon_location` varchar(450) DEFAULT NULL,
  `thumbnail_location` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`number`),
  KEY `channel_name` (`name`),
  KEY `channel_id` (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-06  1:44:18
