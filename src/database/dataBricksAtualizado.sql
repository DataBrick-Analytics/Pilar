CREATE
    DATABASE databrick;
USE
    databrick;

CREATE TABLE IF NOT EXISTS `empresa`
(
    `id_empresa`
                    INT
                                NOT
                                    NULL
        auto_increment,
    `razao_social`
                    VARCHAR(45) NOT NULL UNIQUE,
    `nome_fantasia` VARCHAR(50) NOT NULL,
    `cnpj`          VARCHAR(45) NULL UNIQUE,
    `data_criacao`  DATETIME    NULL,
    `date_edicao`   DATETIME    NULL,
    PRIMARY KEY
        (
         `id_empresa`
            )
);

CREATE TABLE IF NOT EXISTS `usuario`
(
    `id_usuario`
                     INT
                                 NOT
                                     NULL
        AUTO_INCREMENT,
    `nome`
                     VARCHAR(45) NOT NULL,
    `email`          VARCHAR(85) NOT NULL UNIQUE,
    `senha`          VARCHAR(64) NOT NULL,
    `fk_empresa`     INT         NOT NULL,
    `cpf`            VARCHAR(11) NOT NULL UNIQUE,
    `data_nasc`      DATE        NOT NULL,
    `funcao_empresa` VARCHAR(45) NOT NULL,
    `data_criacao`   DATETIME    NOT NULL,
    `data_edicao`    DATE        NOT NULL,
    PRIMARY KEY
        (
         `id_usuario`
            ),
    FOREIGN KEY
        (
         `fk_empresa`
            ) REFERENCES empresa
        (
         `id_empresa`
            )
);

CREATE TABLE IF NOT EXISTS `distrito`
(
    `id_distrito`
                   INT
                               NOT
                                   NULL
        AUTO_INCREMENT,
    `nome_distrito`
                   VARCHAR(45) NULL,
    `data_criacao` DATETIME    NULL,
    `data_edicao`  DATETIME    NULL,
    PRIMARY KEY
        (
         `id_distrito`
            )
);

CREATE TABLE IF NOT EXISTS `propriedade`
(
    `id_imovel`
                                 INT
                                              NOT
                                                  NULL
        AUTO_INCREMENT,
    `cep`
                                 VARCHAR(8)   NULL,
    `nome_endereco`              VARCHAR(150) NULL,
    `tipo_endereco`              VARCHAR(50)  NULL,
    `endereco_completo`          VARCHAR(255) NULL,
    `estado`                     VARCHAR(2)   NULL,
    `bairro`                     VARCHAR(100) NULL,
    `zona`                       VARCHAR(50)  NULL,
    `latitude`                   VARCHAR(10)  NULL,
    `longitude`                  VARCHAR(10)  NULL,
    `cidade`                     VARCHAR(100) NULL,
    `codigo_ibge_cidade`         INT          NULL,
    `ddd`                        VARCHAR(2)   NULL,
    `uso_iptu`                   int          NULL,
    `area_terreno_m2`            DECIMAL(10,
                                     2)       NULL,
    `area_construida_m2`         DECIMAL(10,
                                     2)       NULL,
    `registro_propriedade`       VARCHAR(100) NULL,
    `cartorio_registro`          VARCHAR(100) NULL,
    `valor_mercado_divulgado`    DECIMAL(10,
                                     2)       NULL,
    `valor_proporcional_mercado` DECIMAL(10,
                                     2)       NULL,
    `valor_transacao_declarado`  DECIMAL(10,
                                     2)       NULL,
    `sql_status`                 VARCHAR(50)  NULL,
    `distrito`                   VARCHAR(45)  NULL,
    `data_criacao`               DATETIME     NULL,
    `data_edicao`                DATETIME     NULL,
    `fk_distrito`                INT          NOT NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `id_imovel`
            )
);

CREATE TABLE IF NOT EXISTS `seguranca`
(
    `id_delegacia`
                                          INT
                                                       NOT
                                                           NULL
        AUTO_INCREMENT,
    `nome_regiao`
                                          VARCHAR(100) NULL,
    `delegacia`                           VARCHAR(100) NULL,
    `furtos_regiao`                       INT          NULL,
    `roubos_cargas`                       INT          NULL,
    `roubos`                              INT          NULL,
    `roubos_veiculos`                     INT          NULL,
    `furtos_veiculos`                     INT          NULL,
    `latrocinios`                         INT          NULL,
    `homicio_doloso_acidente_transito`    INT          NULL,
    `homicidio_culposo_acidente_transito` INT          NULL,
    `homicidio_culposo`                   INT          NULL,
    `coleta`                              YEAR         NULL,
    `fk_distrito`                         INT          NOT NULL,
    `data_criacao`                        DATETIME     NULL,
    `data_edicao`                         DATETIME     NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `id_delegacia`
            )
);

CREATE TABLE IF NOT EXISTS `favorito`
(
    `fk_usuario`
        INT
        NOT
            NULL,
    `fk_empresa`
        INT
        NOT
            NULL,
    `id_favorito`
        INT
        NOT
            NULL,
    `data_favorito`
        DATETIME
        NULL,
    `data_edicao`
        DATETIME
        NULL,
    `rank`
        INT
        not
            NULL,
    `fk_distrito`
        INT
        NOT
            NULL,
    FOREIGN
        KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `fk_usuario`,
         `fk_empresa`,
         `id_favorito`
            )
);

CREATE TABLE IF NOT EXISTS `log`
(
    `id_logs`
                   INT
                                NOT
                                    NULL
        AUTO_INCREMENT,
    `tipo_processo`
                   VARCHAR(80)  NOT NULL,
    `status`       VARCHAR(50)  NULL,
    `mensagem`     VARCHAR(255) NULL,
    `usuario`      VARCHAR(90)  NULL,
    `data_criacao` DATETIME     NULL,
    `data_edicao`  DATETIME     NULL,
    PRIMARY KEY
        (
         `id_logs`
            )
);

CREATE TABLE IF NOT EXISTS `acao`
(
    `id_acao`
                   INT
                                NOT
                                    NULL
        AUTO_INCREMENT,
    `tipo`
                   VARCHAR(45)  NULL,
    `descricao`    VARCHAR(120) NULL,
    `data_criacao` DATETIME     NULL,
    `data_edicao`  DATETIME     NULL,
    PRIMARY KEY
        (
         `id_acao`
            )
);

