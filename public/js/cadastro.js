function cadastrar() {
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeEmpresaVar = nomeEmpresa_input.value;
  var emailVar = email_input.value;
  var telefoneVar = telefone_input.value;
  var estadoVar = estado_input.value;
  var bairroVar = bairro_input.value;
  var cnpjVar = Number(cnpj_input.value);
  var senhaVar = senha_input.value;
  var cepVar = Number(cep_input.value);
  var cidadeVar = cidade_input.value;
  var numeroVar = Number(numero_input.value);

  // Verificando se há algum campo em branco
  if (
    nomeEmpresaVar == "" ||
    emailVar == "" ||
    telefoneVar == "" ||
    estadoVar == "" ||
    bairroVar == "" ||
    cnpjVar == "" ||
    senhaVar == "" ||
    cepVar == "" ||
    cidadeVar == "" ||
    numeroVar == ""
  ) {
    console.log("Erro na hora do Cadastro")

    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: "Informações Faltando!"
    });
    return
  }

  // Validação nomeEmpresa
  if (nomeEmpresaVar.length < 2) {
    Swal.fire({
      icon: "error",
      title: 'Nome de Empresa Incorreto',
      text: 'Insira um nome válido'
    })
  }
  // Validação do Email
  if (!emailVar.includes('@') || !emailVar.includes('.com')) {
    Swal.fire({
      icon: 'error',
      title: 'Email Incorreto',
      text: 'Insira um email válido!'
    })
    return
  }

  // Validação do telefone
  const telefoneValidado = /^[-()0-9\s]+$/.test(telefoneVar)
  if (!telefoneValidado) {
    Swal.fire({
      icon: "error",
      title: 'Telefone Incorreto',
      text: 'Insira um telefone válido'
    })
    return
  }

  // Validação do Estado
  if (estadoVar.length < 2) {
    Swal.fire({
      icon: "error",
      title: 'Estado Incorreto',
      text: 'Insira um estado válido'
    })
    return
  }

  // Validação do bairro
  if (bairroVar.length < 2) {
    Swal.fire({
      icon: "error",
      title: 'Bairro Incorreto',
      text: 'Insira um Bairro válido'
    })
    return
  }

  // Validação do CNPJ
  if (cnpjVar.length < 14 || cnpjVar.length > 14) {
    Swal.fire({
      icon: "error",
      title: 'CNPJ Incorreto',
      text: 'Insira um CPNJ válido'
    })
    return
  }

  // Validação do CEP
  if (cepVar.length < 8 || cepVar.length > 8) {
    Swal.fire({
      icon: "error",
      title: 'CEP Incorreto',
      text: 'Insira um Cep válido'
    })
    return
  }

  if (cidadeVar.length < 2) {
    Swal.fire({
      icon: "error",
      title: 'Cidade Incorreta',
      text: 'Insira uma cidade válida'
    })
    return
  }

  var enderecoCompletoVar = cidadeVar + ' - ' + bairroVar  + ' - ' + numeroVar + ' - ' + estadoVar + ' - ' + cepVar

  console.log("Informações corretas")

  // Enviando o valor da nova input
  fetch("/enterprise/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nome: nomeEmpresaVar,
      email: emailVar,
      telefone: telefoneVar,
      endereco : enderecoCompletoVar,
      cnpj: cnpjVar,
      senha: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      console.log('Voltou ao cadastro AAAAAAAAAAAAAAAAA')
      if (resposta.ok) {
        Swal.fire({
          icon: "success",
          title: "Perfeito!",
          text: "Cadastro realizado com sucesso!"
        })
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
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

document.addEventListener('DOMContentLoaded', function () {
  var iconeSenha = document.getElementById("senhaIcon")

  iconeSenha.addEventListener('click', function () {
    senha_input.type = senha_input.type === 'password' ? 'text' : 'password'
    iconeSenha.innerHTML = ""
  })
})
