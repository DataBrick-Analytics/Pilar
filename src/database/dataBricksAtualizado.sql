DROP DATABASE databrick;
CREATE DATABASE databrick;
USE databrick;

CREATE TABLE IF NOT EXISTS empresa (
  id_empresa INT NOT NULL auto_increment,
  razao_social VARCHAR(45) NOT NULL UNIQUE,
  `nome_fantasia`VARCHAR(50) NOT NULL,
  cnpj VARCHAR(45) NULL UNIQUE,
  data_criacao DATETIME NULL,
  date_edicao DATETIME NULL,
  PRIMARY KEY (id_empresa)
);

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(85) NOT NULL UNIQUE,
  senha VARCHAR(64) NOT NULL,
  fk_empresa INT NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  data_nasc DATE NOT NULL,
  funcao_empresa VARCHAR(45) NOT NULL,
  data_criacao DATETIME NOT NULL,
  data_edicao DATETIME NOT NULL,
  PRIMARY KEY (id_usuario),
  FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE IF NOT EXISTS distrito (
  id_distrito BIGINT NOT NULL AUTO_INCREMENT,
  nome_distrito VARCHAR(45) NULL,
  area DECIMAL(10,1),
  zona VARCHAR(45) NULL,
  populacao INT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_distrito)
);

CREATE TABLE IF NOT EXISTS propriedade (
  id_imovel INT NOT NULL AUTO_INCREMENT,
  uso_iptu VARCHAR(100) NULL,
  fk_distrito BIGINT NOT NULL,
  data_criacao DATETIME NOT NULL,
  data_edicao DATETIME NOT NULL,
   FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
   PRIMARY KEY (id_imovel)
);

CREATE TABLE IF NOT EXISTS seguranca (
  id_delegacia INT NOT NULL AUTO_INCREMENT,
  nome_regiao VARCHAR(100) NULL,
  delegacia VARCHAR(100) NULL,
  furtos_regiao INT NULL,
  roubos_cargas INT NULL,
  roubos INT NULL,
  roubos_veiculos INT NULL,
  furtos_veiculos INT NULL,
  latrocinios INT NULL,
  homicidio_doloso_acidente_transito INT NULL,
  homicidio_culposo_acidente_transito INT NULL,
  homicidio_culposo INT NULL,
  ano_ultima_coleta YEAR NULL,
  fk_distrito BIGINT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_delegacia)
);

CREATE TABLE IF NOT EXISTS log (
  id_logs INT NOT NULL AUTO_INCREMENT,
  tipo_processo VARCHAR(80) NOT NULL,
  status VARCHAR(50) NULL,
  mensagem VARCHAR(255) NULL,
  usuario VARCHAR(90) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_logs)
);

CREATE TABLE IF NOT EXISTS acao (
  id_acao INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(45) NULL,
  descricao VARCHAR(120) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_acao)
);

CREATE TABLE IF NOT EXISTS acao_de_usuario (
  id_acao_usuario INT  NOT NULL AUTO_INCREMENT primary key,
  fk_usuario INT NOT NULL,
  fk_empresa INT NOT NULL,
  fk_acao INT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa),
  FOREIGN KEY (fk_usuario) REFERENCES usuario(fk_empresa),
  FOREIGN KEY (fk_acao) REFERENCES acao(id_acao)
);


CREATE TABLE IF NOT EXISTS telefone (
  id_telefone INT NOT NULL AUTO_INCREMENT,
  telefone CHAR(11) NULL,
  fk_empresa INT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_telefone),
  FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE IF NOT EXISTS endereco (
  id_endereco INT NOT NULL AUTO_INCREMENT,
  rua VARCHAR(75) NULL,
  bairro VARCHAR(45) NULL,
  cep CHAR(8) NULL,
  cidade VARCHAR(55) NULL,
  estado VARCHAR(45) NULL,
  uf CHAR(2) NULL,
  fk_empresa INT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_endereco),
  FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE IF NOT EXISTS notificacao (
  id_notificacao INT NOT NULL AUTO_INCREMENT,
  canal VARCHAR(45) NULL,
  cargo VARCHAR(45) NULL,
  status TINYINT NULL,
  fk_usuario INT NOT NULL,
  fk_empresa INT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  PRIMARY KEY (id_notificacacoes)
);