CREATE TABLE IF NOT EXISTS `acao_de_usuario`
(
    `id_acao_usuario`
        INT
                    NOT
                        NULL
        AUTO_INCREMENT
        primary
            key,
    `fk_usuario`
        INT
                    NOT
                        NULL,
    `fk_empresa`
        INT
                    NOT
                        NULL,
    `fk_acao`
        INT
                    NOT
                        NULL,
    `data_criacao`
        DATETIME
                    NULL,
    `data_edicao`
        VARCHAR(45) NULL,
    FOREIGN KEY
        (
         fk_empresa
            ) REFERENCES empresa
        (
         id_empresa
            ),
    FOREIGN KEY
        (
         fk_usuario
            ) REFERENCES usuario
        (
         fk_empresa
            ),
    FOREIGN KEY
        (
         fk_acao
            ) REFERENCES acao
        (
         id_acao
            )
);


CREATE TABLE IF NOT EXISTS `telefone`
(
    `id_telefone`
                   INT
                            NOT
                                NULL
        AUTO_INCREMENT,
    `telefone`
                   CHAR(11) NULL,
    `fk_empresa`   INT      NOT NULL,
    `data_criacao` DATETIME NULL,
    `data_edicao`  DATETIME NULL,
    PRIMARY KEY
        (
         `id_telefone`
            ),
    FOREIGN KEY
        (
         fk_empresa
            ) REFERENCES empresa
        (
         id_empresa
            )
);

CREATE TABLE IF NOT EXISTS `endereco`
(
    `id_endereco`
                   INT
                               NOT
                                   NULL
        AUTO_INCREMENT,
    `rua`
                   VARCHAR(75) NULL,
    `bairro`       VARCHAR(45) NULL,
    `cep`          CHAR(8)     NULL,
    `cidade`       VARCHAR(55) NULL,
    `estado`       VARCHAR(45) NULL,
    `uf`           CHAR(2)     NULL,
    `fk_empresa`   INT         NOT NULL,
    `data_criacao` DATETIME    NULL,
    `data_edicao`  DATETIME    NULL,
    PRIMARY KEY
        (
         `id_endereco`
            ),
    FOREIGN KEY
        (
         fk_empresa
            ) REFERENCES empresa
        (
         id_empresa
            )
);

CREATE TABLE IF NOT EXISTS `notificacao`
(
    `id_notificacacoes`
                     INT
                                 NOT
                                     NULL
        AUTO_INCREMENT,
    `canal`
                     VARCHAR(45) NULL,
    `usuario`        VARCHAR(45) NULL,
    `status_usuario`         BOOLEAN     NULL,
    `fk_usuario`     INT         NOT NULL,
    `fk_empresa`     INT         NOT NULL,
    `fk_log`         INT         NOT NULL,
    `data_criacao`   DATETIME    NULL,
    `data_edicao`    DATETIME    NULL,
    PRIMARY KEY
        (
         `id_notificacacoes`
            )
);

CREATE TABLE IF NOT EXISTS `info_regiao`
(
    `udh_id`
                                                  INT
                                                              NOT
                                                                  NULL
        AUTO_INCREMENT,
    `nome_udh`
                                                  VARCHAR(45) NULL,
    `codigo_municipio`                            INT         NULL,
    `nome_municipio`                              VARCHAR(45) NULL,
    `codigo_regiao`                               INT         NULL,
    `nome_regiao`                                 VARCHAR(45) NULL,
    `renda_domiciliar_quinto_mais_pobre`          DOUBLE      NULL,
    `renda_domiciliar_segundo_quinto_mais_pobre`  DOUBLE      NULL,
    `renda_domiciliar_terceiro_quinto_mais_pobre` DOUBLE      NULL,
    `renda_domiciliar_quarto_quinto_mais_pobre`   DOUBLE      NULL,
    `renda_domiciliar_quinto_mais_rico`           DOUBLE      NULL,
    `populacao_total`                             INT         NULL,
    `codigo_destrito`                             INT         NULL,
    `nome_destrito`                               VARCHAR(45) NULL,
    `divisao_regional`                            VARCHAR(45) NULL,
    `nome_prefeitura_regional`                    VARCHAR(45) NULL,
    `data_criacao`                                DATETIME    NULL,
    `data_edicao`                                 DATETIME    NULL,
    `fk_distrito`                                 INT         NOT NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `udh_id`
            )
);

CREATE TABLE IF NOT EXISTS `educacao`
(
    `id_educacao`
                      INT
                                  NOT
                                      NULL
        AUTO_INCREMENT,
    `nome_escola`
                      VARCHAR(45) NULL,
    `nome_distrito`   VARCHAR(45) NULL,
    `codigo_distrito` VARCHAR(45) NULL,
    `data_criacao`    DATETIME    NULL,
    `data_edicao`     DATETIME    NULL,
    `fk_distrito`     INT         NOT NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `id_educacao`
            )
);

CREATE TABLE IF NOT EXISTS `saude`
(
    `id_saude`
                    INT
                                NOT
                                    NULL
        AUTO_INCREMENT,
    `codigo_distrito`
                    VARCHAR(45) NULL,
    `nome_distrito` VARCHAR(45) NULL,
    `nome_unidade`  VARCHAR(45) NULL,
    `tipo_unidade`  VARCHAR(45) NULL,
    `data_criacao`  DATETIME    NULL,
    `data_edicao`   DATETIME    NULL,
    `fk_distrito`   INT         NOT NULL,
    PRIMARY KEY
        (
         `id_saude`
            )
);

CREATE TABLE IF NOT EXISTS `precificacao`
(
    `id_precificacao`
                        INT
                                    NOT
                                        NULL
        AUTO_INCREMENT,
    `preco`
                        DECIMAL(10,
                            2)      NULL,
    `data_precificacao` VARCHAR(45) NULL,
    `area`              DECIMAL(10,
                            2)      NULL,
    `data_criacao`      DATETIME    NULL,
    `data_edicao`       DATETIME    NULL,
    `fk_distrito`       INT         NOT NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `id_precificacao`
            )
);

