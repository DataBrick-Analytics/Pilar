function cadastrar() {
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeEmpresaVar = nomeEmpresa_input.value;
  var cnpjVar = Number(cnpj_input.value);
  var nomeUsuarioVar = nome_usuario_input.value;
  var cpfVar = cpf_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var dtNascVar = dtNasc_input.value;
  var funcaoVar = funcao_input.value;

  // Verificando se há algum campo em branco
  if (
    nomeEmpresaVar == "" ||
    cnpjVar == "" ||
    nomeUsuarioVar == "" ||
    cpfVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    dtNascVar == "" ||
    funcaoVar == "" 
  ) {
    console.log("Erro na hora do Cadastro")

    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: "Informações Faltando!",
      color: "#FFFFFF",
      background: "#2C3E50"
    });
    return
  }

  // Validação nomeEmpresa
  if (nomeEmpresaVar.length < 2) {
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
  if (!emailVar.includes('@gmail' || '@hotmail' || '@outlook') || !emailVar.includes('.com')) {
    Swal.fire({
      icon: 'error',
      title: 'Email Incorreto',
      text: 'Insira um email válido!',
      color: "#FFFFFF",
      background: "#2C3E50"
    })
    return
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
  if (funcaoVar.length < 2) {
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
      icon: "error",
      title: 'CEP Incorreto',
      text: 'Insira um Cep válido',
      color: "#FFFFFF",
      background: "#2C3E50"
    })
    return
  }

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
      nomeEmpresa: nomeEmpresaVar,
      cnpj: cnpjVar,
      nomeUsuario: nomeUsuarioVar,
      cpf: cpfVar,
      email: emailVar,
      senha: senhaVar,
      dtNasc: dtNascVar,
      funcao: funcaoVar
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
  })
})