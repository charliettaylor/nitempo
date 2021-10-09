-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nitempo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nitempo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nitempo` DEFAULT CHARACTER SET utf8 ;
USE `nitempo` ;

-- -----------------------------------------------------
-- Table `nitempo`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `accessToken` VARCHAR(300) NULL,
  `dob` DATE NULL,
  `gender` CHAR(1) NULL,
  `bio` VARCHAR(255) NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `nitempo`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`song` (
  `songID` INT NOT NULL AUTO_INCREMENT,
  `artist` VARCHAR(255) NOT NULL,
  `songListed_time` DATETIME NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`songID`, `userID`),
  INDEX `fk_song_user_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_song_user`
    FOREIGN KEY (`userID`)
    REFERENCES `nitempo`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `nitempo`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`rating` (
  `ratingID` INT NOT NULL AUTO_INCREMENT,
  `starRating` INT NOT NULL,
  `review` VARCHAR(255) NOT NULL,
  `rating_time` DATETIME NULL,
  `userID` INT NOT NULL,
  `songID` INT NOT NULL,
  PRIMARY KEY (`ratingID`, `userID`, `songID`),
  INDEX `fk_rating_user1_idx` (`userID` ASC) VISIBLE,
  INDEX `fk_rating_song1_idx` (`songID` ASC) VISIBLE,
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `nitempo`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_song1`
    FOREIGN KEY (`songID`)
    REFERENCES `nitempo`.`song` (`songID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `nitempo`.`friend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`friend` (
  `friendID` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NOT NULL,
  PRIMARY KEY (`friendID`, `userID`),
  INDEX `fk_friend_user1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_friend_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `nitempo`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `nitempo`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`post` (
  `postID` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `post_time` DATETIME NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`postID`, `userID`),
  INDEX `fk_post_user1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `nitempo`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
