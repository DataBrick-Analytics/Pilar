CREATE DATABASE IF NOT EXISTS databrick;
USE databrick;

CREATE TABLE IF NOT EXISTS empresas (
  id_empresa INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) not NULL,
  endereco VARCHAR(80) not NULL,
  telefone VARCHAR(11) not NULL,
  email VARCHAR(45) not NULL,
  senha char(64) not null,
  data_cadastro DATE not NULL,
  PRIMARY KEY (id_empresa)
);


CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  email VARCHAR(85) NULL,
  senha VARCHAR(45) NULL,
  data_cadastro DATE NULL,
  fk_empresa INT NOT NULL,
  funcao_empresa VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_usuario, fk_empresa),
  CONSTRAINT fk_usuario_empresa
    FOREIGN KEY (fk_empresa)
    REFERENCES empresas (id_empresa)
);

CREATE TABLE IF NOT EXISTS seguranca (
  id_regiao INT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (id_regiao)
);

CREATE TABLE IF NOT EXISTS propriedades (
  id_imovel INT NOT NULL AUTO_INCREMENT,
  cep VARCHAR(8) NULL,
  nome_endereco VARCHAR(150) NULL,
  tipo_endereco VARCHAR(50) NULL,
  endereco_completo VARCHAR(255) NULL,
  estado VARCHAR(2) NULL,
  bairro VARCHAR(100) NULL,
  zona VARCHAR(50) NULL,
  latitude VARCHAR(10) NULL,
  longitude VARCHAR(10) NULL,
  cidade VARCHAR(100) NULL,
  codigo_ibge_cidade INT NULL,
  ddd VARCHAR(2) NULL,
  descricao_uso_iptu VARCHAR(100) NULL,
  area_terreno_m2 DECIMAL(8,2) NULL,
  area_construida_m2 DECIMAL(8,2) NULL,
  registro_propriedade VARCHAR(100) NULL,
  cartorio_registro VARCHAR(100) NULL,
  valor_mercado_divulgado DECIMAL(10,2) NULL,
  valor_proporcional_mercado DECIMAL(10,2) NULL,
  valor_transacao_declarado DECIMAL(10,2) NULL,
  sql_status VARCHAR(50) NULL,
  fk_regiao INT NOT NULL,
  PRIMARY KEY (id_imovel),
  CONSTRAINT fk_propriedade_seguranca
    FOREIGN KEY (fk_regiao)
    REFERENCES seguranca (id_regiao)
);

CREATE TABLE IF NOT EXISTS favoritos (
  id_favorito INT NOT NULL,
  fk_usuario INT NOT NULL,
  fk_empresa INT NOT NULL,
  fk_propriedade INT NOT NULL,
  data_favorito DATETIME NULL,
  PRIMARY KEY (id_favorito, fk_usuario, fk_empresa, fk_propriedade),
  CONSTRAINT fk_favoritos_usuario_empresa
    FOREIGN KEY (fk_usuario, fk_empresa)
    REFERENCES usuarios (id_usuario, fk_empresa),
  CONSTRAINT fk_favoritos_propriedade
    FOREIGN KEY (fk_propriedade)
    REFERENCES propriedades (id_imovel)
);

CREATE TABLE IF NOT EXISTS logs (
  id_log INT NOT NULL AUTO_INCREMENT,
  data_hora DATETIME NULL,
  tipo_processo VARCHAR(80) NULL,
  status VARCHAR(50) NULL,
  mensagem VARCHAR(255) NULL,
  usuarios VARCHAR(90) NULL,
  PRIMARY KEY (id_log)
);

CREATE TABLE IF NOT EXISTS acoes (
  id_acao INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(45) NULL,
  descricao VARCHAR(120) NULL,
  PRIMARY KEY (id_acao)
);

CREATE TABLE IF NOT EXISTS acoes_de_usuario (
  id_acao_usuario INT NOT NULL AUTO_INCREMENT,
  id_usuario INT  NULL,
  fk_empresa INT NOT NULL,
  id_acao INT NOT NULL,
  dt_acao DATETIME NULL,
  PRIMARY KEY (id_acao_usuario),
  CONSTRAINT fk_usuarios_empresa
    FOREIGN KEY (id_usuario, fk_empresa)
    REFERENCES usuarios (id_usuario, fk_empresa),
  CONSTRAINT fk_usuarios_acoes
    FOREIGN KEY (id_acao)
    REFERENCES acoes (id_acao)
);
SELECT * FROM empresas;
SELECT * FROM usuarios;
SELECT * FROM acoes_de_usuario;
SHOW TABLES;


INSERT INTO empresas (nome, endereco, telefone, email, senha, data_cadastro)  
VALUES ('Tech Solutions Ltda', 'Rua das Inovações, 123', '11987654321', 'contato@techsolutions.com', SHA2('senhaSegura123', 256), CURDATE());

INSERT INTO usuarios (id_usuario, nome, email, senha, data_cadastro, fk_empresa, funcao_empresa)  
VALUES (1, 'Pedro Silva', 'pedro.silva@email.com', 'senha123', CURDATE(), 1, 'Desenvolvedor');

INSERT INTO acoes (tipo, descricao)
VALUES ('Login', 'acessou o sistema');