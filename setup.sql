CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `user_name` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `user_surname` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `user_password` text COLLATE utf8_turkish_ci NOT NULL,
  `user_email` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `user_type` varchar(10) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT COLLATE=utf8_turkish_ci;

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `module` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `ip` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `method` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `url` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `status` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `res_length` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `res_ms` text COLLATE utf8_turkish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT COLLATE=utf8_turkish_ci;

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(16) COLLATE utf8_turkish_ci NOT NULL,
  `url` text COLLATE utf8_turkish_ci NOT NULL,
  `token` text COLLATE utf8_turkish_ci NOT NULL,
  `ttl` text COLLATE utf8_turkish_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT COLLATE=utf8_turkish_ci;

CREATE TABLE IF NOT EXISTS `urls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(80) COLLATE utf8_turkish_ci NOT NULL,
  `url_type` varchar(15) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT COLLATE=utf8_turkish_ci;


INSERT IGNORE INTO users.users 
	(username, user_name, user_surname, user_password, user_email, user_type)
VALUES 
	('user','John','Doe','$2a$10$echZs8LGrExJfyTbcfvfGuH9W2iuhS1deukejctPKsmDjAVcT8a/O','user@email','user'),
	('admin','Admin','Doe','$2a$10$echZs8LGrExJfyTbcfvfGuH9W2iuhS1deukejctPKsmDjAVcT8a/O','admin@email','admin');

INSERT IGNORE INTO users.urls (url,url_type) 
VALUES 
	('http://consumer.localhost:3050','admin'),
	('http://manager.localhost:3050','user');