-- Drops database if it exists currently --
DROP DATABASE IF EXISTS heroDB;
-- Creates new database --
CREATE DATABASE heroDB;

USE heroDB;

CREATE TABLE usersLogin(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  number_of_characters INT(1) unsigned DEFAULT 0,
  PRIMARY KEY (id)
);

  
CREATE TABLE characters(
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(100) NOT NULL,
  CharacterName VARCHAR(100) NOT NULL,
  Attack INT(2) default 20,
  Defence INT(2) default 20,
  Health INT(2) default 20,
  Wins INT(2) NULL,
  Losses INT(2) NULL,
  PRIMARY KEY (id)
);