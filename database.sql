DROP DATABASE IF EXISTS `exercises`;

CREATE DATABASE `exercises`;

CREATE TABLE `exercises`.`offices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)) ENGINE=INNODB;

CREATE TABLE `exercises`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `office` INT NOT NULL,
  FOREIGN KEY (`office`) REFERENCES `offices`(`id`),
  PRIMARY KEY (`id`)) ENGINE=INNODB;


INSERT INTO `exercises`.`offices`
(`id`,
`name`)
VALUES
(1, 'Dunder Mifflin Paper Company'),
(2, 'Trybe');

INSERT INTO `exercises`.`employees`
(`id`,
`first_name`,
`last_name`,
`office`)
VALUES
(1,
'michael',
'scott',
1);
