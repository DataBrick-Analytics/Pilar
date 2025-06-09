// ...existing code...

function nextStep(step) {
  document.querySelector(`.step-content.active`).classList.remove('active');
  document.querySelector(`.step[data-step="${step-1}"]`).classList.remove('active');
  document.querySelector(`#step${step}`).classList.add('active');
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

function prevStep(step) {
  document.querySelector(`.step-content.active`).classList.remove('active');
  document.querySelector(`.step[data-step="${step+1}"]`).classList.remove('active');
  document.querySelector(`#step${step}`).classList.add('active');
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

function cadastrar() {
  // Existing fields
  var nomeFantasiaVar = nomeFantasia_input.value;
  var cnpjVar = Number(cnpj_input.value);
  var nomeUsuarioVar = nome_usuario_input.value;
  var cpfVar = cpf_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var dtNascVar = dtNasc_input.value;
  var razaoSocialVar = razao_social_input.value;

  // New address fields
  var cepVar = cep_input.value;
  var ruaVar = rua_input.value;
  var numeroVar = numero_input.value;
  var complementoVar = complemento_input.value;
  var bairroVar = bairro_input.value;
  var cidadeVar = cidade_input.value;
  var estadoVar = estado_input.value;

  if (
    nomeFantasiaVar == "" ||
    cnpjVar == "" ||
    nomeUsuarioVar == "" ||
    cpfVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    dtNascVar == "" ||
    razaoSocialVar == "" ||
    cepVar == "" ||
    ruaVar == "" ||
    numeroVar == "" ||
    bairroVar == "" ||
    cidadeVar == "" ||
    estadoVar == ""
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
      icon: "error",
      title: 'CEP Incorreto',
      text: 'Insira um Cep válido',
      color: "#FFFFFF",
      background: "#2C3E50"
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

  // Validação do Estado
  if (estadoVar.length !== 2) {
    Swal.fire({
      icon: "error",
      title: 'Estado Incorreto',
      text: 'Insira a sigla do estado com 2 letras',
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

  console.log("Informações corretas")

  fetch("/enterprise/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   
      nomeFantasia: nomeFantasiaVar,
      cnpj: cnpjVar,
      nomeUsuario: nomeUsuarioVar,
      cpf: cpfVar,
      email: emailVar,
      senha: senhaVar,
      dtNasc: dtNascVar,
      razaoSocial: razaoSocialVar
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