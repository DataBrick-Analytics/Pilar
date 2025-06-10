// ...existing code...

function nextStep(step) {
    document.querySelector(`.step-content.active`).classList.remove('active');
    document.querySelector(`.step[data-step="${step - 1}"]`).classList.remove('active');
    document.querySelector(`#step${step}`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

function prevStep(step) {
    document.querySelector(`.step-content.active`).classList.remove('active');
    document.querySelector(`.step[data-step="${step + 1}"]`).classList.remove('active');
    document.querySelector(`#step${step}`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}
function aplicarMascara(input, mascara) {
    input.addEventListener('input', function (e) {
        const numeros = e.target.value.replace(/\D/g, '');
        let resultado = '';
        let i = 0;

        for (const m of mascara) {
            if (m === '#') {
                if (i < numeros.length) {
                    resultado += numeros[i];
                    i++;
                } else {
                    break;
                }
            } else {
                if (i < numeros.length) {
                    resultado += m;
                }
            }
        }

        e.target.value = resultado;
    });

    input.addEventListener('keypress', function(e) {
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        }
    });

    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const textoColado = (e.clipboardData || window.clipboardData).getData('text');
        const numeros = textoColado.replace(/\D/g, '');
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.value = numeros;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

function inicializarMascaras() {
    // Máscara para CPF
    const inputCPF = document.getElementById('cpf_input');
    if (inputCPF) {
        aplicarMascara(inputCPF, '###.###.###-##');
        inputCPF.setAttribute('maxlength', '14');
    }

    // Máscara para CNPJ
    const inputCNPJ = document.getElementById('cnpj_input');
    if (inputCNPJ) {
        aplicarMascara(inputCNPJ, '##.###.###/####-##');
        inputCNPJ.setAttribute('maxlength', '18');
    }

    // Máscara para Telefone
    const inputTelefone = document.getElementById('telefone_input');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');

            if (valor.length > 11) {
                valor = valor.slice(0, 11);
            }

            let novoValor = '';

            if (valor.length > 0) {
                novoValor = '(' + valor.slice(0, 2);

                if (valor.length > 2) {
                    novoValor += ') ' + valor.slice(2);

                    if (valor.length > 7) {
                        if (valor.length <= 10) {
                            novoValor = novoValor.slice(0, 9) + '-' + valor.slice(6);
                        } else {
                            novoValor = novoValor.slice(0, 10) + '-' + valor.slice(7);
                        }
                    }
                }
            }

            e.target.value = novoValor;
        });

        inputTelefone.setAttribute('maxlength', '15');
    }

    // ✅ Máscara para CEP
    const inputCEP = document.getElementById('cep_input');
    if (inputCEP) {
        aplicarMascara(inputCEP, '#####-###');
        inputCEP.setAttribute('maxlength', '9');
    }
}

function removerMascara(valor) {
    return valor.replace(/\D/g, '');
}

// Funções de validação
function validarCPF(cpf) {
    const cpfLimpo = removerMascara(cpf);
    return cpfLimpo.length === 11;
}

function validarCNPJ(cnpj) {
    const cnpjLimpo = removerMascara(cnpj);
    return cnpjLimpo.length === 14;
}

function validarTelefone(telefone) {
    const telefoneLimpo = removerMascara(telefone);
    return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
}

// ✅ Validação do CEP
function validarCEP(cep) {
    const cepLimpo = removerMascara(cep);
    return /^\d{8}$/.test(cepLimpo);
}

function removerMascara(valor) {
    return valor.replace(/\D/g, '');
}

