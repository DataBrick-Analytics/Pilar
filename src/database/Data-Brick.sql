-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DATABRICK` DEFAULT CHARACTER SET utf8 ;
USE `DATABRICK` ;
-- -----------------------------------------------------
-- Table `mydb`.`tb_empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_empresa` (
  `id_empresa` INT NOT NULL auto_increment,
  `nome` VARCHAR(45) NULL,
  `endereco` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `data_cadastro` DATE NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`id_empresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_funcao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_funcao` (
  `id_funcao` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_funcao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_usuario` (
  `id_usuario` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `data_cadastro` DATE NULL,
  `fk_empresa` INT NOT NULL,
  `fk_funcao` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `fk_empresa`),
  INDEX `fk_Tb_usuario_Tb_empresa_idx` (`fk_empresa` ASC) VISIBLE,
  INDEX `fk_Tb_usuario_Tb_role1_idx` (`fk_funcao` ASC) VISIBLE,
  CONSTRAINT `fk_Tb_usuario_Tb_empresa`
    FOREIGN KEY (`fk_empresa`)
    REFERENCES `mydb`.`tb_empresa` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tb_usuario_Tb_role1`
    FOREIGN KEY (`fk_funcao`)
    REFERENCES `mydb`.`tb_funcao` (`id_funcao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_seguranca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_seguranca` (
  `id_regiao` INT NOT NULL,
  `nome_regiao` VARCHAR(100) NULL,
  `delegacia` VARCHAR(100) NULL,
  `furtos_regiao` INT NULL,
  `roubos_cargas` INT NULL,
  `roubos` INT NULL,
  `roubos_veiculos` INT NULL,
  `furtos_veiculos` INT NULL,
  `latrocinios` INT NULL,
  `homicio_doloso_acidente_transito` INT NULL,
  `homicidio_culposo_acidente_transito` INT NULL,
  `homicidio_culposo` INT NULL,
  `regiao` VARCHAR(100) NULL,
  PRIMARY KEY (`id_regiao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_propriedade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_propriedade` (
  `id_imovel` INT NOT NULL,
  `cep` VARCHAR(20) NULL,
  `nome_endereco` VARCHAR(150) NULL,
  `tipo_endereco` VARCHAR(50) NULL,
  `endereco_completo` VARCHAR(255) NULL,
  `estado` VARCHAR(2) NULL,
  `bairro` VARCHAR(100) NULL,
  `zona` VARCHAR(50) NULL,
  `latitude` DECIMAL(10,8) NULL,
  `longitude` DECIMAL(11,8) NULL,
  `cidade` VARCHAR(100) NULL,
  `codigo_ibge_cidade` INT NULL,
  `ddd` VARCHAR(2) NULL,
  `descricao_uso_iptu` VARCHAR(100) NULL,
  `area_terreno_m2` DECIMAL(8,2) NULL,
  `area_construida_m2` DECIMAL(8,2) NULL,
  `registro_propriedade` VARCHAR(100) NULL,
  `cartorio_registro` VARCHAR(100) NULL,
  `valor_mercado_divulgado` DECIMAL(10,2) NULL,
  `valor_proporcional_mercado` DECIMAL(10,2) NULL,
  `valor_transacao_declarado` DECIMAL(10,2) NULL,
  `sql_status` VARCHAR(50) NULL,
  `fk_regiao` INT NOT NULL,
  PRIMARY KEY (`id_imovel`),
  INDEX `fk_tb_propriedade_tb_seguranca1_idx` (`fk_regiao` ASC) VISIBLE,
  CONSTRAINT `fk_tb_propriedade_tb_seguranca1`
    FOREIGN KEY (`fk_regiao`)
    REFERENCES `mydb`.`tb_seguranca` (`id_regiao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_favoritos` (
  `fk_usuario` INT NOT NULL,
  `fk_empresa` INT NOT NULL,
  `fk_propriedade` INT NOT NULL,
  `id_favorito` VARCHAR(45) NOT NULL,
  `data_favorito` DATETIME NULL,
  PRIMARY KEY (`fk_usuario`, `fk_empresa`, `fk_propriedade`, `id_favorito`),
  INDEX `fk_tb_usuario_has_tb_propriedade_tb_propriedade1_idx` (`fk_propriedade` ASC) VISIBLE,
  INDEX `fk_tb_usuario_has_tb_propriedade_tb_usuario1_idx` (`fk_usuario` ASC, `fk_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_tb_usuario_has_tb_propriedade_tb_usuario1`
    FOREIGN KEY (`fk_usuario` , `fk_empresa`)
    REFERENCES `mydb`.`tb_usuario` (`id_usuario` , `fk_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_usuario_has_tb_propriedade_tb_propriedade1`
    FOREIGN KEY (`fk_propriedade`)
    REFERENCES `mydb`.`tb_propriedade` (`id_imovel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DATABRICK`.`tb_logs` (
  `id_logs` INT NOT NULL,
  `data_hora` DATETIME NULL,
  `tipo_processo` VARCHAR(80) NULL,
  `status` VARCHAR(50) NULL,
  `mensagem` VARCHAR(255) NULL,
  `usuarios` VARCHAR(90) NULL,
  PRIMARY KEY (`id_logs`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Inserindo funções na tabela tb_funcao
INSERT INTO DATABRICK.tb_funcao (id_funcao, nome, descricao) VALUES
(1, 'Administrador', 'Acesso total ao sistema'),
(2, 'Gestor', 'Gerencia empresas e usuários'),
(3, 'Analista', 'Visualiza e analisa dados'),
(4, 'Usuário', 'Acesso restrito a funcionalidades básicas');
