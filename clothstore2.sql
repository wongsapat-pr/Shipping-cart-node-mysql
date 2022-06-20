CREATE DATABASE  IF NOT EXISTS `clothstore` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `clothstore`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: clothstore
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_fullname` varchar(45) COLLATE utf8_bin NOT NULL,
  `order_address` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `order_status` varchar(45) COLLATE utf8_bin NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='for keep order';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'Test','Samutsakorn','paid',NULL,'2022-06-15 18:29:20'),(2,'test','Bangkok','paid',NULL,'2022-06-17 11:13:12'),(5,'test3',NULL,'placed_order','2022-06-15 18:10:09',NULL),(6,'test4',NULL,'placed_order','2022-06-15 18:11:53',NULL),(7,'test5',NULL,'placed_order','2022-06-15 18:13:07',NULL),(8,'test6',NULL,'placed_order','2022-06-15 18:14:08',NULL),(9,'test7',NULL,'placed_order','2022-06-15 18:15:45',NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_detail_qty` int NOT NULL,
  `order_detail_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`order_id`),
  KEY `FK_productId_idx` (`product_id`),
  CONSTRAINT `FK_orderId` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `FK_productId` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,1,1,2,400.00),(2,1,2,2,400.00),(3,1,3,13,400.00),(7,1,5,1,400.00),(8,1,8,16,400.00),(10,2,1,5,400.00),(12,6,4,5,400.00),(13,9,6,15,400.00),(14,9,8,5,400.00);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_code` varchar(5) COLLATE utf8_bin NOT NULL,
  `product_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_gen` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_style` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_style_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_size` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_price` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code_UNIQUE` (`product_code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='keep product detail';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'M0001','T-shirt','Men','Plain Color','Red','XS','400'),(2,'W0002','T-shirt','Women','Plain Color','Red','XS','290'),(3,'W0003','T-shirt','Women','Plain Color','Black','XS','290'),(4,'M0004','T-shirt','Men','Plain Color','Black','XS','400'),(5,'M0005','T-shirt','Men','Plain Color','Green','XS','400'),(6,'M0006','T-shirt','Men','Plain Color','Yellow','S','420'),(7,'M0007','T-shirt','Men','Plain Color','Pink','S','420'),(8,'M0008','T-shirt','Men','Pattern','Dot','S','450'),(9,'M0009','T-shirt','Men','Pattern','Drawing','S','450'),(11,'M0010','T-shirt','Men','Figure','Batman','S','450'),(12,'M0011','T-shirt','Men','Figure','Spiderman','S','450'),(13,'M0012','T-shirt','Men','Figure','Goku','S','450'),(14,'M0013','T-shirt','Men','Figure','Trunk','S','450');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-20 23:30:14