CREATE TABLE IF NOT EXISTS info_regiao (
  udh_id INT NOT NULL AUTO_INCREMENT,
  nome_udh VARCHAR(500) NULL,
  codigo_municipio INT NULL,
  nome_municipio VARCHAR(45) NULL,
  codigo_regiao INT NULL,
  nome_regiao VARCHAR(45) NULL,
  renda_domiciliar_quinto_mais_pobre DOUBLE NULL,
  renda_domiciliar_segundo_quinto_mais_pobre DOUBLE NULL,
  renda_domiciliar_terceiro_quinto_mais_pobre DOUBLE NULL,
  renda_domiciliar_quarto_quinto_mais_pobre DOUBLE NULL,
  renda_domiciliar_quinto_mais_rico DOUBLE NULL,
  populacao_total INT NULL,
  codigo_distrito INT NULL,
  nome_distrito VARCHAR(45) NULL,
  divisao_regional VARCHAR(45) NULL,
  nome_prefeitura_regional VARCHAR(45) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (udh_id)
);

CREATE TABLE IF NOT EXISTS educacao (
  id_educacao INT NOT NULL AUTO_INCREMENT,
  nome_escola VARCHAR(155) NULL,
  nome_distrito VARCHAR(45) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NOT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_educacao)
);

CREATE TABLE IF NOT EXISTS saude (
  id_saude INT NOT NULL AUTO_INCREMENT,
  nome_distrito VARCHAR(45) NULL,
  nome_unidade VARCHAR(155) NULL,
  tipo_unidade VARCHAR(155) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NOT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_saude)
);

CREATE TABLE IF NOT EXISTS precificacao (
  id_precificacao INT NOT NULL AUTO_INCREMENT,
  preco DECIMAL(10,2) NULL,
  data_precificacao VARCHAR(45) NULL,
  area DECIMAL(10,2) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NOT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_precificacao)
);

CREATE TABLE IF NOT EXISTS mobilidade (
  id_mobilidade INT NOT NULL AUTO_INCREMENT,
  nome_distrito VARCHAR(100) NULL,
  qtd_pontos_onibus DECIMAL(10,2) NULL,
  qtd_estacoes_trem_metro DECIMAL(10,2) NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NOT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_mobilidade)
);

CREATE TABLE IF NOT EXISTS parque (
  id_parques INT NOT NULL AUTO_INCREMENT,
  nome_parque VARCHAR(100) NULL UNIQUE,
  nome_distrito VARCHAR(45) NULL,
  fk_distrito BIGINT NOT NULL,
  data_criacao DATETIME NULL,
  data_edicao DATETIME NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  PRIMARY KEY (id_parques)
);

CREATE TABLE IF NOT EXISTS escolhas_formulario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    etapa1 VARCHAR(20),
    etapa2 VARCHAR(20),
    etapa3 VARCHAR(20),
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE favorito (
  id_favorito INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fk_usuario INT NOT NULL,
  fk_empresa INT NOT NULL,
  data_favorito DATETIME NULL,
  data_edicao DATETIME NULL,
  fk_distrito BIGINT NOT NULL,
  FOREIGN KEY (fk_distrito) REFERENCES distrito(id_distrito),
  FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE valores_formulario (
    idFormulario INT PRIMARY KEY AUTO_INCREMENT,
    baixaViolencia TINYINT NOT NULL DEFAULT 0,
    malhaUrbana TINYINT NOT NULL DEFAULT 0,
    valorM2 TINYINT NOT NULL DEFAULT 0,
    rendaMedia TINYINT NOT NULL DEFAULT 0,
    flutuacaoM2 TINYINT NOT NULL DEFAULT 0,
    parques TINYINT NOT NULL DEFAULT 0,
    hospitais TINYINT NOT NULL DEFAULT 0,
    escolas TINYINT NOT NULL DEFAULT 0,
    fk_usuario INT NOT NULL,
    data_criacao DATETIME NULL,
    data_edicao DATETIME NULL
);

SET GLOBAL sql_mode = (SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));