CREATE TABLE IF NOT EXISTS `mobilidade`
(
    `id_mobilidade`
                              INT
                                           NOT
                                               NULL
        AUTO_INCREMENT,
    `nome_distrito`
                              VARCHAR(100) NULL,
    `qtd_pontos_onibus`       DECIMAL(10,
                                  2)       NULL,
    `qtd_estacoes_trem_metro` DECIMAL(10,
                                  2)       NULL,
    `data_criacao`            DATETIME     NULL,
    `data_edicao`             DATETIME     NULL,
    `fk_distrito`             INT          NOT NULL,
    PRIMARY KEY
        (
         `id_mobilidade`
            )
);

CREATE TABLE IF NOT EXISTS `parque`
(
    `id_parques`
                    INT
                                NOT
                                    NULL
        AUTO_INCREMENT,
    `nome_parque`
                    VARCHAR(45) NULL,
    `nome_distrito` VARCHAR(45) NULL,
    `fk_distrito`   INT         NOT NULL,
    `data_criacao`  DATETIME    NULL,
    `data_edicao`   DATETIME    NULL,
    FOREIGN KEY
        (
         `fk_distrito`
            ) REFERENCES distrito
        (
         `id_distrito`
            ),
    PRIMARY KEY
        (
         `id_parques`
            )
);


INSERT INTO `empresa` (`id_empresa`, `razao_social`, `nome_fantasia`, `cnpj`, `data_criacao`, `date_edicao`)
VALUES (1, 'Tech Solutions Ltda', 'TechSol', '12345678000199', NOW(), NOW()),
       (2, 'Construtora Alpha S.A.', 'Construtora Alpha', '98765432000188', NOW(), NOW()),
       (3, 'Finance Experts Ltda', 'FinExpert', '45678912000177', NOW(), NOW()),
       (4, 'Green Energy Corp', 'GreenEnergy', '32165487000166', NOW(), NOW()),
       (5, 'Auto Parts Ltda', 'AutoParts', '65498732000155', NOW(), NOW()),
       (6, 'Food & Co.', 'FoodCo', '78965421000144', NOW(), NOW()),
       (7, 'EduTech Solutions', 'EduTech', '98732145000133', NOW(), NOW()),
       (8, 'Travel Agency X', 'TravelX', '85296374000122', NOW(), NOW()),
       (9, 'Clothing Trends Ltda', 'ClothingTrends', '74125896000111', NOW(), NOW()),
       (10, 'Legal Advisors S.A.', 'LegalAdvisors', '96385274100100', NOW(), NOW()),
       (11, 'Health & Care Ltda', 'HealthCare', '35795148600199', NOW(), NOW()),
       (12, 'Gaming World S.A.', 'GamingWorld', '15935785200188', NOW(), NOW()),
       (13, 'Real Estate Group Ltda', 'RealEstate', '75395185200177', NOW(), NOW()),
       (14, 'Music & Entertainment Ltda', 'MusicEnt', '45612378900166', NOW(), NOW()),
       (15, 'Sports Unlimited S.A.', 'SportsUnlimited', '25874136900155', NOW(), NOW());


INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `senha`, `fk_empresa`, `cpf`, `data_nasc`, `funcao_empresa`,
                       `data_criacao`, `data_edicao`)
VALUES (1, 'Pedro Silva', 'pedro@email.com', 'senha123', 1, '12345678900', '1990-05-10', 'Desenvolvedor', NOW(), NOW()),
       (2, 'Ana Souza', 'ana@email.com', 'senha456', 2, '98765432100', '1985-08-25', 'Engenheira', NOW(), NOW()),
       (3, 'Lucas Lima', 'lucas@email.com', 'senha789', 3, '15975346800', '1988-03-15', 'Contador', NOW(), NOW()),
       (4, 'Mariana Costa', 'mariana@email.com', 'senha101', 4, '35795146800', '1992-07-12', 'Analista', NOW(), NOW()),
       (5, 'João Mendes', 'joao@email.com', 'senha202', 5, '65498732100', '1980-11-30', 'Gerente', NOW(), NOW()),
       (6, 'Carla Pereira', 'carla@email.com', 'senha303', 6, '85296374100', '1995-09-22', 'Marketing', NOW(), NOW()),
       (7, 'Ricardo Gomes', 'ricardo@email.com', 'senha404', 7, '95175385200', '1983-06-18', 'Professor', NOW(), NOW()),
       (8, 'Fernanda Oliveira', 'fernanda@email.com', 'senha505', 8, '15985275300', '1997-02-05', 'Agente', NOW(),
        NOW()),
       (9, 'Thiago Barbosa', 'thiago@email.com', 'senha606', 9, '75395185200', '1994-12-29', 'Designer', NOW(), NOW()),
       (10, 'Beatriz Ferreira', 'beatriz@email.com', 'senha707', 10, '85274196300', '1981-08-08', 'Advogada', NOW(),
        NOW()),
       (11, 'Gabriel Lima', 'gabriel@email.com', 'senha808', 11, '36985214700', '1989-04-17', 'Médico', NOW(), NOW()),
       (12, 'Sandra Souza', 'sandra@email.com', 'senha909', 12, '74125896300', '1991-10-14', 'Desenvolvedora', NOW(),
        NOW()),
       (13, 'Rodrigo Alves', 'rodrigo@email.com', 'senha010', 13, '98732165400', '1987-05-23', 'Corretor', NOW(),
        NOW()),
       (14, 'Juliana Martins', 'juliana@email.com', 'senha111', 14, '65478932100', '1993-07-01', 'Cantora', NOW(),
        NOW()),
       (15, 'Marcelo Ribeiro', 'marcelo@email.com', 'senha222', 15, '96385274100', '1986-09-27', 'Atleta', NOW(),
        NOW());



