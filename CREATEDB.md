# Create Database

Use the below sql to create the schema and tables needed for this project

```sql

CREATE DATABASE `rate-movies` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `rate-movies`.`category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `rate-movies`.`media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `rate-movies`.`type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `rate-movies`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `rate-movies`.`media-category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie-id` int DEFAULT NULL,
  `category-id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie-id` (`movie-id`),
  KEY `category-id` (`category-id`),
  CONSTRAINT `media-category_ibfk_1` FOREIGN KEY (`movie-id`) REFERENCES `media` (`id`),
  CONSTRAINT `media-category_ibfk_2` FOREIGN KEY (`category-id`) REFERENCES `category` (`id`)
)

CREATE TABLE `rate-movies`.`media-rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie-id` int DEFAULT NULL,
  `user-id` int DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie-id` (`movie-id`),
  KEY `user-id` (`user-id`),
  CONSTRAINT `media-rating_ibfk_1` FOREIGN KEY (`movie-id`) REFERENCES `media` (`id`),
  CONSTRAINT `media-rating_ibfk_2` FOREIGN KEY (`user-id`) REFERENCES `users` (`id`)
)

CREATE TABLE `rate-movies`.`media-type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie-id` int DEFAULT NULL,
  `type-id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie-id` (`movie-id`),
  KEY `type-id` (`type-id`),
  CONSTRAINT `media-type_ibfk_1` FOREIGN KEY (`movie-id`) REFERENCES `media` (`id`),
  CONSTRAINT `media-type_ibfk_2` FOREIGN KEY (`type-id`) REFERENCES `type` (`id`)
)

CREATE TABLE `media-rating-simple` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie-id` int(11) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie-id` (`movie-id`),
  CONSTRAINT `media-rating-simple_ibfk_1` FOREIGN KEY (`movie-id`) REFERENCES `media` (`id`)
)

```
