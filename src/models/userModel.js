var database = require("../database/config");

async function authenticateUser(email, senha) {
    if (!email || !senha) {
        console.error('Email ou senha não fornecidos');
        return {
            auth: false,
            message: "Credenciais inválidas"
        };
    }

    const query = `
    SELECT 
        id_usuario,
        nome,
        email,
        funcao_empresa,
        fk_empresa
    FROM usuario
    WHERE email = ? AND senha = ?
    `;

    try {
        const result = await database.execute(query, [email, senha]);
        console.log('Resultado bruto:', result);

        const rows = result[0];
        console.log('Linhas encontradas:', rows);
        
        // Check if rows exists and has properties
        if (rows && rows.id_usuario) {
            console.log('Usuário encontrado:', rows);
            
            return {
                auth: true,
                usuario: rows
            };
        }

        console.log('Nenhum usuário encontrado para:', email);
        return {
            auth: false,
            message: "Email ou senha inválidos"
        };

    } catch (error) {
        console.error('Erro na autenticação:', error);
        return {
            auth: false,
            message: "Erro ao autenticar usuário"
        };
    }
}

async function createUser(user) {
    const query = `
    INSERT INTO usuario (nome, email, senha, fk_empresa, funcao_empresa, data_cadastro)
    VALUES (?, ?, ?, ?, ?, NOW())
    `;  

    const values = [
        user.nomeUsuario,
        user.email,
        user.senha,
        user.fk_empresa,
        user.cpf,
        user.dtNasc,
        user.funcao_empresa
    ];

    try {
        const resultado = await database.execute(query, values);
        console.log('Database result:', resultado);
        return resultado;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function editUser(user, idUser) {
    const query = `
    UPDATE usuario
    SET nome = ?, 
        email = ?, 
        senha = ?, 
        funcao_empresa = ?,
        fk_empresa = ?
    WHERE id_usuario = ?
    `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.cpf,
        user.data_nasc,
        idUser
    ];

    try {
        const result = await database.execute(query, values);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function deleteUser(idUser) {
    const query = `
    DELETE FROM usuario WHERE id_usuario = ?
    `;

    try {
        console.log(query)
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuário deletado com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        throw error;
    }
}


async function searchUsersByEnterpriseId(idEnterprise) {
    const query = `
    SELECT * FROM usuario WHERE fk_empresa = ?
    `;

    try {
        const [resultado] = await database.execute(query, [idEnterprise]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado[0];
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}

async function searchUserById(idUser) {
    const query = `
    SELECT * FROM usuario WHERE id_usuario = ?`;

    try {
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}

async function checkEmail(email) {
    const query = `SELECT email FROM usuario WHERE email = ?;`;
    const resultado = await database.execute(query, [email]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}

async function checkCpf(cpf) {
    const query = `SELECT cpf FROM usuario WHERE cpf = ?;`;
    const resultado = await database.execute(query, [cpf]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}



async function salvarEscolhas(idUsuario,escolhas) {
    const query = `
        INSERT INTO escolhas_formulario (etapa1, etapa2, etapa3, fk_id_usuario)
        VALUES (?, ?, ?, ?)
    `;

    const values = [escolhas[0], escolhas[1], escolhas[2], idUsuario];

    try {
        const resultado = await database.execute(query, values);
        return resultado;
    } catch (error) {
        console.error("Erro ao salvar escolhas:", error);
        throw error;
    }
}

async function salvarvaloresFormulario(valoresFormulario, idUsuario) {
    const query = `
        INSERT INTO valores_formularios (baixaViolencia,
            malhaUrbana,
            valorM2,
            rendaMedia,
            flutuacaoM2,
            parques,
            hospitais,
            escolas,
            id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [valoresFormulario[0],valoresFormulario[1],valoresFormulario[2],valoresFormulario[3],valoresFormulario[4],valoresFormulario[5],
                    valoresFormulario[6],valoresFormulario[7], idUsuario];

    try {
        const resultado = await database.execute(query, values);
        return resultado;
    } catch (error) {
        console.error("Erro ao salvar escolhas:", error);
        throw error;
    }
}



async function pegarValoresDistritosEscolhas(valoresFormulario, idUsuario) {
    const query = `
        select * from valores_formularios where id_usuario = 0;
        `;


    const query2 = `
        WITH

-- Renda domiciliar (pobres)
renda_pobre_ranking AS (
    SELECT
        fk_distrito,
        nome_distrito,
        (AVG(renda_domiciliar_quinto_mais_pobre) / 12) AS media_quinto_mais_pobre,
        (AVG(renda_domiciliar_segundo_quinto_mais_pobre) / 12) AS media_segundo_quinto_mais_pobre,
        (AVG(renda_domiciliar_terceiro_quinto_mais_pobre) / 12) AS media_terceiro_quinto_mais_pobre,
        (AVG(renda_domiciliar_quarto_quinto_mais_pobre) / 12) AS media_quarto_quinto_mais_pobre,
        (AVG(renda_domiciliar_quinto_mais_rico) / 12) AS media_quinto_mais_rico,
        ROW_NUMBER() OVER (ORDER BY (AVG(renda_domiciliar_quinto_mais_pobre) / 12) ASC) AS row_num
    FROM info_regiao
    WHERE fk_distrito IS NOT NULL
    GROUP BY fk_distrito, nome_distrito
),

-- Flutuação preço metro quadrado (últimos 5 anos por distrito)
flutuacao_preco_por_ano AS (
    SELECT
        fk_distrito,
        ano,
        AVG(preco / area) AS media_preco_metro_quadrado
    FROM (
        SELECT
            fk_distrito,
            YEAR(STR_TO_DATE(data_precificacao, '%Y-%m-%d %H:%i:%s')) AS ano,
            preco,
            area,
            data_precificacao,
            ROW_NUMBER() OVER (PARTITION BY fk_distrito ORDER BY YEAR(STR_TO_DATE(data_precificacao, '%Y-%m-%d %H:%i:%s')) DESC) AS ano_rank
        FROM precificacao
        WHERE preco IS NOT NULL
          AND area IS NOT NULL
          AND area > 0
          AND data_precificacao IS NOT NULL
    ) AS sub
    WHERE ano_rank <= 5
    GROUP BY fk_distrito, ano
),

flutuacao_ranking AS (
    SELECT
        fk_distrito,
        AVG(media_preco_metro_quadrado) AS media_anual_preco,
        ROW_NUMBER() OVER (ORDER BY AVG(media_preco_metro_quadrado) ASC) AS row_num
    FROM flutuacao_preco_por_ano
    GROUP BY fk_distrito
),

-- Educação (quantidade de escolas / área)
educacao_ranking AS (
    SELECT
        e.fk_distrito,
        COUNT(*) / d.area AS escolas_por_area,
        ROW_NUMBER() OVER (ORDER BY COUNT(*) / d.area DESC) AS row_num
    FROM educacao e
    JOIN distrito d ON e.fk_distrito = d.id_distrito
    WHERE d.area IS NOT NULL AND d.area != 0
    GROUP BY e.fk_distrito, d.area
),

-- Saúde (quantidade de unidades / área)
saude_ranking AS (
    SELECT
        s.fk_distrito,
        COUNT(*) / d.area AS saude_por_area,
        ROW_NUMBER() OVER (ORDER BY COUNT(*) / d.area DESC) AS row_num
    FROM saude s
    JOIN distrito d ON s.fk_distrito = d.id_distrito
    WHERE d.area IS NOT NULL AND d.area != 0
    GROUP BY s.fk_distrito, d.area
),

-- Parques (quantidade / área)
parque_ranking AS (
    SELECT
        p.fk_distrito,
        COUNT(*) / d.area AS parques_por_area,
        ROW_NUMBER() OVER (ORDER BY COUNT(*) / d.area DESC) AS row_num
    FROM parque p
    JOIN distrito d ON p.fk_distrito = d.id_distrito
    WHERE d.area IS NOT NULL AND d.area != 0
    GROUP BY p.fk_distrito, d.area
),

-- Mobilidade
mobilidade_ranking AS (
    SELECT
        m.fk_distrito,
        SUM(COALESCE(m.qtd_pontos_onibus, 0) + COALESCE(m.qtd_estacoes_trem_metro, 0)) / d.area AS valor_mobilidade_por_area,
        ROW_NUMBER() OVER (ORDER BY SUM(COALESCE(m.qtd_pontos_onibus, 0) + COALESCE(m.qtd_estacoes_trem_metro, 0)) / d.area DESC) AS row_num
    FROM mobilidade m
    JOIN distrito d ON m.fk_distrito = d.id_distrito
    WHERE d.area IS NOT NULL AND d.area != 0
    GROUP BY m.fk_distrito, d.area
),

-- Precificação
precificacao_ranking AS (
    SELECT
        fk_distrito,
        AVG(preco / area) AS media_preco_por_area,
        ROW_NUMBER() OVER (ORDER BY AVG(preco / area) ASC) AS row_num
    FROM precificacao
    WHERE area IS NOT NULL AND area != 0
    GROUP BY fk_distrito
),

-- Segurança (índice violência, menor é melhor)
seguranca_ranking AS (
    SELECT
        d.id_distrito AS fk_distrito,
        SUM(
            COALESCE(s.furtos_regiao, 0)
            + COALESCE(s.roubos_cargas, 0)
            + COALESCE(s.roubos, 0)
            + COALESCE(s.roubos_veiculos, 0)
            + COALESCE(s.furtos_veiculos, 0)
            + COALESCE(s.latrocinios, 0)
            + COALESCE(s.homicidio_doloso_acidente_transito, 0)
            + COALESCE(s.homicidio_culposo_acidente_transito, 0)
            + COALESCE(s.homicidio_culposo, 0)
        ) / d.populacao AS indice_violencia,
        ROW_NUMBER() OVER (
            ORDER BY
            SUM(
                COALESCE(s.furtos_regiao, 0)
                + COALESCE(s.roubos_cargas, 0)
                + COALESCE(s.roubos, 0)
                + COALESCE(s.roubos_veiculos, 0)
                + COALESCE(s.furtos_veiculos, 0)
                + COALESCE(s.latrocinios, 0)
                + COALESCE(s.homicidio_doloso_acidente_transito, 0)
                + COALESCE(s.homicidio_culposo_acidente_transito, 0)
                + COALESCE(s.homicidio_culposo, 0)
            ) / d.populacao ASC
        ) AS row_num
    FROM distrito d
    JOIN seguranca s ON s.fk_distrito = d.id_distrito
    WHERE d.populacao IS NOT NULL AND d.populacao > 0
    GROUP BY d.id_distrito, d.populacao
)

-- no SELECT final que junta tudo:
SELECT
    p.fk_distrito,
    r.nome_distrito,
    -- outros campos...

    (
        (COALESCE(p.row_num, (SELECT COUNT(*) FROM precificacao_ranking) + 1) * ?) +
        (COALESCE(m.row_num, (SELECT COUNT(*) FROM mobilidade_ranking) + 1) * ?) +
        (COALESCE(s.row_num, (SELECT COUNT(*) FROM seguranca_ranking) + 1) * ?) +
        (COALESCE(e.row_num, (SELECT COUNT(*) FROM educacao_ranking) + 1) * ?) +
        (COALESCE(sa.row_num, (SELECT COUNT(*) FROM saude_ranking) + 1) * ?) +
        (COALESCE(pa.row_num, (SELECT COUNT(*) FROM parque_ranking) + 1) * ?) +
        (COALESCE(r.row_num, (SELECT COUNT(*) FROM renda_pobre_ranking) + 1) * ?) +
        (COALESCE(f.row_num, (SELECT COUNT(*) FROM flutuacao_ranking) + 1) * ?)  
    ) AS pontuacao_ponderada

    FROM precificacao_ranking p
    LEFT JOIN mobilidade_ranking m ON m.fk_distrito = p.fk_distrito
    LEFT JOIN seguranca_ranking s ON s.fk_distrito = p.fk_distrito
    LEFT JOIN educacao_ranking e ON e.fk_distrito = p.fk_distrito
    LEFT JOIN saude_ranking sa ON sa.fk_distrito = p.fk_distrito
    LEFT JOIN parque_ranking pa ON pa.fk_distrito = p.fk_distrito
    LEFT JOIN renda_pobre_ranking r ON r.fk_distrito = p.fk_distrito
    LEFT JOIN flutuacao_ranking f ON f.fk_distrito = p.fk_distrito
    ORDER BY pontuacao_ponderada ASC
    LIMIT 4;
        `;

    const resultado = await database.execute(query, [idUsuario]);

    const values = [resultado[0].baixaViolencia,
                    resultado[0].malhaUrbana,
                    resultado[0].valorM2,
                    resultado[0].rendaMedia,
                    resultado[0].flutuacaoM2,
                    resultado[0].parques,
                    resultado[0].hospitais,
                    resultado[0].escolas];

    try {
        const resultado = await database.execute(query, [idUsuario]);
        const resultado2 = await database.execute(query2, values);
        
        return resultado, resultado2;
    } catch (error) {
        console.error("Erro ao salvar escolhas:", error);
        throw error;
    }
}

module.exports = {
    createUser,
    editUser,
    deleteUser,
    authenticateUser,
    searchUserById,
    searchUsersByEnterpriseId,
    checkEmail,
    checkCpf,
    salvarEscolhas,
    salvarvaloresFormulario,
    pegarValoresDistritosEscolhas
}