INSERT INTO `distrito` (`id_distrito`, `nome_distrito`, `data_criacao`, `data_edicao`)
VALUES (1, 'Centro', NOW(), NOW()),
       (2, 'Zona Sul', NOW(), NOW()),
       (3, 'Zona Norte', NOW(), NOW()),
       (4, 'Zona Leste', NOW(), NOW()),
       (5, 'Zona Oeste', NOW(), NOW()),
       (6, 'Subúrbio', NOW(), NOW()),
       (7, 'Região Metropolitana', NOW(), NOW()),
       (8, 'Distrito Comercial', NOW(), NOW()),
       (9, 'Cidade Universitária', NOW(), NOW()),
       (10, 'Zona Portuária', NOW(), NOW()),
       (11, 'Balneário', NOW(), NOW()),
       (12, 'Área Rural', NOW(), NOW()),
       (13, 'Bairro Industrial', NOW(), NOW()),
       (14, 'Região Histórica', NOW(), NOW()),
       (15, 'Região Montanhosa', NOW(), NOW());


INSERT INTO `propriedade` (`id_imovel`, `cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`,
                           `bairro`, `zona`, `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES (1, '01001000', 'Av. Paulista', 'Comercial', 'Av. Paulista, 1000, Bela Vista', 'SP', 'Bela Vista', 'Urbana',
        '-23.5632', '-46.6561', 'São Paulo', 3550308, '11', 30, 1200.00, 1000000.00, '123456', 'Cartório Centro',
        10000000.00, 9500000.00, 9000000.00, 'Ativo', 'Centro', NOW(), NOW(), 1),
       (2, '11010901', 'Rua XV de Novembro', 'Residencial', 'Rua XV de Novembro, 500, Centro', 'SP', 'Centro', 'Urbana',
        '-23.9609', '-46.3335', 'Santos', 3548500, '13', 20, 300.00, 1500000.00, '654321', 'Cartório Santos',
        12000000.00, 11000000.00, 10500000.00, 'Ativo', 'Centro', NOW(), NOW(), 2),
       (3, '20040002', 'Av. Rio Branco', 'Residencial', 'Av. Rio Branco, 900, Centro', 'RJ', 'Centro', 'Urbana',
        '-22.9073', '-43.1750', 'Rio de Janeiro', 3304557, '21', 10, 2000.00, 2000000.00, '789456', 'Cartório RJ',
        15000000.00, 14000000.00, 13500000.00, 'Ativo', 'Centro', NOW(), NOW(), 3),
       (4, '30110903', 'Av. Afonso Pena', 'Comercial', 'Av. Afonso Pena, 450, Centro', 'MG', 'Centro', 'Urbana',
        '-19.9233', '-43.9386', 'Belo Horizonte', 3106200, '31', 30, 500.00, 2500000.00, '112233', 'Cartório BH',
        16000000.00, 15000000.00, 14500000.00, 'Ativo', 'Centro', NOW(), NOW(), 4),
       (5, '40050004', 'Rua Chile', 'Residencial', 'Rua Chile, 350, Comércio', 'BA', 'Comércio', 'Urbana', '-12.9714',
        '-38.5014', 'Salvador', 2927408, '71', 20, 600.00, 3000000.00, '445566', 'Cartório Salvador', 17000000.00,
        16000000.00, 15500000.00, 'Ativo', 'Centro', NOW(), NOW(), 5),
       (6, '50010906', 'Av. Conde da Boa Vista', 'Residencial', 'Av. Conde da Boa Vista, 1100, Boa Vista', 'PE',
        'Boa Vista', 'Urbana', '-8.0476', '-34.9001', 'Recife', 2611606, '81', 10, 1800.00, 3500000.00, '778899',
        'Cartório Recife', 18000000.00, 17000000.00, 16500000.00, 'Ativo', 'Centro', NOW(), NOW(), 6),
       (7, '60060209', 'Av. Beira Mar', 'Comercial', 'Av. Beira Mar, 200, Meireles', 'CE', 'Meireles', 'Urbana',
        '-3.7265', '-38.5016', 'Fortaleza', 2304400, '85', 30, 900.00, 4000000.00, '998877', 'Cartório Fortaleza',
        19000000.00, 18000000.00, 17500000.00, 'Ativo', 'Centro', NOW(), NOW(), 7),
       (8, '70040908', 'Rua das Palmeiras', 'Residencial', 'Rua das Palmeiras, 250, Asa Sul', 'DF', 'Asa Sul', 'Urbana',
        '-15.7801', '-47.9292', 'Brasília', 5300108, '61', 20, 400.00, 4500000.00, '334455', 'Cartório DF', 20000000.00,
        19000000.00, 18500000.00, 'Ativo', 'Centro', NOW(), NOW(), 8),
       (9, '80020905', 'Rua XV de Novembro', 'Residencial', 'Rua XV de Novembro, 800, Centro', 'PR', 'Centro', 'Urbana',
        '-25.4284', '-49.2733', 'Curitiba', 4106902, '41', 10, 2200.00, 5000000.00, '223344', 'Cartório Curitiba',
        21000000.00, 20000000.00, 19500000.00, 'Ativo', 'Centro', NOW(), NOW(), 9),
       (10, '90040907', 'Av. Borges de Medeiros', 'Comercial', 'Av. Borges de Medeiros, 1300, Centro', 'RS', 'Centro',
        'Urbana', '-30.0346', '-51.2177', 'Porto Alegre', 4314902, '51', 30, 750.00, 6000000.00, '556677',
        'Cartório POA', 22000000.00, 21000000.00, 20500000.00, 'Ativo', 'Centro', NOW(), NOW(), 10);


-- INDUSTRIA (50)
INSERT INTO `propriedade` (`cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`, `bairro`, `zona`,
                           `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES ('04567900', 'Rua Industrial', 'Industrial', 'Rua Industrial, 500, Distrito Industrial', 'SP',
        'Distrito Industrial', 'Urbana', '-23.5500', '-46.6333', 'São Paulo', 3550308, '11', 50, 5000.00, 15000.00,
        'IND123', 'Cartório Indústria SP', 25000000.00, 24000000.00, 23500000.00, 'Ativo', 'Zona Leste', NOW(), NOW(),
        1),
       ('68900000', 'Av. das Fábricas', 'Industrial', 'Av. das Fábricas, 123, Polo Industrial', 'AP', 'Polo Industrial',
        'Urbana', '-0.0341', '-51.0705', 'Macapá', 1600303, '96', 50, 3200.00, 8000.00, 'IND456', 'Cartório Macapá',
        15000000.00, 14500000.00, 14000000.00, 'Ativo', 'Norte', NOW(), NOW(), 2),
       ('58000000', 'Rod. Indústrias', 'Industrial', 'Rod. Indústrias, Km 10, Distrito Ind.', 'PB', 'Distrito Ind.',
        'Urbana', '-7.1153', '-34.8610', 'João Pessoa', 2507507, '83', 50, 7000.00, 20000.00, 'IND789', 'Cartório JP',
        30000000.00, 29500000.00, 29000000.00, 'Ativo', 'Sul', NOW(), NOW(), 3);

-- HOTEL (80)
INSERT INTO `propriedade` (`cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`, `bairro`, `zona`,
                           `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES ('40100000', 'Av. das Nações', 'Comercial', 'Av. das Nações, 1001, Centro', 'DF', 'Centro', 'Urbana', '-15.7939',
        '-47.8828', 'Brasília', 5300108, '61', 80, 3500.00, 5000.00, 'HOT123', 'Cartório DF', 20000000.00, 19000000.00,
        18500000.00, 'Ativo', 'Centro', NOW(), NOW(), 4),
       ('88000000', 'Rua da Praia', 'Comercial', 'Rua da Praia, 22, Beira-Mar', 'SC', 'Centro', 'Urbana', '-27.5954',
        '-48.5480', 'Florianópolis', 4205407, '48', 80, 2800.00, 4500.00, 'HOT456', 'Cartório Floripa', 18000000.00,
        17500000.00, 17000000.00, 'Ativo', 'Centro', NOW(), NOW(), 5),
       ('64000000', 'Av. Hoteleira', 'Comercial', 'Av. Hoteleira, 999, Centro', 'PI', 'Centro', 'Urbana', '-5.0892',
        '-42.8016', 'Teresina', 2211001, '86', 80, 4000.00, 6000.00, 'HOT789', 'Cartório Teresina', 21000000.00,
        20000000.00, 19500000.00, 'Ativo', 'Centro', NOW(), NOW(), 6);

-- ESCOLA (71)
INSERT INTO `propriedade` (`cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`, `bairro`, `zona`,
                           `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES ('38400000', 'Rua da Educação', 'Institucional', 'Rua da Educação, 101, Centro', 'MG', 'Centro', 'Urbana',
        '-18.9141', '-48.2749', 'Uberlândia', 3170206, '34', 71, 1500.00, 3500.00, 'ESC123', 'Cartório Uberlândia',
        8000000.00, 7500000.00, 7400000.00, 'Ativo', 'Centro', NOW(), NOW(), 7),
       ('57000000', 'Av. Pedagógica', 'Institucional', 'Av. Pedagógica, 305, Bairro Novo', 'AL', 'Bairro Novo',
        'Urbana', '-9.6498', '-35.7089', 'Maceió', 2704302, '82', 71, 1800.00, 4000.00, 'ESC456', 'Cartório Maceió',
        8500000.00, 8200000.00, 8000000.00, 'Ativo', 'Centro', NOW(), NOW(), 8),
       ('72800000', 'Rua das Letras', 'Institucional', 'Rua das Letras, 45, Centro', 'GO', 'Centro', 'Urbana',
        '-15.9397', '-48.2484', 'Valparaíso de Goiás', 5222203, '61', 71, 1600.00, 4200.00, 'ESC789', 'Cartório GO',
        8200000.00, 8100000.00, 8050000.00, 'Ativo', 'Centro', NOW(), NOW(), 9);

-- LOJA (40)
INSERT INTO `propriedade` (`cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`, `bairro`, `zona`,
                           `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES ('12345000', 'Rua do Comércio', 'Comercial', 'Rua do Comércio, 100, Centro', 'SP', 'Centro', 'Urbana',
        '-23.5510', '-46.6340', 'São Paulo', 3550308, '11', 40, 200.00, 300.00, 'LOJ123', 'Cartório SP', 3000000.00,
        2900000.00, 2850000.00, 'Ativo', 'Comercial', NOW(), NOW(), 10),
       ('22460000', 'Av. da Moda', 'Comercial', 'Av. da Moda, 88, Bairro Luxo', 'RJ', 'Luxo', 'Urbana', '-22.9710',
        '-43.1822', 'Rio de Janeiro', 3304557, '21', 40, 150.00, 250.00, 'LOJ456', 'Cartório RJ', 2500000.00,
        2450000.00, 2400000.00, 'Ativo', 'Comercial', NOW(), NOW(), 11),
       ('60000000', 'Rua Fashion', 'Comercial', 'Rua Fashion, 70, Meireles', 'CE', 'Meireles', 'Urbana', '-3.7270',
        '-38.5240', 'Fortaleza', 2304400, '85', 40, 180.00, 280.00, 'LOJ789', 'Cartório CE', 2600000.00, 2550000.00,
        2500000.00, 'Ativo', 'Comercial', NOW(), NOW(), 12);

-- GARAGEM_RESIDENCIAL (24)
INSERT INTO `propriedade` (`cep`, `nome_endereco`, `tipo_endereco`, `endereco_completo`, `estado`, `bairro`, `zona`,
                           `latitude`, `longitude`, `cidade`, `codigo_ibge_cidade`, `ddd`, `uso_iptu`,
                           `area_construida_m2`, `area_terreno_m2`, `registro_propriedade`, `cartorio_registro`,
                           `valor_mercado_divulgado`, `valor_proporcional_mercado`, `valor_transacao_declarado`,
                           `sql_status`, `distrito`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES ('45678000', 'Rua das Garagens', 'Residencial', 'Rua das Garagens, 12, Centro', 'SP', 'Centro', 'Urbana',
        '-23.5600', '-46.6550', 'São Paulo', 3550308, '11', 24, 50.00, 80.00, 'GAR123', 'Cartório SP', 500000.00,
        480000.00, 470000.00, 'Ativo', 'Centro', NOW(), NOW(), 13),
       ('23000000', 'Rua Subsolo', 'Residencial', 'Rua Subsolo, 4, Zona Sul', 'RJ', 'Zona Sul', 'Urbana', '-22.9830',
        '-43.2080', 'Rio de Janeiro', 3304557, '21', 24, 60.00, 100.00, 'GAR456', 'Cartório RJ', 600000.00, 580000.00,
        570000.00, 'Ativo', 'Zona Sul', NOW(), NOW(), 14),
       ('69900000', 'Av. das Vagas', 'Residencial', 'Av. das Vagas, 5, Centro', 'AC', 'Centro', 'Urbana', '-9.9747',
        '-67.8249', 'Rio Branco', 1200401, '68', 24, 70.00, 90.00, 'GAR789', 'Cartório AC', 550000.00, 530000.00,
        520000.00, 'Ativo', 'Centro', NOW(), NOW(), 15);

INSERT INTO `seguranca` (`id_delegacia`, `nome_regiao`, `delegacia`, `furtos_regiao`, `roubos_cargas`, `roubos`,
                         `roubos_veiculos`, `furtos_veiculos`, `latrocinios`, `homicio_doloso_acidente_transito`,
                         `homicidio_culposo_acidente_transito`, `homicidio_culposo`, `coleta`, `fk_distrito`,
                         `data_criacao`, `data_edicao`)
VALUES (1, 'Centro', 'Delegacia Central', 500, 100, 900, 300, 400, 10, 15, 20, 12, 2025, 1, NOW(), NOW()),
       (2, 'Zona Sul', 'Delegacia Sul', 300, 80, 700, 250, 350, 8, 12, 18, 10, 2025, 2, NOW(), NOW()),
       (3, 'Zona Norte', 'Delegacia Norte', 450, 90, 850, 280, 370, 9, 14, 22, 11, 2025, 3, NOW(), NOW()),
       (4, 'Zona Leste', 'Delegacia Leste', 400, 85, 800, 270, 360, 9, 13, 21, 11, 2025, 4, NOW(), NOW()),
       (5, 'Zona Oeste', 'Delegacia Oeste', 320, 70, 680, 230, 330, 7, 10, 16, 9, 2025, 5, NOW(), NOW()),
       (6, 'Subúrbio', 'Delegacia Suburbana', 600, 120, 1000, 350, 450, 12, 18, 24, 14, 2025, 6, NOW(), NOW()),
       (7, 'Centro Histórico', 'Delegacia Histórica', 250, 50, 500, 150, 200, 5, 8, 12, 7, 2025, 7, NOW(), NOW()),
       (8, 'Região Metropolitana', 'Delegacia Metropolitana', 550, 110, 950, 330, 430, 11, 17, 23, 13, 2025, 8, NOW(),
        NOW()),
       (9, 'Bairro Industrial', 'Delegacia Industrial', 380, 75, 720, 240, 340, 8, 11, 17, 10, 2025, 9, NOW(), NOW()),
       (10, 'Área Rural', 'Delegacia Rural', 200, 40, 400, 120, 180, 4, 6, 10, 5, 2025, 10, NOW(), NOW()),
       (11, 'Balneário', 'Delegacia Balneária', 450, 95, 870, 290, 380, 9, 14, 20, 11, 2025, 11, NOW(), NOW()),
       (12, 'Distrito Comercial', 'Delegacia Comercial', 520, 105, 920, 320, 420, 10, 15, 22, 12, 2025, 12, NOW(),
        NOW()),
       (13, 'Cidade Universitária', 'Delegacia Universitária', 280, 55, 550, 170, 230, 6, 9, 13, 8, 2025, 13, NOW(),
        NOW()),
       (14, 'Zona Portuária', 'Delegacia Portuária', 470, 100, 890, 300, 390, 9, 13, 19, 11, 2025, 14, NOW(), NOW()),
       (15, 'Região Montanhosa', 'Delegacia Montanhosa', 220, 45, 420, 130, 190, 5, 7, 11, 6, 2025, 15, NOW(), NOW());


INSERT INTO `info_regiao` (`udh_id`, `nome_udh`, `codigo_municipio`, `nome_municipio`, `codigo_regiao`, `nome_regiao`,
                           `renda_domiciliar_quinto_mais_pobre`, `renda_domiciliar_segundo_quinto_mais_pobre`,
                           `renda_domiciliar_terceiro_quinto_mais_pobre`, `renda_domiciliar_quarto_quinto_mais_pobre`,
                           `renda_domiciliar_quinto_mais_rico`, `populacao_total`, `codigo_destrito`, `nome_destrito`,
                           `divisao_regional`, `nome_prefeitura_regional`, `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES (1, 'UDH Centro', 3550308, 'São Paulo', 1, 'Região Central', 500.00, 1000.00, 1500.00, 2000.00, 5000.00, 100000,
        1, 'Centro', 'Divisão 1', 'Prefeitura Centro', NOW(), NOW(), 1),
       (2, 'UDH Sul', 3304557, 'Rio de Janeiro', 2, 'Região Metropolitana', 600.00, 1100.00, 1600.00, 2100.00, 6000.00,
        90000, 2, 'Zona Sul', 'Divisão 2', 'Prefeitura Zona Sul', NOW(), NOW(), 2),
       (3, 'UDH Norte', 4106902, 'Curitiba', 3, 'Região Norte', 550.00, 1050.00, 1550.00, 2050.00, 5500.00, 85000, 3,
        'Zona Norte', 'Divisão 3', 'Prefeitura Zona Norte', NOW(), NOW(), 3),
       (4, 'UDH Leste', 4314902, 'Porto Alegre', 4, 'Região Leste', 700.00, 1200.00, 1700.00, 2200.00, 7000.00, 80000,
        4, 'Zona Leste', 'Divisão 4', 'Prefeitura Zona Leste', NOW(), NOW(), 4),
       (5, 'UDH Oeste', 2927408, 'Salvador', 5, 'Região Oeste', 650.00, 1150.00, 1650.00, 2150.00, 6500.00, 75000, 5,
        'Zona Oeste', 'Divisão 5', 'Prefeitura Zona Oeste', NOW(), NOW(), 5),
       (6, 'UDH Subúrbio', 2611606, 'Recife', 6, 'Região Suburbana', 480.00, 980.00, 1480.00, 1980.00, 4800.00, 72000,
        6, 'Subúrbio', 'Divisão 6', 'Prefeitura Suburbana', NOW(), NOW(), 6),
       (7, 'UDH Metropolitana', 2304400, 'Fortaleza', 7, 'Região Metropolitana', 720.00, 1220.00, 1720.00, 2220.00,
        7200.00, 70000, 7, 'Região Metropolitana', 'Divisão 7', 'Prefeitura Metropolitana', NOW(), NOW(), 7),
       (8, 'UDH Comercial', 5300108, 'Brasília', 8, 'Região Comercial', 580.00, 1080.00, 1580.00, 2080.00, 5800.00,
        68000, 8, 'Distrito Comercial', 'Divisão 8', 'Prefeitura Comercial', NOW(), NOW(), 8),
       (9, 'UDH Universitária', 4106902, 'Curitiba', 9, 'Região Universitária', 640.00, 1140.00, 1640.00, 2140.00,
        6400.00, 65000, 9, 'Cidade Universitária', 'Divisão 9', 'Prefeitura Universitária', NOW(), NOW(), 9),
       (10, 'UDH Portuária', 4314902, 'Porto Alegre', 10, 'Região Portuária', 600.00, 1100.00, 1600.00, 2100.00,
        6000.00, 62000, 10, 'Zona Portuária', 'Divisão 10', 'Prefeitura Portuária', NOW(), NOW(), 10),
       (11, 'UDH Balneária', 2927408, 'Salvador', 11, 'Região Balneária', 550.00, 1050.00, 1550.00, 2050.00, 5500.00,
        60000, 11, 'Balneário', 'Divisão 11', 'Prefeitura Balneária', NOW(), NOW(), 11),
       (12, 'UDH Rural', 2611606, 'Recife', 12, 'Região Rural', 500.00, 1000.00, 1500.00, 2000.00, 5000.00, 58000, 12,
        'Área Rural', 'Divisão 12', 'Prefeitura Rural', NOW(), NOW(), 12),
       (13, 'UDH Industrial', 2304400, 'Fortaleza', 13, 'Região Industrial', 680.00, 1180.00, 1680.00, 2180.00, 6800.00,
        55000, 13, 'Bairro Industrial', 'Divisão 13', 'Prefeitura Industrial', NOW(), NOW(), 13),
       (14, 'UDH Histórica', 5300108, 'Brasília', 14, 'Região Histórica', 740.00, 1240.00, 1740.00, 2240.00, 7400.00,
        53000, 14, 'Região Histórica', 'Divisão 14', 'Prefeitura Histórica', NOW(), NOW(), 14),
       (15, 'UDH Montanhosa', 4106902, 'Curitiba', 15, 'Região Montanhosa', 620.00, 1120.00, 1620.00, 2120.00, 6200.00,
        50000, 15, 'Região Montanhosa', 'Divisão 15', 'Prefeitura Montanhosa', NOW(), NOW(), 15);

INSERT INTO `educacao` (`id_educacao`, `nome_escola`, `nome_distrito`, `codigo_distrito`, `data_criacao`, `data_edicao`,
                        `fk_distrito`)
VALUES (1, 'Escola Central', 'Centro', '001', NOW(), NOW(), 1),
       (2, 'Colégio Sul', 'Zona Sul', '002', NOW(), NOW(), 2),
       (3, 'Instituto Norte', 'Zona Norte', '003', NOW(), NOW(), 3),
       (4, 'Escola Leste', 'Zona Leste', '004', NOW(), NOW(), 4),
       (5, 'Colégio Oeste', 'Zona Oeste', '005', NOW(), NOW(), 5),
       (6, 'Escola do Subúrbio', 'Subúrbio', '006', NOW(), NOW(), 6),
       (7, 'Colégio Metropolitano', 'Região Metropolitana', '007', NOW(), NOW(), 7),
       (8, 'Escola Comercial', 'Distrito Comercial', '008', NOW(), NOW(), 8),
       (9, 'Universidade Local', 'Cidade Universitária', '009', NOW(), NOW(), 9),
       (10, 'Escola Portuária', 'Zona Portuária', '010', NOW(), NOW(), 10),
       (11, 'Escola Balneária', 'Balneário', '011', NOW(), NOW(), 11),
       (12, 'Escola Rural', 'Área Rural', '012', NOW(), NOW(), 12),
       (13, 'Escola Industrial', 'Bairro Industrial', '013', NOW(), NOW(), 13),
       (14, 'Escola Histórica', 'Região Histórica', '014', NOW(), NOW(), 14),
       (15, 'Escola Montanhosa', 'Região Montanhosa', '015', NOW(), NOW(), 15);


INSERT INTO `saude` (`id_saude`, `codigo_distrito`, `nome_distrito`, `nome_unidade`, `tipo_unidade`, `data_criacao`,
                     `data_edicao`, `fk_distrito`)
VALUES (1, '001', 'Centro', 'Hospital Central', 'Hospital', NOW(), NOW(), 1),
       (2, '002', 'Zona Sul', 'UBS Sul', 'Unidade Básica de Saúde', NOW(), NOW(), 2),
       (3, '003', 'Zona Norte', 'Clínica Norte', 'Clínica', NOW(), NOW(), 3),
       (4, '004', 'Zona Leste', 'Pronto Atendimento Leste', 'Pronto Atendimento', NOW(), NOW(), 4),
       (5, '005', 'Zona Oeste', 'Posto de Saúde Oeste', 'Posto de Saúde', NOW(), NOW(), 5),
       (6, '006', 'Subúrbio', 'Clínica Suburbana', 'Clínica', NOW(), NOW(), 6),
       (7, '007', 'Região Metropolitana', 'Hospital Metropolitano', 'Hospital', NOW(), NOW(), 7),
       (8, '008', 'Distrito Comercial', 'Ambulatório Comercial', 'Ambulatório', NOW(), NOW(), 8),
       (9, '009', 'Cidade Universitária', 'Unidade Universitária de Saúde', 'Hospital Universitário', NOW(), NOW(), 9),
       (10, '010', 'Zona Portuária', 'Pronto Atendimento Portuário', 'Pronto Atendimento', NOW(), NOW(), 10),
       (11, '011', 'Balneário', 'Clínica Balneária', 'Clínica', NOW(), NOW(), 11),
       (12, '012', 'Área Rural', 'Posto de Saúde Rural', 'Posto de Saúde', NOW(), NOW(), 12),
       (13, '013', 'Bairro Industrial', 'Hospital Industrial', 'Hospital', NOW(), NOW(), 13),
       (14, '014', 'Região Histórica', 'UBS Histórica', 'Unidade Básica de Saúde', NOW(), NOW(), 14),
       (15, '015', 'Região Montanhosa', 'Posto de Saúde Montanhoso', 'Posto de Saúde', NOW(), NOW(), 15);


INSERT INTO `mobilidade` (`id_mobilidade`, `nome_distrito`, `qtd_pontos_onibus`, `qtd_estacoes_trem_metro`,
                          `data_criacao`, `data_edicao`, `fk_distrito`)
VALUES (1, 'Centro', 50, 10, NOW(), NOW(), 1),
       (2, 'Zona Sul', 30, 5, NOW(), NOW(), 2),
       (3, 'Zona Norte', 40, 8, NOW(), NOW(), 3),
       (4, 'Zona Leste', 45, 7, NOW(), NOW(), 4),
       (5, 'Zona Oeste', 35, 6, NOW(), NOW(), 5),
       (6, 'Subúrbio', 60, 12, NOW(), NOW(), 6),
       (7, 'Região Metropolitana', 70, 15, NOW(), NOW(), 7),
       (8, 'Distrito Comercial', 55, 9, NOW(), NOW(), 8),
       (9, 'Cidade Universitária', 65, 14, NOW(), NOW(), 9),
       (10, 'Zona Portuária', 50, 10, NOW(), NOW(), 10),
       (11, 'Balneário', 40, 7, NOW(), NOW(), 11),
       (12, 'Área Rural', 30, 5, NOW(), NOW(), 12),
       (13, 'Bairro Industrial', 60, 13, NOW(), NOW(), 13),
       (14, 'Região Histórica', 75, 16, NOW(), NOW(), 14),
       (15, 'Região Montanhosa', 55, 11, NOW(), NOW(), 15);


INSERT INTO `precificacao` (`id_precificacao`, `preco`, `data_precificacao`, `area`, `data_criacao`, `data_edicao`,
                            `fk_distrito`)
VALUES
-- Ano 2021
(1, 500000.00, '2021-06-05', 120.00, NOW(), NOW(), 1),
(2, 750000.00, '2021-07-15', 150.00, NOW(), NOW(), 2),
(3, 900000.00, '2021-08-20', 180.00, NOW(), NOW(), 3),
(4, 1100000.00, '2021-09-10', 200.00, NOW(), NOW(), 4),
(5, 1300000.00, '2021-10-25', 220.00, NOW(), NOW(), 5),

-- Ano 2022
(6, 1600000.00, '2022-03-14', 250.00, NOW(), NOW(), 6),
(7, 1800000.00, '2022-04-18', 280.00, NOW(), NOW(), 7),
(8, 2100000.00, '2022-05-29', 300.00, NOW(), NOW(), 8),
(9, 2500000.00, '2022-06-30', 350.00, NOW(), NOW(), 9),
(10, 2800000.00, '2022-07-08', 400.00, NOW(), NOW(), 10),

-- Ano 2023
(11, 3100000.00, '2023-01-20', 450.00, NOW(), NOW(), 11),
(12, 3500000.00, '2023-02-14', 500.00, NOW(), NOW(), 12),
(13, 3800000.00, '2023-03-21', 550.00, NOW(), NOW(), 13),
(14, 4200000.00, '2023-04-05', 600.00, NOW(), NOW(), 14),
(15, 4500000.00, '2023-05-11', 650.00, NOW(), NOW(), 15),

-- Ano 2024
(16, 4800000.00, '2024-02-07', 700.00, NOW(), NOW(), 1),
(17, 5000000.00, '2024-03-12', 750.00, NOW(), NOW(), 2),
(18, 5300000.00, '2024-04-25', 800.00, NOW(), NOW(), 3),
(19, 5600000.00, '2024-05-30', 850.00, NOW(), NOW(), 4),
(20, 6000000.00, '2024-06-18', 900.00, NOW(), NOW(), 5),

-- Ano 2025
(21, 6400000.00, '2025-01-09', 950.00, NOW(), NOW(), 6),
(22, 6800000.00, '2025-02-22', 1000.00, NOW(), NOW(), 7),
(23, 7100000.00, '2025-03-17', 1050.00, NOW(), NOW(), 8),
(24, 7500000.00, '2025-04-29', 1100.00, NOW(), NOW(), 9),
(25, 8000000.00, '2025-05-14', 1150.00, NOW(), NOW(), 10),

-- Ano 2026
(26, 8500000.00, '2026-01-20', 1200.00, NOW(), NOW(), 11),
(27, 9000000.00, '2026-02-28', 1250.00, NOW(), NOW(), 12),
(28, 9500000.00, '2026-03-15', 1300.00, NOW(), NOW(), 13),
(29, 10000000.00, '2026-04-22', 1350.00, NOW(), NOW(), 14),
(30, 10500000.00, '2026-05-30', 1400.00, NOW(), NOW(), 15);


SELECT resultado.num_linha, resultado.indice_violencia
FROM (SELECT i.fk_distrito,
             SUM(s.furtos_regiao + s.roubos_cargas + s.roubos + s.roubos_veiculos
                 + s.furtos_veiculos + s.latrocinios + s.homicio_doloso_acidente_transito
                 + s.homicidio_culposo_acidente_transito + s.homicidio_culposo)
                 / i.populacao_total AS indice_violencia,
             ROW_NUMBER() OVER (
                 ORDER BY
                     SUM(s.furtos_regiao + s.roubos_cargas + s.roubos + s.roubos_veiculos
                         + s.furtos_veiculos + s.latrocinios + s.homicio_doloso_acidente_transito
                         + s.homicidio_culposo_acidente_transito + s.homicidio_culposo)
                         / i.populacao_total DESC
                 )                   AS num_linha
      FROM info_regiao i
               JOIN seguranca s ON s.fk_distrito = i.fk_distrito
      GROUP BY i.fk_distrito, i.populacao_total) AS resultado
WHERE resultado.fk_distrito = 12;


