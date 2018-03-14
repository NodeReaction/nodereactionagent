
-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `users`;

-- CREATE TABLE IF NOT EXISTS `users` (
--   `user_id` INT(11) NOT NULL AUTO_INCREMENT,
--   `email` VARCHAR(255) NOT NULL,
--   `password` VARCHAR(255) NOT NULL,
--   `username` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`user_id`),
--   UNIQUE INDEX `email_UNIQUE` (`email` ASC),
--   UNIQUE INDEX `username_UNIQUE` (`username` ASC))
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 9
-- DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `applications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `applications`;

CREATE TABLE IF NOT EXISTS `applications` (
  `application_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`application_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `transactions`;

CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` INT(11) NOT NULL AUTO_INCREMENT,
  `application_id` INT(11) NOT NULL,
  `route` VARCHAR(255) NOT NULL,
  `method` VARCHAR(100) NOT NULL,
  `user_agent` TEXT,
  `raw_headers` TEXT,
  `cookies` TEXT,
  `remote_address` VARCHAR(150),
  `start_timestamp` TIMESTAMP(6) NOT NULL,
  `end_timestamp` TIMESTAMP(6) NOT NULL,
  `duration` float(40) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `application_id_idx` (`application_id` ASC),
  CONSTRAINT `transaction_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `traces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traces`;

CREATE TABLE IF NOT EXISTS `traces` (
  `trace_id` INT(11) NOT NULL AUTO_INCREMENT,
  `application_id` INT(11) NOT NULL,
  `transaction_id` INT(11) NOT NULL,
  `route` VARCHAR(255) NOT NULL,
  `method` VARCHAR(100) NOT NULL,
  `library` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `start_timestamp` TIMESTAMP(6) NOT NULL,
  `end_timestamp` TIMESTAMP(6) NOT NULL,
  `duration` float(40) NOT NULL,
  PRIMARY KEY (`trace_id`),
  INDEX `application_id_idx` (`application_id` ASC),
  CONSTRAINT `trace_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `trace_transaction_id`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `transactions` (`transaction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Delete Tables
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `applications`;
-- DROP TABLE IF EXISTS `transactions`;
-- DROP TABLE IF EXISTS `traces`;
-- DROP TABLE IF EXISTS `users`;