-- MySQL dump 10.14  Distrib 5.5.41-MariaDB, for Linux (x86_64)
--
-- Host: 10.10.73.21    Database: iyo_db
-- ------------------------------------------------------
-- Server version	5.6.21ucloudrel1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `iyo_users`
--

DROP TABLE IF EXISTS `iyo_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iyo_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `imageUrl` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `activate` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `usertype` int(11) NOT NULL DEFAULT '0' comment "0=>普通用户 1=>明星用户 2=>公会用户",
  PRIMARY KEY (`id`),
  UNIQUE KEY `iyo_users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `iyo_unions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iyo_unions` (
  `id` int(10) unsigned NOT NULL,
  `auth` int(11) unsigned NOT NULL default 0,
  `auth_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `subscribe` int(11) unsigned NOT NULL default 0,
  `description` text COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `iyo_users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `iyo_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iyo_relations` (
  `id` int(10) unsigned NOT NULL default 0,
  `fid` int(11) unsigned NOT NULL default 0,
  `usertype` int(11) unsigned NOT NULL default 0,
  `name` varchar(255) unsigned NOT NULL default '',
  PRIMARY KEY idf(`id`,`fid`),
  index(`id`),
  index(`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `iyo_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iyo_relations` (
  `id` int(10) unsigned NOT NULL default 0,
  `fid` int(11) unsigned NOT NULL default 0,
  `usertype` int(11) unsigned NOT NULL default 0,
  `name` varchar(255) unsigned NOT NULL default '',
  PRIMARY KEY idf(`id`,`fid`),
  index(`id`),
  index(`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Dumping data for table `iyo_users`
--

LOCK TABLES `iyo_users` WRITE;
/*!40000 ALTER TABLE `iyo_users` DISABLE KEYS */;
INSERT INTO `iyo_users` VALUES (9,'','18649196830',NULL,'123456','uploads/photos/user_9.png','ccaa362733c2045bd6b6397c97be0170',0,'2015-04-13 17:53:55','2015-04-15 05:50:39',0),(10,'','13161578922',NULL,'q',NULL,'37d041b67a8bc44af0e1fec5998006f7',0,'2015-04-14 20:04:29','2015-04-14 20:04:29',0),(12,'gsr@33.com','13122121111',NULL,'qq',NULL,'6acca29ed0c5cc64ed3246b29bef6174',0,'2015-04-14 20:44:54','2015-04-14 20:44:54',0),(13,'','13176891234',NULL,'q',NULL,'177f91b381ffb8d5dea581f85e74db1a',0,'2015-04-14 20:54:40','2015-04-14 20:54:40',0),(14,'','15201061129',NULL,'123',NULL,'6b5d2b307fc1415ead41526225c93715',0,'2015-04-14 22:15:26','2015-04-14 22:15:26',0),(18,'','13111111111',NULL,'1',NULL,'dd45d997dcca1de453eb1e7a24e605f0',0,'2015-04-14 23:52:35','2015-04-14 23:52:35',0),(19,'','13112112211',NULL,'1',NULL,'3d4e12d87e6ade1d65cec49e589156b8',0,'2015-04-15 00:06:41','2015-04-15 00:06:41',0),(20,'','13121256789',NULL,'1',NULL,'7f7291652535cabf556cf656fa40fa6a',0,'2015-04-15 00:17:21','2015-04-15 00:17:21',0),(21,'','13124565456',NULL,'1',NULL,'412c5d18b87b892e3ae1ffe051cc20a7',0,'2015-04-15 00:18:56','2015-04-15 00:18:56',0),(22,'','13612456765',NULL,'1',NULL,'49e8071749cd793bd874534a407d7b2f',0,'2015-04-15 00:20:45','2015-04-15 00:20:45',0),(23,'','15201061109',NULL,'123',NULL,'aa2fcb6ebfd34d3fe19701608d406286',0,'2015-04-15 00:51:11','2015-04-15 00:51:11',0),(25,'','13456789876',NULL,'q',NULL,'4e6bec3080c8e00cfcbfe18617481d5a',0,'2015-04-15 01:01:00','2015-04-15 01:01:00',0),(26,'','15201061119',NULL,'123',NULL,'986bdb15c42a890d54af8d866765aa8a',0,'2015-04-15 01:31:31','2015-04-15 01:31:31',0),(27,'','13456786754',NULL,'1',NULL,'ad47309a995eafc131205243cdaf2fc2',0,'2015-04-15 01:43:33','2015-04-15 01:43:33',0),(28,'','13567898765',NULL,'1',NULL,'566a83abc4fdad22786e70428a2e267d',0,'2015-04-15 01:46:22','2015-04-15 01:46:22',0),(29,'','13567876543',NULL,'1',NULL,'438968d05cd9c88ca427075cbb68423f',0,'2015-04-15 03:18:54','2015-04-15 03:18:54',0),(30,'','13676567890',NULL,'1',NULL,'f1b6ea123b7f13b70fb77920bae6cf62',0,'2015-04-15 03:22:32','2015-04-15 03:22:32',0),(31,'','13565456789',NULL,'11',NULL,'6dc44d5345891fa88a0159ce3c38eb62',0,'2015-04-15 03:26:44','2015-04-15 03:26:44',0),(32,'','13787678909',NULL,'1',NULL,'e2e74f97e71578ca4d192464f4626d67',0,'2015-04-15 03:29:48','2015-04-15 03:29:48',0),(33,'','13567567890',NULL,'1',NULL,'5861bba95b0cc0b233b88e7e11f03f85',0,'2015-04-15 03:48:48','2015-04-15 03:48:48',0),(34,'','13123456765',NULL,'1',NULL,'06436698311d69bedcc66b0ed3ca2593',0,'2015-04-15 03:55:55','2015-04-15 03:55:55',0),(35,'','13145654578',NULL,'1',NULL,'d5bb6cb3b0e20b5bb7429506b162fc68',0,'2015-04-15 04:26:43','2015-04-15 04:26:43',0),(36,'','13145678987',NULL,'1',NULL,'76afcc28955c940467e7dd9d52002bc1',0,'2015-04-15 04:43:58','2015-04-15 04:43:58',0),(37,'','13145678978',NULL,'1',NULL,'301dbd322ccc9fd1bf9266372196fccb',0,'2015-04-15 04:50:49','2015-04-15 04:50:49',0),(38,'','13124567876',NULL,'1',NULL,'3b17f893370a42684746c3c5b415bb11',0,'2015-04-15 04:59:05','2015-04-15 04:59:05',0),(39,'','13123455678',NULL,'1',NULL,'a49e5a1b2301fded7d4cc0576371ef84',0,'2015-04-15 05:07:01','2015-04-15 05:07:01',0),(40,'','13145656567',NULL,'1',NULL,'9b363193b0bb6ede93b4ca320af38f69',0,'2015-04-15 05:11:57','2015-04-15 05:11:57',0),(41,'','13456567878',NULL,'1',NULL,'a711a192409078288669df3ccb7c6cb1',0,'2015-04-15 05:24:20','2015-04-15 05:24:20',0),(42,'','13811333363',NULL,'123456',NULL,'11e879d70dd3be923063da9d0e5d58df',0,'2015-04-15 05:59:53','2015-04-15 05:59:53',0),(43,'','13254565454',NULL,'11',NULL,'176a76e32a51096d45577063348b04ee',0,'2015-04-16 00:15:42','2015-04-16 00:15:42',0),(44,'','13143567898',NULL,'1',NULL,'5051742d3cfd06b75dab0116c2e3d9c7',0,'2015-04-16 00:25:18','2015-04-16 00:25:18',0),(45,'','18612115693',NULL,'123',NULL,'6c70eb1225320d0ba97c6f1b0f4dfb03',0,'2015-04-16 00:40:04','2015-04-16 00:40:04',0),(46,'','15201061108',NULL,'111',NULL,'9f76cd5525beb916682f6ae185ae18c5',0,'2015-04-16 00:45:17','2015-04-16 00:45:17',0),(47,'','13165453456',NULL,'1',NULL,'eb6d547ca8ff277ddaa2f7be51230c14',0,'2015-04-16 00:46:13','2015-04-16 00:46:13',0),(48,'','15201061107',NULL,'111',NULL,'e31e434dd1d23e198df6e3a9a1b1ab71',0,'2015-04-16 00:47:19','2015-04-16 00:47:19',0),(49,'','13213345678',NULL,'1',NULL,'6ba28c33c3c4fc30a0695e905d07232f',0,'2015-04-16 00:48:12','2015-04-16 00:48:12',0),(50,'','13214345654',NULL,'1','uploads/photos/user_50.png','adbb0708b5e0a88ebaf0d58a3af766d8',0,'2015-04-16 00:53:07','2015-04-16 00:53:23',0),(51,'','15201061106',NULL,'1111',NULL,'f824fd52f812083554c587dca930fc3e',0,'2015-04-16 00:55:21','2015-04-16 00:55:21',0),(52,'','15201061105',NULL,'111',NULL,'1222e34b5c6b5fb3d5f115f486acb2a6',0,'2015-04-16 00:57:10','2015-04-16 00:57:10',0),(53,'','15201061104',NULL,'111',NULL,'03982d876a5fdd55071f34de5d9cd31f',0,'2015-04-16 01:02:27','2015-04-16 01:02:27',0),(54,'','15201061103',NULL,'111',NULL,'f075bcc6d1310670383fd51afc667451',0,'2015-04-16 01:06:17','2015-04-16 01:06:17',0),(55,'','15201061102',NULL,'111','uploads/photos/user_55.png','bbfb97a323663f10319bde4ee74f5d7f',0,'2015-04-16 01:12:48','2015-04-16 03:51:38',0),(56,'','15201061101',NULL,'111',NULL,'90fac0e15de09fa4ba920206a5ee36d8',0,'2015-04-16 01:16:58','2015-04-16 01:16:58',0),(57,'','15201061111',NULL,'123',NULL,'43884d4f9cb7d18f6a8abcac0918d258',0,'2015-04-16 03:07:11','2015-04-16 03:07:11',0),(58,'','15836157295',NULL,'123','uploads/photos/user_58.png','c04c6c9e0a9c63abf2569c3fc0aa96be',0,'2015-04-16 18:56:59','2015-04-16 18:57:01',0);
/*!40000 ALTER TABLE `iyo_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
