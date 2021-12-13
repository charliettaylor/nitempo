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
  `userID` VARCHAR(35) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `gender` CHAR(1) NULL,
  `city` VARCHAR(100) NULL,
  `relationship` VARCHAR(45) NULL,
  `bio` VARCHAR(255) NULL,
  `profilePicture` VARCHAR(500) NULL,
  `coverPicture` VARCHAR(500) NULL,
  `accessToken` VARCHAR(500) NULL,
  `refreshToken` VARCHAR(500) NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `nitempo`.`music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`music` (
  `musicID` VARCHAR(25) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  `type` VARCHAR(10) NULL,
  `musicListed_time` DATETIME NULL,
  PRIMARY KEY (`musicID`));


-- -----------------------------------------------------
-- Table `nitempo`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nitempo`.`follow` (
  `followID` VARCHAR(35) NOT NULL,
  `userID` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`followID`, `userID`),
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
  `type` VARCHAR(10) NULL,
  `likeCount` INT NULL,
  `image` VARCHAR(500) NULL,
  `post_time` DATETIME NULL,
  `musicID` VARCHAR(25) NULL,
  `userID` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`postID`, `userID`),
  INDEX `fk_post_song1_idx` (`musicID` ASC) VISIBLE,
  INDEX `fk_post_user1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_post_song1`
    FOREIGN KEY (`musicID`)
    REFERENCES `nitempo`.`music` (`musicID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `nitempo`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
