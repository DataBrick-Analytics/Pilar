const { default: Swal } = require("sweetalert2");


function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeEmpresaVar = nomeEmpresa_input.value;
    var emailVar = email_input.value;
    var telefoneVar = telefone_input.value;
    var estadoVar = estado_input.value;
    var bairroVar = bairro_input.value;
    var cnpjVar = cnpj_input.value;
    var senhaVar = senha_input.value;
    var cepVar= cep_input.value;
    var cidadeVar = cidade_input.value;
    var numeroVar = numero_input.value;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
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
        title: "Erro no Cadastro"
      })


    } else {
      console.log("Informações corretas")
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
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

  function sumirMensagem() {
    cardErro.style.display = "none";
  }