function cadastrar() {
    // Existing fields
    var nomeFantasiaVar = nomeFantasia_input.value;
    var cnpjVar = removerMascara(cnpj_input.value);
    var nomeUsuarioVar = nome_usuario_input.value;
    var cpfVar = removerMascara(cpf_input.value);
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var dtNascVar = dtNasc_input.value;
    var razaoSocialVar = razao_social_input.value;

    var telefoneVar = removerMascara(telefone_input.value);
    // New address fields
    var cepVar =removerMascara(cep_input.value);
    var ruaVar = rua_input.value;
    var numeroVar = numero_input.value;
    var complementoVar = complemento_input.value;
    var bairroVar = bairro_input.value;
    var cidadeVar = cidade_input.value;
    var ufVar = estado_select.value; // pega a UF (valor)
    var estadoSelectVar = estado_select.options[estado_select.selectedIndex].textContent;

    if (nomeFantasiaVar == "" || cnpjVar == "" || nomeUsuarioVar == "" ||
        cpfVar == "" || emailVar == "" || senhaVar == "" || dtNascVar == "" ||
        razaoSocialVar == "" || cepVar == "" || ruaVar == "" || numeroVar == "" ||
        bairroVar == "" || cidadeVar == "" || estadoSelectVar == "" ||
        telefoneVar == "") {

        Swal.fire({
            icon: "error",
            title: "Opa...",
            text: "Informações Faltando!",
            color: "#FFFFFF",
            background: "#2C3E50"
        });
        return;
    }

    //Validação estado
    if (estadoSelectVar === "") {
        Swal.fire({
            icon: "error",
            title: 'Estado não selecionado',
            text: 'Por favor, selecione um estado',
            color: "#FFFFFF",
            background: "#2C3E50"
        });
        return;
    }


    const estadosUF = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins"
    };

    if (estadosUF[ufVar] !== estadoSelectVar) {
        Swal.fire({
            icon: "error",
            title: 'Estado e UF não correspondem',
            text: 'A UF selecionada não corresponde ao nome do estado',
            color: "#FFFFFF",
            background: "#2C3E50"
        });
        return;
    }


    // Validação nomeEmpresa
    if (nomeFantasiaVar.length < 2) {
        Swal.fire({
            icon: "error",
            title: 'Nome de Empresa Incorreto',
            text: 'Insira um nome válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do Email
    const dominiosPermitidos = ['@gmail.com', '@hotmail.com', '@outlook.com'];
    const emailValido = dominiosPermitidos.some(dominio => emailVar.toLowerCase().endsWith(dominio));

    if (!emailValido) {
        Swal.fire({
            icon: 'error',
            title: 'Email Incorreto',
            text: 'Insira um email válido (Gmail, Hotmail ou Outlook)!',
            color: "#FFFFFF",
            background: "#2C3E50"
        });
        return;
    }

    // Validação do Estado
    if (dtNascVar.length < 2) {
        Swal.fire({
            icon: "error",
            title: 'Estado Incorreto',
            text: 'Insira um estado válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do bairro
    if (razaoSocialVar.length < 2) {
        Swal.fire({
            icon: "error",
            title: 'Bairro Incorreto',
            text: 'Insira um Bairro válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do CNPJ
    if (cnpjVar.length < 14 || cnpjVar.length > 14) {
        Swal.fire({
            icon: "error",
            title: 'CNPJ Incorreto',
            text: 'Insira um CPNJ válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do CEP
    if (nomeUsuarioVar.length < 1) {
        Swal.fire({
            icon: "error", title: 'CEP Incorreto', text: 'Insira um Cep válido', color: "#FFFFFF", background: "#2C3E50"
        })
        return
    }


    // Validação do CEP
    if (cepVar.length !== 8) {
        Swal.fire({
            icon: "error",
            title: 'CEP Incorreto',
            text: 'Insira um CEP válido com 8 dígitos',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação da Rua
    if (ruaVar.length < 3) {
        Swal.fire({
            icon: "error",
            title: 'Rua Incorreta',
            text: 'Insira um nome de rua válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do Número
    if (numeroVar.length < 1) {
        Swal.fire({
            icon: "error",
            title: 'Número Incorreto',
            text: 'Insira um número válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação do Bairro
    if (bairroVar.length < 3) {
        Swal.fire({
            icon: "error",
            title: 'Bairro Incorreto',
            text: 'Insira um nome de bairro válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }

    // Validação da Cidade
    if (cidadeVar.length < 3) {
        Swal.fire({
            icon: "error",
            title: 'Cidade Incorreta',
            text: 'Insira um nome de cidade válido',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }


    // Validação do Complemento (opcional)
    if (complementoVar && complementoVar.length < 2) {
        Swal.fire({
            icon: "error",
            title: 'Complemento Incorreto',
            text: 'Insira um complemento válido ou deixe em branco',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return
    }
// Validação da UF (select option)
    if (ufVar === "0" || ufVar === "" || ufVar === undefined) {
        Swal.fire({
            icon: "error",
            title: 'UF não selecionada',
            text: 'Por favor, selecione um estado',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return;
    }

// Validação do Telefone
// Remove todos os caracteres não numéricos para validar
    const telefoneNumeros = telefoneVar.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
        Swal.fire({
            icon: "error",
            title: 'Telefone Incorreto',
            text: 'Insira um número de telefone válido (com DDD)',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return;
    }

// Validação específica para celular (se tiver 11 dígitos, o primeiro dígito após DDD deve ser 9)
    if (telefoneNumeros.length === 11 && telefoneNumeros[2] !== '9') {
        Swal.fire({
            icon: "error",
            title: 'Celular Incorreto',
            text: 'Para números de celular, o primeiro dígito após o DDD deve ser 9',
            color: "#FFFFFF",
            background: "#2C3E50"
        })
        return;
    }


    console.log("Informações corretas")

    fetch("/enterprise/cadastrar", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            nomeFantasia: nomeFantasiaVar,
            cnpj: cnpjVar,
            nomeUsuario: nomeUsuarioVar,
            cpf: cpfVar,
            email: emailVar,
            senha: senhaVar,
            dtNasc: dtNascVar,
            razaoSocial: razaoSocialVar,
            uf: ufVar,
            cep: cepVar,
            rua: ruaVar,
            numero: numeroVar,
            complemento: complementoVar,
            bairro: bairroVar,
            cidade: cidadeVar,
            estado: estadoSelectVar,
            telefone: telefoneVar
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfeito!",
                    text: "Cadastro realizado com sucesso!",
                    color: "#FFFFFF",
                    background: "#2C3E50"

                }).then(() => {
                    window.location = '/login.html'
                })
            } else {
                resposta.json().then(function (erro) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao cadastrar",
                        text: erro?.error || "Erro inesperado!",
                        color: "#FFFFFF",
                        background: "#2C3E50"
                    });
                }).catch(function () {
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao cadastrar",
                        text: "Erro inesperado ao interpretar a resposta do servidor.",
                        color: "#FFFFFF",
                        background: "#2C3E50"
                    });
                });
            }
        })
        .catch(function (resposta) {
            console.log(`ERRO: ${resposta}`);
        });

    return false;
}


// Listando empresas cadastradas
function listar() {
    fetch("/empresas/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    listaEmpresasCadastradas.push(empresa);

                    console.log("listaEmpresasCadastradas")
                    console.log(listaEmpresasCadastradas[0].codigo_ativacao)
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


// Inicializar as máscaras quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarMascaras();

    // Seu código existente para o ícone de senha
    var iconeSenha = document.getElementById("senhaIcon");
    if (iconeSenha) {
        iconeSenha.addEventListener('click', function () {
            senha_input.type = senha_input.type === 'password' ? 'text' : 'password';
        });
    }
});
