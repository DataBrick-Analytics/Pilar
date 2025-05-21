CREATE database databrick;
USE databrick;
CREATE TABLE IF NOT EXISTS `empresas` (
  `id_empresa` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `cnpj` VARCHAR(45) NULL,
  `data_criacao` DATETIME NULL,
  `date_edicao` DATETIME NULL,
  PRIMARY KEY (`id_empresa`)
);

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT NOT NULL auto_increment,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(85) NULL UNIQUE,
  `senha` VARCHAR(64) NULL,
  `fk_empresa` INT NOT NULL,
  `funcao_empresa` VARCHAR(45) NOT NULL,
  `data_cadastro` DATE NULL,
  PRIMARY KEY (`id_usuario`, `fk_empresa`)
);

CREATE TABLE IF NOT EXISTS `bairros` (
  `id_bairro` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(85) NULL,
  PRIMARY KEY (`id_bairro`)
);

CREATE TABLE IF NOT EXISTS `info_regiao` (
  `udh_id` INT NOT NULL,
  `nome_udh` VARCHAR(45) NULL,
  `codigo_municipio` INT NULL,
  `nome_municipio` VARCHAR(45) NULL,
  `codigo_regiao` INT NULL,
  `nome_regiao` VARCHAR(45) NULL,
  `renda_domiciliar_quinto_mais_pobre` DOUBLE NULL,
  `renda_domiciliar_segundo_quinto_mais_pobre` DOUBLE NULL,
  `renda_domiciliar_terceiro_quinto_mais_pobre` DOUBLE NULL,
  `renda_domiciliar_quarto_quinto_mais_pobre` DOUBLE NULL,
  `renda_domiciliar_quinto_mais_rico` DOUBLE NULL,
  `populacao_total` INT NULL,
  `codigo_destrito` INT NULL,
  `nome_destrito` VARCHAR(45) NULL,
  `divisao_regional` VARCHAR(45) NULL,
  `nome_prefeitura_regional` VARCHAR(45) NULL,
  `fk_regioes` INT NOT NULL,
  PRIMARY KEY (`udh_id`)
);


CREATE TABLE IF NOT EXISTS `propriedades` (
  `id_imovel` INT NOT NULL,
  `cep` VARCHAR(8) NULL,
  `nome_endereco` VARCHAR(150) NULL,
  `tipo_endereco` VARCHAR(50) NULL,
  `endereco_completo` VARCHAR(255) NULL,
  `estado` VARCHAR(2) NULL,
  `bairro` VARCHAR(100) NULL,
  `zona` VARCHAR(50) NULL,
  `latitude` VARCHAR(10) NULL,
  `longitude` VARCHAR(10) NULL,
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
  `fk_regioes` INT NOT NULL,
  `distrito` VARCHAR(45) NULL,
  PRIMARY KEY (`id_imovel`)
);

CREATE TABLE IF NOT EXISTS `seguranca` (
  `id_delegacia` INT NOT NULL,
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
  `coleta` YEAR NULL,
  `fk_regioes` INT NOT NULL,
  PRIMARY KEY (`id_delegacia`)
);

CREATE TABLE IF NOT EXISTS `favoritos` (
  `fk_usuario` INT NOT NULL,
  `fk_empresa` INT NOT NULL,
  `fk_propriedade` INT NOT NULL,
  `id_favorito` VARCHAR(45) NOT NULL,
  `data_favorito` DATETIME NULL,
  PRIMARY KEY (`fk_usuario`, `fk_empresa`, `fk_propriedade`, `id_favorito`)
);

CREATE TABLE IF NOT EXISTS `logs` (
  `id_logs` INT NOT NULL,
  `data_hora` DATETIME NULL,
  `tipo_processo` VARCHAR(80) NULL,
  `status` VARCHAR(50) NULL,
  `mensagem` VARCHAR(255) NULL,
  `usuario` VARCHAR(90) NULL,
  PRIMARY KEY (`id_logs`)
);

CREATE TABLE IF NOT EXISTS `acoes` (
  `id_acao` INT NOT NULL,
  `tipo` VARCHAR(45) NULL,
  `descricao` VARCHAR(120) NULL,
  PRIMARY KEY (`id_acao`)
);

CREATE TABLE IF NOT EXISTS `telefones` (
  `id_telefone` INT NOT NULL,
  `telefone` CHAR(11) NULL,
  `fk_empresa` INT NOT NULL,
  PRIMARY KEY (`id_telefone`, `fk_empresa`)
);

CREATE TABLE IF NOT EXISTS `enderecos` (
  `id_endereco` INT NOT NULL,
  `rua` VARCHAR(75) NULL,
  `bairro` VARCHAR(45) NULL,
  `cep` CHAR(8) NULL,
  `cidade` VARCHAR(55) NULL,
  `estado` VARCHAR(45) NULL,
  `uf` CHAR(2) NULL,
  `fk_empresa` INT NOT NULL,
  PRIMARY KEY (`id_endereco`, `fk_empresa`)
);

INSERT INTO empresas (id_empresa, nome, cnpj, data_criacao, date_edicao) 
VALUES (1, 'Empresa Exemplo', '00.000.000/0000-00', '2025-05-20 20:35:00', '2025-05-20 20:35:00');

INSERT INTO usuarios (id_usuario, nome, email, senha, fk_empresa, funcao_empresa, data_cadastro) 
VALUES (1, 'Pedro Silva', 'pedro.silva@email.com', 'senhaSegura123', 1, 'Administrador', '2025-05-20');

