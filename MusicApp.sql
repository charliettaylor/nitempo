-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema musicapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema musicapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `musicapp` ;

-- -----------------------------------------------------
-- Table `musicapp`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicapp`.`user` (
  `userID` INT NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dob` DATE NULL,
  `gender` CHAR(1) NULL,
  `bio` VARCHAR(255) NULL COMMENT 'Table for user',
  PRIMARY KEY (`userID`));


-- -----------------------------------------------------
-- Table `musicapp`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicapp`.`song` (
  `songID` VARCHAR(45) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`songID`, `userID`),
  INDEX `fk_song_user_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_song_user`
    FOREIGN KEY (`userID`)
    REFERENCES `musicapp`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `musicapp`.`friend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicapp`.`friend` (
  `friendID` INT NOT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`friendID`, `userID`),
  INDEX `fk_friend_user1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_friend_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `musicapp`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `musicapp`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicapp`.`rating` (
  `ratingID` INT NOT NULL AUTO_INCREMENT,
  `starRating` INT NOT NULL,
  `review` VARCHAR(255) NOT NULL,
  `userID` INT NOT NULL,
  `songID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ratingID`, `userID`, `songID`),
  INDEX `fk_rating_song1_idx` (`songID` ASC) VISIBLE,
  INDEX `fk_rating_user1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_rating_song1`
    FOREIGN KEY (`songID`)
    REFERENCES `musicapp`.`song` (`songID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `musicapp`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
